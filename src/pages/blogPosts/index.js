import loadable from "loadable-components";

// For now, no fancy CMS-like features. Maybe later when I've written more posts.
// Manually export the post data, along with async components for their full pages.
export default {
  SwiftShop1: {
    title: "Building Swift Shop - Week 1 (Nov 16 - 23, 2019)",
    summary: "Week 1 - Starting out, filtering lists",
    date: "Nov 24 2018",
    component: loadable(() =>
      import("!babel-loader!mdx-loader!./SwiftShopWk1.md")
    )
  },
  Destructuring: {
    title: "JS Object Destructuring Assignment",
    summary:
      "Helpful rules and examples for JS object destructuring assignment and aliasing.",
    date: "Aug 04 2018",
    component: loadable(() =>
      import("!babel-loader!mdx-loader!./Destructuring.md")
    )
  },

  TestingHyperapp: {
    title: "Testing Components - Hyperapp ElFinder",
    summary: "A more convenient way to test Hyperapp components.",
    date: "Apr 08 2018",
    component: loadable(() =>
      import("!babel-loader!mdx-loader!./TestingHyperapp.md")
    )
  }
};
