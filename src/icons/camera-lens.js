import { lens } from '../lens'
import { knock, solid } from '../solid'

// 镜头（侧视，前端朝右）：左端窄的卡口段（3.5–6.5，半高 2.5），斜肩放大到镜筒（半高 4.5），前端镜片向右鼓出 2；
// 镜筒上一道对焦环（两道竖线）。斜肩和外鼓的镜片让它不像电池
export default ({ radius }) => [
  lens([[3.5, 9.5], [6.5, 9.5], [8.5, 7.5], [18.5, 7.5]], 2, radius),
  'M11.5 7.5V16.5M14.5 7.5V16.5',
]

// 实心：镜头填实，对焦环挖成两道槽；槽两端各离外缘一个线宽，镜筒不被切开
export const fill = ({ radius, stroke }) => [
  solid(lens([[3.5, 9.5], [6.5, 9.5], [8.5, 7.5], [18.5, 7.5]], 2, radius)),
  knock([11.5, 14.5].map(x => `M${x} ${7.5 + stroke}V${16.5 - stroke}`)),
]
