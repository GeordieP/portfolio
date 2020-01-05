import Err1 from "./media/SwiftShop_wk6_err1.png"
import Err2 from "./media/SwiftShop_wk6_err2.png"

# Building Swift Shop - Week 6 (Dec 29 2019 - Jan 04, 2020)

### Jan 05, 2020

The past few weeks have primarily been about improving the product page and its edit form modal. It's gone through several iterations now, and I think it's finally in a good place. Here's a quick overview of the changes:

## Pass 1:

```swift
struct ProductPage: View {
  @ObservedObject private var model: ProductPageViewModel = ProductPageViewModel()
  @State var editSheetOpen = false
  @State var editedProduct: SimpleProduct?
  @State var isNewProduct = false

  private func addProductClicked() {
    editSheetOpen = true
    isNewProduct = true
    editedProduct = SimpleProduct(id: 0, name: "", price: 0)
  }

  private func productRowClicked(product: SimpleProduct) {
    editSheetOpen = true
    isNewProduct = false
    editedProduct = product
  }

  private func onSaveProduct(_ product: SimpleProduct, isNew: Bool) {
    model.onSaveProduct(product, isNew)
    editSheetOpen = false
    isNewProduct = false
    editedProduct = nil
  }

  var body: some View {
    ...
  }
}
```

- We couple a lot of unnecessary state to the ProductPage here. Why should the product page view have to keep track of what product is being edited, or whether or not it's new? The only things that should be concerned with `isNewProduct` should be:
  - The function that brings us into edit mode (add new product, edit existing product), which should set this state
  - The `onSaveProduct` function inside ProductPageViewModel (not shown), which should read the state to decide which database call to make

## Pass 2:

```swift
struct ProductPage: View {
  @ObservedObject private var model: ProductPageViewModel = ProductPageViewModel()
  @State var editSheetOpen = false
  private var editFormModel = ProductEditFormModel()

  private func addProductClicked() {
    editSheetOpen = true
    editFormModel.newProduct()
  }

  private func productRowClicked(product: SimpleProduct) {
    editSheetOpen = true
    editFormModel.editProduct(product)
  }

  private func onSaveProduct(_ product: SimpleProduct, isNew: Bool) {
    model.onSaveProduct(product, isNew)
    editSheetOpen = false
  }

  var body: some View {
    ...
  }
}
```

- `isNewProduct` moved from page state into ProductEditFormModel — ProductPage no longer has to care about it
- A ProductEditFormModel instance is created in the product page and later passed down to the edit form View constructor — this allows for calling methods on the edit form model directly (`newProduct` and `editProduct`)
  - When the "Add Product" button was tapped, we'd set the sheet open status and call `newProduct()` on the edit form model. This would set `isNew` to true within the model.
  - When a product row was selected for editing, we'd set the sheet open status and call `editProduct(product)` on the edit form model. The model would accept the given product to edit, and internally set `isNew` false.

A slight improvement, but what still sucks about this?

- Creating the ProductEditFormModel in a view other than the ProductEditForm itself feels like a strange pattern, and the only win is that we move `isNewProduct` out of the ProductPage
- Just as ProductPage shouldn't care about `isNewProduct`, the edit form shouldn't either. It should operate on a Product structure, call a function when it's done, and nothing more
- `editFormModel.newProduct()` is responsible for creating an empty product to operate on. This reduces testability, and if we're debugging this code, it's potentially another layer to dig through to find what we're looking for. It should instead be up to the caller to decide what a "new product" is. Making this change would have been a small amount of work from this point, but pass 3 addresses the issue in a different way.

## Pass 3 (Current implementation):

The latest iteration wraps most of the needed functionality up into this SheetStatus enum, whose `open` variant has some associated values:

```swift
enum SheetStatus {
  case closed
  case open(product: SimpleProduct, isNew: Bool = false)
}
```

Usage:

```swift
struct ProductPage: View {
  @ObservedObject private var model: ProductPageViewModel = ProductPageViewModel()
  @State var editSheetStatus: SheetStatus = .closed

  private func addProductClicked() {
    editSheetStatus = .open(SimpleProduct.newEmpty(), isNew: true)
  }

  private func productRowClicked(product: SimpleProduct) {
    editSheetStatus = .open(product, isNew: false)
  }

  private func onSaveProduct(_ editedProduct: SimpleProduct) {
    model.onSaveProduct(product, editSheetStatus.isNew()) // isNew here is a helper fn on the enum; () -> Bool
    editSheetStatus = .closed
  }

  var body: some View {
    ...
  }
}
```

- ProductPage no longer has to manage the ProductEditFormModel instance — strange pattern gone!
- The sheet open/closed boolean has been replaced with a simple enum property, set to the `closed` variant by default
- When we edit or add a product we can open the edit sheet, pass a product to operate on (new or existing), and optionally set `isNew` all in one short expression
- The `isNew` state now only lives inside the enum variant, and neither the ProductPage nor ProductEditForm views have to store it (In fact, it's no longer even referenced anywhere outside of the functions shown above)

This implementation feels much better than any of the others. One of the only caveats is that we can't use the enum's value directly for opening and closing the [PartialSheet](https://github.com/AndreaMiotto/PartialSheet) view, because it expects to be passed a `Binding<Bool>`. For now, an in-line binding declaration works:

    partialSheet(presented: Binding<Bool>(get: self.editSheetStatus.isOpen, set: self.closeForm)) {

- `isOpen` is a small helper function defined on the SheetStatus enum

```swift
extension SheetStatus {
  func isOpen() -> Bool {
    if case .closed = self { return false }
    return true
  }
}
```

- `self.closeForm` is a private ProductPage method that simply sets editSheetStatus to `.closed`. The compiler doesn't like us setting the property in an in-line closure, but Xcode doesn't say why. It instead highlights an unrelated line with a false positive error:

<div align="center">
  <a target="GP_IMG" href={Err1}>
    <img src={Err1} style={{ maxWidth: "100%" }} />
  </a>
</div>

When the closure `set: { self.editSheetStatus = .closed }` is removed, the reported false positive is gone and the app compiles:

<div align="center">
  <a target="GP_IMG" href={Err2}>
    <img src={Err2} style={{ maxWidth: "100%" }} />
  </a>
</div>

This is a great example of how terrible the error reporting in SwiftUI+Xcode is currently. It's a great loss of productivity, and I hope Apple is putting effort into improving it.
