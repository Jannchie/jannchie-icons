import languages from './languages'
import { sparkle } from '../symbols'

// AI 翻译：languages 的「文 A」原样不动 + 右上角一对 AI 星芒（一大一小斜着排，同 sparkle 符号）
// 星芒组中心 (18, 5.25)、缩放 0.9：大星的下尖离「A」的顶尖、左尖离「文」的横右端都留开 2 左右
export default ({ radius, stroke }) => [
  ...languages({ radius, stroke }),
  ...sparkle([18, 5.25], 0.9, radius),
]
