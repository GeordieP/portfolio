# JS Object Destructuring Assignment

#### August 4, 2018

This post is simply a mirror of the GitHub Gist I've written on this topic. It's a nice reference for the occasionally confusing syntax of destructuring assignment in JavaScript.

The full source is below, but the version on Gist may be kept further up-to-date, so I recommend you read it there rather than here!

### Gist URL:

[https://gist.github.com/GeordieP/6cb735d0472d3654a6948b82de25e3b0](https://gist.github.com/GeordieP/6cb735d0472d3654a6948b82de25e3b0)

---
Find proper documentation on MDN:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

#### Some general destructuring rules:
- If the right side of a colon is an identifier, the identifier is brought into scope (an alias) and refers to the object on the left side. (eg. see `a2`)
- If the right side of a colon is an object expression `O`, the left side refers to `O`'s name (key) within its parent object. (eg. see `b1`)
- If no alias is given, the identifier used to access the property is brought into scope.
- If we access a child of object `O`, and want to bring `O` into scope as well, we have to reference it separately from where we access its child. (see `b3`)

```js
// object used for examples
const comment = {
    parent: {
        id: '0001',
        name: 'issue1',

        author: {
            id: '01',
            name: 'user1'
        }
    },

    body: 'hello!',
};

/**************************
* SECTION A: TOP LEVEL
***************************/

/** a1 - no alias **/
function a1() {
    const { parent, body } = comment;
    console.log(parent);                // { id: '0001', name: 'issue1', author: { id: '01', name: 'user1' } }
    console.log(body);                  // hello!
}
// a1();

/** a2 - with alias for parent **/
function a2() {
    const { parent: commentParent, body } = comment;
    console.log(commentParent);         // { id: '0001', name: 'issue1', author: { id: '01', name: 'user1' } }
    console.log(body);                  // hello!
    // console.log(parent);             // (ReferenceError: parent is not defined) - not brought into scope, since we access deeper than the level it exists on
}
// a2();

/**************************
* SECTION B: SECOND LEVEL
***************************/

/** b1 - no aliases **/
function b1() {
    const { parent: { name }, body } = comment;
    console.log(name);                  // issue1
    console.log(body);                  // hello!
    // console.log(parent);             // (ReferenceError: parent is not defined)
}
// b1();

/** b2 - with alias for parent issue's name, and comment body **/
function b2() {
     const { parent: { name: issueName }, body: commentBody } = comment;
     console.log(issueName);             // issue1
     console.log(commentBody);           // hello!
     // console.log(parent);             // (ReferenceError: parent is not defined)
}
// b2();

/** b3 - alias on issue's name, bring parent into scope by referencing it separately **/
function b3() {
    const { parent, parent: { name: issueName } } = comment;
    console.log(issueName);              // issue1
    console.log(parent);                 // { id: '0001', name: 'issue1', author: { id: '01', name: 'user1' } }
}
// b3();

/** b3 - alias on issue's name, and on separate reference to parent object **/
function b4() {
    const { parent: theParent, parent: { name: issueName } } = comment;
    console.log(issueName);              // issue1
    console.log(theParent);              // { id: '0001', name: 'issue1', author: { id: '01', name: 'user1' } }
}
// b4();

/**************************
* SECTION C: THIRD LEVEL
***************************/

/** c1 - no aliases **/
function c1() {
    const { parent: { author: { name } }, body } = comment;
    console.log(name);                  // user1
    console.log(body);                  // hello
    // console.log(parent);             // (ReferenceError: parent is not defined)
}
// c1();

/** c2 - with alias for parent issue's author's name **/
function c2() {
    const { parent: { author: { name: authorName } }, body } = comment;
    console.log(authorName);            // user1
    console.log(body);                  // hello!
    // console.log(parent);             // (ReferenceError: parent is not defined)
}
// c2();

/** c3 - alias everything **/
function c3() {
    const { parent: { author: { name: authorName, id: authorID } }, body: commentBody } = comment;
    console.log(authorID);              // 01
    console.log(authorName);            // user1
    console.log(commentBody);           // hello!
    // console.log(parent);             // (ReferenceError: parent is not defined)
}
// c3();

/** c4 - oh no **/
function c4() {
    const { parent: theParent, parent: { name: issueName, id: issueID, author: issueAuthor, author: { name: authorName, id: authorID } }, body: commentBody } = comment;
    console.log(theParent);             // { id: '0001', name: 'issue1', author: { id: '01', name: 'user1' } }
    console.log(issueName);             // issue1
    console.log(issueID);               // 0001
    console.log(issueAuthor);           // { id: '01', name: 'user1' }
    console.log(authorName);            // user1
    console.log(authorID);              // 01
    console.log(commentBody);           // hello!
}
// c4();
```
