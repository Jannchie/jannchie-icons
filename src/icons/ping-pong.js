import { circle, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 乒乓球拍：右上的大圆拍面 + 拍面靠拍柄一侧的一道弦线（胶皮的直边，球拍最有辨识度的特征）
// + 往左下伸出的短而宽的圆角拍柄：两条侧边从拍面的圆上直接长出来，和拍面连成一体
// 拍柄朝左下（和 🏓 一致），刻意和柄朝右下的放大镜区分开；右下一颗球
export default ({ radius }) => [
  circle(13, 9.75, 7.25),
  'M5.78 8.93L13.82 16.97',
  rounded([[9.27, 15.96], [5.74, 19.49], [3.26, 17.01], [6.79, 13.48]], Math.min(radius, 1), false),
  circle(19.5, 19.5, 1.75),
]

// 实心：拍面、拍柄合成一块，挖掉胶皮的直边；球是实心圆
export const fill = ({ radius, stroke }) => [
  solid(circle(13, 9.75, 7.25)),
  solid(rounded([[9.27, 15.96], [5.74, 19.49], [3.26, 17.01], [6.79, 13.48]], Math.min(radius, 1))),
  // 两端各多伸一个线宽，把拍面切干净
  knock(`M${5.78 - stroke * Math.SQRT1_2} ${8.93 - stroke * Math.SQRT1_2}L${13.82 + stroke * Math.SQRT1_2} ${16.97 + stroke * Math.SQRT1_2}`),
  solid(circle(19.5, 19.5, 1.75)),
]
