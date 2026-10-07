// 雪花：三条交叉的轴形成六个分支（竖直 + 与竖直成 ±60°），每个分支在 5.5 处分出一对往外斜伸的小枝
const R = 9
// 竖直的主轴落在 .5 上：中心往左偏半格
const cx = 11.5
const arms = [90, 30, 150, 270, 210, 330].map((deg) => {
  const a = deg * Math.PI / 180
  const [ux, uy] = [Math.cos(a), Math.sin(a)]
  const [nx, ny] = [-uy, ux]
  const at = (d, side) => [cx + ux * d + nx * side, 12 + uy * d + ny * side]
  const tip = at(5.5, 0)
  const [l, r] = [at(7.5, -2), at(7.5, 2)]
  return `M${l.join(' ')}L${tip.join(' ')}L${r.join(' ')}`
})

export default () => [
  `M${cx} ${12 - R}V${12 + R}`,
  ...[30, 150].map((deg) => {
    const a = deg * Math.PI / 180
    return `M${cx - R * Math.cos(a)} ${12 - R * Math.sin(a)}L${cx + R * Math.cos(a)} ${12 + R * Math.sin(a)}`
  }),
  ...arms,
]
