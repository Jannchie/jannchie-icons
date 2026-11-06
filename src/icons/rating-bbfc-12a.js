import { rating, ratingFill } from '../rating'

// 内容分级：英国 BBFC 12A
export default ({ radius }) => rating('bbfc', '12A', radius)

export const fill = ({ radius, stroke }) => ratingFill('bbfc', '12A', radius, stroke)
