import { rating, ratingFill } from '../rating'

// 内容分级：中国游戏 适龄提示 16+
export default ({ radius }) => rating('cadpa', '16+', radius)

export const fill = ({ radius, stroke }) => ratingFill('cadpa', '16+', radius, stroke)
