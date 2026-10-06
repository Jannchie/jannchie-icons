import { SHOGI, shogi } from '../pieces'

// 将棋棋子：飛
export default ({ radius }) => shogi(SHOGI['hisha'].strokes, radius)
