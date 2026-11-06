import { rating, ratingFill } from '../rating'

// 内容分级：澳大利亚 ACB PG
export default ({ radius }) => rating('acb', 'PG', radius)

export const fill = ({ radius, stroke }) => ratingFill('acb', 'PG', radius, stroke)
