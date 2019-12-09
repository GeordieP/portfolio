import React from "react";

import shoppingImg from "../img/shopping-mocks.png";
import trackerImg from "../img/issue-tracker.png";
import twitchiImg from "../img/twitchi-home.png";

import twitchiIcon from "../img/twitchi-icon.png";
import tntpIcon from "../img/tntp-icon.png";
import gdiscordbotIcon from "../img/gdiscordbot-icon.png";
import dsasIcon from "../img/dsas-icon.png";

// Create a component with bound className of given element type.
// Allows us to create nice alias components that have a consistent className.
const ChildrenComponent = (element, className) => ({ children, ...props }) =>
  React.createElement(element, { className, ...props }, children);

// leave className attributes out of page code for easier maintenance
const Project = ChildrenComponent("div", "Project");
const ProjectHeader = ChildrenComponent("div", "Project-header");
const ProjectLinks = ChildrenComponent("ul", "ProjectLinks u-flexH");

export default () => (
  <>
    <h1 className="PageHeader">Projects</h1>

    <Project>
      <ProjectHeader>
        <h1>Shopping App Prototype</h1>
      </ProjectHeader>

      <h4>React (16.7.x alpha; hooray for hooks!)</h4>

      <ProjectLinks>
        <li>
          <a
            href="https://github.com/GeordieP/shopping-proto"
            target="GeordieP_GitHub"
          >
            GitHub Page
          </a>
        </li>
      </ProjectLinks>

      <p>Work-in-progress prototype for a shopping list management app.</p>

      <p>
        The plan is to eventually build this app in React Native and publish it
        for iOS and Android, but the current iteration is a standard React
        web-app in order to work through the whole idea and figure out any
        issues ahead of time.
      </p>

      <p>
        Below are a few screenshots from the initial design mockup (designed
        with <a href="https://framer.com/">Framer X</a>).
      </p>

      <a
        href={shoppingImg}
        className="u-flexH u-centerMain"
        target="GeordieP_Image"
      >
        <img
          src={shoppingImg}
          className="PreviewImage noShadow"
          alt="Design mockups for shopping list app"
        />
      </a>
    </Project>

    <Project>
      <ProjectHeader>
        <h1>Issue Tracker</h1>
      </ProjectHeader>

      <h4>React, Koa, Node.js, TypeScript, GraphQL</h4>

      <ProjectLinks>
        <li>
          <a
            href="https://github.com/GeordieP/issue-tracker"
            target="GeordieP_GitHub"
          >
            GitHub Page
          </a>
        </li>
      </ProjectLinks>

      <p>
        A work-in-progress prototype of an issue tracking app, built with React.
      </p>
      <a
        href={trackerImg}
        className="u-flexH u-centerMain"
        target="GeordieP_Image"
      >
        <img
          src={trackerImg}
          className="PreviewImage"
          alt="Preview of issue tracker"
        />
      </a>
    </Project>

    <Project>
      <ProjectHeader>
        <h1 className="u-noMargin">
          <img src={twitchiIcon} alt="Twitchi logo" />
          Twitchi
        </h1>
      </ProjectHeader>

      <h4>Hyperapp, Electron, Stylus</h4>

      <ProjectLinks>
        <li>
          <a href="http://gpow.ca/twitchi">Documentation</a>
        </li>
        <li>
          <a
            href="https://github.com/GeordieP/twitchi"
            target="GeordieP_GitHub"
          >
            GitHub Page
          </a>
        </li>
      </ProjectLinks>

      <p>
        A Twitch follow list viewer integrated with Streamlink. View your follow
        list, and click a stream to open it using Streamlink or a Twitch pop-out
        player.
      </p>
      <a
        href={twitchiImg}
        className="u-flexH u-centerMain"
        target="GeordieP_Image"
      >
        <img
          src={twitchiImg}
          className="PreviewImage"
          alt="Twitchi interface"
        />
      </a>
    </Project>

    <Project>
      <ProjectHeader>
        <h1 className="u-noMargin">
          <img src={gdiscordbotIcon} alt="gDiscordBot icon" />
          gDiscordBot
        </h1>
      </ProjectHeader>

      <h4>Node.js, Discordie</h4>

      <ProjectLinks>
        <li>
          <a href="https://github.com/gDiscordBot" target="GeordieP_GitHub">
            GitHub Page
          </a>
        </li>
      </ProjectLinks>

      <p>
        A plugin-driven Discord bot platform based on the{" "}
        <a
          href="https://qeled.github.io/discordie"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discordie
        </a>{" "}
        node.js library.
      </p>
    </Project>

    <Project>
      <ProjectHeader>
        <h1 className="u-noMargin">
          <img src={dsasIcon} alt="DSAS icon" />
          Deep Space All-Stars
        </h1>
      </ProjectHeader>

      <h4>Unity, C#</h4>

      <ProjectLinks>
        <li>
          <a href="https://github.com/GeordieP/DSAS" target="GeordieP_GitHub">
            GitHub Page
          </a>
        </li>
      </ProjectLinks>

      <p>
        Unity-based shoot-em-up style game (think Space Invaders) for mobile
        devices.
      </p>
    </Project>

    <Project>
      <ProjectHeader>
        <h1 className="u-noMargin">
          <img src={tntpIcon} alt="tntp logo icon" />
          tntp
        </h1>
      </ProjectHeader>

      <h4>JavaScript, Hyperapp v1</h4>

      <ProjectLinks>
        <li>
          <a href="https://github.com/GeordieP/tntp" target="GeordieP_GitHub">
            GitHub Page
          </a>
        </li>
      </ProjectLinks>

      <p>Customizable bare-bones new tab page WebExtension.</p>
    </Project>

    <Project>
      <ProjectHeader>
        <h1 className="u-noMargin">Result</h1>
      </ProjectHeader>

      <h4>JavaScript</h4>

      <ProjectLinks>
        <li>
          <a href="https://github.com/GeordieP/result" target="GeordieP_GitHub">
            GitHub Page
          </a>
        </li>
      </ProjectLinks>

      <p>
        A node.js module for tracking operation status and value in JavaScript.
      </p>
    </Project>

    <Project>
      <ProjectHeader>
        <h1 className="u-noMargin">Hyperapp Top-Level Router</h1>
      </ProjectHeader>

      <h4>JavaScript</h4>

      <ProjectLinks>
        <li>
          <a
            href="https://github.com/GeordieP/h_tlrouter"
            target="GeordieP_GitHub"
          >
            GitHub Page
          </a>
        </li>
      </ProjectLinks>

      <p>
        A Higher-order app providing minimal top-level routing for the Hyperapp
        framework.
      </p>
    </Project>
  </>
);
