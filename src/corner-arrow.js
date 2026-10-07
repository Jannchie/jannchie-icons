// 拐角箭头：先沿 first 方向走、拐 90° 再沿 second 方向走，末端是箭头（同 Tabler 的 corner-down-right 一族，8 个方向组合）
// 以 corner-down-right 为准：竖杆 x 5.5 从 3.5 下到 15.5，拐向右到 20.5；箭翼回退 5、侧开 5；拐角圆角随全局圆角（× 1.5）
import { crisp, rounded } from './geometry'

const DIR = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }
export function cornerArrow(first, second, radius) {
  const [a, b] = [DIR[first], DIR[second]]
  const C = [12 - 6.5 * b[0] + 3.5 * a[0], 12 - 6.5 * b[1] + 3.5 * a[1]]
  const S = [C[0] - 12 * a[0], C[1] - 12 * a[1]]
  const E = [C[0] + 15 * b[0], C[1] + 15 * b[1]]
  // 箭翼：沿 second 回退 5，向两侧（沿 first 轴）各开 5
  const wing = s => [E[0] - 5 * b[0] + s * 5 * a[0], E[1] - 5 * b[1] + s * 5 * a[1]]
  return [
    rounded([S, C, E], radius * 1.5, false),
    rounded([wing(-1), [...E, crisp(radius)], wing(1)], crisp(radius), false),
  ]
}
