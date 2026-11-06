import { circle } from '../geometry'
import { solid } from '../solid'

// 搜索：镜片在左上 + 45° 手柄伸向右下
// 对角线统一按左上 → 右下（与划掉、禁止的斜线同向，也是主流图标库的惯例）
export default () => [
  circle(10.5, 10.5, 6.5),
  'M15.25 15.25L20.5 20.5',
]

// 实心：镜片是一块圆片
export const fill = () => [solid(circle(10.5, 10.5, 6.5)), 'M15.25 15.25L20.5 20.5']
