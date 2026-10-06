import { rounded } from '../geometry'

// 护目镜：一整片连体镜罩 + 两侧绑带
export default ({ radius }) => [
  rounded([[4.5, 8], [19.5, 8], [19.5, 16], [14.5, 16], [12, 13.5], [9.5, 16], [4.5, 16]], Math.min(radius, 2.5)),
  'M4.5 11H2.5',
  'M19.5 11H21.5',
]
