import { rating, ratingFill } from '../rating'

// 内容分级：日本电影 映伦 R15+
export default ({ radius }) => rating('eirin', 'R/15+', radius)

export const fill = ({ radius, stroke }) => ratingFill('eirin', 'R/15+', radius, stroke)
