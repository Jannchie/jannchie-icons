import { rating, ratingFill } from '../rating'

// 内容分级：图片敏感度 Q
export default ({ radius }) => rating('sensitivity', 'Q', radius)

export const fill = ({ radius, stroke }) => ratingFill('sensitivity', 'Q', radius, stroke)
