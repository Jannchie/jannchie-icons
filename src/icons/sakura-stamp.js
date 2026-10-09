import { circle } from '../geometry'

// 桜スタンプ（「よくできました」那种樱花印）：五瓣樱花轮廓（每瓣瓣尖一个小 V 形缺口）+ 中间一个小圆花心
// 每瓣在自己的局部坐标里画（u 横向、v 沿瓣轴往外），左半边一段三次曲线：
// 从瓣间分界点（半径 4、离瓣轴 36°）出发，先几乎顺着半径往外走（瓣根窄，相邻两瓣之间留出 V 形的谷），
// 再向外张开成圆鼓鼓的瓣肩，收进瓣尖缺口（离瓣尖外缘 1 深）；右半边镜像
// 瓣尖外缘固定在离圆心约 10.15（墨迹顶 2.05；线宽变粗往里长）；五瓣上下不对称（顶上是瓣尖、底下是两瓣），圆心放在 (12, 12.2) 让墨迹上下居中
const fmt = n => String(Math.round(n * 1000) / 1000)
const pt = ([x, y]) => `${fmt(x)} ${fmt(y)}`
const [CX, CY, VALLEY] = [12, 12.2, 4]

export default ({ stroke }) => {
  const R = 10.85 - stroke / 2
  const [s, c] = [Math.sin(Math.PI / 5), Math.cos(Math.PI / 5)]
  const left = [[-VALLEY * s, VALLEY * c], [-VALLEY * s - 1.2, VALLEY * c + 2.6], [-5, R + 0.6], [0, R - 1]]
  const petal = [...left, ...left.slice(0, 3).reverse().map(([u, v]) => [-u, v])]
  // 局部坐标 → 画布：瓣轴方向 (cos a, sin a)，u 的正方向 (-sin a, cos a)
  const place = (deg, [u, v]) => {
    const a = deg * Math.PI / 180
    return [CX + v * Math.cos(a) - u * Math.sin(a), CY + v * Math.sin(a) + u * Math.cos(a)]
  }
  const d = Array.from({ length: 5 }, (_, i) => {
    const q = petal.map(p => place(-90 + i * 72, p))
    return `${i ? '' : `M${pt(q[0])}`}C${pt(q[1])} ${pt(q[2])} ${pt(q[3])}C${pt(q[4])} ${pt(q[5])} ${pt(q[6])}`
  }).join('')
  return [`${d}Z`, circle(CX, CY, 1.5)]
}
