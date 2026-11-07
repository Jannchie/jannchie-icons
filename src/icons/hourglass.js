import { rounded } from '../geometry'
import { solid } from '../solid'

// 沙漏：上下横梁 + 两个对顶的锥形玻璃
const beams = ['M6 3.5H18', 'M6 20.5H18']
const glass = y => [[7.5, y], [7.5, y + (y < 12 ? 3 : -3)], [12, 12], [16.5, y + (y < 12 ? 3 : -3)], [16.5, y]]

export default ({ radius }) => [
  ...beams,
  rounded(glass(3.5), Math.min(radius, 1), false),
  rounded(glass(20.5), Math.min(radius, 1), false),
]

// 实心：上下两个玻璃锥各沿横梁封口成一块（贴横梁的两个角是直角），横梁照旧是线
export const fill = ({ radius }) => [
  ...[3.5, 20.5].map((y) => {
    const [a, ...rest] = glass(y)
    const b = rest.pop()
    return solid(rounded([[...a, 0], ...rest, [...b, 0]], Math.min(radius, 1)))
  }),
  ...beams,
]
