import { rating, ratingFill } from '../rating'

// 内容分级：日本游戏 CERO Z
export default ({ radius }) => rating('cero', 'Z', radius)

export const fill = ({ radius, stroke }) => ratingFill('cero', 'Z', radius, stroke)
