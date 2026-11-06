import { rating, ratingFill } from '../rating'

// 内容分级：美国电影 MPA PG
export default ({ radius }) => rating('mpa', 'PG', radius)

export const fill = ({ radius, stroke }) => ratingFill('mpa', 'PG', radius, stroke)
