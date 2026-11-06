import { rating, ratingFill } from '../rating'

// 内容分级：德国游戏 USK 16
export default ({ radius }) => rating('usk', '16', radius)

export const fill = ({ radius, stroke }) => ratingFill('usk', '16', radius, stroke)
