import DiagramSVG from "./media/SwiftShop_wk3_diagram.svg"

# Building Swift Shop - Week 3 (Dec 1 - 7, 2019)

#### Dec 8, 2019

Another week with little progress (most of it in notebooks & Notion), lots of things going on with work.

Several days ago I tried implementing the SwiftDux state for Lists, and though everything seemed to be right, I ran into a runtime error when performing actions on the list.

Based on this error, and growing feelings that SwiftDux may not be the right choice, I decided to instead re-write the app's "backend" (state and persistence, in this case) using [GRDB](https://github.com/groue/GRDB.swift), a SQLite-backed database library. The accompanying package [GRDBCombine](https://github.com/groue/GRDBCombine) provides a nice way to get SwiftUI view reactivity for little extra effort.

Implementing the state layer of Swift Shop with GRDB first requires the definition of SQL database entities, along with their GRDB [Record](https://github.com/groue/GRDB.swift#records) counterparts. I'm still working through it, but as of right now, things look like this:

<div align="center">
  <a target="GP_IMG" href={DiagramSVG}>
    <img src={DiagramSVG} />
  </a>
</div>

So far the records map directly to the database entities, with GRDB associations to navigate through relationships. The `Request<T>` type shown is actually a `QueryInterfaceRequest<T>` shortened for brevity.

It's relatively simple, but all of the 3 main types (List, Product, Tag) are many-to-many relationships, which is proving to be difficult to express in GRDB as a first-time user of the package - especially handling nested associations e.g. producing a Product structure that contains its complete status for a given list, as well as all of its tags (which may be a bad idea anyways, we'll have to see).

That said, the GRDB docs are great; these pages have been particularly helpful so far:

- [Association Basics](https://github.com/groue/GRDB.swift/blob/master/Documentation/AssociationsBasics.md)
- [Good Practices for Designing Record Types](https://github.com/groue/GRDB.swift/blob/master/Documentation/GoodPracticesForDesigningRecordTypes.md)
- [GRDB Reference](http://groue.github.io/GRDB.swift/docs/4.6/index.html)
