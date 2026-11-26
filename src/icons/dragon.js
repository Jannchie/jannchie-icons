import { dot, eye } from '../scene'
import { knock, solid } from '../solid'

// 龙：侧面头像，朝左（同 chess-knight、unicorn 的朝向）。一条闭合轮廓：长长的上颚（吻端 (2.5, 10)）→ 额头 → 往后上方扫的尖角（尖 (15, 2.5)）
// → 后脑 → 脖子后缘一排锯齿状的背刺（三个尖朝右）→ 脖子落到底 (20.5) → 喉部 → 张开的下颚（下颚尖 (4, 12.5)，和上颚之间张口）；一只眼睛 + 吻端一个鼻孔
// 和 chinese-zodiac-dragon（正面、鹿角、胡须）区分开：侧面、张嘴、背刺
const head = 'M2.5 10L3 8L8 6.75L10.5 4.75L15 2.5L13 5.75L15.5 7.25L18.25 10L16.75 11.25L19.25 12.75L17.75 14.25L20.25 16L18.75 17.75L20.5 20.5H12L11.5 15.5L9.5 12.5L5.5 13.5L4 12.5L7.5 11L2.5 10Z'
const features = [eye(9.75, 8.75, 1.75), dot(4.5, 8.75, 1.25)]

export default () => [head, ...features]

// 实心：头一块，眼睛、鼻孔挖空
export const fill = () => [solid(head), knock(features.map(p => ({ ...p, round: true })))]
