import { rating, ratingFill } from '../rating'

// 内容分级：美国电影 MPA R
export default ({ radius }) => rating('mpa', 'R', radius)

export const fill = ({ radius, stroke }) => ratingFill('mpa', 'R', radius, stroke)
