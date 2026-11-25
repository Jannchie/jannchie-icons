import { ray, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 警灯（旋转警示灯）：圆顶灯罩（7.5–16.5，圆顶的圆心 (12, 12.5)、半径 4.5，直边落到底座上）+ 底座（5.5–18.5 × 17.5–20.5）
// + 灯罩外五道放射的光芒（正上、左上、右上、正左、正右，从圆顶的圆心量半径 7 → 9；离灯罩 2.5，粗字重下也留得出缝）
const rays = [180, 225, 270, 315, 0].map(deg => ray([12, 12.5], deg, 7, 9))
const dome = 'M7.5 17.5V12.5A4.5 4.5 0 0 1 16.5 12.5V17.5'
const base = radius => rounded([[5.5, 17.5], [18.5, 17.5], [18.5, 20.5], [5.5, 20.5]], Math.min(radius, 1))

export default ({ radius }) => [dome, base(radius), ...rays]

// 实心：灯罩、底座各一块，接缝整条挖穿；光芒照旧是线
export const fill = ({ radius }) => [solid([`${dome}Z`, base(radius)]), knock('M3 17.5H21'), ...rays]
