import { rating, ratingFill } from '../rating'

// 内容分级：韩国电影 KMRB 18
export default ({ radius }) => rating('kmrb', '18', radius)

export const fill = ({ radius, stroke }) => ratingFill('kmrb', '18', radius, stroke)
