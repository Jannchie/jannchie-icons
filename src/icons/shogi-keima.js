import { SHOGI, shogi } from '../pieces'

// 将棋棋子：桂
export default ({ radius }) => shogi(SHOGI['keima'].strokes, radius)
