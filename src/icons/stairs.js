import { rounded } from '../geometry'

// 楼梯：朝右上升的四级台阶，右边和底边收成闭合轮廓。外框 3.5–20.5 居中，四级等宽等高只能是 4.25，
// 所以台阶的内折线不在 .5 网格上（已记入 audit-grid 基线）
export const steps = [[3.5, 20.5], [3.5, 16.25], [7.75, 16.25], [7.75, 12], [12, 12], [12, 7.75], [16.25, 7.75], [16.25, 3.5], [20.5, 3.5], [20.5, 20.5]]
export default ({ radius }) => [rounded(steps, Math.min(radius, 1))]
