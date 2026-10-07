// 军衔：士兵 / 士官是臂章上的 V 形（chevron）+ 下方的弧（rocker），军官是竖放的肩章 + 纵杠 + 星
// 士兵按美军陆军的进阶：E-6 上士 3 道 V + 1 道弧，E-8 军士长 3 + 3，E-9 总军士长 3 + 3 中间加一颗星
// 军官按尉 / 校 / 将三级：尉官 1 杠、校官 2 杠、将官无杠但肩章多一圈内框（象征将官肩章的刺绣边），每级 1–3 星
import { rounded } from './geometry'

// ---------- 士兵 / 士官 ----------
// V：尖在 (12, y)，两翼到 (5, y + RISE) 和 (19, y + RISE)；整组的宽度、角度都一样
// 相邻两道 V、两道弧都隔 STEP：bold（线宽 2）下中间还空 1
const [LEFT, RIGHT, RISE, STEP] = [5, 19, 4.5, 3]
// 弧：两端和最下面那道 V 的两翼末端齐平，中间下垂 SAG；第一道弧和最下面那道 V 画成一条闭合路径（「眼」形），
// 接点是转角而不是两个线头斜着对接——对接的线头在尖角、加粗时会从接点外侧冒出来
const SAG = 3
const chevron = y => `M${LEFT} ${y + RISE}L12 ${y}L${RIGHT} ${y + RISE}`
const rocker = y => `M${LEFT} ${y}Q12 ${y + SAG * 2} ${RIGHT} ${y}`
const eye = y => `M${LEFT} ${y + RISE}L12 ${y}L${RIGHT} ${y + RISE}Q12 ${y + RISE + SAG * 2} ${LEFT} ${y + RISE}Z`
// 星：实心五角星，R 外接圆半径，(x, y) 是外接圆圆心
const starAt = (x, y, R) => {
  const r = R * 0.45
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + i * Math.PI / 5
    const d = i % 2 ? r : R
    return [x + Math.cos(a) * d, y + Math.sin(a) * d]
  })
  // 尖角模式下也用圆角：这么小的星，尖角斜接会被斜接上限切平，反而缩成一个圆点
  return { d: `M${pts.map(p => p.map(v => +v.toFixed(3)).join(' ')).join('L')}Z`, fill: true, detail: true, round: true }
}

// chevrons 道 V、rockers 道弧，整体竖直居中；star 时在最下面那道 V 和第一道弧之间放一颗星
export function enlisted(chevrons, rockers = 0, star = false) {
  const vSpan = RISE + STEP * (chevrons - 1)
  // 弧的下垂量：二次贝塞尔中点下垂 SAG（控制点下垂 2·SAG）
  const height = vSpan + (rockers ? SAG + STEP * (rockers - 1) : 0)
  const top = Math.round((12 - height / 2) * 2) / 2
  const paths = Array.from({ length: chevrons }, (_, i) => (rockers && i === chevrons - 1 ? eye : chevron)(top + STEP * i))
  const end = top + vSpan // 最下面那道 V 的两翼末端
  for (let i = 1; i < rockers; i++)
    paths.push(rocker(end + STEP * i))
  // 眼里的星：外接圆半径 1.5，竖直放在眼的上下两端（V 尖、弧底）正中，再下移 0.25（五角星的视觉中心偏上）
  if (star)
    paths.push(starAt(12, (end - RISE + end + SAG) / 2 + 0.25, 1.5))
  return paths
}

// ---------- 军官肩章 ----------
// 肩板：6.5–17.5 宽 11，底边 21.5，两侧竖到 8，往上 45° 收成钝尖 (12, 2.5)；纽扣在尖下 (12, 6)
const BOARD = [[6.5, 21.5], [6.5, 8], [12, 2.5], [17.5, 8], [17.5, 21.5]]
const board = radius => rounded(BOARD, Math.min(radius, 1.5))
const button = { d: 'M12 6h0', dot: 2 }
// 将官的内框：往里缩 2（两侧 8.5 / 15.5，尖在 (12, 2.5 + 2√2)），用细线——缩 2 时和外框之间粗体下还空 0.3，
// 尖又抬得够高，最上面那颗星的上臂离内框的斜边常规下也有 0.5 以上；底边不封口，两侧直接落到肩板底边
const IN = 2
const apex = 2.5 + IN * Math.SQRT2
const inner = radius => ({ d: rounded([[6.5 + IN, 21.5], [6.5 + IN, apex + 5.5 - IN], [12, apex], [17.5 - IN, apex + 5.5 - IN], [17.5 - IN, 21.5]], Math.min(radius, 1), false), thin: true })
// 星沿中线从上往下排，外接圆半径 1.2、间隔 4.25：星的描边（细节，线宽封顶 1.5）算进去后，
// 相邻两颗星之间、星和纽扣 / 底边 / 两侧杠 / 将官内框之间，常规下都留 0.5 以上的缝，粗体下 0.25 以上
const STAR_Y = [9.75, 14, 18.25]
const STAR_R = 1.2

// tier：'junior' 尉官（1 杠在中线上，星压在杠上）、'field' 校官（2 杠在两侧，星在中间）、'general' 将官（无杠，内框）
export function officer(tier, stars, radius) {
  const ys = STAR_Y.slice(0, stars)
  const paths = [board(radius)]
  if (tier === 'general') {
    // 将官的纽扣挪不进内框的尖里，省掉
    paths.push(inner(radius))
  }
  else {
    paths.push(button)
  }
  if (tier === 'junior') {
    // 中线上的杠：从纽扣下面（8.5，粗体下也和纽扣分得开）一直到底边，星压在杠上（星缀在杠上是尉官肩章的样子）
    paths.push({ d: 'M12 8.5V21.5', thin: true })
  }
  if (tier === 'field')
    paths.push({ d: 'M9 9V21.5M15 9V21.5', thin: true })
  paths.push(...ys.map(y => starAt(12, y, STAR_R)))
  return paths
}
