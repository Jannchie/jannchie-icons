// 播放器类图标共用的形状
const tan30 = Math.tan(Math.PI / 6)

// 30° 斜边的三角（等边），dir=1 朝右，-1 朝左；base 是竖直底边所在 x
export function triangle(base, h, dir = 1, cy = 12) {
  const w = h / 2 / tan30
  return [[base, cy - h / 2], [base + w * dir, cy], [base, cy + h / 2]]
}

export const triangleWidth = h => h / 2 / tan30

// 45° 箭头：尖端在 (x, y)，s 为两翼长度
export function arrow(x, y, dir, s = 2.5) {
  const [dx, dy] = { right: [-s, 0], left: [s, 0], down: [0, -s], up: [0, s] }[dir]
  // 两翼沿方向回退 s，并向两侧展开 s
  const side = dx ? [0, s] : [s, 0]
  return [[x + dx - side[0], y + dy - side[1]], [x, y], [x + dx + side[0], y + dy + side[1]]]
}

// 喇叭：45° 锥面
export const speaker = [[4, 9.5], [7.5, 9.5], [12, 5], [12, 19], [7.5, 14.5], [4, 14.5]]
