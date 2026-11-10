import { rounded } from '../geometry'
import { solid } from '../solid'
import { rotate } from '../transform'

// 手铐：一副，两只左右并排、提着链子挂下来——锁体在上、铐环在下，各自往外撇 TILT 度（两只平行着立正会像望远镜）
// 每只 = 一个不是正圆的铐环（底下大半个圆，往上两条切线收窄、插进锁体，像个水滴 / D 形）+ 环顶上一块实心的宽扁锁体
// 链子三节，拱在两个锁体上面：两个长圆链环（正对着看）+ 中间一节侧着的链环（画成短横线，两头顶在长圆链环的圆头上，不伸进环里），两头各用一小段斜线挂在锁体顶上
// 铐环墨迹的外缘固定（左右贴着 2 / 22），粗字重往里长；锁体是墨迹的外框，同样往里长
const OUTER = 4.25 // 铐环圆弧部分的墨迹外半径
const CY = 15.25 // 环心的高度
const TILT = 10
const [NECK, BASE, HALF, HEIGHT] = [1.25, 3.4, 2.75, 3] // 环臂进锁体处的半宽、环心到锁体下沿的距离、锁体墨迹的半宽和高
const [Y, W] = [6.5, 1.3] // 长圆链环的高度、半高
const [X0, X1, L] = [7.9, 16.1, 3.2] // 两个长圆链环的外端、链环的长

const f = v => +v.toFixed(3)
const turn = ([x, y], deg, [cx, cy]) => {
  const a = deg * Math.PI / 180
  return [f(cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a)), f(cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a))]
}

// 一只铐：先正着画（锁体在环的正上方），再绕环心转 deg
function cuff(cx, deg, stroke, radius) {
  const h = stroke / 2
  const r = OUTER - h
  // 环臂的上端（藏在锁体里半格）和它到圆的切点
  const [px, py] = [-NECK, -(BASE + 0.5)]
  const a = Math.atan2(py, px) - Math.acos(r / Math.hypot(px, py))
  const [tx, ty] = [f(r * Math.cos(a)), f(r * Math.sin(a))]
  const ring = `M${cx + px} ${CY + py}L${cx + tx} ${CY + ty}A${r} ${r} 0 1 0 ${cx - tx} ${CY + ty}L${cx - px} ${CY + py}`
  const [top, bottom] = [CY - BASE - HEIGHT + h, CY - BASE - h]
  const body = rounded([[cx - HALF + h, top], [cx + HALF - h, top], [cx + HALF - h, bottom], [cx - HALF + h, bottom]], Math.min(radius, 1))
  return { ring: rotate(ring, deg, [cx, CY]), body: rotate(body, deg, [cx, CY]), top: turn([cx, top], deg, [cx, CY]) }
}

const oval = x => `M${x + W} ${Y - W}H${x + L - W}A${W} ${W} 0 0 1 ${x + L - W} ${Y + W}H${x + W}A${W} ${W} 0 0 1 ${x + W} ${Y - W}Z`

function parts(stroke, radius) {
  const cuffs = [cuff(2 + OUTER, TILT, stroke, radius), cuff(22 - OUTER, -TILT, stroke, radius)]
  // 挂链：从锁体顶边的正中斜着接到长圆链环外端的圆头上
  const hang = (c, x) => `M${c.top.join(' ')}L${x} ${Y + W}`
  const chain = [
    oval(X0),
    oval(X1 - L),
    `M${X0 + L} ${Y}H${X1 - L}`,
    hang(cuffs[0], X0 + W - 0.6),
    hang(cuffs[1], X1 - W + 0.6),
  ].map(d => ({ d, detail: true }))
  return { cuffs, chain }
}

// 锁体在描边版里也是实心的一块（里面只剩 1 格多，画成空框在粗字重和 16px 下会糊死）
export default ({ stroke, radius }) => {
  const { cuffs, chain } = parts(stroke, radius)
  return [...cuffs.flatMap(c => [c.ring, { d: c.body, fill: true }]), ...chain]
}

// 实心：和描边版一样——锁体是实心块，铐环和链子是线
export const fill = ({ stroke, radius }) => {
  const { cuffs, chain } = parts(stroke, radius)
  return [...cuffs.flatMap(c => [c.ring, solid(c.body)]), ...chain]
}
