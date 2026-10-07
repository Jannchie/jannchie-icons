// 国际象棋棋子共用：底座（扁圆角方块）
import { rounded } from './geometry'

// 左右两边落在 6.5 / 17.5 上
export const base = radius => rounded([[6.5, 17.5], [17.5, 17.5], [17.5, 20.5], [6.5, 20.5]], Math.min(radius, 1))
