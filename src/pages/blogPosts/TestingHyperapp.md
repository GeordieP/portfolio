# Testing Components - Hyperapp ElFinder

#### April 8, 2018

*(ElFinder function source can be found at the bottom of this post)*

Testing Hyperapp components can be a pain. Often the attribute or value we're trying to validate is buried under several layers of virtual DOM nodes, and the logic required to drill down to the single element we're looking for can end up being unreadable, messy, and repetitive.

Consider the following component:

```js
const TestComponent = ({ key, title, blurb, content, footerContent }) => (
    <div className='rootEl'>
        <div className='placeholder'></div>
        <div className='importantInfo'>
            <div className='importantInfo_inner'>
                <div className='commonClNm info_summary'>
                    <h1 className='summary_title' id={ key + '_summary_title' }>
                        <strong>{ title }</strong>
                    </h1>
                    <h3 className='summary_blurb' id={ key + '_summary_blurb' }>
                        { blurb }
                    </h3>
                </div>

                <div className='commonClNm' id={ key + '_details_content' }>
                    { content }
                </div>

                <div className='commonClNm' id={ key +  '_details_footer' }>
                    { footerContent }
                </div>
            </div>
        </div>
    </div>
)
```


Given the test case:

```
Verify the summary blurb element was given the correct ID, and contains the expected text.
```

One approach is to simply march down the tree referencing children by index.

- *Test Example 1.*

```js
test('Blurb element renders given text in element with expected ID.', () => {
    const props = {
        key: 'first',
        title: 'FirstPost',
        blurb: 'A small blurb about the content',
        content: 'The full content',
        footerContent: 'Date'
    }

    const el_root = TestComponent(props)

    //
    // Climb down through each element's children to find what we're looking for
    //

    const el_blurb = el_root
        .children[1]     // div.importantInfo
        .children[0]     // div.importantInfo_inner
        .children[0]     // div.info_summary
        .children[1]     // h3.summary_blurb

    // verify ID is correct
    expect(el_blurb.attributes.id)
        .toEqual(`${props.key}_summary_blurb`)

    // verify content is correct
    expect(el_blurb.children[0])
        .toEqual(props.blurb)
}
```


While this works, it's quite difficult to read (especially without the helpful comments), and can be broken by the simplest of component layout changes.

Another approach is a bit less likely to be broken by small changes, but requires a lot more code and in some cases may end up being even less readable:

- *Test Example 2a.*

```js
test('Blurb element renders given text in element with expected ID.', () => {
    ...

    const el_blurb = el_root
          .children.find(el => el.attributes.className === 'importantInfo')
          .children.find(el => el.attributes.className === 'importantInfo_inner')
          .children.find(el => el.attributes.className === 'info_summary')
          .children.find(el => el.attributes.className === 'summary_blurb')

    /// ERROR! ///

    ...
})
```

Now that we're using element attributes, the test will no longer break if an item is moved before or after a sibling in the markup, and we find it easier to understand which element we're looking at during each step.

The biggest issue with this, as shown by the comment, is that it throws an error;

`TypeError: Cannot read property 'children' of undefined`

Unfortunately, basic console output doesn't do a good job of telling us where this error came from; it claims it originates from the line of the assignment.

With some investigation, we can determine that the error is coming from the fact that our search for a child element with the className `info_summary` returned `undefined`. If we take another look at the component markup, we can see why this is:

```js
    ...
    <div className='commonClNm info_summary'>
    ...
```

The `info_summary` element has two classes applied (the other being `commonClNm`), so the string match didn't work like it had in previous lines. It's easy enough to fix.

- *Test Example 2b.*

```js
test('Blurb element renders given text in element with expected ID.', () => {
    ...

    const el_blurb = el_root
          .children.find(el => el.attributes.className === 'importantInfo')
          .children.find(el => el.attributes.className === 'importantInfo_inner')
          .children.find(el => el.attributes.className.includes('info_summary'))   // Error fixed
          .children.find(el => el.attributes.className === 'summary_blurb')

    ...
})
```

That's fine for this case, but will obviously get tiring to write after a while.

With the intention of staying as light as possible on library dependencies, there are a number of other ways people test their Hyperapp components; as far as I've seen, the two most common are:

- Reproducing the component's markup inside the test file using standard `h()` calls, and comparing the output with the virtual dom object tree returned by the imported component after having run both through `JSON.stringify()`.
- Mocking the expected output of the component `h()` call; reproduce the virtual dom tree (using hard-coded object and array literals, strings, numbers, etc) at each level until the desired element is reached, and then compare the real component tree with the mock tree (Again, often by `stringify`-ing both and comparing the results).

During my initial search, I found neither of these methods appealing, mostly because they both require a lot of mock writing; certainly undesirable when testing modules that tend to change often.

## A simpler way

The solution I've gone with, a function I've named "ElFinder", attempts to offer the simplicity of Example 1 with the specificity of Example 2b.

Here's how the same test case from above ends up looking using the ElFinder function:

- *Example 3a.*

```js
test('Blurb element renders given text in element with expected ID.', () => {
    // ...

    const el_blurb = ElFinder(el_root)                  // call ElFinder, pass an object returned from h().
          .firstChild.byClass('importantInfo')          // use ElFinder methods to step down the tree.
          .firstChild.byClass('importantInfo_inner')    // each call returns an ElFinder object, so fn calls can be chained.
          .firstChild.byClass('info_summary')
          .firstChild.byClass('summary_blurb')

    // ... (rest of test is the same as previous full examples)
})
```

Although the only method in use here is `firstChild.byClass`, others are quite useful as well. Another way to get to the same resulting element (although less resilient to change) could be:

- *Example 3b.*
```js
    // ...

    const el_blurb = ElFinder(el_root)
          .child.atIndex(1)                          // div.importantInfo
          .firstChild.byClass('importantInfo_inner')
          .firstChild.byIndex()                      // div.info_summary
          .firstChild.byClass('summary_blurb')

    // ...
```

In example 3b, we get some of the children by index rather than by matching their attributes.

In some cases, these functions allow us to not only make our tests more specific, but also to simplify and omit steps:

- *Example 4.*

```js
    // ...

    const el_blurb = ElFinder(el_root)
          .child.atIndex(1)
          .firstChild.byClass('importantInfo_inner')
          .firstChild.byIndex()
          .firstChild.byId(`${props.key}_summary_blurb`)  // use ID to find element here

    // NOTE:
    // This check is no longer needed, existence of element with matching ID is checked
    // when we access firstChild.byId above.
    //
    // verify ID is correct
    // expect(el_blurb.attributes.id)
    //    .toEqual(`${props.key}_summary_blurb`)

    expect(el_blurb.children[0])
        .toEqual(props.blurb)

    // ...
```

Using the ID to find a child element in this case allows us to exclude the standalone ID check that was used in all the other examples. If the call to `firstChild.byId` returns undefined, the test will fail and we'll know the ID was invalid.

Some of the ElFinder functions return arrays, allowing us to keep tests concise and clean. Here we store references to several elements who share the same parent and class name.

- *Example 5.*

```js
    const el_divInner = ElFinder(el_root)
          .firstChild.byClass('importantInfo')
          .firstChild.byClass('importantInfo_inner')

    const [ summary, content, footer ] = el_divInner.allChildren.withClass('commonClNm')
```

*Note that the order of the array returned from `allChildren.withClass` here is dependent on the order of the elements within their parent.*

## How it Works

The ElFinder function accepts a Hyperapp VDOM element (Some compiled JSX expression, or a direct call to Hyperapp's `h` function) as an argument, and returns a new object containing all of the element's properties, as well as some new ones; We add new properties containing composable functions allowing us to dig deeper into the VDOM tree. Most of these functions return a new call to ElFinder, as well as a few that return the raw Hyperapp VDOM element (primarily used when verifying a pure text child element).

Here's a rundown of the shape of the object returned from ElFinder:

- *Existing Hyperapp VDOM Element Properties*
  - nodeName, attributes, children, key
- *child*
  - **atIndexRaw** - Child at index (raw h call object)
  - **atIndex** - ElFinder instance of child at index
- *firstChild*
  - **raw** - first child element (raw h call object)
  - **byIndex** - ElFinder instance of first child, accessed by index in parent's children array
  - **byId** - ElFinder instance of first child with matching ID attribute
  - **byType** - ElFinder instance of first child with matching element type (nodeName property)
  - **byClass** - ElFinder instance of first child with matching className atrribute
- *allChildren*
  - **ofType** - array of ElFinder instances for each child matching element type (nodeName property)
  - **withClass** - array of ElFinder instances for each child with matching className attribute

## Full ElFinder function

```js
const ElFinder = el => ({
    // carry over existing element properties
    ...el,

    child: {
        // child at index (raw vdom object)
        // does not wrap in ElFinder object
        atIndexRaw: index => el.children[index],

        // ElFinder instance of child at index
        atIndex: index => ElFinder(el.children[index]),
    },

    firstChild: {
        // first child element (raw vdom object)
        // does not wrap in ElFinder object
        raw: () => el.children[0],

        // ElFinder instance of element's first child element
        byIndex: () => ElFinder(el.children[0]),

        // ElFinder instance of first child element with matching ID attribute
        byId: id => ElFinder(el.children.find(el => el.attributes.id === id)),

        // ElFinder instance of first child element with matching type (nodeName property)
        byType: type => ElFinder(el.children.find(el => el.nodeName === type)),

        // ElFinder instance of first child element with matching className attribute
        // return an element only if the attribute exists (truthy) & includes the passed string
        byClass: className =>
                ElFinder(el.children.find(el => el.attributes.className
                        ? el.attributes.className.includes(className)
                        : false)),

    },

    allChildren: {
        // array of ElFinder instances for each child matching element type (nodeName property)
        ofType: type =>
                el.children.filter(el => el.nodeName === type)
                        .map(el => ElFinder(el)),

        // array of ElFinder instances for each child with matching className attribute
        withClass: className =>
                el.children.filter(el => el.attributes.className
                        ? el.attributes.className.includes(className)
                        : false)
                        .map(el => ElFinder(el)),
    }
})
```

The focuses of this utility were to stay tiny, reusable, and to offer a composable workflow that stays close to the familiar Hyperapp VDOM element shape.

Feel free to use this function in your own tests. Currently there are no plans to publish it as a Node module; I don't think it warrants a module, though this may change in the future.
