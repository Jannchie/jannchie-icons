import { rating, ratingFill } from '../rating'

// 内容分级：日本游戏 CERO D
export default ({ radius }) => rating('cero', 'D', radius)

export const fill = ({ radius, stroke }) => ratingFill('cero', 'D', radius, stroke)
