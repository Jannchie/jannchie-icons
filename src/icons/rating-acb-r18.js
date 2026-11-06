import { rating, ratingFill } from '../rating'

// 内容分级：澳大利亚 ACB R18+
export default ({ radius }) => rating('acb', 'R/18+', radius)

export const fill = ({ radius, stroke }) => ratingFill('acb', 'R/18+', radius, stroke)
