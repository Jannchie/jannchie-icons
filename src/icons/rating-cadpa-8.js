import { rating, ratingFill } from '../rating'

// 内容分级：中国游戏 适龄提示 8+
export default ({ radius }) => rating('cadpa', '8+', radius)

export const fill = ({ radius, stroke }) => ratingFill('cadpa', '8+', radius, stroke)
