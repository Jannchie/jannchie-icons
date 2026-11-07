import { GROUND, groundLine } from '../scene'
import { stacked } from '../solid'

// 地面雷达：碟形天线口朝右上（弦从 (6.5, 7) 到 (14.5, 15)，半圆向左下鼓出，圆心 (10.5, 11)），碟心一根馈源杆指向右上，杆端 (13, 8.5)；
// 三脚架是立在地平线上的闭合三角形（底宽 6.5–14.5，宽底座托得稳），顶点正好顶在碟的最低点 (10.5, 16.66)（那里碟的切线水平）——点碰点，没有线头，也不留窄缝；
// 右上两道弧以馈源杆端为圆心、沿天线指向（右上 45°）张开 ±45°，半径 3.5 / 6（外弧顶在 2.5、右端在 19，圆弧粗字重下离上缘 1.5），波从馈源发出
const [fx, fy] = [13, 8.5]
const R = 4 * Math.SQRT2
const rad = d => d * Math.PI / 180
const wave = (r) => {
  const p = d => `${+(fx + r * Math.cos(rad(d))).toFixed(3)} ${+(fy + r * Math.sin(rad(d))).toFixed(3)}`
  return `M${p(-90)}A${r} ${r} 0 0 1 ${p(0)}`
}
const dish = `M6.5 7A${R} ${R} 0 0 0 14.5 15Z`
const feed = `M10.5 11L${fx} ${fy}`
const stand = `M6.5 ${GROUND}L10.5 ${11 + R}L14.5 ${GROUND}Z`

export default () => [
  groundLine,
  dish,
  feed,
  stand,
  wave(3.5),
  wave(6),
]

// 实心：碟和三脚架各一块，碟画在前面，三脚架顶端顺着碟底让出 GAP 的缝；馈源杆、两道波和地平线照旧是线
export const fill = () => [
  ...stacked(stand, dish),
  feed,
  wave(3.5),
  wave(6),
  groundLine,
]
