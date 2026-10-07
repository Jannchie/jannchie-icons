import { crisp, rounded } from '../geometry'

// Shift ⇧：空心的上箭头，45° 箭头头部 + 宽 7 的箭杆；箭尖和两翼的锐角不随全局圆角
export const shiftArrow = (tip, base, bottom, radius) => {
  const half = base - tip // 45°：头部半宽等于头部高度
  const r = Math.min(radius, 1.5)
  return rounded([
    [12, tip, crisp(radius)],
    [12 + half, base, crisp(radius)],
    [15.5, base],
    [15.5, bottom],
    [8.5, bottom],
    [8.5, base],
    [12 - half, base, crisp(radius)],
  ], r)
}

export default ({ radius }) => [shiftArrow(4, 12.5, 20.5, radius)]
