import { circle } from '../geometry'

// 圆点：画布正中一个实心小圆（半径 2，加上描边约 5 宽）；尖角模式下也保持圆形（不用会变方的 dot）
export default () => [{ d: circle(12, 12, 2), fill: true }]
