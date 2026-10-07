// 军用飞机图标共用：俯视平面图，机头朝右（和舰艇、坦克一致），机体轴是 y = 12
// 坐标按「机头朝上、轴 x = 12」来写（只写右半边的轮廓点，从机头沿右侧走到机尾，首尾两点落在轴上，镜像出左半边），
// 最后用 nose 整体顺时针转 90°：(x, y) → (24 - y, x)，.5 网格转完还在 .5 上
// 整组的设计语言：机身半宽 1.5（运输机 2.5），机头 3–4 格收成尖头；不画发动机等细碎零件，靠翼型（后掠 / 平直 / 三角 / 飞翼）、尾翼、机身粗细区分机种
import { rounded } from './geometry'
import { mirror, rotate } from './transform'

export const AXIS = 12

// half：[[x, y, r?], …]，第一个点是机头、最后一个点是机尾，都在 x = 12 上；r 单独指定该顶点的圆角（尖角写 0 或 crisp）
export function airframe(half, radius) {
  const left = half.slice(1, -1).reverse().map(([x, y, r]) => [2 * AXIS - x, y, r])
  // 轴上的点如果和左右两个镜像点连成一条直线（平直的机尾、平头），它不是拐角，去掉——留着会切出零长度的圆弧
  const pts = [...half, ...left].filter((p, i, all) => {
    const [a, b] = [all[(i - 1 + all.length) % all.length], all[(i + 1) % all.length]]
    return p[0] !== AXIS || Math.abs((p[0] - a[0]) * (b[1] - p[1]) - (p[1] - a[1]) * (b[0] - p[0])) > 1e-9
  })
  return rounded(pts, radius)
}

// 左右成对的部件：给右边那个，镜像出左边
export const pair = d => [d, mirror(d, AXIS)]

// 转成机头朝右：路径可以是字符串或 { d, … }
export const nose = paths => paths.map(p => (typeof p === 'string' ? rotate(p, 90) : { ...p, d: rotate(p.d, 90) }))
