<script setup>
// 单个图标的 SVG：路径已经 finalize 过，属性规则见 render.js 的 svgAttrs、pathAttrs
// 抽成组件后，props 不变时 Vue 直接跳过重绘——页面上上千个图标，点选、提示等无关更新不会全部重算
// snap：路径做过像素对齐时，把图标框本身也挪到整数设备像素上（见 snap.js）
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { animateAttrs, pathAttrs, svgAttrs } from './render'
import { snapToPixels, unsnap } from './snap'

const props = defineProps({
  paths: { type: Array, required: true },
  stroke: { type: Number, required: true },
  sharp: { type: Boolean, default: false },
  snap: { type: Boolean, default: false },
})

const el = ref(null)
onMounted(() => props.snap && snapToPixels(el.value))
onBeforeUnmount(() => props.snap && unsnap(el.value))
</script>

<template>
  <svg ref="el" viewBox="0 0 24 24" v-bind="svgAttrs(stroke, sharp)">
    <path v-for="p in paths" :key="p.d" v-bind="pathAttrs(p)">
      <animate v-if="p.frames" v-bind="animateAttrs(p)" />
    </path>
  </svg>
</template>
