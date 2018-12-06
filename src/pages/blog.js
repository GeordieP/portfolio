import React from 'react';
import { Route, Link } from 'react-router-dom';

import posts from './blogPosts';

// Post list - display the list of posts, each linking to its corresponding
// post content route.
const PostList = () => (
  <>
    <h1 className='PageHeader'>Blog</h1>

    {Object.keys(posts).map(key =>
      <PostLink post={posts[key]} id={key} key={key} />
    )}
  </>
);

// Link to a post content route, with summary.
const PostLink = ({ post, id }) => {
  const { title, summary, date } = post;

  return (
    <div className='PostLink'>
        <h4>{date}</h4>
        <h1 className='u-noMargin'>
          <Link to={'/blog/posts/' + id}>
            {title}
          </Link>
        </h1>
      <p className='u-noMargin'>{summary}</p>
    </div>
  );
}

// Post Content - Display the full post.
const PostContent = ({ match }) => {
  const { component: PostComponent } = posts[match.params.id];
  return (<PostComponent />);
}

export default () => (
  <>
    <Route path='/blog' exact component={PostList} />
    <Route path='/blog/posts/:id' component={PostContent} />
  </>
);
