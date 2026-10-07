import base from './hexagon'

// C#：六边形 + 左边的圆弧 C + 右边一个小 #
// C 圆心 (9.25, 12)、半径 3.25，开口朝右上下各张开 50°，左边离六边形 2.5
// # 两竖 x 14.5 / 17.5、两横 y 10.5 / 13.5，各伸出格子 1（再短的话，尖角模式下线头缩回去就只剩一个方块）；左端离 C 的线头约 2.4
const [cx, cy, r] = [9.25, 12, 3.25]
const a = 50 * Math.PI / 180
const [dx, dy] = [r * Math.cos(a), r * Math.sin(a)].map(v => +v.toFixed(3))
export default opts => [
  ...base(opts),
  `M${cx + dx} ${cy - dy}A${r} ${r} 0 1 0 ${cx + dx} ${cy + dy}`,
  'M14.5 9.5V14.5M17.5 9.5V14.5',
  'M13.5 10.5H18.5M13.5 13.5H18.5',
]
