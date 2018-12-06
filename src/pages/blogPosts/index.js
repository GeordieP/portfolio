import loadable from 'loadable-components';

// For now, no fancy CMS-like features. Maybe later when I've written more posts.
// Manually export the post data, along with async components for their full pages.
export default {
  'Destructuring': {
    title: 'JS Object Destructuring Assignment',
    summary: 'Helpful rules and examples for JS object destructuring assignment and aliasing.',
    date: '08/04/2018',
    component: loadable(() => import('!babel-loader!mdx-loader!./Destructuring.md'))
  },

  'TestingHyperapp': {
    title: 'Testing Components - Hyperapp ElFinder',
    summary: 'A more convenient way to test Hyperapp components.',
    date: '04/08/2018',
    component: loadable(() => import('!babel-loader!mdx-loader!./TestingHyperapp.md'))
  }
};
