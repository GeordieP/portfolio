import React from 'react';
import { Link } from 'react-router-dom';

import twitchiImg from '../../img/twitchi-home.png';

export default () => (
  <div className='post'>
    <h1>Twitchi</h1>

    <br />
    <ul className='links'>
      <li><a href="http://gpow.ca/twitchi">Documentation</a></li>
      <li><a href='https://github.com/GeordieP/twitchi' target='GitHubGeordieP'>GitHub Page</a></li>
    </ul>

    <p>The Twitchi project was officially born back in 2013, as my first dive into learning Python and Qt. Back then, it was simply a notifier; every few minutes, it would check if anyone on your list was streaming and send a popup if it found anyone. It ended up being a great learning experience, but the code was a mess and I wanted to widen the scope. Later that year, I started working on a C# version. This one was faster, cleaner, and had more features, but the standard WinForms interface left something to be desired. This led to the second rework, this time using Flash (ActionScript 3), and distributed as an Adobe AIR app.</p>

    <p>The AIR version was certainly the best looking, and most feature complete. It was the first version to integrate Streamlink (then known as Livestreamer), and rather than relying on a user-provided list of channels to check the status of, it prompted users for a login and used the Twitch API to read their following list. Unfortunately, several Twitch APIs were changed, and Twitchi V3 was no longer usable without another rework.</p>

    <p>In the following years, I worked on several versions of the app using Electron, Node.js, and whichever front-end framework I had an urge to learn at the time. These included React, Vue, Marko, and Ember, among others (including a version in vanilla JS). None of these ended up complete enough to release, but in March of 2018 I decided to finally build a version I could feel confident enough about to distribute and support. This ended up as the current version, and is built with Hyperapp (v1), which is a very small React-like framework with a state management system similar to Redux.</p>

    <p>I imagine this verison won't be the last re-write; I use the app daily, and it's a lot of fun to build over and over again. I see it as my own version of the <a href='http://todomvc.com/' target='_blank' rel='noopener noreferrer'>TodoMVC</a> concept, acting as a great way to experiment with new technologies.</p>

    <img src={twitchiImg} width='100%' alt='Twitchi interface'/>

    <br />
    <Link to='/'>Back Home</Link>
  </div>
);
