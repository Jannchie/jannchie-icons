import { rating, ratingFill } from '../rating'

// 内容分级：美国电影 MPA G
export default ({ radius }) => rating('mpa', 'G', radius)

export const fill = ({ radius, stroke }) => ratingFill('mpa', 'G', radius, stroke)
