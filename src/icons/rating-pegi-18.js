import { rating, ratingFill } from '../rating'

// 内容分级：欧洲游戏 PEGI 18
export default ({ radius }) => rating('pegi', '18', radius)

export const fill = ({ radius, stroke }) => ratingFill('pegi', '18', radius, stroke)
