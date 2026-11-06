// 国际象棋棋子共用：底座（扁圆角方块）
import { rounded } from './geometry'
import { knock, solid } from './solid'

// 左右两边落在 6.5 / 17.5 上
export const base = radius => rounded([[6.5, 17.5], [17.5, 17.5], [17.5, 20.5], [6.5, 20.5]], Math.min(radius, 1))

// 实心版：各部分填实，部件相接处挖一道缝（joints：各图标自己的接缝，底座上沿的缝这里统一加），不糊成一整块
// 底座上沿的缝按底座全宽挖：只挖身子那一段的话，底座两端会各剩一截凸起
export const pieceFill = (radius, parts, joints = []) => [solid([...parts, base(radius)]), knock([...joints, 'M6.5 17.5H17.5'])]
