import { lens } from '../lens'
import { knock, solid } from '../solid'

// 饼干镜头（侧视，前端朝右）：很薄——卡口 + 一段又宽又短的镜筒（半高 5.5、长 8），前端镜片外鼓 1；镜筒正中一道环
// 卡口左端 6.5、镜片顶点 17.5，左右居中
export default ({ radius }) => [
  lens([[6.5, 9.5], [8.5, 9.5], [8.5, 6.5], [16.5, 6.5]], 1, radius),
  'M12.5 6.5V17.5',
]

// 实心：镜头填实，正中的环挖成一道槽；槽两端各离外缘一个线宽，镜筒不被切开
export const fill = ({ radius, stroke }) => [
  solid(lens([[6.5, 9.5], [8.5, 9.5], [8.5, 6.5], [16.5, 6.5]], 1, radius)),
  knock(`M12.5 ${6.5 + stroke}V${17.5 - stroke}`),
]
