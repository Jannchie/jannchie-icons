import { rating, ratingFill } from '../rating'

// 内容分级：英国 BBFC R18
export default ({ radius }) => rating('bbfc', 'R18', radius)

export const fill = ({ radius, stroke }) => ratingFill('bbfc', 'R18', radius, stroke)
