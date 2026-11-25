import { rounded } from '../geometry'
import { solid } from '../solid'

// 订书机（侧视，张开着）：底下一块平的底座（3.5–20.5 × 16.5–19.5）+ 上面一块往右上张开的压臂（楔形：左端窄、在铰轴处，右端宽、翘到 7.5）
// + 左端连着压臂和底座的铰轴（短竖线）
const base = radius => rounded([[3.5, 16.5], [20.5, 16.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 1.5))
const arm = radius => rounded([[3.5, 12], [19.5, 6.5], [20.5, 11], [3.5, 14.5]], Math.min(radius, 1.5))
const hinge = 'M5.5 14.1V16.5'

export default ({ radius }) => [base(radius), arm(radius), hinge]

// 实心：底座、压臂各一块；铰轴照旧是线
export const fill = ({ radius }) => [solid([base(radius), arm(radius)]), hinge]
