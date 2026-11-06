import { rating, ratingFill } from '../rating'

// 内容分级：中国游戏 适龄提示 12+
export default ({ radius }) => rating('cadpa', '12+', radius)

export const fill = ({ radius, stroke }) => ratingFill('cadpa', '12+', radius, stroke)
