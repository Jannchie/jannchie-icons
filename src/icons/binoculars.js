import { circle } from '../geometry'

// 双筒望远镜（平面）：两个大镜片 + 比镜片窄、顶部全圆的短镜筒 + 中间横梁
const y = 14.5 // 镜片圆心高度
// 镜筒宽 2d 取整数 6，两侧竖边才能落在 .5 上；镜片半径随之取 3√2 ≈ 4.24
const d = 3 // 镜筒两侧接在镜片左上、右上 45° 处
const r = d / Math.SQRT1_2
const top = 6
const barrel = cx => `M${cx - d} ${y - d}V${top + d}A${d} ${d} 0 0 1 ${cx + d} ${top + d}V${y - d}`
const [lx, rx] = [6.5, 17.5]

export default () => [
  circle(lx, y, r),
  circle(rx, y, r),
  barrel(lx),
  barrel(rx),
  `M${lx + d} 9.5H${rx - d}`,
]
