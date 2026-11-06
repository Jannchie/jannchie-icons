import { rating, ratingFill } from '../rating'

// 内容分级：英国 BBFC PG
export default ({ radius }) => rating('bbfc', 'PG', radius)

export const fill = ({ radius, stroke }) => ratingFill('bbfc', 'PG', radius, stroke)
