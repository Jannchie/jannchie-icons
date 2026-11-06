import { rating, ratingFill } from '../rating'

// 内容分级：韩国电影 KMRB 12
export default ({ radius }) => rating('kmrb', '12', radius)

export const fill = ({ radius, stroke }) => ratingFill('kmrb', '12', radius, stroke)
