import base from './hexagon'

// C：六边形 + 中间一个圆弧 C
// C 是圆心 (12, 12)、半径 4.5 的圆弧，开口朝右、上下各张开 45°
const [cx, cy, r] = [12, 12, 4.5]
const a = Math.PI / 4
const [dx, dy] = [r * Math.cos(a), r * Math.sin(a)].map(v => +v.toFixed(3))
export default opts => [
  ...base(opts),
  `M${cx + dx} ${cy - dy}A${r} ${r} 0 1 0 ${cx + dx} ${cy + dy}`,
]
