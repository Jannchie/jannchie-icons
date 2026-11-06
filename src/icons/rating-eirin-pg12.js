import { rating, ratingFill } from '../rating'

// 内容分级：日本电影 映伦 PG12
export default ({ radius }) => rating('eirin', 'PG/12', radius)

export const fill = ({ radius, stroke }) => ratingFill('eirin', 'PG/12', radius, stroke)
