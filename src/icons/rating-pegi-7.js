import { rating, ratingFill } from '../rating'

// 内容分级：欧洲游戏 PEGI 7
export default ({ radius }) => rating('pegi', '7', radius)

export const fill = ({ radius, stroke }) => ratingFill('pegi', '7', radius, stroke)
