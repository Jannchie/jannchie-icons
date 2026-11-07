// 国际象棋棋子共用：底座（扁圆角方块）
import { rounded } from './geometry'
import { cutout, knock, solid } from './solid'

// 左右两边落在 6.5 / 17.5 上
export const base = radius => rounded([[6.5, 17.5], [17.5, 17.5], [17.5, 20.5], [6.5, 20.5]], Math.min(radius, 1))

// 实心版：各部件填实；部件之间的接缝都是水平的（joints：各图标自己的接缝高度，底座上沿 17.5 这里统一加），
// 每道接缝挖一条整条贯通的横缝（宽一个线宽，以接缝为中线）——不是两头带线帽、停在实心里的短槽，两边的部件各让一半，大小不变。
// details 是各部件里要挖空的细节
export const pieceFill = (radius, stroke, parts, joints = [], details = []) => [
  solid([...parts, base(radius)]),
  cutout([...joints, 17.5].map(y => `M0 ${y - stroke / 2}H24V${y + stroke / 2}H0Z`)),
  ...(details.length ? [knock(details)] : []),
]
