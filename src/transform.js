// 路径的整体变换（旋转、缩放、镜像、平移、仿射）：先解析成绝对坐标，再逐点变换后重新输出
import { parse } from './svg'

const fmt = p => `${p[0]} ${p[1]}`

// 共用骨架：pt 变换每个点；arc 修正圆弧的 [rx, ry, 倾角, 大弧, 方向] 五个参数（终点照常走 pt）
export function mapPath(d, pt, arc = v => v) {
  return parse(d, true).map(([type, v]) => {
    if (type === 'Z')
      return 'Z'
    if (type === 'A')
      return `A${arc(v.slice(0, 5)).join(' ')} ${fmt(pt([v[5], v[6]]))}`
    const pts = []
    for (let i = 0; i < v.length; i += 2)
      pts.push(fmt(pt([v[i], v[i + 1]])))
    return type + pts.join(' ')
  }).join('')
}

// 绕 (cx, cy) 顺时针旋转 deg 度（屏幕坐标，y 向下）；椭圆弧的 x 轴倾角跟着加 deg（正圆弧加了也不影响）
export function rotate(d, deg, [cx, cy] = [12, 12]) {
  const a = deg * Math.PI / 180
  const [c, s] = [Math.cos(a), Math.sin(a)]
  return mapPath(
    d,
    ([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c],
    ([rx, ry, phi, fa, fs]) => [rx, ry, phi + deg, fa, fs],
  )
}

// 仿射：x → x·sx + dx、y → y·sy + dy；圆弧半径分别乘 |sx|、|sy|；只有一个轴翻转时，绕向和椭圆倾角都反过来
export function affine(d, sx, sy, dx, dy) {
  const flip = sx * sy < 0
  return mapPath(
    d,
    ([x, y]) => [x * sx + dx, y * sy + dy],
    ([rx, ry, phi, fa, fs]) => [rx * Math.abs(sx), ry * Math.abs(sy), flip ? -phi : phi, fa, flip ? 1 - fs : fs],
  )
}

// 以 (cx, cy) 为中心等比缩放 s 倍（圆弧半径跟着缩放）
export const scale = (d, s, [cx, cy] = [12, 12]) => affine(d, s, s, cx - cx * s, cy - cy * s)
// 绕竖直线 x = cx 左右镜像
export const mirror = (d, cx = 12) => affine(d, -1, 1, 2 * cx, 0)
// 整体平移 (dx, dy)
export const translate = (d, dx, dy) => affine(d, 1, 1, dx, dy)
