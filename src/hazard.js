// 警告标志（参照 ISO 7010 的 W 系列）：尖头朝上的三角框 + 框里的危险源；键的顺序就是预览页的顺序
// 三角比 alert-triangle 大一圈（底边 21、高 18），内切圆圆心 (12, 14.5)、半径约 6，内容放在半径 4.5 以内，标成细节（粗字重下线宽封顶）
// 线头离外框中心线至少留 2：再近的话，粗字重下端点吸附（snapEnds）会把线头拉到框上
// 能复用的图形直接把整图标缩小搬进来（缩放后圆角、点不再随全局参数）
import { rounded } from './geometry'
import { detail, flame } from './ghs'
import { dot, eye } from './scene'
import { affine } from './transform'
import biohazard from './icons/biohazard'
import magnet from './icons/magnet'
import zap from './icons/zap'

const CX = 12
const CY = 14.5
const frame = radius => rounded([[12, 2.5], [22.5, 20.5], [1.5, 20.5]], Math.min(radius, 2.5))
// 把画在 24 格中心 (12, 12) 附近的图形缩小 k 倍，挪到内切圆中心（再偏 dy）
const shrink = (paths, k, dy = 0) => paths.map((p) => {
  const d = typeof p === 'string' ? p : p.d
  const moved = affine(d, k, k, CX - 12 * k, CY + dy - 12 * k)
  return typeof p === 'string' ? detail(moved) : { ...p, d: moved, ...(p.dot ? { dot: p.dot * Math.max(k, 0.75) } : { detail: true }) }
})

// 一道竖着的波浪（热气）：从 (x, y0) 往上画到 y1，三个半波
const wave = (x, y0, y1) => {
  const h = (y0 - y1) / 3
  const half = (y, k) => `C${x + k} ${y - h / 3} ${x + k} ${y - h * 2 / 3} ${x} ${y - h}`
  return `M${x} ${y0}${half(y0, 1)}${half(y0 - h, -1)}${half(y0 - 2 * h, 1)}`
}

export const HAZARD = {
  // 触电：闪电
  'electric': { zh: '当心触电', paths: r => shrink(zap({ radius: r }), 0.45, 0.25) },
  // 易燃：火焰
  'flammable': { zh: '当心火灾', paths: () => [detail(flame(12, 18.5, 0.85))] },
  // 爆炸：中心炸开的星芒
  'explosive': {
    zh: '当心爆炸',
    paths: () => [detail(rounded(Array.from({ length: 16 }, (_, i) => {
      const a = Math.PI * (i / 8 - 0.5)
      const r = i % 2 ? 2.25 : 4.5
      return [CX + Math.cos(a) * r, CY + 0.5 + Math.sin(a) * r * 0.9]
    }), 0.25))],
  },
  // 有毒：骷髅 + 交叉骨（和 GHS 急性毒性同一个造型，整体下移）
  'toxic': {
    zh: '当心中毒',
    paths: () => [
      detail('M9 12A3 3 0 1 1 15 12V13.5H9Z'),
      eye(10.75, 11.25, 1.5),
      eye(13.25, 11.25, 1.5),
      detail('M8.5 15L15.5 18.5'),
      detail('M15.5 15L8.5 18.5'),
    ],
  },
  // 腐蚀：试管往下滴液，落在缺了一块的金属条上
  'corrosive': {
    zh: '当心腐蚀',
    paths: r => [
      detail(rounded([[8.5, 10], [14, 12.75], [13.25, 14.25], [7.75, 11.5]], Math.min(r, 1))),
      dot(14.75, 15.75, 1.5),
      detail('M8.5 18.5H13.5L14.75 17.5L16 18.5'),
    ],
  },
  // 电离辐射：辐射标志
  // 电离辐射：三片 60° 扇形叶片（内半径 2.25、外半径 4.5，圆心略高于内切圆心），不带中心点——
  // 直接缩小整个 radioactive 的话，叶片内角挨得太近、中心点贴住叶片，常规线宽下粘成一团
  'radiation': {
    zh: '当心电离辐射',
    paths: () => [-90, 30, 150].map((mid) => {
      const [r0, r1, cy] = [2.25, 4.5, CY]
      const p = (r, deg) => `${+(CX + r * Math.cos(deg * Math.PI / 180)).toFixed(3)} ${+(cy + r * Math.sin(deg * Math.PI / 180)).toFixed(3)}`
      const [a, b] = [mid - 30, mid + 30]
      return detail(`M${p(r0, a)}L${p(r1, a)}A${r1} ${r1} 0 0 1 ${p(r1, b)}L${p(r0, b)}A${r0} ${r0} 0 0 0 ${p(r0, a)}Z`)
    }),
  },
  // 生物危害：生化标志
  'biohazard': { zh: '当心感染', paths: () => shrink(biohazard(), 0.42, -0.25) },
  // 激光：左边一个四条直径交叉成的星芒光源，水平那条一直向右伸成光束（同一条路径里交叉，finalize 不会断开）
  'laser': {
    zh: '当心激光',
    paths: () => [detail([45, 90, 135].map((deg) => {
      const a = deg * Math.PI / 180
      const [c, s] = [Math.cos(a) * 2.75, Math.sin(a) * 2.75]
      return `M${10 - c} ${15.5 - s}L${10 + c} ${15.5 + s}`
    }).join('') + 'M7.25 15.5H16.5')],
  },
  // 磁场：马蹄磁铁
  'magnetic': { zh: '当心磁场', paths: () => shrink(magnet(), 0.42, 0.25) },
  // 高温表面：一条表面线，上面三道热气
  'hot': { zh: '当心烫伤', paths: () => [detail('M8 18.5H16'), ...[9.5, 12, 14.5].map(x => detail(wave(x, 16.5, 10.5)))] },
  // 低温：雪花
  'cold': {
    zh: '当心低温',
    paths: () => [detail([0, 60, 120].map((deg) => {
      const a = deg * Math.PI / 180
      const [c, s] = [Math.cos(a) * 3.5, Math.sin(a) * 3.5]
      return `M${CX - s} ${CY + 0.25 - c}L${CX + s} ${CY + 0.25 + c}`
    }).join(''))],
  },
}

export const hazardFrame = frame
