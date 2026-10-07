// 镜头（侧视，卡口在左、前端朝右）共用：只给上半边的轮廓点（从卡口左端到前端上角，x 递增），下半边按 y = 12 镜像；
// 前端镜片是一段向右鼓出 bulge 的圆弧。整体是一个闭合形状，没有线头
import { rounded } from './geometry'

const fmt = n => +n.toFixed(3)
export function lens(top, bulge, radius) {
  const r = Math.min(radius, 1)
  const [fx, fy] = top.at(-1)
  const half = 12 - fy
  const R = (half * half + bulge * bulge) / (2 * bulge) // 弦长 2·half、拱高 bulge 的圆半径
  const upper = rounded(top, r, false)
  const lower = rounded(top.map(([x, y]) => [x, 24 - y]).reverse(), r, false).replace(/^M[^A-Za-z]+/, '')
  return `${upper}A${fmt(R)} ${fmt(R)} 0 0 1 ${fx} ${24 - fy}${lower}Z`
}
