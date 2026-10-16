import { eye } from '../scene'

// 小熊（玩偶，正面头像）：圆脸（圆心 (12, 12.5)、半径 8），两只圆耳朵（半径 2.75，圆心在脸的 ±45° 方向、离圆心 8）只画露在脸外的那段弧，
// 和脸的轮廓连成一条闭合路径；大眼睛（直径 2.5，在 11 上）；吻部一个小圆（圆心 (12, 15.75)、半径 2.25），里面一个实心小鼻头
const [cx, cy, R] = [12, 12.5, 8]
const [er, ed] = [2.75, 8]
const f = v => +v.toFixed(3)
// 脸圆和耳朵圆（圆心在角度 a 方向）的两个交点
function cross(a) {
  const x = (ed * ed + R * R - er * er) / (2 * ed)
  const h = Math.sqrt(R * R - x * x)
  const [ux, uy] = [Math.cos(a), Math.sin(a)]
  const p = s => `${f(cx + ux * x - s * uy * h)} ${f(cy + uy * x + s * ux * h)}`
  return [p(1), p(-1)]
}
const rad = d => d * Math.PI / 180
const [l1, l2] = cross(rad(-135))
const [r1, r2] = cross(rad(-45))
export default () => [
  `M${l2}A${er} ${er} 0 1 1 ${l1}A${R} ${R} 0 0 1 ${r2}A${er} ${er} 0 1 1 ${r1}A${R} ${R} 0 1 1 ${l2}Z`,
  eye(8.75, 11, 2.5),
  eye(15.25, 11, 2.5),
  'M14.25 15.75A2.25 2.25 0 1 1 9.75 15.75A2.25 2.25 0 1 1 14.25 15.75Z',
  { d: 'M11.25 14.75H12.75L12 15.75Z', fill: true },
]
