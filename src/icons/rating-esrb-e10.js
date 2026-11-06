import { rating, ratingFill } from '../rating'

// 内容分级：北美游戏 ESRB E10+
export default ({ radius }) => rating('esrb', 'E/10+', radius)

export const fill = ({ radius, stroke }) => ratingFill('esrb', 'E/10+', radius, stroke)
