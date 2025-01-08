<template>
  <div class="tabs">
    <nav>
      <ul>
        <template v-for="(tab, index) in tabs"
                  :key="index">
          <li v-if="!tab.props.ignored"
              @click="selectTab(index)"
              :data-placement="tab.props.tooltip ? 'top' : null"
              :data-toggle="tab.props.tooltip ? 'tooltip' : null"
              :title="getTooltip(tab)"
          >
            <a :class="{ active: index === selectedIndex, disabled: tab.props && tab.props.disabled, 'tab-has-error': tab.props.error }">
              <i v-if="tab.props && tab.props.icon" :class="['fal', tab.props.icon]"></i>
              {{ tab.props.title || 'Tab' }}&nbsp;
              <span v-if="tab.props.error" class="label float-xs-right bg-red">
                            <i class="fal fa-exclamation"></i>
                        </span>
              <template v-for="(condition, color) in tab.props.notice">
                            <span v-if="condition" class="label float-xs-right" :class="[`bg-${color}`]">
                                <i class="fal fa-exclamation"></i>
                            </span>
              </template>
            </a>
          </li>
        </template>
      </ul>
    </nav>
    <div class="box-content-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, provide, onMounted, onBeforeMount, onBeforeUnmount, toRefs, watch } from "vue";

export default defineComponent({
  name: "Tabs",
  setup(_, {slots}) {
    const state = reactive({
      selectedIndex: 0,
      tabs: [],
      count: 0
    });

    provide("TabsProvider", state)

    const selectTab = (i) => {
      if (!(state.tabs[i].props && state.tabs[i].props.disabled)) {
        state.selectedIndex = i;
      }
    };

    const updateTabsInState = () => {
      if (slots.default) {
        state.tabs = slots.default().filter((child) => child.type.name === "TabPanel" && child.props.skip !== true);
      }
    };

    const getTooltip = (tab) => {
      return tab.props.tooltip || null;
    };

    watch(
      () => state.count,
      () => {
        updateTabsInState();
      }
    );

    onBeforeMount(() => {
      updateTabsInState();
    });

    onMounted(() => {
      const anchor = window.location.hash.substr(1);
      let selectIndex = 0;
      if (anchor) {
        selectIndex = state.tabs.findIndex((tab) => tab.props.anchor && tab.props.anchor === anchor);
      }

      selectTab(selectIndex);
    });

    onBeforeUnmount(() => {
      state.tabs.count--;
    });

    return { ...toRefs(state), selectTab, getTooltip };
  }
});
</script>

<style scoped>
</style>