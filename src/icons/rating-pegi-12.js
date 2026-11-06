import { rating, ratingFill } from '../rating'

// 内容分级：欧洲游戏 PEGI 12
export default ({ radius }) => rating('pegi', '12', radius)

export const fill = ({ radius, stroke }) => ratingFill('pegi', '12', radius, stroke)
