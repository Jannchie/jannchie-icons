import { crisp, rounded, through } from '../geometry'
import { knock, solid, stacked } from '../solid'

// 和服：正面平铺，整体是 T 形。肩线从领口 (9, 3) / (15, 3) 斜到袖子外角（y = 5），宽大的方袖垂到 16.5（袖外缘固定在 2 / 22，线宽变粗往里长），
// 袖子下半截和衣身之间是一道竖缝（7.5 / 16.5，从腋下 10 到袖底 16.5：袖兜垂着、不缝在衣身上），衣身直筒，下摆外缘固定在 22；
// 交领：右襟从领口右角 (15, 3) 斜压到腰带上沿 (9.5, 11.5)，左襟从领口左角斜到右襟上就被压住；腰带是两条横线（11.5 / 14.5）。
// 垂下来的方袖 + 交领 + 腰带是记号：t-shirt 的袖子短、斜出，jacket 是对开襟、长袖
const LAPEL = [[15, 3], [9.5, 11.5]]
// 左襟停在右襟上：右襟线上 x = 12 的那一点
const under = [12, 3 + 8.5 * 3 / 5.5]
const sleeveY = [5, 16.5]
const outline = (radius, h) => {
  const [x0, x1] = [2 + h, 22 - h]
  return rounded([
    under,
    [9, 3, crisp(radius)],
    [x0, sleeveY[0]],
    [x0, sleeveY[1]],
    [7.5, sleeveY[1]],
    [7.5, 22 - h],
    [16.5, 22 - h],
    [16.5, sleeveY[1]],
    [x1, sleeveY[1]],
    [x1, sleeveY[0]],
    [15, 3, crisp(radius)],
    LAPEL[1],
  ], Math.min(radius, 1), false)
}
const seams = ['M7.5 10V16.5', 'M16.5 10V16.5']
const obi = ['M7.5 11.5H16.5', 'M7.5 14.5H16.5']

export default ({ radius, stroke }) => [outline(radius, stroke / 2), ...seams, ...obi]

// 实心：两只袖子各一块、衣身一块（衣身在前，袖子在它两侧让出 GAP 的缝：和服的袖本来就是另外缝上去的）；
// 衣身的领口是 V 形的缺口，右襟和两条腰带线挖穿（右襟停在腰带上沿那道缝上），分成左襟、右襟、腰带、下摆四片
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  const [x0, x1] = [2 + h, 22 - h]
  const r = Math.min(radius, 1)
  // 肩线和袖缝（x = 7.5）交点的 y：肩线从领口 (9, 3) 斜到袖外角 (x0, 5)
  const sy = 3 + 2 * (9 - 7.5) / (9 - x0)
  const sleeves = [
    rounded([[7.5, sy], [x0, sleeveY[0]], [x0, sleeveY[1]], [7.5, sleeveY[1], 0]], r),
    rounded([[16.5, sy], [x1, sleeveY[0]], [x1, sleeveY[1]], [16.5, sleeveY[1], 0]], r),
  ]
  const body = rounded([[7.5, sy, 0], [9, 3, crisp(radius)], under, [15, 3, crisp(radius)], [16.5, sy, 0], [16.5, 22 - h], [7.5, 22 - h]], r)
  return [
    ...stacked(sleeves, body),
    knock([through(LAPEL[1], LAPEL[0], 0, stroke * 2), ...obi.map(d => d.replace('M7.5', `M${7.5 - stroke * 2}`).replace('H16.5', `H${16.5 + stroke * 2}`))]),
  ]
}
