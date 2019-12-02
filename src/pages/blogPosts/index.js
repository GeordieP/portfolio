import loadable from "loadable-components";

const postWithTitle = title =>
  loadable(() => import(`!babel-loader!mdx-loader!./${title}.md`));

// For now, no fancy CMS-like features. Maybe later when I've written more posts.
// Manually export the post data, along with async components for their full pages.
export default {
  SwiftShop2: {
    title: "Building Swift Shop - Week 2 (Nov 23 - 30, 2019)",
    summary: "Week 2 - Lists state & Products search bar",
    date: "Dec 1 2019",
    component: postWithTitle("SwiftShopWk2")
  },
  SwiftShop1: {
    title: "Building Swift Shop - Week 1 (Nov 16 - 23, 2019)",
    summary: "Week 1 - Starting out, filtering lists",
    date: "Nov 24 2019",
    component: postWithTitle("SwiftShopWk1")
  },
  Destructuring: {
    title: "JS Object Destructuring Assignment",
    summary:
      "Helpful rules and examples for JS object destructuring assignment and aliasing.",
    date: "Aug 04 2018",
    component: postWithTitle("Destructuring")
  },

  TestingHyperapp: {
    title: "Testing Components - Hyperapp ElFinder",
    summary: "A more convenient way to test Hyperapp components.",
    date: "Apr 08 2018",
    component: postWithTitle("TestingHyperapp")
  }
};
