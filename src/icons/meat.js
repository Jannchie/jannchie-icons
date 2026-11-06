import { solid } from '../solid'
import { rotate } from '../transform'

// 肉（鸡腿）：圆形肉块 + 骨头末端两个小鼓包；竖着画再顺时针转 45°，骨头朝左下
// 肉块是圆心 (12, 8)、半径 5.5 的圆，骨头两边 x 10.5 / 13.5 从圆上 y 13.29 处伸出来
const MEAT = 'M10.5 13.29A5.5 5.5 0 1 1 13.5 13.29'
const BONE = 'V17.5A1.75 1.75 0 1 1 12 20A1.75 1.75 0 1 1 10.5 17.5'
export default ({ radius }) => [
  rotate(`${MEAT}${BONE}Z`, 45),
]

// 实心：只有肉块是实心，骨头保持描边（空心的骨头和实心的肉对比更清楚）
export const fill = () => [solid(rotate(`${MEAT}Z`, 45)), rotate(`M13.5 13.29${BONE}V13.29`, 45)]
