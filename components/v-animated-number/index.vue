<template>
  <span>{{ tweeningValue }}</span>
</template>

<script>
import TWEEN from './tween.amd';

export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    toFixed: {
      type: Number,
      default: 0,
    },
    continued: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      tweeningValue: 0,
    };
  },
  watch: {
    value(newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted() {
    this.tween(0, this.value);
  },
  methods: {
    tween(startValue, endValue) {
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      const obj = { tweeningValue: startValue };
      new TWEEN.Tween(obj)
        .to({ tweeningValue: endValue }, this.continued)
        .onUpdate(() => {
          this.tweeningValue = obj.tweeningValue.toFixed(this.toFixed);
        })
        .start();

      animate();
    },
  },
};
</script>
