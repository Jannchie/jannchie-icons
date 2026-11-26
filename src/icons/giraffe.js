import { rounded } from '../geometry'
import { dot, eye } from '../scene'
import { knock, solid } from '../solid'

// 长颈鹿：全身侧影，朝左（同 horse）。一条闭合轮廓：小脑袋（口鼻 (2.5, 7)、平头顶 4.5–6.5 在 4.5、下颌 8.5）→ 长脖子斜着往右下到鬐甲 (13, 10)
// → 背往后斜下到臀 (19.5, 11.5) → 臀部竖直到腹线 (15.5) → 胸前 → 脖子前缘斜回下颌；头顶一根短角（竖在平头顶上），四条长腿落到 21，尾巴从臀部垂下
// 身上两块斑点 + 一只眼睛。和 horse 区分开：脖子是身子的主体、背往后斜下、身上有斑点、头上有角
// 四条腿间距 2，同 horse：粗字重下腿之间的缝很窄，和 horse 保持一致
const body = radius => rounded([[2.5, 7, 0.75], [4.5, 4.5, 0.5], [6.5, 4.5, 0.5], [8, 5.75, 0.5], [13, 10], [19.5, 11.5, 1], [19.5, 15.5, 0.5], [11, 15.5, 0.5], [10.5, 13.5], [7, 8.5], [3, 8.5, 0.75]], Math.min(radius, 1))
const limbs = ['M11.5 15.5V21', 'M13.5 15.5V21', 'M16.5 15.5V21', 'M18.5 15.5V21', 'M19.5 12.5C20.5 12.5 21 13.75 21 15.5']
const horn = 'M5.5 4.5V3'
const marks = [eye(5.5, 6.5, 1.75), { ...dot(13.5, 12.75, 1.75), round: true }, { ...dot(16.5, 13.25, 1.75), round: true }]

export default ({ radius }) => [body(radius), ...limbs, horn, ...marks]

// 实心：身子一块，眼睛和斑点挖空；腿、尾巴、角照旧是线
export const fill = ({ radius }) => [solid(body(radius)), knock(marks), ...limbs, horn]
