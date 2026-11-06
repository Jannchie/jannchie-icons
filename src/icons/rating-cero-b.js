import { rating, ratingFill } from '../rating'

// 内容分级：日本游戏 CERO B
export default ({ radius }) => rating('cero', 'B', radius)

export const fill = ({ radius, stroke }) => ratingFill('cero', 'B', radius, stroke)
