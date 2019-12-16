# Building Swift Shop - Week 4 (Dec 8 - 14, 2019)

#### Dec 15, 2019

This week, persistence via GRDB was added, and some basic entity associations were set up to run a simple test view:

<div align="center">
  <video controls alt="Week 4 - Debug View">
    <source src="https://giant.gfycat.com/FloweryWaterloggedAnophelesmosquito.mp4" type="video/mp4" />
  </video>
</div>

The test view consists of:

- A button to populate the database with some placeholder data
  - A list "Main List"
  - A product "first product"
  - A tag "MyTag"
  - Associations between types; the product has 'MyTag' and is in 'Main List'
- A button to add a second placeholder tag to the product
- A button to subscribe to the "ListedItems" publisher

This was mostly to test that the associations between types, and that the list will react to changes in any of the entities being used (ListEntity, ProductEntity, ProductStateEntity, ProductTagEntity)

After the debug view was working, I did a first pass on the products list view, as well as added a slide-up sheet for editing or creating products (doesn't do tags yet).

<div align="center">
  <video controls alt="Week 4 - Products List Page">
    <source src="https://giant.gfycat.com/LightSeriousFattaileddunnart.webm" type="video/mp4" />
  </video>
</div>

The slide-up sheet is a View extension package called PartialSheet, which can be found on GitHub:

[https://github.com/AndreaMiotto/PartialSheet](https://github.com/AndreaMiotto/PartialSheet)
