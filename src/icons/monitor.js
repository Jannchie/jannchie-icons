import { fillParts, plain } from '../monitor'
import { plainFill } from '../solid'

// 显示器：屏幕 + 立杆 + 底座
export default ({ radius, stroke }) => plain(radius, stroke)

// 实心：屏幕一块，立杆和底座照旧是线（见 monitor.js 的 fillParts）
export const fill = ({ radius, stroke }) => plainFill(fillParts(radius, stroke))
