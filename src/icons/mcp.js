import { rounded } from '../geometry'

// MCP（Model Context Protocol）标志：三道 45° 斜向的发夹线
// 在旋转 45° 的坐标里画：lane 是垂直于线条方向的第几条轨道（间距 D），b 是沿线条方向的位置（向右上为正，单位 D）
// - 第一笔：轨道 0 往上，在顶部绕半圈到轨道 2，再往下
// - 第二笔：从轨道 2 顶部绕半圈到轨道 4，往下走到底，拐 90° 甩出一截尾巴
// - 第三笔：夹在中间，从轨道 1 往下，在底部兜半圈到轨道 3 往上
// 比例取自官方标志（轨道间距 = 半圈半径）；整体按中心线的外接框居中
const D = 2.7
const S = Math.SQRT1_2
const [ox, oy] = [12 - 0.145 * D, 12 - 3.046 * D]
const fmt = n => Math.round(n * 1000) / 1000
const at = (lane, b) => [fmt(ox + (lane + b) * S * D), fmt(oy + (lane - b) * S * D)]
const pt = p => p.join(' ')
// 半圈：从轨道 lane 绕到 lane + 2，top 为真时在上端（b 方向）绕
const turn = (lane, b, top) => `A${D} ${D} 0 0 ${top ? 1 : 0} ${pt(at(lane + 2, b))}`

const BOTTOM = -3 // 第一、三笔内侧往下到的位置
const TAIL = -3.95 // 尾巴拐弯处
const TAIL_END = 5.08 // 尾巴末端所在的轨道位置

export default ({ radius }) => [
  `M${pt(at(0, -4))}L${pt(at(0, 0))}${turn(0, 0, true)}L${pt(at(2, BOTTOM))}`,
  `M${pt(at(2, 0))}${turn(2, 0, true)}`,
  rounded([at(4, 0), at(4, TAIL), at(TAIL_END, TAIL)], Math.min(radius, 0.33 * D), false),
  `M${pt(at(1, 0))}L${pt(at(1, BOTTOM))}${turn(1, BOTTOM, false)}L${pt(at(3, 0))}`,
]
