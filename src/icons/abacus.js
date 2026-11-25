import { frame } from '../geometry'
import { dot } from '../scene'

// 算盘：方框（墨迹 3–21，线宽变粗往里长）+ 一道横梁（9.5）把上下两档分开 + 三根竖档（7.5 / 12 / 16.5，细线）
// + 算珠（直径 2.5 的点）：上档每根一颗，下档每根两颗，有的靠梁、有的落底，像正在拨的样子
const box = (radius, stroke) => frame(stroke, Math.min(radius, 2), [3, 3, 21, 21])
const RODS = [7.5, 12, 16.5]
// 下档两颗算珠的位置：靠梁（上拨）或落底
const UP = [12.25, 15.5]
const DOWN = [14.5, 17.75]
const LOWER = [UP, DOWN, [12.25, 17.75]]
const beads = RODS.flatMap((x, i) => [dot(x, 6.5, 2.5), ...LOWER[i].map(y => dot(x, y, 2.5))])
const beam = stroke => `M${3 + stroke / 2} 9.5H${21 - stroke / 2}`
const rods = stroke => RODS.map(x => ({ d: `M${x} ${3 + stroke / 2}V${21 - stroke / 2}`, thin: true }))

export default ({ radius, stroke }) => [box(radius, stroke), beam(stroke), ...rods(stroke), ...beads]

// 没有实心版：框里挖出算珠的白点像骰子，连竖档一起挖又糊成一串；实心变体直接用描边版
