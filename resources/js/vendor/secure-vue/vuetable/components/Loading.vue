<template>
  <div
    ref="container"
    class="loading-container container-vue-loading-background row loading-wrap"
    :style="{ marginTop: marginTop}"
  >
    <div
      class="loading"
      :style="{ marginTop: scrollTop }"
    >
      <div
        v-for="index in barCount"
        class="bar"
        :style="'animation-delay: '+(index / 10)+'s !important; animation-duration: '+(barCount / (barCount/2))+'s !important;'"
      />
    </div>
    <div class="text-center sp_loading_text">
      {{ loadingMsg }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    barCount: {
      type: Number,
      default: 10,
    },
    loadingText: {
      type: String,
      default: null,
    },
    marginTop: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    loadingMsg() {
      return this.loadingText || this.$t('common.loading');
    },
    scrollTop() {
      const el = this.$parent.$el;
      const max = el && el.offsetHeight - 100 || 0;
      const scroll = document.querySelector('main').scrollTop;
      const result = Math.min(max, scroll);
      return `${result}px`;
    },
  },
};
</script>

<style scoped>

.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,.5);
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 99999;
}
.loading-wrap {
}

.loading {
  width: max-content;
  height: 80px;
  display: flex;
  align-items: center;
}
.bar {
  width: 6px;
  height: 30px;
  margin: 0 2px;
  border-radius: 10px;
  background: white;
  display: inline-block;
  transform-origin: bottom center;
  transform: scaleY(0.1);
}
</style>

<style>
.container-vue-loading-background {
  animation: loading-background 1.6s ease-in-out infinite;
}
.container-vue-loading-background .loading > .bar {
  animation: loading 1.6s ease-in-out infinite;
}
@keyframes loading {
  0% {
    transform: scaleY(0.1);
    background: #fff;
  }
  50% {
    transform: scaleY(1);
    background: #E74C3C;
  }
  100% {
    transform: scaleY(0.1);
    background: transparent;
  }
}
@keyframes loading-background {
  0% {
    background-color: rgba(255,255,255,.5);
  }
  50% {
    background-color: rgba(255,255,255,.8);
  }
  100% {
    background-color: rgba(255,255,255,.5);
  }
}
</style>
