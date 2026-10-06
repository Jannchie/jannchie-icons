import { SHOGI, shogi } from '../pieces'

// 将棋棋子：王
export default ({ radius }) => shogi(SHOGI['ou'].strokes, radius)
