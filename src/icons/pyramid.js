import { crisp, rounded, through } from '../geometry'
import { knock, solid } from '../solid'

// 金字塔：一个大三角（塔尖 (12, 3.5)，底边 2.5–21.5 在 19.5）+ 从塔尖落到底边偏右处 (15.5, 19.5) 的一条棱线——分出正面和侧面，和平面的 triangle 区分开
const APEX = [12, 3.5]
const FOOT = [15.5, 19.5]
const shape = radius => rounded([[...APEX, crisp(radius)], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 1.5))
const edge = through(APEX, FOOT, 0)

export default ({ radius }) => [shape(radius), edge]

// 实心：三角一块，棱线上下都挖穿，正面和侧面分成两块
export const fill = ({ radius, stroke }) => [solid(shape(radius)), knock(through(APEX, FOOT, stroke * 2))]
