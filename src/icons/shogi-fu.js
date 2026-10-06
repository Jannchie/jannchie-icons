import { SHOGI, shogi } from '../pieces'

// 将棋棋子：歩
export default ({ radius }) => shogi(SHOGI['fu'].strokes, radius)
