import { rating, ratingFill } from '../rating'

// 内容分级：美国电影 MPA PG-13
export default ({ radius }) => rating('mpa', 'PG/13', radius)

export const fill = ({ radius, stroke }) => ratingFill('mpa', 'PG/13', radius, stroke)
