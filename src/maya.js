// 玛雅数字 0–19：点是 1，横杠是 5，贝壳是 0。横杠自下往上叠，点排在最上面一行
// 每个数字的各行整体垂直居中；行距 5，中心线都落在 .5 上
import { circle } from './geometry'

const PITCH = 5
// 横杠：高 1.5 的实心条，加上描边后明显比普通线条粗
const bar = y => ({ d: `M4 ${y - 0.75}H20V${y + 0.75}H4Z`, fill: true })
// 一行 n 个点，点距 5；点用实心小圆而不是 dot()，尖角模式下也保持圆点
const dots = (n, y) => Array.from({ length: n }, (_, i) => ({ d: circle(12 + (i - (n - 1) / 2) * 5, y, 0.75), fill: true }))

// 贝壳：上拱下收的椭圆壳，一道横贯两端的弧线分出壳口，壳面三道放射纹从这道弧线长出（起点是弧线上对应 x 处的 y）
const SHELL = [
  'M3 14C4 3 20 3 21 14C17.5 19.5 6.5 19.5 3 14Z',
  { d: 'M3 14C8 11.5 16 11.5 21 14', thin: true },
  { d: 'M9 12.31L7.5 8.5M12 12.13V7.5M15 12.31L16.5 8.5', thin: true },
]

export function maya(n) {
  if (n === 0)
    return SHELL
  const bars = Math.floor(n / 5)
  const rest = n % 5
  const rows = bars + (rest ? 1 : 0)
  // 自下而上第 i 行的中心线
  const y = i => 12 + ((rows - 1) / 2 - i) * PITCH
  return [
    ...Array.from({ length: bars }, (_, i) => bar(y(i))),
    ...(rest ? dots(rest, y(bars)) : []),
  ]
}
