import { crisp, rounded } from '../geometry'

// 光标：普通箭头。左边竖直，右上边 45°，尾巴斜伸；尖端固定小圆角
export const pointer = [[6.75, 3.5], [6.75, 18.5], [10.5, 15], [13, 20.5], [15.25, 19.5], [12.75, 14], [17.25, 14]]

export default ({ radius }) => [
  rounded(pointer.map((p, i) => (i === 0 ? [...p, crisp(radius)] : p)), Math.min(radius, 1)),
]
