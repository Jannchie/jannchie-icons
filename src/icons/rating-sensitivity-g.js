import { rating, ratingFill } from '../rating'

// 内容分级：图片敏感度 G
export default ({ radius }) => rating('sensitivity', 'G', radius)

export const fill = ({ radius, stroke }) => ratingFill('sensitivity', 'G', radius, stroke)
