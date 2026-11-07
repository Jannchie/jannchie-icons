import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 牛奶（纸盒）：顶上的封口 + 尖顶盒身 + 肩线 + 一道波浪标签
export default ({ radius }) => [
  rounded([[8.5, 5.5], [8.5, 2.5], [15.5, 2.5], [15.5, 5.5]], Math.min(radius, 1), false),
  rounded([[8.5, 5.5], [15.5, 5.5], [17.5, 9.5], [17.5, 20.5], [6.5, 20.5], [6.5, 9.5]], Math.min(radius, 1.5)),
  'M6.5 9.5H17.5',
  'M6.5 15C8.33 14 10.17 16 12 15C13.83 14 15.67 16 17.5 15',
]

// 实心：封口、盒身各一块，中间挖开一道缝；肩线整条挖穿，尖顶和盒身分成两块；波浪标签同样两头穿出盒身
export const fill = ({ radius, stroke }) => {
  const [u, v] = [1.83, 1].map(c => c / Math.hypot(1.83, 1) * stroke)
  return [
    solid(rounded([[8.5, 5.5], [8.5, 2.5], [15.5, 2.5], [15.5, 5.5]], Math.min(radius, 1))),
    solid(rounded([[8.5, 5.5], [15.5, 5.5], [17.5, 9.5], [17.5, 20.5], [6.5, 20.5], [6.5, 9.5]], Math.min(radius, 1.5))),
    knock([
      `M${8.5 - stroke} 5.5H${15.5 + stroke}`,
      `M${6.5 - stroke} 9.5H${17.5 + stroke}`,
      // 波浪两端顺着切线往外多伸一个线宽，把盒身切干净
      `M${6.5 - u} ${15 + v}L6.5 15C8.33 14 10.17 16 12 15C13.83 14 15.67 16 17.5 15L${17.5 + u} ${15 - v}`,
    ]),
  ]
}
