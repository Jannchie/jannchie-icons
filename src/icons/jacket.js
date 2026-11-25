import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 夹克（外套，正面）：左右对称。肩从领口斜下去，两只长袖贴着衣身垂到 17.5，衣身比袖口再长一截（到 20.5）；
// 领口是一个 V 字（翻领敞开，尖在 (12, 7.5)），V 尖往下一道门襟（拉链）；袖子和衣身之间各一道缝（9.5–17.5，下端落在袖口的拐角上）
const outer = [[9, 3], [4.5, 5.5], [3, 17.5], [6.5, 17.5], [6.5, 20.5], [17.5, 20.5], [17.5, 17.5], [21, 17.5], [19.5, 5.5], [15, 3]]
const body = radius => `${rounded(outer, Math.min(radius, 1.5), false)}L12 7.5Z`
const zip = 'M12 7.5V20.5'
const seams = ['M6.5 17.5V9.5', 'M17.5 17.5V9.5']

export default ({ radius }) => [body(radius), zip, ...seams]

// 实心：夹克一块，门襟从领口的 V 尖一直挖穿下摆，分成左右两片前襟
export const fill = ({ radius }) => [solid(body(radius)), knock('M12 7.5V23')]
