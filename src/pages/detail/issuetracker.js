import React from 'react';
import { Link } from 'react-router-dom';

import trackerImg from '../../img/issue-tracker.png';

export default () => (
  <div className='post'>
    <h1>Issue Tracker</h1>

    <ul className='links'>
      <li><a href='https://github.com/GeordieP/issue-tracker' target='GitHubGeordieP'>GitHub Page</a></li>
    </ul>

    <br />

    <img src={trackerImg} width='100%' alt='Twitchi interface'/>

    <p>Inspired by Jira, GitHub Issues, Redmine, Mantis, and similar applications, this project is an experiment into creating my own alternative. The goal is to produce something that I'll be comfortable using as a replacement for these tools in my own projects, and achieve a quick workflow with minimal fluff on top.</p>

    <p>Currently it's still very much an experiment, and the workflow hasn't been fully realized yet. The focus so far has mostly been on learning the new (to me) technologies involved, and building up an idea of the direction the project should go in.</p>

    <p>The stack incorporates TypeScript, GraphQL (Apollo Client), and Koa, none of which I've used in a project before, and it's been a great learning experience!</p>


    <h3>Tech</h3>
    <h4>Frontend</h4>
    <ul>
      <li><a href="https://www.typescriptlang.org/" rel="nofollow">TypeScript</a></li>
      <li><a href="https://reactjs.org/" rel="nofollow">React</a></li>
      <li><a href="https://github.com/facebook/create-react-app">create-react-app</a></li>
      <li><a href="https://github.com/timarney/react-app-rewired">react-app-rewired</a></li>
      <li><a href="https://github.com/ReactTraining/react-router">react-router</a></li>
      <li><a href="https://www.apollographql.com/" rel="nofollow">Apollo GraphQL Client</a></li>
      <li><a href="https://www.apollographql.com/" rel="nofollow">apollo-link-state</a></li>
      <li><a href="https://github.com/postcss/postcss">PostCSS</a></li>
      <li><a href="https://github.com/kentcdodds/react-testing-library">react-testing-library</a></li>
    </ul>

    <h4>Backend</h4>
    <ul>
      <li><a href="https://www.typescriptlang.org/" rel="nofollow">TypeScript</a></li>
      <li><a href="https://koajs.com/" rel="nofollow">Koa</a></li>
      <li><a href="http://www.passportjs.org/" rel="nofollow">Passport.js</a></li>
      <li><a href="https://graphql.org/" rel="nofollow">GraphQL</a></li>
      <li><a href="https://redis.io/" rel="nofollow">Redis</a></li>
      <li><a href="https://www.mongodb.com/" rel="nofollow">MongoDB</a></li>
      <li><a href="https://www.npmjs.com/package/bcryptjs" rel="nofollow">bcryptjs</a></li>
      <li><a href="https://parceljs.org/" rel="nofollow">Parcel</a></li>
    </ul>

    <h4>Testing &amp; Other Tools</h4>
    <ul>
      <li><a href="https://jestjs.io/" rel="nofollow">Jest</a> (Unit tests)</li>
      <li><a href="https://www.cypress.io/" rel="nofollow">Cypress</a> (Integration &amp; E2E Tests)</li>
      <li><a href="https://github.com/rse/stmux">stmux</a> (Display the output from several node commands in one window)</li>
    </ul>

    <br />
    <Link to='/'>Back Home</Link>
  </div>
);
