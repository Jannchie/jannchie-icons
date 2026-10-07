import { dot } from '../scene'

// 幽灵：半圆头 + 直身 + 底边三道波浪下摆 + 两只眼睛
// 身子两侧在 5.5 / 18.5 上；下摆从右往左 6 段半波，交替落在 20.5 / 18.5
const [L, R] = [5.5, 18.5]
const step = (R - L) / 6
const f = v => +v.toFixed(3)
const hem = Array.from({ length: 6 }, (_, i) => {
  const [x0, x1] = [R - step * i, R - step * (i + 1)]
  const [y0, y1] = i % 2 ? [18.5, 20.5] : [20.5, 18.5]
  const mx = f((x0 + x1) / 2)
  return `C${mx} ${y0} ${mx} ${y1} ${f(x1)} ${y1}`
}).join('')
export default ({ radius }) => [
  `M${L} 20.5V11A${(R - L) / 2} ${(R - L) / 2} 0 0 1 ${R} 11V20.5${hem}Z`,
  dot(9.5, 11),
  dot(14.5, 11),
]
