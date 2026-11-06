import { rating, ratingFill } from '../rating'

// 内容分级：日本游戏 CERO C
export default ({ radius }) => rating('cero', 'C', radius)

export const fill = ({ radius, stroke }) => ratingFill('cero', 'C', radius, stroke)
