// 勾叉类图标共用：圆圈、方框外框
import { circle, rounded } from './geometry'

export const ring = () => circle(12, 12, 9)
export const square = radius => rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], radius)

// 横向标签：尖头朝左、尖头里一个穿孔；方正部分里放字的区域是 10.5–18.5 × 7.5–16.5（离外框中心线 3）
export const tagShape = radius => [rounded([[1.5, 12], [7.5, 4.5], [21.5, 4.5], [21.5, 19.5], [7.5, 19.5]], Math.min(radius, 2)), circle(6.5, 12, 1.25)]
