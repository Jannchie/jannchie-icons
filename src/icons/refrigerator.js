import { rounded } from '../geometry'
import { knock, spans, tile } from '../solid'

// 冰箱：高的柜体（5.5–18.5 × 2.5–21.5）+ 分隔冷冻室的横线（9.5，两端垂直接在侧边上）+ 两扇门左侧的竖把手（离顶边、分隔线各 3，粗字重下也不挤）
export default ({ radius }) => [
  rounded([[5.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5]], Math.min(radius, 2)),
  'M5.5 9.5H18.5',
  'M8.5 5.5V6.5',
  'M8.5 12.5V16.5',
]

// 实心：冷冻室、冷藏室两扇门各画一块（见 solid.js 的 tile），分隔处留 GAP 的缝，每扇门四个角都收圆；把手挖空。
// 冷冻室门只有 7 高，圆角最多 1.5
export const fill = ({ radius, stroke }) => {
  const [x0, x1] = [5.5 - stroke / 2, 18.5 + stroke / 2]
  const [top, bottom] = spans(2.5, 21.5, [9.5], stroke)
  return [
    tile([x0, top[0], x1, top[1]], Math.min(radius, 1.5)),
    tile([x0, bottom[0], x1, bottom[1]], Math.min(radius, 2)),
    knock(['M8.5 5.5V6.5', 'M8.5 12.5V16.5']),
  ]
}
