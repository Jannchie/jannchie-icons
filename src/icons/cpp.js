import base from './hexagon'

// C++：六边形 + 左边的圆弧 C + 右边并排两个小加号
// C 圆心 (9, 12.5)、半径 3.25，开口朝右上下各张开 50°，给第一个加号腾出地方；左边离六边形 2.25
// 两个加号 2 见方，中心 (13.5, 12.5)、(17.5, 12.5)：横竖笔都落在 .5 上，整组比六边形中心低半格
// 加号是缩小的符号（detail）：粗字重下线宽封顶，两个加号之间、加号和六边形之间不会糊在一起
const [cx, cy, r] = [9, 12.5, 3.25]
const a = 50 * Math.PI / 180
const [dx, dy] = [r * Math.cos(a), r * Math.sin(a)].map(v => +v.toFixed(3))
const plus = x => ({ d: `M${x - 1} ${cy}H${x + 1}M${x} ${cy - 1}V${cy + 1}`, detail: true })
export default opts => [
  ...base(opts),
  `M${cx + dx} ${cy - dy}A${r} ${r} 0 1 0 ${cx + dx} ${cy + dy}`,
  plus(13.5),
  plus(17.5),
]
