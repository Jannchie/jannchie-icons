import { GAP } from '../clearance'
import { clear, solid } from '../solid'
import { accent } from '../tone'

// 爱心 + 右上角一颗四角星（第一次、新的心动）
const HEART = 'M10.5 21.25C7.75 19.5 2.75 16.25 2.75 11.5C2.75 9 4.5 7 6.9 7C8.5 7 9.75 7.9 10.5 9.25C11.25 7.9 12.5 7 14.1 7C16.5 7 18.25 9 18.25 11.5C18.25 16.25 13.25 19.5 10.5 21.25Z'
const [cx, cy, R, a] = [18.75, 5.25, 2.5, 0.3]
const STAR = `M${cx} ${cy - R}Q${cx + a * R} ${cy - a * R} ${cx + R} ${cy}Q${cx + a * R} ${cy + a * R} ${cx} ${cy + R}Q${cx - a * R} ${cy + a * R} ${cx - R} ${cy}Q${cx - a * R} ${cy - a * R} ${cx} ${cy - R}Z`
const star = () => accent([{ d: STAR, round: true, cut: true }])

export default () => [HEART, ...star()]

export const fill = () => {
  const badge = star().map(({ cut, ...p }) => p)
  return [solid(HEART), clear(badge, GAP), ...solid(badge)]
}
