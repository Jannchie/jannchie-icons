import { rating, ratingFill } from '../rating'

// 内容分级：韩国电影 KMRB 15
export default ({ radius }) => rating('kmrb', '15', radius)

export const fill = ({ radius, stroke }) => ratingFill('kmrb', '15', radius, stroke)
