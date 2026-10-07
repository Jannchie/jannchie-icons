import { GROUND, groundLine } from '../scene'

// 地面雷达：碟形天线口朝右上（弦从 (6.5, 6) 到 (14.5, 14)，半圆向左下鼓出，圆心 (10.5, 10)），碟心一根馈源杆指向右上，杆端 (13, 7.5)；
// 三脚架是立在地平线上的闭合三角形，顶点正好顶在碟的最低点 (10.5, 15.66)（那里碟的切线水平）——点碰点，没有线头，也不留窄缝；
// 右上两道弧以馈源杆端为圆心、沿天线指向（右上 45°）张开 ±45°，波从馈源发出
const [fx, fy] = [13, 7.5]
const R = 4 * Math.SQRT2
const rad = d => d * Math.PI / 180
const wave = (r) => {
  const p = d => `${+(fx + r * Math.cos(rad(d))).toFixed(3)} ${+(fy + r * Math.sin(rad(d))).toFixed(3)}`
  return `M${p(-90)}A${r} ${r} 0 0 1 ${p(0)}`
}
export default () => [
  groundLine,
  `M6.5 6A${R} ${R} 0 0 0 14.5 14Z`,
  `M10.5 10L${fx} ${fy}`,
  `M8.5 ${GROUND}L10.5 ${10 + R}L12.5 ${GROUND}Z`,
  wave(3.5),
  wave(6.5),
]
