import { rating, ratingFill } from '../rating'

// 内容分级：澳大利亚 ACB M
export default ({ radius }) => rating('acb', 'M', radius)

export const fill = ({ radius, stroke }) => ratingFill('acb', 'M', radius, stroke)
