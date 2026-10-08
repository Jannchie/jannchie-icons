// 船舵：轮毂（半径 4）+ 舵轮外圈（半径 7）+ 8 根辐条，从轮毂一直伸出外圈 3.5 成为把手
// 圆心 (12, 12)：辐条和轮毂、外圈都是垂直相交（径向线），线头不会斜接
// 轮毂半径 4：8 根辐条在轮毂处相隔 3.06，粗字重（线宽 2）下也留得出缝，不会被拥挤检测调细
// 两个圆的起点放在两根辐条正中间（22.5°）并用 Z 闭合：起点若正好落在辐条上，首尾那一点会被当成线头处理、圆被剪开一小段
const [cx, cy] = [12, 12]
const at = (r, deg) => {
  const a = deg * Math.PI / 180
  return `${+(cx + r * Math.cos(a)).toFixed(3)} ${+(cy + r * Math.sin(a)).toFixed(3)}`
}
const ring = r => `M${at(r, 22.5)}A${r} ${r} 0 1 1 ${at(r, 202.5)}A${r} ${r} 0 1 1 ${at(r, 22.5)}Z`
const spoke = deg => `M${at(4, deg)}L${at(10.5, deg)}`

export default () => [
  ring(4),
  ring(7),
  [0, 45, 90, 135, 180, 225, 270, 315].map(spoke).join(''),
]
