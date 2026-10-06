// 勾叉类图标共用：圆圈、方框外框
import { circle, rounded } from './geometry'

export const ring = () => circle(12, 12, 9)
export const square = radius => rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], radius)
