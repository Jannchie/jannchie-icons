import { rating, ratingFill } from '../rating'

// 内容分级：欧洲游戏 PEGI 3
export default ({ radius }) => rating('pegi', '3', radius)

export const fill = ({ radius, stroke }) => ratingFill('pegi', '3', radius, stroke)
