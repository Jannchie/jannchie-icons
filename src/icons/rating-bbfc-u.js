import { rating, ratingFill } from '../rating'

// 内容分级：英国 BBFC U
export default ({ radius }) => rating('bbfc', 'U', radius)

export const fill = ({ radius, stroke }) => ratingFill('bbfc', 'U', radius, stroke)
