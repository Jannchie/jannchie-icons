import { ray } from '../geometry'
import { hole, knock, solid } from '../solid'

// 量角器：半圆（直径边 3–21 在 16.5，圆弧顶到 7.5）+ 里面一道同心的小半圆（半径 4.5，两脚落在直径边上）
// + 弧上三道刻度（45°、90°、135°，从弧往圆心画 2）
const [cx, cy, R, r] = [12, 16.5, 9, 4.5]
// 刻度的角度从右往上量（逆时针），所以传给 ray 的是 −deg
const ticks = (from = R) => [45, 90, 135].map(deg => ray([cx, cy], -deg, from, R - 2))
const body = `M${cx - R} ${cy}A${R} ${R} 0 0 1 ${cx + R} ${cy}Z`
const inner = `M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}`

export default () => [body, inner, ...ticks()]

// 实心：半圆一块，里面的小半圆挖成洞（和描边版小半圆的内缘一样大，往下挖穿直径边）；刻度从弧外面切进来
export const fill = ({ stroke }) => {
  const k = r - stroke
  return [
    solid(body),
    hole(`M${cx - k} 19V${cy}A${k} ${k} 0 0 1 ${cx + k} ${cy}V19Z`),
    knock(ticks(R + stroke * 1.5)),
  ]
}
