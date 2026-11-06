import { rating, ratingFill } from '../rating'

// 内容分级：德国游戏 USK 18
export default ({ radius }) => rating('usk', '18', radius)

export const fill = ({ radius, stroke }) => ratingFill('usk', '18', radius, stroke)
