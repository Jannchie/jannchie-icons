// X（原 Twitter）标志：一条描边的粗斜杠从左上到右下，一条细线从左下到右上，在粗斜杠处断开（参考 Tabler 的 brand-x 画法）
// 粗斜杠是平行四边形：上下边贴 2 的留白、往里长；左上角 x 4、右下角 x 20，上下边各宽 4.5
// 细线是斜线，两端伸到离边 1.5（见 design.md），只画到粗斜杠的两条长边为止，和粗斜杠的描边连在一起
const cross = ([ax, ay], [bx, by], [cx, cy], [dx, dy]) => {
  // 直线 AB 与直线 CD 的交点
  const d = (ax - bx) * (cy - dy) - (ay - by) * (cx - dx)
  const t = ((ax - cx) * (cy - dy) - (ay - cy) * (cx - dx)) / d
  return [ax + t * (bx - ax), ay + t * (by - ay)]
}
const fmt = n => Math.round(n * 1000) / 1000
const pt = p => `${fmt(p[0])} ${fmt(p[1])}`

export default ({ stroke }) => {
  const h = stroke / 2
  const top = 2 + h
  const bottom = 22 - h
  const tl = [4, top]
  const tr = [8.5, top]
  const br = [20, bottom]
  const bl = [15.5, bottom]
  const lo = [4.5, 21.5]
  const hi = [19.5, 2.5]
  return [
    `M${pt(tl)}H${fmt(tr[0])}L${pt(br)}H${fmt(bl[0])}Z`,
    `M${pt(lo)}L${pt(cross(lo, hi, tl, bl))}`,
    `M${pt(hi)}L${pt(cross(lo, hi, tr, br))}`,
  ]
}
