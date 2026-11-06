import { rating, ratingFill } from '../rating'

// 内容分级：德国游戏 USK 6
export default ({ radius }) => rating('usk', '6', radius)

export const fill = ({ radius, stroke }) => ratingFill('usk', '6', radius, stroke)
