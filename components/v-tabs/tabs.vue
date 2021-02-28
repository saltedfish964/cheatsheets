<script>
/* eslint-disable */
import TabNav from './tab-nav';

export default {
  name: 'VTabs',

  components: {
    TabNav
  },

  props: {
    type: String,
    activeName: String,
    closable: Boolean,
    addable: Boolean,
    value: {},
    editable: Boolean,
    tabPosition: {
      type: String,
      default: 'top'
    },
    beforeLeave: Function,
    stretch: Boolean,
    showContent: {
      type: Boolean,
      default: true,
    },
  },

  provide() {
    return {
      rootTabs: this
    };
  },

  data() {
    return {
      currentName: this.value || this.activeName,
      panes: []
    };
  },

  watch: {
    activeName(value) {
      this.setCurrentName(value);
    },
    value(value) {
      this.setCurrentName(value);
    },
    currentName(value) {
      if (this.$refs.nav) {
        this.$nextTick(() => {
          this.$refs.nav.$nextTick(_ => {
            this.$refs.nav.scrollToActiveTab();
          });
        });
      }
    }
  },

  methods: {
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(vnode => vnode.tag &&
          vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'VTabPane');
        // update indeed
        const panes = paneSlots.map(({ componentInstance }) => componentInstance);
        const panesChanged = !(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]));
        if (isForceUpdate || panesChanged) {
          this.panes = panes;
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
    handleTabClick(tab, tabName, event) {
      if (tab.disabled) return;
      this.setCurrentName(tabName);
      this.$emit('tab-click', tab, event);
    },
    handleTabRemove(pane, ev) {
      if (pane.disabled) return;
      ev.stopPropagation();
      this.$emit('edit', pane.name, 'remove');
      this.$emit('tab-remove', pane.name);
    },
    handleTabAdd() {
      this.$emit('edit', null, 'add');
      this.$emit('tab-add');
    },
    setCurrentName(value) {
      const changeCurrentName = () => {
        this.currentName = value;
        this.$emit('input', value);
      };
      if (this.currentName !== value && this.beforeLeave) {
        const before = this.beforeLeave(value, this.currentName);
        if (before && before.then) {
          before
            .then(() => {
              changeCurrentName();
              this.$refs.nav && this.$refs.nav.removeFocus();
            }, () => {
              // https://github.com/ElemeFE/element/pull/14816
              // ignore promise rejection in `before-leave` hook
            });
        } else if (before !== false) {
          changeCurrentName();
        }
      } else {
        changeCurrentName();
      }
    }
  },

  render(h) {
    let {
      type,
      handleTabClick,
      handleTabRemove,
      handleTabAdd,
      currentName,
      panes,
      editable,
      addable,
      tabPosition,
      stretch,
      showContent
    } = this;

    const newButton = editable || addable
      ? (
        <span
          class="v-tabs__new-tab"
          on-click={ handleTabAdd }
          tabindex="0"
          on-keydown={ (ev) => { if (ev.keyCode === 13) { handleTabAdd(); }} }
        >
          <i class="v-icon-plus"></i>
        </span>
      )
      : null;

    const navData = {
      props: {
        currentName,
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        editable,
        type,
        panes,
        stretch,
        showContent
      },
      ref: 'nav'
    };
    const header = (
      <div class={['v-tabs__header', `is-${tabPosition}`]} style={showContent ? '' : 'margin: 0;'}>
        {newButton}
        <tab-nav { ...navData }></tab-nav>
      </div>
    );
    const panels = showContent ? (
      <div class="v-tabs__content">
        {this.$slots.default}
      </div>
    ) : (
      <div style="display: none;">
        {this.$slots.default}
      </div>
    );

    return (
      <div class={{
        'v-tabs': true,
        'v-tabs--card': type === 'card',
        [`v-tabs--${tabPosition}`]: true,
        'v-tabs--border-card': type === 'border-card',
      }}>
        { tabPosition !== 'bottom' ? [header, panels] : [panels, header] }
      </div>
    );
  },

  created() {
    if (!this.currentName) {
      this.setCurrentName('0');
    }

    this.$on('tab-nav-update', this.calcPaneInstances.bind(null, true));
  },

  mounted() {
    this.calcPaneInstances();
  },

  updated() {
    this.calcPaneInstances();
  }
};
</script>

<style>
@import url("./tabs.css");
@import url("./iconfont.css");
</style>
