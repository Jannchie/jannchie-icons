// 角标与周围线条的间距：线条在离符号外形「可见间距 GAP」以内的部分被裁掉
// 中心线距离 = GAP + 线宽，这样不论线宽多少，看到的空隙都一样
export const GAP = 1

// shape：{ box: [x0, y0, x1, y1] } 或 { circle: r }，相对符号中心、未缩放
export function place(shape, [cx, cy], k) {
  if (shape.circle)
    return { circle: shape.circle * k, c: [cx, cy] }
  const [x0, y0, x1, y1] = shape.box
  return { box: [cx + x0 * k, cy + y0 * k, cx + x1 * k, cy + y1 * k] }
}

// 一条轴对齐的线（axis='x' 表示水平线 y=at，'y' 表示竖线 x=at）上需要让出的区间，不相交返回 null
export function blocked(shape, axis, at, stroke) {
  const g = GAP + stroke
  if (shape.circle) {
    const [cx, cy] = shape.c
    const d = axis === 'x' ? Math.abs(at - cy) : Math.abs(at - cx)
    const reach = shape.circle + g
    if (d >= reach)
      return null
    const e = Math.sqrt(reach * reach - d * d)
    const m = axis === 'x' ? cx : cy
    return [m - e, m + e]
  }
  const [x0, y0, x1, y1] = shape.box
  const [lo, hi, a0, a1] = axis === 'x' ? [y0, y1, x0, x1] : [x0, x1, y0, y1]
  const d = Math.max(lo - at, at - hi, 0)
  if (d >= g)
    return null
  const e = Math.sqrt(g * g - d * d)
  return [a0 - e, a1 + e]
}

// 右下角有角标的矩形外框：从底边的断口出发，经左下、左上、右上，回到右边的断口，返回折线的点列
// （右边、底边在离角标 GAP 处断开，碰不到就画到角上）
export function rectAround(shape, stroke, [l, t, r, b]) {
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  return [[bottom ? bottom[0] : r, b], [l, b], [l, t], [r, t], [r, right ? right[0] : b]]
}
