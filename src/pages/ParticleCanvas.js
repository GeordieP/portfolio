import React from 'react';

export default class ParticleCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasEl = React.createRef();
  }

  componentDidMount() {
    DrawCanvas(this.canvasEl.current);
  }

  render() {
    return <canvas
      ref={this.canvasEl}
      id='particleCanvas'
      width='100%'
      height='100%'
    >
    <span />
    </canvas>
  }
}

/* ------------------------------------- */
/* ------- CANVAS IMPLEMENTATION ------- */
/* ------------------------------------- */

// TODO: canvas should be resized along with window size
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

// helpers
const randBetween = (low, hi) => Math.random() * (hi - low) + low;

// constants
const PARTICLE_COUNT = 20;
const G = 1;
const RAD_DEC = 0.015;
const OPC_DEC = 0.0015;
const SPEED = 0.18;

class Particle {
  constructor() {
    this.renew();
    // first spawn should be a bit further off screen to help reduce clumping
    this.y = CANVAS_HEIGHT + (this.radius * 8);
  }

  renew() {
    this.radius = randBetween(3, 10);
    this.mass = this.radius / 2;
    this.opacity = 0.6;

    this.x = Math.floor(randBetween(0, CANVAS_WIDTH));
    this.y = CANVAS_HEIGHT + this.radius * 2;
    this.velocity = (randBetween(3, 12) - this.radius) * SPEED * G;

    this.radiusDecay = (this.mass * SPEED * G) * RAD_DEC;
    this.opacityDecay = (this.mass * SPEED * G) * OPC_DEC;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.abs(this.radius), 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 255, 255, '+this.opacity+')';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.radius < 0 || this.opacity < 0 || this.y < 0)
      this.renew();

    this.y -= this.velocity;
    this.opacity -= this.opacityDecay;
    this.radius -= this.radiusDecay;
  }
}

function DrawCanvas(canvas) {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext('2d');

  // build initial particles array
  let particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function tick() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(ctx);
    }

    requestAnimationFrame(tick);
  }

  tick();
}
