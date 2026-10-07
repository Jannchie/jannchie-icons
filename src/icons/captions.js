import { rounded } from '../geometry'

// 字幕（CC，closed captions）：横向圆角框（2.5–21.5 × 5.5–18.5）里两个开口朝右的 c（半径 2.5，上下各留 45°）
// 名字不用 cc：库里 cc 是知识共享（Creative Commons）
const c = (cx) => {
  const k = 2.5 * Math.SQRT1_2
  return `M${cx + k} ${12 - k}A2.5 2.5 0 1 0 ${cx + k} ${12 + k}`
}
export default ({ radius }) => [
  rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5)),
  c(8.5),
  c(14.5),
]
