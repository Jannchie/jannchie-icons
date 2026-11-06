import { rating, ratingFill } from '../rating'

// 内容分级：日本电影 映伦 G
export default ({ radius }) => rating('eirin', 'G', radius)

export const fill = ({ radius, stroke }) => ratingFill('eirin', 'G', radius, stroke)
