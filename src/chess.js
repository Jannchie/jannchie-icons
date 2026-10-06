// 国际象棋棋子共用：底座（扁圆角方块）
import { rounded } from './geometry'

export const base = radius => rounded([[6, 17.5], [18, 17.5], [18, 20.5], [6, 20.5]], Math.min(radius, 1))
