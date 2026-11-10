import { clip } from '../clip'
import { circle, through } from '../geometry'
import { eye } from '../scene'
import { clear, hole, knock, solid } from '../solid'
import { GAP } from '../clearance'

// 宠物项圈 + 猫铃：从斜上方看的一个项圈——扁椭圆的圈口（整圈）加上前半圈往下一条带子的厚度，像一个很矮的圆筒；
// 前面正中压着一个大铃铛（直径 9.5，是主角）：铃身一道微微下弯的腰线，下半一个圆孔带一道开到底的口
// 圈口墨迹 2–22 × 2.5–9，带子厚 3；铃铛墨迹 12–21.5，压在带子前面——带子的线在铃铛四周让开一圈
// 外缘固定（左右 2 / 22、上 2.5、铃铛的外径），线宽变粗往里长
const [RY, TOP, BAND] = [3.25, 2.5, 3] // 圈口椭圆的墨迹半高、上沿，带子的厚度
const [BY, R] = [16.75, 4.75] // 铃铛的圆心 y、墨迹外半径

function parts(stroke) {
  const h = stroke / 2
  const [rx, ry, cy] = [10 - h, RY - h, TOP + RY]
  const [l, r] = [12 - rx, 12 + rx]
  const rim = `M${l} ${cy}A${rx} ${ry} 0 0 1 ${r} ${cy}A${rx} ${ry} 0 0 1 ${l} ${cy}Z`
  const front = `M${l} ${cy}V${cy + BAND}A${rx} ${ry} 0 0 0 ${r} ${cy + BAND}V${cy}`
  // 实心版用：整个项圈的外形（圈口的上半圈 + 两侧 + 带子的下沿），和圈口里面的洞
  const shape = `M${l} ${cy}A${rx} ${ry} 0 0 1 ${r} ${cy}V${cy + BAND}A${rx} ${ry} 0 0 1 ${l} ${cy + BAND}Z`
  const [ix, iy] = [rx - stroke, Math.max(ry - stroke, 0.5)]
  const opening = `M${12 - ix} ${cy}A${ix} ${iy} 0 0 1 ${12 + ix} ${cy}A${ix} ${iy} 0 0 1 ${12 - ix} ${cy}Z`
  const br = R - h
  const body = circle(12, BY, br)
  // 腰线：两端落在铃身上（圆心往上 0.35 个半径），中间往下弯；实心版的挖空线两端各多伸出去一截，穿出铃身
  const wy = +(BY - 0.35 * br).toFixed(3)
  const wx = Math.sqrt(br * br - (BY - wy) ** 2)
  const waist = e => `M${+(12 - wx - e).toFixed(3)} ${wy}Q12 ${wy + 1.1 * (1 + e / wx) ** 2} ${+(12 + wx + e).toFixed(3)} ${wy}`
  const hy = +(BY + 0.45 * br).toFixed(3)
  return { rim, front, shape, opening, body, waist, hy, bottom: BY + br }
}

export default ({ stroke }) => {
  const p = parts(stroke)
  return [
    ...[p.rim, p.front].map(d => clip(d, [p.body], stroke + 0.75, [p.body])),
    p.body,
    p.waist(0),
    { d: `M12 ${p.hy}V${p.bottom}`, detail: true },
    eye(12, p.hy, 1.6),
  ]
}

// 实心：项圈一块，圈口挖成洞（后半圈剩一道线宽的边）；铃铛在项圈前面，是完整的一块（项圈沿着它让出 GAP 的缝），
// 腰线、圆孔和开口挖空——腰线横着穿出铃身两侧，开口从底下穿出去
export const fill = ({ stroke }) => {
  const p = parts(stroke)
  return [
    solid(p.shape),
    hole(p.opening),
    clear(p.body, GAP),
    solid(p.body),
    knock([p.waist(stroke), through([12, p.hy], [12, p.bottom], 0, stroke), eye(12, p.hy, 1.6)]),
  ]
}
