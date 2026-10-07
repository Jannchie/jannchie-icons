import { rounded } from '../geometry'

// 护目镜：一整片连体镜罩 + 两侧绑带
export default ({ radius }) => [
  rounded([[4.5, 8.5], [19.5, 8.5], [19.5, 15.5], [14.5, 15.5], [12, 13], [9.5, 15.5], [4.5, 15.5]], Math.min(radius, 2.5)),
  'M4.5 11.5H2.5',
  'M19.5 11.5H21.5',
]
