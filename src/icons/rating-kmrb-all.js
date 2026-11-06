import { rating, ratingFill } from '../rating'

// 内容分级：韩国电影 KMRB ALL
export default ({ radius }) => rating('kmrb', 'ALL', radius)

export const fill = ({ radius, stroke }) => ratingFill('kmrb', 'ALL', radius, stroke)
