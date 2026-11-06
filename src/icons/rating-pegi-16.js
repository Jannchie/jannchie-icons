import { rating, ratingFill } from '../rating'

// 内容分级：欧洲游戏 PEGI 16
export default ({ radius }) => rating('pegi', '16', radius)

export const fill = ({ radius, stroke }) => ratingFill('pegi', '16', radius, stroke)
