// 系列图标实心版的角标限制（只给 fill 用，描边版的角标大小不变）
// 实心版的角标四周让出 GAP 的缝，再朝外角整片让掉（见 solid.js 的 badgeFill）：角标太高、太宽时，让掉以后主体只剩贴着外框的一条细边
// （右上角标下面的一道窄条、右下角标上面的一道窄条），或者把立杆、尾巴、针尖连着的那段边也让掉了。
// 这里给 fitBadge 的 ok 条件：不满足时角标缩小一点再摆（fitBadge 每次缩 0.05 倍），直到剩下的主体够厚
import { GAP } from './clearance'
import { cornerScale, plus } from './symbols'

// 角标和外框之间剩下的主体至少这么厚：常规线宽下两个线宽，细线宽下不到 2.5 就显得是一根线
export const minLedge = stroke => stroke + 1.5

// 角标墨迹的外接框（中心线采样点外扩半个线宽；角标的线比外框细，这样算偏保守）
export function inkBox(shape, stroke) {
  const h = stroke / 2
  const xs = shape.pts.map(p => p[0])
  const ys = shape.pts.map(p => p[1])
  return [Math.min(...xs) - h, Math.min(...ys) - h, Math.max(...xs) + h, Math.max(...ys) + h]
}

// 右上角标：角标下面到主体下缘 bottom（墨迹）之间至少留 minLedge
export const ledgeBelow = (stroke, bottom) => s => bottom - inkBox(s, stroke)[3] - GAP >= minLedge(stroke) - 1e-6
// 右下角标：主体上缘 top（墨迹）到角标上面之间至少留 minLedge（slack：再放宽一点，判断「是不是细到非让掉不可」用）
export const ledgeAbove = (stroke, top, slack = 0) => s => inkBox(s, stroke)[1] - GAP - top >= minLedge(stroke) - slack - 1e-6
// 角标的让位区（连同朝外角拖出去的部分）不越过 x：立杆、尾巴根部、针尖要接在完整的主体上
export const leftOf = (stroke, x) => s => inkBox(s, stroke)[0] - GAP >= x - 1e-6

// 扁的符号（减号、省略号）按自己的墨迹贴到外框角上，就和外框的边贴成一条（中间只隔一道缝，读成断开的边、一排虚线的边）。
// 实心版改用加号的位置摆（fillSymbol 给 fitBadge 用），符号按自己的 cornerScale 画在加号的中心（fillDraw），浮在让出来的角上；
// 减号和加号的 cornerScale 相同，就是加号的那一横
// 感叹号是一根竖条，贴着右边就像右边断成了两截：摆放和画的时候都往里挪 INSET（右缘离外框 INSET），大小、上下位置照旧
const FLOAT = new Set(['minus', 'ellipsis'])
const INSET = 3
const inset = draw => (c, k, radius) => draw([c[0] - INSET, c[1]], k, radius)
export const fillSymbol = (name, draw) => (FLOAT.has(name) ? ['plus', plus] : name === 'exclaim' ? [name, inset(draw)] : [name, draw])
export function fillDraw(name, draw) {
  if (FLOAT.has(name))
    return (c, k, radius) => draw(c, k / cornerScale.plus * cornerScale[name], radius)
  return name === 'exclaim' ? inset(draw) : draw
}
