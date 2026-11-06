import { rating, ratingFill } from '../rating'

// 内容分级：澳大利亚 ACB X18+
export default ({ radius }) => rating('acb', 'X/18+', radius)

export const fill = ({ radius, stroke }) => ratingFill('acb', 'X/18+', radius, stroke)
