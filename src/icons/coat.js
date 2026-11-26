import { rounded } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 大衣（双排扣，正面）：和 jacket 同一个版型的肩和长袖（垂到 17.5，袖子和衣身之间各一道缝），衣身往下微微张开（下摆 5.5–18.5），
// 领口是 V（尖在 (12, 8.5)），V 尖往下一道门襟，门襟两边各两颗纽扣。两排纽扣 + 张开的下摆是大衣的记号：jacket 是拉链直筒、hoodie 有兜帽
// （试过腰带 + 带扣：正中那个方框像一把锁，小尺寸下挤成一团）
const outer = [[9, 3], [4.5, 5.5], [3, 17.5], [6, 17.5], [5.5, 20.5], [18.5, 20.5], [18, 17.5], [21, 17.5], [19.5, 5.5], [15, 3]]
const body = radius => `${rounded(outer, Math.min(radius, 1.5), false)}L12 8.5Z`
const placket = 'M12 8.5V20.5'
const buttons = [[10, 12], [14, 12], [10, 15.5], [14, 15.5]].map(([x, y]) => eye(x, y, 1.5))
const seams = ['M6.5 17.5V9.5', 'M17.5 17.5V9.5']

export default ({ radius }) => [body(radius), placket, ...buttons, ...seams]

// 实心：大衣一块，门襟从 V 尖一直挖穿下摆，分成左右两片前襟；纽扣挖空
export const fill = ({ radius }) => [solid(body(radius)), knock(['M12 8.5V24', ...buttons])]
