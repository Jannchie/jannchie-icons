// @jannchie/icons-vue/static：配合 @jannchie/icons/static 的预计算图标（默认样式），不带渲染引擎，体积很小
// 只支持 size、title；radius、weight、duo、像素对齐要用主入口
import { toPaths } from '@jannchie/icons/static'
import { defineComponent } from 'vue'
import { renderSvg, useIconDefaults } from './shared.js'

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
    return () => renderSvg(props.size ?? defaults?.value.size ?? 24, toPaths(props.icon, { title: props.title }))
  },
})

export default JIcon
