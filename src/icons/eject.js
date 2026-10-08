import { rounded } from '../geometry'

// 弹出：朝上的三角 + 下面一道横线；三角和播放类图标一样是 30° 斜边的等边三角（底宽 13，高 ≈ 11.3），
// 底边 15.5、横线 19.5 都落在 .5 上，两者同宽（5.5–18.5），整体 4.2–19.5 上下居中
const [l, r, base] = [5.5, 18.5, 15.5]
const h = (r - l) / 2 * Math.tan(Math.PI / 3)

export default ({ radius }) => [
  rounded([[l, base], [12, base - h], [r, base]], radius),
  `M${l} 19.5H${r}`,
]
