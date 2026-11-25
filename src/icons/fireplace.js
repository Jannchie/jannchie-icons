import { hole, solid } from '../solid'

// 壁炉（正面）：炉体的两条竖边（4.5 / 19.5）顶着一道两头伸出去的炉台（3–21 在 5.5），落在地面的横线上（3–21 在 20.5）；
// 正中一个拱形的炉膛（7.5–16.5，拱顶到 10）；炉膛里一团火苗（悬在地面线上方，留出一道缝）
const mantel = 'M3 5.5H21'
const floor = 'M3 20.5H21'
const sides = ['M4.5 5.5V20.5', 'M19.5 5.5V20.5']
const arch = 'M7.5 20.5V14.5A4.5 4.5 0 0 1 16.5 14.5V20.5'
const flame = 'M12 18.25C10.75 18.25 10.25 17.45 10.25 16.5C10.25 15.5 11 14.75 12 13.5C13 14.75 13.75 15.5 13.75 16.5C13.75 17.45 13.25 18.25 12 18.25Z'

export default () => [mantel, floor, ...sides, arch, flame]

// 实心：炉体一块，炉膛挖成洞（和描边版拱形的内缘一样大，往下挖穿到地面线），火苗是洞里的实心；炉台、地面照旧是线
export const fill = ({ stroke }) => {
  const k = 4.5 - stroke
  return [
    solid('M4.5 5.5H19.5V20.5H4.5Z'),
    hole(`M${12 - k} 23V14.5A${k} ${k} 0 0 1 ${12 + k} 14.5V23Z`),
    solid(flame),
    mantel,
    floor,
  ]
}
