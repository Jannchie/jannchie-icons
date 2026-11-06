import { rating, ratingFill } from '../rating'

// 内容分级：澳大利亚 ACB MA15+
export default ({ radius }) => rating('acb', 'MA/15+', radius)

export const fill = ({ radius, stroke }) => ratingFill('acb', 'MA/15+', radius, stroke)
