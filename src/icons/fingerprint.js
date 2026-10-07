// 指纹：同一中心 (12, 14) 的几道竖向偏长的椭圆拱（横半径 r、竖半径 1.3r），像指纹的螺纹：
// 最外一道只留拱顶的一段弧；中间两道拱的两条腿竖直往下、长短不一（纹路断开的地方）；相邻两道横向相距 3，竖腿都落在 .5 上
const ry = r => r * 1.3
const top = (r, a) => {
  // 拱顶两侧各留到偏离正上方 a 度
  const t = a * Math.PI / 180
  const p = s => `${+(12 + s * r * Math.sin(t)).toFixed(3)} ${+(14 - ry(r) * Math.cos(t)).toFixed(3)}`
  return `M${p(-1)}A${r} ${ry(r)} 0 0 1 ${p(1)}`
}
const arch = (r, left, right) => `M${12 - r} ${left}V14A${r} ${ry(r)} 0 0 1 ${12 + r} 14V${right}`
export default () => [
  top(8.5, 55),
  arch(5.5, 21, 17.5),
  arch(2.5, 18, 21.5),
]
