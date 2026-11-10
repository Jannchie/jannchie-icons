import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 眼罩：两片相连的圆润眼片（4.5–19.5 × 7.5–16.5，下沿中间是鼻梁的缺口）+ 两侧的系带
// 眼片上各一道朝下弯的弧：闭着的眼。布做的东西，圆角固定，不跟全局圆角变尖（和 goggles 的硬壳镜罩区分开）
const body = rounded([[4.5, 7.5, 3.5], [19.5, 7.5, 3.5], [19.5, 16.5, 3.5], [14.5, 16.5, 2.5], [12, 13, 1.5], [9.5, 16.5, 2.5], [4.5, 16.5, 3.5]], 3)
const eyes = [
  { d: 'M6.75 11.25C7.5 12.25 9 12.25 9.75 11.25', detail: true },
  { d: 'M14.25 11.25C15 12.25 16.5 12.25 17.25 11.25', detail: true },
]
const straps = ['M4.5 11.5H2.5', 'M19.5 11.5H21.5']

export default () => [body, ...eyes, ...straps]

// 实心：眼片一块，闭着的眼挖空；系带照旧是线
export const fill = () => [solid(body), knock(eyes), ...straps]
