import React from 'react';
import { Link, Route } from 'react-router-dom';
import loadable from 'loadable-components';

// svg
import { ReactComponent as GPLogoGradient } from '../svg/gp-infinity-gradient.svg';

// components
const Projects = loadable(() => import('../pages/projects'));
const Blog = loadable(() => import('../pages/blog'));
const Contact = loadable(() => import('../pages/contact'));

// Standard page layout: The layout used for most pages.
// Logo and navbar in a row at the top of the page, all page content beneath.

export default () => (
  <div className='Layout Layout--standard'>
    <nav className='u-flexH u-spaceBetween u-centerMain'>
      <div>
        <Link to='/'>
          <GPLogoGradient className='LogoSvg' />
        </Link>
      </div>

      <div>
        <Link to='/projects'>Projects</Link>
        <Link to='/blog'>Blog</Link>
        <Link to='/contact'>Contact</Link>
      </div>
    </nav>

    <main>
      <Route path='/projects' component={Projects} />
      <Route path='/blog' component={Blog} />
      <Route path='/contact' component={Contact} />
    </main>
  </div>
);
