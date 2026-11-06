import { rating, ratingFill } from '../rating'

// 内容分级：图片敏感度 S
export default ({ radius }) => rating('sensitivity', 'S', radius)

export const fill = ({ radius, stroke }) => ratingFill('sensitivity', 'S', radius, stroke)
