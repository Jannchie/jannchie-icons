import { rating, ratingFill } from '../rating'

// 内容分级：英国 BBFC 18
export default ({ radius }) => rating('bbfc', '18', radius)

export const fill = ({ radius, stroke }) => ratingFill('bbfc', '18', radius, stroke)
