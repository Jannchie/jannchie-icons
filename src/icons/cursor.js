import { crisp, rounded } from '../geometry'

// 光标：普通箭头。左边竖直，右上边 45°，尾巴斜伸；尖端固定小圆角
// 左边竖线在 6.5、底边横线在 13.5 上
export const pointer = [[6.5, 3], [6.5, 18], [10.25, 14.5], [12.75, 20], [15, 19], [12.5, 13.5], [17, 13.5]]

export default ({ radius }) => [
  rounded(pointer.map((p, i) => (i === 0 ? [...p, crisp(radius)] : p)), Math.min(radius, 1)),
]
