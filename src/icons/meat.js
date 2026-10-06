import { rotate } from '../transform'

// 肉（鸡腿）：圆形肉块 + 骨头末端两个小鼓包；竖着画再顺时针转 45°，骨头朝左下
export default ({ radius }) => [
  rotate('M10.5 13.29A5.5 5.5 0 1 1 13.5 13.29V17.5A1.75 1.75 0 1 1 12 20A1.75 1.75 0 1 1 10.5 17.5Z', 45),
]
