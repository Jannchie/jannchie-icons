import { rating, ratingFill } from '../rating'

// 内容分级：英国 BBFC 15
export default ({ radius }) => rating('bbfc', '15', radius)

export const fill = ({ radius, stroke }) => ratingFill('bbfc', '15', radius, stroke)
