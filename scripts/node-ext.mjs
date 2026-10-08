// 让 Node 直接 import src/ 下的模块：src/ 按 Vite 习惯省略了相对导入的 .js 后缀，这里在解析失败时补上再试
// 用法：node --import ./scripts/node-ext.mjs <脚本>。比通过 Vite SSR 逐个加载两千多个图标模块快得多，也不会因为负载高而超时
import { register } from 'node:module'

register('data:text/javascript,' + encodeURIComponent(`
export async function resolve(spec, ctx, next) {
  try { return await next(spec, ctx) }
  catch (e) {
    if ((spec.startsWith('./') || spec.startsWith('../')) && !spec.endsWith('.js') && !spec.endsWith('.json'))
      return next(spec + '.js', ctx)
    throw e
  }
}`))
