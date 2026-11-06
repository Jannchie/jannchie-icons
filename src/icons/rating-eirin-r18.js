import { rating, ratingFill } from '../rating'

// 内容分级：日本电影 映伦 R18+
export default ({ radius }) => rating('eirin', 'R/18+', radius)

export const fill = ({ radius, stroke }) => ratingFill('eirin', 'R/18+', radius, stroke)
