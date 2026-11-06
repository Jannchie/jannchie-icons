import { rating, ratingFill } from '../rating'

// 内容分级：北美游戏 ESRB E
export default ({ radius }) => rating('esrb', 'E', radius)

export const fill = ({ radius, stroke }) => ratingFill('esrb', 'E', radius, stroke)
