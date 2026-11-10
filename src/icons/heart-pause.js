import { knock, solid } from '../solid'
import { HEART } from './heart'

// 爱心 + 中间两道竖线（暂停：忍住、寸止）：竖线在 9.5 / 14.5，和爱心左右对称，上下 9.25–14.75（爱心里靠上、最宽的地方）
const bars = 'M9.5 9.25V14.75M14.5 9.25V14.75'

export default () => [HEART, bars]

// 实心：爱心一块，两道竖线挖空
export const fill = () => [solid(HEART), knock(bars)]
