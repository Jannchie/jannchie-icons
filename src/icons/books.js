import { rounded } from '../geometry'

// 书架：左边一高一矮两本竖书 + 右边一本向左斜靠的书（左上角搭在矮书顶上）+ 书架横线
// 斜书是竖放的书绕左下角 (17, 20) 逆时针转 20° 得到的
const a = 20 * Math.PI / 180
const [c, s] = [Math.cos(a), Math.sin(a)]
const [px, py, w, h] = [17, 20, 3.75, 13]
const lean = [
  [px, py],
  [px + w * c, py - w * s],
  [px + w * c - h * s, py - w * s - h * c],
  [px - h * s, py - h * c],
]

export default ({ radius }) => {
  const r = Math.min(radius, 1)
  return [
    rounded([[4.5, 20], [4.5, 4], [8.5, 4], [8.5, 20]], r, false),
    rounded([[8.5, 20], [8.5, 8], [12.5, 8], [12.5, 20]], r, false),
    rounded(lean, r),
    'M3 20H21',
  ]
}
