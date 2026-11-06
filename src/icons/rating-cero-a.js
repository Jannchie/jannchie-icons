import { rating, ratingFill } from '../rating'

// 内容分级：日本游戏 CERO A
export default ({ radius }) => rating('cero', 'A', radius)

export const fill = ({ radius, stroke }) => ratingFill('cero', 'A', radius, stroke)
