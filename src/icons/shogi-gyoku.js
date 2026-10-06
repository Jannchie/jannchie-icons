import { SHOGI, shogi } from '../pieces'

// 将棋棋子：玉
export default ({ radius }) => shogi(SHOGI['gyoku'].strokes, radius)
