import { rounded } from '../geometry'
import { dot } from '../scene'
import { hole, knock, solid } from '../solid'

// 灶台（带烤箱的炉灶，正面）：方形机身（3.5–20.5 × 3.5–20.5）+ 操作面板分隔线（9.5）+ 面板上三个旋钮（y 6.5，离上下各 3）+
// 烤箱门的玻璃窗（6.5–17.5 × 12.5–17.5，离分隔线和底边各 3）。和洗衣机（圆形滚筒门、两个旋钮）、微波炉（横向、侧面板）区分开
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2)),
  'M3.5 9.5H20.5',
  dot(7.5, 6.5, 1.5), dot(12, 6.5, 1.5), dot(16.5, 6.5, 1.5),
  rounded([[6.5, 12.5], [17.5, 12.5], [17.5, 17.5], [6.5, 17.5]], Math.min(radius, 1)),
]

// 实心：机身一块；面板分隔线整条挖穿，操作面板和烤箱分成两块；旋钮挖空，烤箱窗挖成洞（洞外扩半个线宽后正好是描边版窗框的中心线）
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    solid(rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2))),
    knock([`M${3.5 - stroke} 9.5H${20.5 + stroke}`, dot(7.5, 6.5, 1.5), dot(12, 6.5, 1.5), dot(16.5, 6.5, 1.5)]),
    hole(rounded([[6.5 + h, 12.5 + h], [17.5 - h, 12.5 + h], [17.5 - h, 17.5 - h], [6.5 + h, 17.5 - h]], Math.max(0, Math.min(radius, 1) - h))),
  ]
}
