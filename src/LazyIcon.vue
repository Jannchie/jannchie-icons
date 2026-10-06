<script setup>
// 懒加载的图标：在视口附近才计算路径并画出来。离开视口后保留上次的结果；
// 切换圆角、字重时只有视口附近的图标跟着重算，屏幕外的等滚回来再算
import { onMounted, onUnmounted, ref, shallowRef, watchEffect } from 'vue'
import IconSvg from './IconSvg.vue'
import { forget, observeVisibility, pathsOf } from './render'

const props = defineProps({
  icon: { type: Object, required: true },
  corner: { type: Object, required: true },
  weight: { type: Object, required: true },
  align: { type: Boolean, default: true },
})

const el = ref(null)
const visible = ref(false)
const paths = shallowRef(null)
onMounted(() => observeVisibility(el.value, v => (visible.value = v)))
onUnmounted(() => el.value && forget(el.value))
watchEffect(() => {
  if (visible.value)
    paths.value = pathsOf(props.icon, props.corner, props.weight, props.align)
})
</script>

<template>
  <span ref="el" class="lazy-icon">
    <IconSvg v-if="paths" :paths="paths" :stroke="weight.stroke" :sharp="!!corner.sharp" />
  </span>
</template>

<style>
.lazy-icon { display: grid; place-items: center; width: var(--size); height: var(--size); }
.lazy-icon svg { width: 100%; height: 100%; }
</style>
