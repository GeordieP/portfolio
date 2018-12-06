import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as GPLogoSolid } from '../svg/gp-infinity.svg';
import { ReactComponent as Wave } from '../svg/wave.svg';
import { ChevronDown } from 'react-feather';
import AnchorLink from 'react-anchor-link-smooth-scroll'

// styles
import '../css/landingPage.css';

// components
import ParticleCanvas from '../pages/ParticleCanvas';
import Projects from '../pages/projects';

// Landing page layout: Used for the landing page (/) only.
// Displays a large header area with the nav bar, a canvas, logo and title,
// and some fancy graphics. Page content (Projects list) lives below the header.

export default () => (
  <div className='Layout Layout--landing'>
    <header className='IntroHeader'>
      <ParticleCanvas />

      <div className='IntroHeader-content'>
        <div className='IntroHeader-inner'>
          <GPLogoSolid className='IntroLogo' />

          <div className='IntroHeader-title'>
            <h1 className='u-noMargin'>Geordie Powers</h1>
            <h2 className='u-noMargin'>Fullstack Developer</h2>
          </div>
        </div>

        <AnchorLink href='#nav' className='IntroHeader-downArrow'>
          <ChevronDown className='downArrow' />
        </AnchorLink>
      </div>

      <nav id='nav' className='LandingNav u-flexH u-centerMain u-fullWidth'>
        <Link to='/projects'>Projects</Link>
        <Link to='/blog'>Blog</Link>
        <Link to='/contact'>Contact</Link>
      </nav>

      <div className='WaveWrap'>
        <Wave className='Wave' preserveAspectRatio="none" />
      </div>
    </header>

    <div id='main' className='LandingContent u-flexH u-centerMain'>
      <main>
        <Projects />
      </main>
    </div>
  </div>
);
