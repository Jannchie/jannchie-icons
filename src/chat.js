// 对话气泡类图标共用：圆角主体 + 左下角一个尾巴（只画外侧的 45° 斜边，轮廓不闭合）
// 墨迹框左右 2–22、上下 3–21，以画布中线对称：主体墨迹 2–22 × 3–17，尾尖墨迹到 21；
// 线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽。线宽 1 时主体四边都落在 .5 上
// 尾巴：主体底边往下 4、45° 斜下，尾尖在 x 6，斜边在底边上的起点（尾巴根部）x 10，给右下角标留出底边（尾尖、底边都随线宽各收半个线宽，落差不变）
import { blocked } from './clearance'
import { asBadge, fitBadge, roomBelow, roomOnBottom, roomOnRight } from './corner'
import { rounded } from './geometry'

function frame(stroke) {
  const h = stroke / 2
  const [l, t, r, b] = [2 + h, 3 + h, 22 - h, 17 - h]
  return { h, l, t, r, b, tip: [6, b + 4], root: 10 }
}

// 轮廓不闭合：从尾巴左侧的底边起，绕一圈回到尾巴，沿斜边到尾尖为止（尾巴左边那条竖边不画）
export function bubble(stroke) {
  const { l, t, r, b, tip, root } = frame(stroke)
  return [[tip[0], b], [l, b], [l, t], [r, t], [r, b], [root, b], tip]
}

// 主体中心，放居中符号用：顶边和底边各随线宽收半个线宽，中点不变
export const center = [12, 10]

// 角标：符号墨迹的右缘贴到 22，下缘贴到主体底边的外缘 17；右边和底边在离符号 GAP 处断开，所以轮廓分成两段：
// 尾巴左侧的底边 → 左下 → 左上 → 右上 → 右边断口；底边断口 → 尾巴斜边到尾尖
// 角标比普通角标大 GROW 倍，和文件夹一样（16px 下也认得出符号）；放不下时 fitBadge 再缩回去
const GROW = 1.3

export function withBadge(name, draw, tone, radius, stroke) {
  const { l, t, r, b, tip, root } = frame(stroke)
  const { k, at, shape } = fitBadge(name, draw, radius, stroke, { right: 22, bottom: 17 }, s => roomOnRight(stroke, r, t)(s) && roomOnBottom(stroke, b, root, 1)(s), GROW, 0.6)
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  // 底边在尾巴根部右边至少留 1，否则尾巴和气泡断开；拼图这类缩放吸在网格上、缩不下去的宽符号允许缩到普通大小的 0.6 倍
  // 宽的符号（云、拼图、左右箭头等，粗字重下更明显）断口会一直延伸到尾巴根部附近：底边剩下的不到 1 就不画，
  // 斜边直接从断口起（断口越过尾巴根部时，斜边也从断口的 x 处起，截掉被让开的那一小截）
  const end = bottom ? bottom[0] : r
  const tail = end >= root + 1 ? [[end, b], [root, b], tip] : [[Math.min(end, root), b + root - Math.min(end, root)], tip]
  return [
    rounded([[tip[0], b], [l, b], [l, t], [r, t], [r, right ? right[0] : b]], radius, false),
    rounded(tail, radius, false),
    ...asBadge(tone(draw(at, k, radius))),
  ]
}

// 右上角标（-badge-top）：符号墨迹的右缘贴到 22，上缘贴到主体顶边的外缘 3；顶边、右边在离符号 GAP 处断开，
// 轮廓分两段：尾巴左侧的底边 → 左下 → 左上 → 顶边断口；右边断口 → 右下 → 底边 → 尾巴斜边到尾尖
export function withBadgeTop(name, draw, tone, radius, stroke) {
  const { h, l, t, r, b, tip, root } = frame(stroke)
  // 顶边至少伸到画布中线 12，免得气泡只剩左上一个小角
  const { k, at, shape } = fitBadge(name, draw, radius, stroke, { right: 22, top: t - h }, (s) => {
    const c = blocked(s, 'x', t, stroke)
    return (!c || c[0] >= 12) && roomBelow(stroke, r, b)(s)
  }, GROW)
  const right = blocked(shape, 'y', r, stroke)
  const top = blocked(shape, 'x', t, stroke)
  return [
    rounded([[tip[0], b], [l, b], [l, t], [top ? top[0] : r, t]], radius, false),
    rounded([[r, right ? right[1] : t], [r, b], [root, b], tip], radius, false),
    ...asBadge(tone(draw(at, k, radius))),
  ]
}
