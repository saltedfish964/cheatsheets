<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="demo-content">
      <slot name="demo"></slot>
    </div>
    <div
      class="meta"
      ref="meta"
    >
      <div
        class="description"
        v-if="$slots.description"
      >
        <slot name="description"></slot>
      </div>
      <div class="code-content">
        <slot name="source"></slot>
      </div>
    </div>
    <div
      class="demo-block-control"
      :class="{ 'is-fixed': fixedControl }"
      :style="{ 'width': fixedControl ? `${codeContentWidth}px` : 'unset' }"
      ref="control"
      @click="isExpanded = !isExpanded"
    >
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }, 'icon']"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
      <span
        :class="['copy-action']"
        @click.stop="copyCode"
      >{{ langConfig['copy-text'] }}</span>
    </div>
  </div>
</template>

<script type="text/babel">
import Message from '../message/Message';
import defaultLang from './i18n/default_lang.json';

export default {
  data() {
    return {
      hovering: false,
      isExpanded: false,
      fixedControl: false,
      codeContentWidth: 0,
      scrollParent: null
    };
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    compoLang() {
      return this.options.locales || defaultLang
    },
    langConfig() {
        return this.compoLang.filter(config => config.lang === this.$lang)[0]['demo-block'];
    },
    blockClass() {
      return `demo-${this.$lang} demo-${this.$router.currentRoute.path
        .split("/")
        .pop()}`;
    },
    iconClass() {
      return this.isExpanded ? "caret-top" : "caret-bottom";
    },
    controlText() {
      return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text'];
    },
    codeArea() {
      return this.$el.getElementsByClassName("meta")[0];
    },
    codeAreaHeight() {
      if (this.$el.getElementsByClassName("description").length > 0) {
        return (
          this.$el.getElementsByClassName("description")[0].clientHeight +
          this.$el.getElementsByClassName("code-content")[0].clientHeight +
          20
        );
      }
      return this.$el.getElementsByClassName("code-content")[0].clientHeight;
    }
  },
  methods: {
    copyCode() {
      const pre = this.$el.querySelectorAll("pre")[0];
      const el = document.createElement('textarea')
      el.value = pre.innerText
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      const selected =
        document.getSelection().rangeCount > 0 ?
          document.getSelection().getRangeAt(0) :
          false
      el.select()

      document.execCommand('copy')
      const message = new Message()
      message.show({
        text: this.langConfig['copy-success'],
        duration: 2000,
      })
      document.body.removeChild(el)
      if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
      }
    },
    scrollHandler() {
      const { top, bottom, left } = this.$refs.meta.getBoundingClientRect();
      this.fixedControl =
        bottom > document.documentElement.clientHeight &&
        top + 44 <= document.documentElement.clientHeight;
      this.$refs.control.style.left = this.fixedControl ? `${left}px` : "0";
    },
    removeScrollHandler() {
      this.scrollParent &&
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    }
  },
  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : "0";
      if (!val) {
        this.fixedControl = false;
        this.$refs.control.style.left = "0";
        this.removeScrollHandler();
        return;
      }
      setTimeout(() => {
        this.scrollParent = document;
        this.scrollParent &&
          this.scrollParent.addEventListener('scroll', this.scrollHandler);
        this.scrollHandler();
      }, 200);
    }
  },
  mounted() {
    this.$nextTick(() => {
      let codeContent = this.$el.getElementsByClassName('code-content')[0];
      this.codeContentWidth = this.$el.offsetWidth
      if (this.$el.getElementsByClassName('description').length === 0) {
        codeContent.style.width = "auto";
        codeContent.borderRight = "none";
      }
    });
  },
  beforeDestroy() {
    this.removeScrollHandler();
  }
};
</script>
<style scoped>
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  margin-top: 15px;
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
}
.demo-block.hover {
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
}
.demo-block code {
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
}
.demo-block .demo-button {
  float: right;
}
.demo-block .demo-content {
  padding: 24px;
  overflow-x: auto;
}
.demo-block .meta {
  background-color: #282c34;
  border: solid 1px #ebebeb;
  border-radius: 3px;
  overflow: hidden;
  height: 0;
  transition: height 0.2s;
}
.demo-block .description {
  padding: 20px;
  box-sizing: border-box;
  border: solid 1px #ebebeb;
  border-radius: 3px;
  font-size: 14px;
  line-height: 22px;
  color: #666;
  word-break: break-word;
  margin: 10px;
  background-color: #fafafa;
}
.demo-block .demo-block-control {
  border-top: solid 1px #eaeefb;
  height: 44px;
  box-sizing: border-box;
  background-color: #fafafa;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  margin-top: -2px;
  color: #d3dce6;
  cursor: pointer;
  position: relative;
}
.demo-block .demo-block-control.is-fixed {
  position: fixed;
  bottom: 0;
  width: 660px;
  z-index: 999;
}
.demo-block .demo-block-control .icon {
  font-family: element-icons !important;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
.demo-block .demo-block-control .caret-top::before {
  content: "";
  position: absolute;
  right: 50%;
  width: 0;
  height: 0;
  border-bottom: 6px solid #ccc;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  transform: translateY(50%);
}
.demo-block .demo-block-control .caret-bottom::before {
  content: "";
  position: absolute;
  right: 50%;
  width: 0;
  height: 0;
  border-top: 6px solid #ccc;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  transform: translateY(50%);
}
.demo-block .demo-block-control i {
  font-size: 16px;
  line-height: 44px;
  transition: 0.3s;
}
.demo-block .demo-block-control i.hovering {
  transform: translateX(-40px);
}
.demo-block .demo-block-control > span {
  position: absolute;
  transform: translateX(-30px);
  font-size: 14px;
  line-height: 44px;
  transition: 0.3s;
  display: inline-block;
}
.demo-block .demo-block-control .copy-action {
  right: 0px;
  color: #409eff;
}
/* .demo-block .demo-block-control.copying {
  transform: translateX(-44px);
} */
.demo-block .demo-block-control .copy-action-success {
  color: #67c23a;
}
.demo-block .demo-block-control:hover {
  color: #409eff;
  background-color: #f9fafc;
}
.demo-block .demo-block-control .text-slide-enter,
.demo-block .demo-block-control .text-slide-leave-active {
  opacity: 0;
  transform: translateX(10px);
}
.demo-block .demo-block-control .bounce-enter-active {
  color: #67c23a;
}
.demo-block .demo-block-control .control-button {
  line-height: 26px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  padding-left: 5px;
  padding-right: 25px;
}
@media (max-width: 419px) {
  .code-content {
    margin: 1rem;
  }
  .demo-block div[class*="language-"]::before {
    right: 1.4rem;
  }
}
</style>