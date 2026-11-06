import { rating, ratingFill } from '../rating'

// 内容分级：图片敏感度 E
export default ({ radius }) => rating('sensitivity', 'E', radius)

export const fill = ({ radius, stroke }) => ratingFill('sensitivity', 'E', radius, stroke)
