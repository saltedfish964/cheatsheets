import '../../components/v-icon/iconfont.css';
import VIcon from '../../components/v-icon/icon.vue';

import VTabs from '../../components/v-tabs/tabs.vue';
import VTabPane from '../../components/v-tabs/tab-pane.vue';

import VTime from '../../components/v-time/time.vue';

import VAnimatedNumber from '../../components/v-animated-number/index.vue';

import VColor from '../../components/v-color/index.vue';

import VDarkModeButton from '../../components/v-dark-mode-button/index.vue';

export default ({
  Vue,
  isServer,
}) => {
  Vue.component('v-icon', VIcon);
  Vue.component('v-tabs', VTabs);
  Vue.component('v-tab-pane', VTabPane);
  Vue.component('v-time', VTime);
  Vue.component('v-animated-number', VAnimatedNumber);
  Vue.component('v-color', VColor);
  Vue.component('v-dark-mode-button', VDarkModeButton);

  // 解决打包时不能使用浏览器内置对象问题
  if (!isServer) {
    import('../../components/v-scroll/main').then((m) => {
      Vue.component('v-scroll', m.default);
    });
  }
}