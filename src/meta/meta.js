// 图标的元数据：搜索关键词、首次发布的版本、最近更新的版本、是否第三方角色 / 标志。
// 纯 ESM，不依赖 Vite：Node（发布包脚本）和站点都直接 import。
// since.json 用 import 属性（with { type: 'json' }）导入：Node 22+ 原生支持，Vite / Rolldown 也认。
import { oldNamesOf } from '../aliases.js'
import SINCE from './since.json' with { type: 'json' }
import UPDATED from './updated.json' with { type: 'json' }
import { tagsOf } from './tags.js'

export { tagsOf }

// 第三方的角色、商标、标志（见仓库根的 NOTICE）：
// ちいかわ角色、内容分级标志、Creative Commons 标志、GitHub 与编程语言标志、PlayStation / Xbox 手柄按键、开源许可证名
const THIRD_PARTY_NAMES = new Set([
  'chiikawa',
  'hachiware',
  'usagi',
  'cc',
  'github',
  'mcp',
  'python',
  'javascript',
  'typescript',
  'java',
  'c',
  'csharp',
  'cpp',
  'golang',
  'rust',
  'php',
  'kotlin',
  'swift',
  'ruby',
  'lua',
  'haskell',
  'html',
])
const THIRD_PARTY_PREFIXES = ['rating-', 'cc-', 'playstation-', 'xbox-', 'license-']

export function isThirdParty(name) {
  // rating-sensitivity-* 是本库自己设计的敏感度分级，不是第三方分级标志
  if (name.startsWith('rating-sensitivity-'))
    return false
  return THIRD_PARTY_NAMES.has(name) || THIRD_PARTY_PREFIXES.some(p => name.startsWith(p))
}

// 首次随哪个版本发布；还没发布（或 since.json 还没重新生成）的新图标是 "next"
export const sinceOf = name => SINCE[name] ?? 'next'
// 加入之后最近一次改动随哪个版本发布（"next" 是还没发布的改动）；加入后没改过的是 null
export const updatedOf = name => UPDATED[name] ?? null

// name → { tags, since, updated, thirdParty, oldNames }；tags 已经包含旧名
export function metaOf(name) {
  return { tags: tagsOf(name), since: sinceOf(name), updated: updatedOf(name), thirdParty: isThirdParty(name), oldNames: oldNamesOf(name) }
}
