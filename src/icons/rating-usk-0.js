import { rating, ratingFill } from '../rating'

// 内容分级：德国游戏 USK 0
export default ({ radius }) => rating('usk', '0', radius)

export const fill = ({ radius, stroke }) => ratingFill('usk', '0', radius, stroke)
