import { dot, eye, softEar } from '../scene'

// 猪：正面头像。圆脸（圆心 (12, 13)、半径 7.5）和两只耳朵是一条闭合轮廓（耳朵是软曲线 softEar，耳尖圆润）：耳朵从圆上 −150°～−105° 和 −75°～−30° 两段长出来，
// 中间一段平缓的头顶弧；脸下部一个椭圆猪鼻（两个鼻孔），上方两只眼睛
const [cx, cy, R] = [12, 13, 7.5]
const rad = d => d * Math.PI / 180
const Q = (d, r = R) => [cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))]
const P = (d, r = R) => Q(d, r).map(v => +v.toFixed(3)).join(' ')
export default () => [
  `M${P(-150)}${softEar(Q(-150), Q(-138, R + 5), Q(-108), 1.1)}A${R} ${R} 0 0 1 ${P(-72)}${softEar(Q(-72), Q(-42, R + 5), Q(-30), 1.1)}A${R} ${R} 0 1 1 ${P(-150)}Z`,
  'M8.5 15.5A3.5 2.5 0 1 0 15.5 15.5A3.5 2.5 0 1 0 8.5 15.5Z',
  dot(10.75, 15.5, 1.25),
  dot(13.25, 15.5, 1.25),
  eye(9, 10.75),
  eye(15, 10.75),
]
