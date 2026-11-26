import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 西装（正面）：和 jacket 同一个版型（长袖垂到 17.5，衣身到 20.5，袖子和衣身之间各一道缝），
// 但领口是一个开到 (12, 17.5) 的深 V（从 7 / 17 的领口斜下来，就是两片翻领），V 里露出白衬衫和一条实心的窄领带（3.5–10.5）
// 领带是西装的记号：没有它就是 jacket；领带画成实心的，空心的窄领带在 V 里挤成一团
const outer = [[7, 3], [4.5, 4], [3, 17.5], [6.5, 17.5], [6.5, 20.5], [17.5, 20.5], [17.5, 17.5], [21, 17.5], [19.5, 4], [17, 3]]
const body = radius => `${rounded(outer, Math.min(radius, 1.5), false)}L12 17.5Z`
const tie = 'M11.25 3.5H12.75L12.4 5.5L12.6 9.5L12 10.5L11.4 9.5L11.6 5.5Z'
const placket = 'M12 17.5V20.5'
const seams = ['M6.5 17.5V10', 'M17.5 17.5V10']

export default ({ radius }) => [body(radius), placket, { d: tie, fill: true }, ...seams]

// 实心：西装一块，门襟从 V 尖挖穿下摆；V 里的领带填实
export const fill = ({ radius }) => [solid(body(radius)), knock('M12 17.5V23'), solid(tie)]
