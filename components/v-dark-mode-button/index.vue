<template>
  <div
    class="size-box"
    :style="{
      width: `${64 * size}px`,
      height: `${64 * size}px`,
    }"
  >
    <div
      class="box"
      :style="{
        transform: `scale(${size})`,
      }"
    >
      <label class="label">
        <input
          class="checkbox"
          type="checkbox"
          checked
        >
        <div class="planet">
        </div>
        <div class="elements">
          <svg
            version="1.1"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="250"
              cy="250"
              r="200"
            />
          </svg>
          <svg
            version="1.1"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="250"
              cy="250"
              r="200"
            />
          </svg>
          <svg
            version="1.1"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="250"
              cy="250"
              r="200"
            />
          </svg>
          <svg
            version="1.1"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="250"
              cy="250"
              r="200"
            />
          </svg>
          <svg
            version="1.1"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="250"
              cy="250"
              r="200"
            />
          </svg>
          <svg
            version="1.1"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="250"
              cy="250"
              r="200"
            />
          </svg>
          <svg
            version="1.1"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="250"
              cy="250"
              r="200"
            />
          </svg>
          <svg
            version="1.1"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="250"
              cy="250"
              r="200"
            />
          </svg>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VDarkModeButton',
  props: {
    size: {
      type: [String, Number],
      default: 1,
    }
  },
}
</script>

<style scoped>
.size-box {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  display: flex;
}
.label {
  --bg-planet-bright: #f2c94c;
  --bg-planet-shadow: #828894;
  --bg-planet-lightshadow: #d7d7d820;
  --dot-size: 0.25rem;

  cursor: pointer;
  padding: 1rem;
  position: relative;
  /* To make outline on mobile invisible */
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  box-sizing: border-box;
}
.checkbox {
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
}
.planet {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  background: radial-gradient(3.75em, 99%, transparent 100%);
  background-color: var(--bg-planet-bright);
  background-repeat: no-repeat;
  position: relative;
  will-change: background;
  transition: all 400ms ease;
  /* Safari transition issue */
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
}
.planet::after {
  content: "";
  background-color: var(--bg-planet-shadow);
  width: 2rem;
  height: 2rem;
  position: absolute;
  border-radius: 50%;
  will-change: opacity, transform, background-color;
  opacity: 0;
  transform: translate(2em, -2em);
  transition: opacity 400ms ease, transform 400ms ease,
    background-color 400ms ease;
}
.elements {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 400ms ease;
}
.elements svg {
  position: absolute;
  width: 7px;
  height: 7px;
  opacity: 1;
  transition: transform 400ms ease, opacity 200ms ease, width 200ms ease,
    height 200ms ease;
}
.elements svg circle {
  fill: var(--bg-planet-bright);
  transition: fill 400ms ease;
}
.elements svg:first-child {
  transform: translate(1.8em, 0.35em);
}
.elements svg:nth-child(2) {
  transform: translate(2.8em, 0.7em);
}
.elements svg:nth-child(3) {
  transform: translate(3.2em, 1.8em);
}
.elements svg:nth-child(4) {
  transform: translate(2.8em, 2.8em);
}
.elements svg:nth-child(5) {
  transform: translate(1.8em, 3.2em);
}
.elements svg:nth-child(6) {
  transform: translate(0.7em, 2.8em);
}
.elements svg:nth-child(7) {
  transform: translate(0.35em, 1.8em);
}
.elements svg:nth-child(8) {
  transform: translate(0.7em, 0.7em);
}
.checkbox:checked + .planet {
  --bg-planet-bright: #d7d7d8;
}
.checkbox:checked + .planet::after {
  opacity: 1;
  transform: translate(0.6em, -0.5em);
}
.checkbox:checked ~ .elements {
  transform: rotate(180deg);
}
.checkbox:checked ~ .elements svg:first-child {
  transform: translate(2em, 1em);
  opacity: 0;
}
.checkbox:checked ~ .elements svg:nth-child(2) {
  transform: translate(3em, 1.5em);
  opacity: 0;
}
.checkbox:checked ~ .elements svg:nth-child(3) {
  transform: translate(3em, 2em);
  opacity: 0;
}
.checkbox:checked ~ .elements svg:nth-child(4) {
  transform: translate(3em, 2em);
  opacity: 0;
}
.checkbox:checked ~ .elements svg:nth-child(5) {
  transform: translate(1.9em, 2.6em);
  width: 0.3em;
  height: 0.3em;
}
.checkbox:checked ~ .elements svg:nth-child(5) circle {
  fill: var(--bg-planet-lightshadow);
}
.checkbox:checked ~ .elements svg:nth-child(6) {
  transform: translate(1.4em, 2.5em);
  width: 0.3em;
  height: 0.3em;
}
.checkbox:checked ~ .elements svg:nth-child(6) circle {
  fill: var(--bg-planet-lightshadow);
}
.checkbox:checked ~ .elements svg:nth-child(7) {
  transform: translate(1.1em, 1.6em);
  width: 0.7em;
  height: 0.7em;
}
.checkbox:checked ~ .elements svg:nth-child(7) circle {
  fill: var(--bg-planet-lightshadow);
}
.checkbox:checked ~ .elements svg:nth-child(8) {
  width: 0.45em;
  height: 0.45em;
  transform: translate(1.7em, 2.1em);
}
.checkbox:checked ~ .elements svg:nth-child(8) circle {
  fill: var(--bg-planet-lightshadow);
}
</style>
