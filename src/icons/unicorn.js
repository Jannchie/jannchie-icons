import { eye } from '../scene'
import { knock, solid } from '../solid'

// 独角兽：侧面马头，朝左（同 chess-knight）。一条闭合轮廓：圆圆的口鼻 (3, 12.75) → 鼻梁斜上到额头 → 竖起的耳朵（尖 (10.5, 3.5)）
// → 后脑弧下成脖子后缘 → 脖子底 (11–19, 20.5) → 喉部 → 下颌回到口鼻；额头上往左上斜出一根长角（记号），脖子后面一道飘动的鬃毛线，一只眼睛
// 和 horse（全身）、chess-knight（马头 + 底座）区分开：只有头颈，额头一根角
const head = 'M4.5 14.5C3.5 14.5 3 13.75 3 12.75C3 11.75 3.5 11 4 10.25L8 6.5L10.5 3.5L11.75 5.5C14.5 5.5 16.5 7.5 17.5 10.5L19 20.5H11L10.5 15.5L9.5 13.5Z'
const horn = 'M8.75 5.6L5.25 2.5'
const mane = 'M11.75 5.5C14.5 4.25 17.5 5.5 18.5 8.5C19.25 10.5 21 12 20.5 14.5'
const features = [eye(9.75, 9)]

export default () => [head, horn, mane, ...features]

// 实心：头颈一块，眼睛挖空；角和鬃毛照旧是线
export const fill = () => [solid(head), knock(features), horn, mane]
