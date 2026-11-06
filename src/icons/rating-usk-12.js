import { rating, ratingFill } from '../rating'

// 内容分级：德国游戏 USK 12
export default ({ radius }) => rating('usk', '12', radius)

export const fill = ({ radius, stroke }) => ratingFill('usk', '12', radius, stroke)
