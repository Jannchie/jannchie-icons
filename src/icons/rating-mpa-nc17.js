import { rating, ratingFill } from '../rating'

// 内容分级：美国电影 MPA NC-17
export default ({ radius }) => rating('mpa', 'NC/17', radius)

export const fill = ({ radius, stroke }) => ratingFill('mpa', 'NC/17', radius, stroke)
