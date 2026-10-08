<script setup>
// 按名字取图标，用页面当前的圆角、字重（App 通过 provide('iconStyle') 提供）；打开像素对齐时按显示大小对齐
import { computed, inject } from 'vue'
import IconSvg from './IconSvg.vue'
import { byName } from './iconset'
import { pathsOf } from './render'
import { devicePx } from './site/preview'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 20 },
})
const style = inject('iconStyle')
const paths = computed(() => {
  const icon = byName.get(props.name)
  return icon && pathsOf(icon, style.value.corner, style.value.weight, style.value.hinting ? devicePx(props.size) : 0)
})
</script>

<template>
  <IconSvg
    v-if="paths" class="icon" :style="{ width: `${size}px`, height: `${size}px` }"
    :paths="paths" :stroke="style.weight.stroke" :sharp="!!style.corner.sharp" snap
  />
</template>

<style>
.icon { flex: none; display: block; }
</style>
