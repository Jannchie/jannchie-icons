import { SHOGI, shogi, shogiFill } from '../pieces'

// 将棋棋子：王
export default ({ radius }) => shogi(SHOGI['ou'].strokes, radius)

// 实心：棋子填实，字挖空
export const fill = ({ radius }) => shogiFill(SHOGI['ou'].strokes, radius)
