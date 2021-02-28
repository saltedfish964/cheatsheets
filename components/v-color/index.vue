<template>
  <div
    role="application"
    aria-label="Sketch color picker"
    :class="['v-sketch', disableAlpha ? 'v-sketch__disable-alpha' : '']"
  >
    <div class="v-sketch-saturation-wrap">
      <saturation
        v-model="colors"
        @change="childChange"
      ></saturation>
    </div>
    <div class="v-sketch-controls">
      <div class="v-sketch-sliders">
        <div class="v-sketch-hue-wrap">
          <hue
            v-model="colors"
            @change="childChange"
          ></hue>
        </div>
        <div
          class="v-sketch-alpha-wrap"
          v-if="!disableAlpha"
        >
          <alpha
            v-model="colors"
            @change="childChange"
          ></alpha>
        </div>
      </div>
      <div class="v-sketch-color-wrap">
        <div
          :aria-label="`Current color is ${activeColor}`"
          class="v-sketch-active-color"
          :style="{background: activeColor}"
        ></div>
        <checkboard></checkboard>
      </div>
    </div>
    <div
      class="v-sketch-field"
      v-if="!disableFields"
    >
      <!-- rgba -->
      <div class="v-sketch-field--double">
        <ed-in
          label="hex"
          :value="hex"
          @change="inputChange"
        ></ed-in>
      </div>
      <div class="v-sketch-field--single">
        <ed-in
          label="r"
          :value="colors.rgba.r"
          @change="inputChange"
        ></ed-in>
      </div>
      <div class="v-sketch-field--single">
        <ed-in
          label="g"
          :value="colors.rgba.g"
          @change="inputChange"
        ></ed-in>
      </div>
      <div class="v-sketch-field--single">
        <ed-in
          label="b"
          :value="colors.rgba.b"
          @change="inputChange"
        ></ed-in>
      </div>
      <div
        class="v-sketch-field--single"
        v-if="!disableAlpha"
      >
        <ed-in
          label="a"
          :value="colors.a"
          :arrow-offset="0.01"
          :max="1"
          @change="inputChange"
        ></ed-in>
      </div>
    </div>
    <div
      class="v-sketch-presets"
      role="group"
      aria-label="A color preset, pick one to set as current color"
    >
      <template v-for="c in presetColors">
        <div
          v-if="!isTransparent(c)"
          class="v-sketch-presets-color"
          :aria-label="'Color:' + c"
          :key="c"
          :style="{background: c}"
          @click="handlePreset(c)"
        >
        </div>
        <div
          v-else
          :key="c"
          :aria-label="'Color:' + c"
          class="v-sketch-presets-color"
          @click="handlePreset(c)"
        >
          <checkboard />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import tinycolor from './tinycolor.min';
import editableInput from './EditableInput.vue';
import saturation from './Saturation.vue';
import hue from './Hue.vue';
import alpha from './Alpha.vue';
import checkboard from './Checkboard.vue';

const presetColors = [
  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
  'rgba(0,0,0,0)',
];

export default {
  name: 'Sketch',
  components: {
    saturation,
    hue,
    alpha,
    'ed-in': editableInput,
    checkboard,
  },
  props: {
    value: [String, Object],
    presetColors: {
      type: Array,
      default() {
        return presetColors;
      },
    },
    disableAlpha: {
      type: Boolean,
      default: false,
    },
    disableFields: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: this.selfColorChange(this.value),
    };
  },
  computed: {
    colors: {
      get() {
        return this.val;
      },
      set(newVal) {
        this.val = newVal;
        this.$emit('input', newVal);
      },
    },
    hex() {
      let hex;
      if (this.colors.a < 1) {
        hex = this.colors.hex8;
      } else {
        hex = this.colors.hex;
      }
      return hex.replace('#', '');
    },
    activeColor() {
      const { rgba } = this.colors;
      return `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(',')})`;
    },
  },
  methods: {
    selfColorChange(data, oldHue) {
      const alphaColor = data && data.a;
      let color;

      // hsl is better than hex between conversions
      if (data && data.hsl) {
        color = tinycolor(data.hsl);
      } else if (data && data.hex && data.hex.length > 0) {
        color = tinycolor(data.hex);
      } else if (data && data.hsv) {
        color = tinycolor(data.hsv);
      } else if (data && data.rgba) {
        color = tinycolor(data.rgba);
      } else if (data && data.rgb) {
        color = tinycolor(data.rgb);
      } else {
        color = tinycolor(data);
      }

      if (color && (color.a === undefined || color.a === null)) {
        color.setAlpha(alphaColor || 1);
      }

      const hsl = color.toHsl();
      const hsv = color.toHsv();

      if (hsl.s === 0) {
        const h = data.h || (data.hsl && data.hsl.h) || oldHue || 0;
        hsv.h = h;
        hsl.h = h;
      }

      /* --- comment this block to fix #109, may cause #25 again --- */
      // when the hsv.v is less than 0.0164 (base on test)
      // because of possible loss of precision
      // the result of hue and saturation would be miscalculated
      // if (hsv.v < 0.0164) {
      //   hsv.h = data.h || (data.hsv && data.hsv.h) || 0
      //   hsv.s = data.s || (data.hsv && data.hsv.s) || 0
      // }

      // if (hsl.l < 0.01) {
      //   hsl.h = data.h || (data.hsl && data.hsl.h) || 0
      //   hsl.s = data.s || (data.hsl && data.hsl.s) || 0
      // }
      /* ------ */

      return {
        hsl,
        hex: color.toHexString().toUpperCase(),
        hex8: color.toHex8String().toUpperCase(),
        rgba: color.toRgb(),
        hsv,
        oldHue: data.h || oldHue || hsl.h,
        source: data.source,
        a: data.a || color.getAlpha(),
      };
    },
    colorChange(data, oldHue) {
      this.oldHue = this.colors.hsl.h;
      this.colors = this.selfColorChange(data, oldHue || this.oldHue);
    },
    handlePreset(c) {
      this.colorChange({
        hex: c,
        source: 'hex',
      });
    },
    childChange(data) {
      this.colorChange(data);
    },
    isValidHex(hex) {
      return tinycolor(hex).isValid();
    },
    inputChange(data) {
      if (!data) {
        return;
      }
      if (data.hex) {
        if (this.isValidHex(data.hex)) {
          this.colorChange({
            hex: data.hex,
            source: 'hex',
          });
        }
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba',
        });
      }
    },
    isTransparent(color) {
      return tinycolor(color).getAlpha() === 0;
    },
  },
};
</script>

<style scoped>
.v-sketch {
  position: relative;
  width: 200px;
  padding: 10px 10px 0;
  box-sizing: initial;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.15);
}

.v-sketch-saturation-wrap {
  width: 100%;
  padding-bottom: 75%;
  position: relative;
  overflow: hidden;
}

.v-sketch-controls {
  display: flex;
}

.v-sketch-sliders {
  padding: 4px 0;
  flex: 1;
}

.v-sketch-sliders .v-hue,
.v-sketch-sliders .v-alpha-gradient {
  border-radius: 2px;
}

.v-sketch-hue-wrap {
  position: relative;
  height: 10px;
}

.v-sketch-alpha-wrap {
  position: relative;
  height: 10px;
  margin-top: 4px;
  overflow: hidden;
}

.v-sketch-color-wrap {
  width: 24px;
  height: 24px;
  position: relative;
  margin-top: 4px;
  margin-left: 4px;
  border-radius: 3px;
}

.v-sketch-active-color {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15),
    inset 0 0 4px rgba(0, 0, 0, 0.25);
  z-index: 2;
}

.v-sketch-color-wrap .v-checkerboard {
  background-size: auto;
}

.v-sketch-field {
  display: flex;
  padding-top: 4px;
}

.v-sketch-field .v-input__input {
  width: 90%;
  padding: 4px 0 3px 10%;
  border: none;
  box-shadow: inset 0 0 0 1px #ccc;
  font-size: 10px;
}

.v-sketch-field .v-input__label {
  display: block;
  text-align: center;
  font-size: 11px;
  color: #222;
  padding-top: 3px;
  padding-bottom: 4px;
  text-transform: capitalize;
}

.v-sketch-field--single {
  flex: 1;
  padding-left: 6px;
}

.v-sketch-field--double {
  flex: 2;
}

.v-sketch-presets {
  margin-right: -10px;
  margin-left: -10px;
  padding-left: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.v-sketch-presets-color {
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin: 0 10px 10px 0;
  vertical-align: top;
  cursor: pointer;
  width: 16px;
  height: 16px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
}

.v-sketch-presets-color .v-checkerboard {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.v-sketch__disable-alpha .v-sketch-color-wrap {
  height: 10px;
}
</style>
