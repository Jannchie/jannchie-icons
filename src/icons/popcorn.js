import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { cutout, solid, stacked } from '../solid'

// 爆米花：上宽下窄的纸桶 + 两道竖条纹 + 顶上冒出来的一团爆米花
const bucket = [[5, 9.5], [7, 20.5], [17, 20.5], [19, 9.5]]
const stripes = [[10, 10.5], [14, 13.5]] // 条纹在桶口、桶底的 x
const pop = 'M5 9.5C4 7.25 6 5.5 8 6.5C8.5 4 11 3 12.5 4.5C14 3 16.5 4 16.5 6.5C18.5 6 20 8 19 9.5'

export default ({ radius }) => [
  rounded(bucket, Math.min(radius, 1.5), false),
  'M5 9.5H19',
  ...stripes.map(([t, b]) => `M${t} 9.5L${b} 20.5`),
  pop,
]

// 实心：纸桶整块画在前面，爆米花一团在桶口上方让出 GAP 的缝；两道条纹挖穿纸桶（桶分成三片）。
// 条纹按线宽挖一条精确的斜带：上端停在桶口和爆米花之间的缝正中（穿出桶口、碰不到爆米花），下端穿出桶底
export const fill = ({ radius, stroke }) => {
  const top = 9.5 - stroke / 2 - GAP / 2
  const x = (t, b, y) => t + (b - t) * (y - 9.5) / 11
  const band = ([t, b]) => {
    const w = stroke / 2 * Math.hypot(1, (b - t) / 11)
    return `M${x(t, b, top) - w} ${top}H${x(t, b, top) + w}L${x(t, b, 24) + w} 24H${x(t, b, 24) - w}Z`
  }
  return [
    ...stacked(`${pop}Z`, `${rounded(bucket, Math.min(radius, 1.5), false)}Z`),
    cutout(stripes.map(band)),
  ]
}
