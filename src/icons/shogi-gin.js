import { SHOGI, shogi } from '../pieces'

// 将棋棋子：銀
export default ({ radius }) => shogi(SHOGI['gin'].strokes, radius)
