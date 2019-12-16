# Building Swift Shop - Week 1 (Nov 16 - 23, 2019)

#### Nov 24, 2019

This is the beginning of a series of (hopefully) weekly blog posts about my first experiences using SwiftUI to build an iOS app.

# About the app

The app being built in this series of posts is a shopping list app called [Swift Shop](https://github.com/GeordieP/swiftshop) (pun somewhat intended). It's my first real mobile app, and I plan on publishing it to the iOS App Store when it's complete.

The initial version of this was a small [web-based prototype](https://github.com/GeordieP/shopping-proto) built with React in December of 2018. It was mainly a playground in which to explore the recently released [React Hooks](https://reactjs.org/docs/hooks-intro.html) pattern. The project was completed rather quickly, and I had some desire to turn it into a real thing, as it captures the workflow I'd prefer when setting up shopping lists.

The next version was intended to be written using React Native, but this never came to be, as the support for Hooks wouldn't be stable for many months to come.

Some time later, [Ionic React](https://ionicframework.com/blog/announcing-ionic-react/) was officially announced, and I ended up building a good amount of the app in this toolkit (View this project [here](https://github.com/GeordieP/shopping-list)), before deciding that Ionic React was not the solution I was looking for. I instead set my sights on learning SwiftUI, as it seemed to be promising (and slightly React-like!), and producing the app in a platform-native framework would hopefully ensure that everything stays fast and correctly adheres to the iOS human interface guidelines.

# Initial Concerns

Going into SwiftUI with zero prior knowledge of how iOS apps are built or packaged, how data is managed, and how the framework interacts with state left me with several unknowns up-front:

## **State Management** - How do developers usually manage state in SwiftUI apps?

During a quick initial search, there were very few resources talking about this directly. I decided to see if anybody had created an "Awesome SwiftUI" page, and indeed, [they had](https://github.com/chinsyo/awesome-swiftui). It was in this list that I found [SwiftDux](https://github.com/StevenLambion/SwiftDux), which felt like a comfortable choice, given my Redux experience with React.

## **Persistence** - How do we interact with device storage using Swift, and how does this integrate with SwiftUI?

Not much searching required on this one, as SwiftDux ships with a [simple state persistence middleware](https://stevenlambion.github.io/SwiftDux/persisting-state.html) that seemed good enough to start with.

## **List Filtering** - How do we manage our list filtering logic?

Previous prototypes of the app relied heavily on a custom React Hook for filtering the lists of items in a very composable manner that was a joy to use (Alright, I may be biased 😅). SwiftUI obviously doesn't have Hooks, so what will the approach be to replicate this? How close can we get to the easy-to-use API of the Hook?

# Starting Out

Writing the initial views and wiring up some basic state management with SwiftDux was a breeze. While there were occasional cases where Xcode's completion would provide less-than-useful options, or stubborn type errors would persist until an editor restart, the experience was pleasant. It is however apparent that SwiftUI is new and a bit rough around the edges (e.g. [Errors originating in a child View's code being presented in the parent View](https://stackoverflow.com/questions/58724301/cannot-convert-value-of-type-bindingint-to-expected-argument-type-binding)), but these problems will no doubt see improvement over time.

The real beauty of SwiftUI is its contextual awareness. Unlike the web where most styling is done by hand, iOS has a very consistent set of controls for most of the scenarios one would encounter. The framework has been thoughtfully designed to give developers access to these controls with minimal effort; for example, adding the common "slide to delete" button to each item in a List view is as easy as calling a method on the `ForEach` block itself:

```diff
  List {
    ForEach(props.products) { p in
      Text(p.name)
+   }.onDelete(perform: deleteProduct)
  }

  // ...
  // Defined elsewhere in the View struct:

+ func deleteProduct(at: IndexSet) {
+   // Call a SwiftDux action
+   self.dispatch(ProductActions.deleteProduct( /* ... */ )
+ }
```

## Attempting Persistence

After successfully getting some basic state management and Views written, I tried out the SwiftDux bundled JSON persistence middleware. Unfortunately, it didn't work. Something in the SwiftDux `OrderedState` type didn't like being serialized, and the app would throw a runtime exception when calling `JSONEncoder.encode()` on the state object.

```
  JSONEncoder.encode() throws Thread 1: EXC_BAD_ACCESS (code=2, address=0x105438309) error
```

Trying to diagnose the problem, I made a new SwiftUI project to try and reproduce the error in a more isolated environment, and was able to do so:

```swift
  // ...

  struct Item: IdentifiableState, Codable {
      var id: String
  }

  let state = OrderedState<Item>()
  let json = try! JSONEncoder().encode(state) // throws!

  // ...

  print("\(String(data: json, encoding: .utf8)!)") // never reached
```

I then created a second project (this time an empty Swift project, with no SwiftUI or SwiftDux dependencies), and copied some source files of interest directly from the SwiftDux repository (namely `OrderedState`, `IdentifiableState`) and ran a similar test. Strangely, this version worked just fine.

```swift
  import Foundation

  struct Item: IdentifiableState, Codable {
    var id: String
  }

  var state = OrderedState(Item(id: "1st"))
  var json = try! JSONEncoder().encode(state) // no problems
  print("\(String(data: json, encoding: .utf8)!)") // prints the JSON string as expected
```

I decided to hold off on persistence, instead focusing on other parts of the app. I will later open an issue on the SwiftDux GitHub repository explaining the issue and including the reproduction cases.

## List Filtering

The [Hook](https://github.com/GeordieP/shopping-list/blob/master/src/hooks/useFilters.ts) for managing filters in the React version(s) of the app is very simple to use; we call the hook in our component, and it returns us an object containing functions to add or remove a filter function (`(T) => Boolean`) by name, as well as a function to apply the stored filters to a given collection (`applyFilters(initialCollection: T[]) => filteredCollection: T[]`). We call `applyFilters` on our collection of list items, and render the filtered list as normal. The add/remove filter functions are passed to other components that are concerned with managing filter state, such as a search bar component that will update a "search" filter function whenever the user types a character, causing the filtered list to re-render and represent the new desired state. Our list rendering is therefore only concerned with rendering the list, and never with managing what filters are present.

I was initially afraid a lot of this API would get more verbose in SwiftUI, or at the very least, more tightly coupled to the Views rendering the content. After a bit of playing around, the solution is more than satisfactory.

The first piece is a class called `FilterManager`, which conforms to the Swift `ObservableObject` protocol. In SwiftUI, instances of this type can be bound to a View struct using the `@ObservedObject` property wrapper. SwiftUI will automatically re-render the View when a published var inside the observed field changes (these published vars are fields inside the `ObservedObject` wrapped with `@Published`).

The `FilterManager` class behaves similarly to the `useFilters` Hook from the React version; it maintains an internal collection of filter functions (closures), and exposes methods to add/remove closures by name, along with a method to apply the filters to a given collection.

**FilterManager.swift**

```swift
class FilterManager<T> : ObservableObject {
  typealias Filter = (T) -> Bool
  @Published var filters: [String: Filter]

  init(defaultFilters: [String: Filter] = [String: Filter]()) {
    filters = defaultFilters
  }

  /// Update a filter by name, or insert it if it does not exist.
  func upsert(_ name: String, _ filterFn: @escaping Filter) {
    filters.updateValue(filterFn, forKey: name)
  }

  /// Remove a filter by name.
  func remove(_ name: String) {
    filters.removeValue(forKey: name)
  }

  /// Apply the current list of filters to a collection of T.
  func apply(to collection: [T]) -> [T] {
    filters.values.reduce(collection, { $0.filter($1) })
  }
}
```

**Usage** (in SwiftUI View ProductsPage.swift)

```swift
struct ProductsPage: View {
  @ObservedObject private var filters = FilterManager<Product>()

  // ...

  var body: some View {
    List {
      ForEach(filters.apply(to: props.products.values)) { ... }
    }
  }
}
```

Another View containing a search field would be rendered alongside the List shown above, and would receive the `FilterManager` instance through its initializer, internally calling the upsert and remove methods as needed. Whenever the `ProductsPage` "filters" observed property updates, the view re-renders and we display the filtered collection.

A small issue with this approach was that it broke the previously-working removal of list items; the ForEach had a chained `.onDelete` method whose passed closure would receive the index (really an `IndexSet`) of an item to remove, and we would pass that index through a SwiftDux action to remove the item from the store. Unfortunately, when the list is filtered, the indices don't line up; index 2 in the filtered list might actually be index 6 in the SwiftDux store, so when we delete at index 2, we delete something that may not even be visible to the user.

To work around this, I first switched the SwiftDux actions to perform their removal operations by ID rather than index. This presented a problem, as the aforementioned `onDelete` method will only pass the indices to be removed, and since we're only ever creating the filtered collection inside the rendered view body, we have no access to it with which to map a given list index to an item ID (and it seems like there isn't an obvious way to add the filtered list as its own property on the struct and have it still react to changes in the filters state). To solve this, the list rendering was extracted to its own View, which would receive the filtered list as well as a `deleteItem` closure through its initializer. An additional function inside this View would be used in the list ForEach, and would look up the item in the (already filtered!) collection, grab its ID, then call the `deleteItem` closure provided by the parent View.

After these changes, the list could be filtered and deleting items worked as intended.

## Progress - Week 1

- Tab navigation bar
- Basic form to add a new product to the list
- Buttons to add and remove a placeholder search filter (searching for any products containing the string "ir")
- Slide to delete a product from the list

<div align="center">
  <video controls alt="Week 1 Progress Video">
    <source src="https://giant.gfycat.com/SlimLameCardinal.mp4" type="video/mp4" />
  </video>
</div>
