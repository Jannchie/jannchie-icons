import { createApp } from 'vue'
import App from './App.vue'
import { solidify } from './fill'
import { setSolidify } from './render'

// 实心变体在预览站里现算（fill.js 依赖 Clipper2，发布包里用的是预先算好的结果，见 render.js）
setSolidify(solidify)

createApp(App).mount('#app')
