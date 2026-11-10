import { ring } from '../marks'
import { knock, solid } from '../solid'

// 害羞：圆脸 + 垂下去的眼睛（往下弯的弧，和 mood-happy 的笑眼上下相反）+ 两颊各三道短斜线（红晕）+ 一道小小的抿嘴弧
// 红晕的斜线用 detail 的细线，间隔 2：三道线并排在 16px 下也分得开；嘴收窄、放低，让开两边的红晕
const eyes = 'M7.5 9A1.5 1.5 0 0 0 10.5 9M13.5 9A1.5 1.5 0 0 0 16.5 9'
const blush = [6.25, 8.25, 10.25, 13.75, 15.75, 17.75].map(x => ({ d: `M${x + 0.4} 12.85L${x - 0.4} 14.45`, detail: true }))
const mouth = 'M10.25 16.75A2.5 2.5 0 0 0 13.75 16.75'

export default () => [ring(), eyes, ...blush, mouth]

// 实心：脸一块，眼睛、红晕、嘴挖空
export const fill = () => [solid(ring()), knock([eyes, ...blush, mouth])]
