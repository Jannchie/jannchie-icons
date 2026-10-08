// @jannchie/icons-vue/static：配合 @jannchie/icons/static 的预计算图标（默认样式），不带渲染引擎，体积很小
// 只支持 size、title；radius、weight、duo、像素对齐要用主入口
import { SVG_ATTRS } from '@jannchie/icons/static'
import { defineComponent, h } from 'vue'
import { useIconDefaults } from './shared.js'

export { ICON_DEFAULTS, JIconPlugin, provideIconDefaults } from './shared.js'

export const JIcon = defineComponent({
  name: 'JIcon',
  props: {
    icon: { type: Object, required: true },
    size: { type: [Number, String], default: undefined },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const defaults = useIconDefaults()
    return () => {
      const size = props.size ?? defaults?.value.size ?? 24
      const children = props.icon.paths.map(({ animate, ...p }, i) => h('path', { key: i, ...p }, animate ? [h('animate', animate)] : undefined))
      if (props.title)
        children.unshift(h('title', props.title))
      const a11y = props.title ? { role: 'img' } : { 'aria-hidden': 'true' }
      return h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', ...SVG_ATTRS, ...a11y }, children)
    }
  },
})

export default JIcon
