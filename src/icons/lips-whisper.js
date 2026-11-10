import { knock, solid } from '../solid'
import { affine } from '../transform'

// 低语 / 悄悄话：正面的嘴唇（lips 缩到 K 倍，靠左），右嘴角外面两道很小的声波弧——和 volume-low 的小弧一个意思：声音很小
// 不画手：嘴边那只挡着的手在这个尺寸下读不出来
// 嘴唇：左嘴角还在 2.75，上下居中（lips 的嘴角比外形的中线高 0.5，缩放后跟着挪）；
// 声波：和右嘴角同心的两道细弧（detail 的线宽，比嘴唇轻），各张开 ±HALF 度，外面那道的墨迹到 22
const K = 0.76
const Y = 12 - 0.5 * K // 嘴角的高度
const lips = d => affine(d, K, K, 2.75 - 2.75 * K, Y - 11.5 * K)
const outline = lips('M2.75 11.5C5 10 6.5 6.75 9 6.75C10.25 6.75 11.25 7.5 12 8.25C12.75 7.5 13.75 6.75 15 6.75C17.5 6.75 19 10 21.25 11.5C19 14.75 16 17.25 12 17.25C8 17.25 5 14.75 2.75 11.5Z')
const seam = lips('M2.75 11.5C5.5 11.5 8 11.25 9.5 11.75C10.5 12.1 11.25 12.5 12 12.5C12.75 12.5 13.5 12.1 14.5 11.75C16 11.25 18.5 11.5 21.25 11.5')
const CORNER = 2.75 + 18.5 * K // 右嘴角的 x
const HALF = 38
const wave = (r) => {
  const [dx, dy] = [r * Math.cos(HALF * Math.PI / 180), r * Math.sin(HALF * Math.PI / 180)].map(v => +v.toFixed(3))
  return { d: `M${CORNER + dx} ${Y - dy}A${r} ${r} 0 0 1 ${CORNER + dx} ${Y + dy}`, detail: true }
}
const waves = [2.2, 4.6].map(wave)

export default () => [outline, seam, ...waves]

// 实心：双唇一块，唇缝挖空、两端水平穿出嘴角（同 lips）；声波照旧是线
export const fill = () => [solid(outline), knock(`M0 ${Y}H2.75${seam.slice(seam.indexOf('C'))}H${CORNER + 1}`), ...waves]
