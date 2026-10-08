// @jannchie/icons-vue：通用的图标组件 <JIcon :icon="IconHeart" />，按 radius、weight 现场重绘，按显示尺寸 × 设备像素比做像素对齐
import { toPaths } from '@jannchie/icons'
import { pixelSize } from '@jannchie/icons/runtime'
import { computed, defineComponent, onMounted } from 'vue'
import { dpr, renderSvg, useIconDefaults, watchDpr } from './shared.js'

export { ICON_DEFAULTS, JIconPlugin, provideIconDefaults } from './shared.js'

export const JIcon = defineComponent({
  name: 'JIcon',
  props: {
    icon: { type: Object, required: true },
    size: { type: [Number, String], default: undefined },
    radius: { type: [String, Number], default: undefined },
    weight: { type: String, default: undefined },
    duo: { type: Boolean, default: undefined },
    theme: { type: String, default: undefined },
    colors: { type: Object, default: undefined },
    title: { type: String, default: undefined },
    hinting: { type: Boolean, default: undefined },
  },
  setup(props) {
    const defaults = useIconDefaults()
    onMounted(watchDpr)
    const state = computed(() => {
      const d = defaults?.value ?? {}
      const size = props.size ?? d.size ?? 24
      const css = pixelSize(size)
      const hinting = props.hinting ?? d.hinting ?? false
      const colors = d.colors || props.colors ? { ...d.colors, ...props.colors } : undefined
      return {
        size,
        shape: toPaths(props.icon, {
          radius: props.radius ?? d.radius,
          weight: props.weight ?? d.weight,
          duo: props.duo ?? d.duo,
          theme: props.theme ?? d.theme,
          colors,
          title: props.title,
          px: hinting && css ? Math.round(css * dpr.value) : 0,
        }),
      }
    })
    return () => renderSvg(state.value.size, state.value.shape)
  },
})

export default JIcon

