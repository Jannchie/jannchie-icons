import { rating, ratingFill } from '../rating'

// 内容分级：澳大利亚 ACB G
export default ({ radius }) => rating('acb', 'G', radius)

export const fill = ({ radius, stroke }) => ratingFill('acb', 'G', radius, stroke)
