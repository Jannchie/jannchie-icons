import { dot } from '../scene'

// 摩天轮：大转轮（圆心 (12, 10.5)、半径 7）+ 轮上均匀挂着的六个吊舱（圆点，压在轮圈上）+ 轮心的轴（圆点）；不画辐条（和支架叠在一起，下半边糊成一团）
// + 从轮心撑到地面的人字形支架（两脚 6.5 / 17.5）+ 地面横线（20.5）
// 都是线和点，没有实心版
const [cx, cy, R] = [12, 10.5, 7]
const f = v => +v.toFixed(3)
const at = deg => [f(cx + R * Math.cos(deg * Math.PI / 180)), f(cy + R * Math.sin(deg * Math.PI / 180))]
const ANGLES = [30, 90, 150, 210, 270, 330]
// 轮圈从两个吊舱之间起笔并闭合
const ring = `M${at(0).join(' ')}A${R} ${R} 0 1 1 ${at(180).join(' ')}A${R} ${R} 0 1 1 ${at(0).join(' ')}Z`

export default () => [
  ring,
  ...ANGLES.map(deg => ({ ...dot(...at(deg), 2.5), round: true })),
  { ...dot(cx, cy, 2.5), round: true },
  `M6.5 20.5L${cx} ${cy}L17.5 20.5`,
  'M4.5 20.5H19.5',
]
