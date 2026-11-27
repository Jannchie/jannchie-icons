import { eye } from '../scene'
import { knock, solid } from '../solid'

// 刺猬：侧面，朝左。背上一圈竖起来的刺：六根尖刺排成一个半圆的锯齿（刺尖在圆心 (12.75, 18.5)、半径 7.75 × 12.5 的椭圆上，刺根在 6 × 8.5 的椭圆上，
// 从左边的 -148° 排到右边的 -8°，每根隔 28°）+ 左边从刺底下伸出来的尖脸（鼻尖 (2.75, 16.25)，下巴顺着弯到平平的肚皮 18.5）
// + 鼻尖上一颗黑鼻头、一只眼睛 + 两只小短腿（落到 20.5）。一圈尖刺 + 尖脸是刺猬的记号
const [cx, cy] = [12.75, 18.5]
const on = (deg, rx, ry) => `${+(cx + rx * Math.cos(deg * Math.PI / 180)).toFixed(2)} ${+(cy + ry * Math.sin(deg * Math.PI / 180)).toFixed(2)}`
// 锯齿：刺根、刺尖交替，一共六根刺
const spikes = [...Array(6).keys()].flatMap(i => [on(-162 + i * 28, 6, 8.5), on(-148 + i * 28, 7.75, 12.5)])
const body = `M${spikes.join('L')}L18.75 18.5H8C5.5 18.5 3.75 17.75 2.75 16.25C4.5 15.75 6.25 14.5 ${spikes[0]}Z`
const feet = ['M9.5 18.5V20.5', 'M16.5 18.5V20.5']
const pupil = eye(7.5, 15.5, 1.5)
const nose = eye(2.9, 16.2, 2)

export default () => [body, ...feet, pupil, nose]

// 实心：身子一块，眼睛挖空（鼻头本来就是实心的，和身子连成一片）；腿照旧是线
export const fill = () => [solid(body), knock(pupil), ...feet]
