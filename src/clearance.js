// 角标与周围线条的间距：线条在离符号外形「可见间距 GAP」以内的部分被裁掉
// 中心线距离 = GAP + 线宽，这样不论线宽多少，看到的空隙都一样
export const GAP = 1

// 符号缩小放进文件夹、列表等系列图标时算作细节（缩放 < DETAIL_SCALE）
export const DETAIL_SCALE = 2

// 符号对齐像素网格（线宽 1 时横竖线的中心落在 .5 上）。grid 描述符号里的横竖线（未缩放、相对中心）：
// - unit：成对横竖边的间距，把 k 微调到让它缩放后是整数（两条边才能同时落在 .5 上）
// - x / y：一条关键竖线 / 横线的位置，需要时把中心挪到让它缩放后落在 .5 上
// 优先保持居中：在原缩放附近的几个整数间距里挑，能不挪中心就不挪（中心在 12 时取奇数间距，两条边落在 12 ± n.5 上），
// 其次缩放变化小（放大比缩小多算一点，免得符号变重）
// 已经对齐的符号（间距是整数、关键线在 .5 上）原样返回
// 正中的单线不为对齐挪半格（单独的图标和外框里的符号都一样）：偏半格一眼就看得出来，
// 那条单线落在整数上只在 1 倍屏 24 / 48px 下略虚（2 倍屏照样清晰）。差不到半格的照常对齐（挪 0.25 看不出来）；
// 放进外框里的符号只挑缩放时，中心在整数上优先奇数间距，成对的边仍落在 .5 上
const SHIFT_COST = 4 // 挪 1 格中心相当于间距变化 4 格
const GROW_COST = 1.25
export function snap(grid, c, k) {
  if (!grid)
    return { c, k }
  const nested = k < DETAIL_SCALE
  const fix = (v, at, s) => {
    if (at === undefined)
      return v
    const p = v + at * s
    const d = 0.5 - (p - Math.floor(p)) // (−0.5, 0.5]
    if (Math.abs(d) < 1e-6 || d > 0.5 - 1e-6)
      return v
    return v + d
  }
  const at = s => ({ c: [fix(c[0], grid.x, s), fix(c[1], grid.y, s)], k: s })
  if (!grid.unit)
    return at(k)
  const span = grid.unit * k
  // 不挪中心时，成对的边能否落在 .5 上取决于间距的奇偶：落不上的多算一点
  const offGrid = (x, n) => (Math.abs(((x + n / 2) % 1 + 1) % 1 - 0.5) > 1e-6 ? 2 : 0)
  const cost = ({ c: [x, y], k: s }) => {
    const n = s * grid.unit
    const d = n - span
    return (d > 0 ? d * GROW_COST : -d) + (Math.abs(x - c[0]) + Math.abs(y - c[1])) * SHIFT_COST + (nested ? offGrid(x, n) : 0)
  }
  const base = Math.round(span)
  const options = [base - 1, base, base + 1].filter(n => n >= 1).map(n => at(n / grid.unit))
  return options.reduce((a, b) => (cost(b) < cost(a) - 1e-6 ? b : a))
}

// 符号内部其他横竖线对齐：v 是未缩放坐标，ref 是一条已经对齐（缩放后落在 .5 上）的线，
// 让 v 与 ref 缩放后的距离取整（至少 min）
export const align = (v, ref, k, min = 0) => {
  const n = Math.round((v - ref) * k)
  return ref + Math.sign(v - ref) * Math.max(Math.abs(n), min) / k
}

// shape：{ box: [x0, y0, x1, y1] } 或 { circle: r }，相对符号中心、未缩放；带 grid 时按 snap 对齐后的中心和缩放算
export function place(shape, center, scale) {
  const { c: [cx, cy], k } = snap(shape.grid, center, scale)
  if (shape.circle)
    return { circle: shape.circle * k, c: [cx, cy] }
  const [x0, y0, x1, y1] = shape.box
  return { box: [cx + x0 * k, cy + y0 * k, cx + x1 * k, cy + y1 * k] }
}

// 一条轴对齐的线（axis='x' 表示水平线 y=at，'y' 表示竖线 x=at）上需要让出的区间，不相交返回 null
// shape 带 pts（符号实际画出来的中心线采样点，见 corner.js 的 fitBadge）时按真实墨迹算：每个离线不到 g 的点各让出一段，取并集的两端；
// 否则按 outlines 里近似的外形（圆或方框）算——外形框往往比墨迹大（对勾、云），按它断开线会断得太早
export function blocked(shape, axis, at, stroke) {
  const g = GAP + stroke
  if (shape.pts) {
    let [lo, hi] = [Infinity, -Infinity]
    for (const [x, y] of shape.pts) {
      const [d, m] = axis === 'x' ? [Math.abs(y - at), x] : [Math.abs(x - at), y]
      if (d >= g)
        continue
      const e = Math.sqrt(g * g - d * d)
      ;[lo, hi] = [Math.min(lo, m - e), Math.max(hi, m + e)]
    }
    return lo === Infinity ? null : [lo, hi]
  }
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

// 右上角有角标的矩形外框（-badge-top 变体）：从右边的断口出发，经右下、左下、左上，回到顶边的断口
export function rectAroundTop(shape, stroke, [l, t, r, b]) {
  const right = blocked(shape, 'y', r, stroke)
  const top = blocked(shape, 'x', t, stroke)
  return [[r, right ? right[1] : t], [r, b], [l, b], [l, t], [top ? top[0] : r, t]]
}
