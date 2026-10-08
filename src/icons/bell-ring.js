import base from './bell'

// 响铃：bell + 两侧各一道震动弧；弧和铃顶同心（圆心 (12, 10.5)），半径 9（比铃身大 3），
// 左右各占 205°–240° / 300°–335°，落在铃肩外侧、避开顶上的短柄
const [cx, cy, R] = [12, 10.5, 9]
const at = deg => `${+(cx + R * Math.cos(deg * Math.PI / 180)).toFixed(3)} ${+(cy + R * Math.sin(deg * Math.PI / 180)).toFixed(3)}`

export default opts => [
  ...base(opts),
  `M${at(205)}A${R} ${R} 0 0 1 ${at(240)}`,
  `M${at(300)}A${R} ${R} 0 0 1 ${at(335)}`,
]
