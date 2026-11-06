<script setup>
// 懒加载的图标：在视口附近才计算路径并画出来。离开视口后保留上次的结果；
// 切换圆角、字重时只有视口附近的图标跟着重算，屏幕外的等滚回来再算；实心变体分帧算，不卡页面
import { onMounted, onUnmounted, ref, shallowRef, watchEffect } from 'vue'
import IconSvg from './IconSvg.vue'
import { hasFill, pathsOf } from './render'
import { forget, observeVisibility, schedule } from './site/preview'

const props = defineProps({
  icon: { type: Object, required: true },
  corner: { type: Object, required: true },
  weight: { type: Object, required: true },
  // 显示大小（设备像素），用于像素对齐；0 表示不对齐
  px: { type: Number, default: 0 },
  // 'outline' | 'fill'（见 render.js 的 VARIANTS）
  variant: { type: String, default: 'outline' },
})

const el = ref(null)
const visible = ref(false)
const paths = shallowRef(null)
onMounted(() => observeVisibility(el.value, v => (visible.value = v)))
onUnmounted(() => el.value && forget(el.value))
// 实心变体要现算、比较慢：排进分帧队列（见 site/preview.js 的 schedule），算好之前格子里留着上一次的图形
watchEffect((onCleanup) => {
  if (!visible.value)
    return
  const { icon, corner, weight, px, variant } = props
  const compute = () => {
    paths.value = pathsOf(icon, corner, weight, px, variant)
  }
  if (variant === 'fill' && hasFill(icon))
    onCleanup(schedule(compute))
  else
    compute()
})
</script>

<template>
  <span ref="el" class="lazy-icon">
    <IconSvg v-if="paths" :paths="paths" :stroke="weight.stroke" :sharp="!!corner.sharp" snap />
  </span>
</template>

<style>
.lazy-icon { display: grid; place-items: center; width: var(--size); height: var(--size); }
.lazy-icon svg { width: 100%; height: 100%; }
</style>
