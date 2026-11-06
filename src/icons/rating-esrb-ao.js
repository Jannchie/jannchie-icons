import { rating, ratingFill } from '../rating'

// 内容分级：北美游戏 ESRB AO
export default ({ radius }) => rating('esrb', 'AO', radius)

export const fill = ({ radius, stroke }) => ratingFill('esrb', 'AO', radius, stroke)
