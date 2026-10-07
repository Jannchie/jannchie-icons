// 定位针类图标共用（系列）：水滴形针体 + 中心小圆。比单独的 map-pin 小一圈、往左挪（头部圆心 (10.5, 9.5) 半径 6.5，针尖 (10.5, 21.5)），
// 给右下角标让出地方：角标的遮挡框只切到针体右下的曲线，碰不到中心小圆
// 右下角标：针体右下是一段收向针尖的曲线，没有横平竖直的边可以按区间断开，和盾牌系列一样
// 用一个隐藏的遮挡框：角标外形外扩一圈，框里的针线删掉、框边附近的线断开（clip 按 GAP + 线宽留缝），断口比只让符号本身去切宽得多
import { circle } from './geometry'
import { place } from './clearance'
import { badge } from './folder'
import { cornerScale, outlines } from './symbols'

export const plain = () => [
  'M10.5 21.5C10.5 21.5 4 15.5 4 9.5A6.5 6.5 0 0 1 17 9.5C17 15.5 10.5 21.5 10.5 21.5Z',
  circle(10.5, 9.5, 2.25),
]

// 角标版：针 + 遮挡框 + 角标符号（符号本身也是刀，不会被遮挡框删掉）
export function withBadge(name, draw, tone, radius) {
  const k = cornerScale[name]
  const shape = place(outlines[name], badge, k)
  const [x0, y0, x1, y1] = shape.circle
    ? [shape.c[0] - shape.circle, shape.c[1] - shape.circle, shape.c[0] + shape.circle, shape.c[1] + shape.circle]
    : shape.box
  const hole = { d: `M${x0} ${y0}H${x1}V${y1}H${x0}Z`, cut: true, hidden: true, occlude: true }
  return [...plain(), hole, ...tone(draw(badge, k, radius)).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true }))]
}
