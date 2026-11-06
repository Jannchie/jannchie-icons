import { rounded } from '../geometry'
import { solid } from '../solid'

// 护目镜：一整片连体镜罩 + 两侧绑带
export default ({ radius }) => [
  rounded([[4.5, 8.5], [19.5, 8.5], [19.5, 15.5], [14.5, 15.5], [12, 13], [9.5, 15.5], [4.5, 15.5]], Math.min(radius, 2.5)),
  'M4.5 11.5H2.5',
  'M19.5 11.5H21.5',
]

// 实心：镜罩一块；绑带照旧是线
export const fill = ({ radius }) => [
  solid(rounded([[4.5, 8.5], [19.5, 8.5], [19.5, 15.5], [14.5, 15.5], [12, 13], [9.5, 15.5], [4.5, 15.5]], Math.min(radius, 2.5))),
  'M4.5 11.5H2.5',
  'M19.5 11.5H21.5',
]
