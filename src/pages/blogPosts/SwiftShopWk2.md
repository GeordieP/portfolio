# Week 2

# Building Swift Shop - Week 2 (Nov 23 - 30, 2019)

#### Dec 1, 2019

Not a whole lot of progress this week, the evenings have been busier than normal.

One limitation of SwiftUI I've come across; It doesn't currently seem possible to conditionally render the style of a view when the style is applied via an empty call chained on the view. `.strikethrough()` on the `Text` view is an example:

```swift
if product.complete {
  return Text(product.name)
    .strikethrough()
} else {
  return Text(product.name)
}
```

The return type of this `if` expression is different based on whether or not the `.strikethrough()` is present, so SwiftUI complains (showing the error in the parent view, for some reason):

```
'VIEW_NAME.Type' is not convertible to '() -> VIEW_NAME'
```

The only way to do conditional styles is with methods that accept an argument, for example:

    Text(product.name)
      .foregroundColor(product.complete ? Color.gray : Color.black)

In this case we're not calling the `.foregroundColor` method conditionally, so the return type stays the same. Only the foreground color argument changes.

## Search Bar

This week, the temporary buttons to add/remove a placeholder filter were replaced by a functioning search bar.

The search bar is a separate View, and it receives its filter manager from its parent View. It internally keeps a state variable for the value of the rendered input field, with an intermediate binding in the body to proxy the `set` functionality.

```swift
struct ProductFilterBar: View {
  var filterManager: FilterManager<Product>
  @State private var searchValue: String = "";

  func setSearch(_ fieldValue: String) {
    defer { self.searchValue = fieldValue }

    if fieldValue.count == 0 {
      self.filterManager.remove("SEARCH")
      return
    }

    self.filterManager.upsert("SEARCH", { product in
      product.name
        .lowercased()
        .contains(fieldValue.lowercased())
    })
  }

  var body: some View {
    let boundSearchValue = Binding<String>(get: { self.searchValue }, set: self.setSearch)

    return HStack {
      TextField("Search for a product name", text: boundSearchValue)
    }.padding()
  }
}
```

When a user types a character in the text field, the `setSearch` function is called. We defer setting the state variable until the end of the scope, then decide how to update the "SEARCH" filter. The filter is removed when the field is empty, otherwise we update the filter with a new closure that compares a given product with the closed-over value of the text field.

## Progress - Week 2

- SwiftDux store and actions are mostly set up for Lists state
- Added a real search bar to the products page:

<video controls alt="Week 2 Progress Video">
  <source src="https://giant.gfycat.com/ClassicSoupyBallpython.mp4" type="video/mp4" />
</video>
