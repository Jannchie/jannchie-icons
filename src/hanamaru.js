// はなまる（花丸）一族共用：一笔绕进去的漩涡 + 一圈圆鼓鼓的花瓣轮廓
const fmt = n => String(Math.round(n * 1000) / 1000)
const polar = (cx, cy, r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)]

// 漩涡：一串半径每次加 s 的半圆首尾相接（第 k 段半径 k·s），奇数段走上半边、偶数段走下半边，
// 两个圆心左右差 s，所以每绕一圈半径涨 2s（相邻两圈的中心线间距 2s）；共 n 段 = n / 2 圈
// 整个漩涡按外框（左右端点、上下半边的最大半径）居中到 (cx, cy)
export function spiral(cx, cy, s, n) {
  // 先以奇数段圆心 (0, 0) 画，再整体平移到外框居中
  const ends = [-s]
  for (let k = 1; k <= n; k++)
    ends.push(k % 2 ? k * s : -s - k * s)
  const [left, right] = [Math.min(...ends), Math.max(...ends)]
  const up = Math.max(...Array.from({ length: n }, (_, i) => i % 2 ? 0 : (i + 1) * s)) // 奇数段（上半边）的最大半径
  const down = Math.max(...Array.from({ length: n }, (_, i) => i % 2 ? (i + 1) * s : 0))
  const [dx, dy] = [cx - (left + right) / 2, cy - (down - up) / 2]
  return `M${fmt(ends[0] + dx)} ${fmt(dy)}${ends.slice(1).map((x, i) => `A${fmt((i + 1) * s)} ${fmt((i + 1) * s)} 0 0 1 ${fmt(x + dx)} ${fmt(dy)}`).join('')}`
}

// 花瓣轮廓：n 个分界点在半径 valley 的圆上（第一瓣的瓣尖朝 start 方向），
// 相邻分界点之间用一段圆弧往外鼓成一瓣，瓣尖（弧的最外点）中心线落在半径 tip 上
export function petals(cx, cy, n, valley, tip, start = -90) {
  const step = 360 / n
  const pts = Array.from({ length: n }, (_, i) => polar(cx, cy, valley, start - step / 2 + i * step))
  const half = valley * Math.sin(Math.PI / n) // 半弦长
  const sag = tip - valley * Math.cos(Math.PI / n) // 弧高
  const r = (half * half + sag * sag) / (2 * sag)
  const large = sag > half ? 1 : 0
  return `M${fmt(pts[0][0])} ${fmt(pts[0][1])}${pts.map((_, i) => {
    const [x, y] = pts[(i + 1) % n]
    return `A${fmt(r)} ${fmt(r)} 0 ${large} 1 ${fmt(x)} ${fmt(y)}`
  }).join('')}Z`
}
