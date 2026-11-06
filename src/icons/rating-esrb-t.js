import { rating, ratingFill } from '../rating'

// 内容分级：北美游戏 ESRB T
export default ({ radius }) => rating('esrb', 'T', radius)

export const fill = ({ radius, stroke }) => ratingFill('esrb', 'T', radius, stroke)
