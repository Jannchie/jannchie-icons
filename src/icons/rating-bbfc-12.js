import { rating, ratingFill } from '../rating'

// 内容分级：英国 BBFC 12
export default ({ radius }) => rating('bbfc', '12', radius)

export const fill = ({ radius, stroke }) => ratingFill('bbfc', '12', radius, stroke)
