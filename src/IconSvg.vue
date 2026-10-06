<script setup>
// 单个图标的 SVG：路径已经 finalize 过，属性规则见 render.js 的 pathAttrs
// 抽成组件后，props 不变时 Vue 直接跳过重绘——页面上上千个图标，点选、提示等无关更新不会全部重算
import { pathAttrs } from './render'

defineProps({
  paths: { type: Array, required: true },
  stroke: { type: Number, required: true },
  sharp: { type: Boolean, default: false },
})
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    :stroke-linecap="sharp ? 'butt' : 'round'"
    :stroke-linejoin="sharp ? 'miter' : 'round'"
  >
    <path v-for="p in paths" :key="p.d" v-bind="pathAttrs(p, sharp)" />
  </svg>
</template>
