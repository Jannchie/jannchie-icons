import { bezierAt, bezierSub } from '../clip'
import { HEART } from './heart'

// 虚线爱心（空状态、还没解锁）：heart 的轮廓按弧长等分成 8 段虚线，段与段之间留空（同 dashed-circle 的比例）；
// 第一段跨在底尖上、第五段跨在顶上的凹口上，左右对称，尖和凹口都画得出来
const DASHES = 8
const RATIO = 0.62 // 一个周期里画出来的部分
const nums = HEART.match(/-?[\d.]+/g).map(Number)
const curves = []
for (let i = 2, from = nums.slice(0, 2); i < nums.length; i += 6) {
  const ps = [from, [nums[i], nums[i + 1]], [nums[i + 2], nums[i + 3]], [nums[i + 4], nums[i + 5]]]
  curves.push(ps)
  from = ps[3]
}
// 每段曲线的累计弧长表
const N = 64
const tables = curves.map((ps) => {
  const acc = [0]
  for (let i = 1, prev = ps[0]; i <= N; i++) {
    const p = bezierAt(ps, i / N)
    acc.push(acc.at(-1) + Math.hypot(p[0] - prev[0], p[1] - prev[1]))
    prev = p
  }
  return acc
})
const total = tables.reduce((sum, acc) => sum + acc.at(-1), 0)
// 弧长 s 在这段曲线上对应的参数 t
const tAt = (acc, s) => {
  const k = acc.findIndex(v => v >= s)
  if (k < 0)
    return 1
  return k === 0 ? 0 : (k - 1 + (s - acc[k - 1]) / (acc[k] - acc[k - 1])) / N
}
const fmt = p => `${+p[0].toFixed(3)} ${+p[1].toFixed(3)}`
// 弧长 [s0, s1] 的那一截（s0 可以是负的：从底尖往回绕）
function piece(s0, s1) {
  let d = ''
  for (const lap of [-total, 0]) {
    let start = lap
    curves.forEach((ps, i) => {
      const acc = tables[i]
      const [a, b] = [Math.max(s0, start), Math.min(s1, start + acc.at(-1))]
      if (b - a > 1e-6) {
        const sub = bezierSub(ps, tAt(acc, a - start), tAt(acc, b - start))
        d += `${d ? '' : `M${fmt(sub[0])}`}C${sub.slice(1).map(fmt).join(' ')}`
      }
      start += acc.at(-1)
    })
  }
  return d
}
const period = total / DASHES
const dashes = Array.from({ length: DASHES }, (_, i) => piece((i - RATIO / 2) * period, (i + RATIO / 2) * period))

export default () => dashes
