import { circle } from '../geometry'

// 花：六瓣向外鼓的花瓣轮廓 + 花心
// 花瓣的分界点在半径 5 的圆上（每 60° 一个），相邻分界点之间用半径 3 的大圆弧往外鼓出一瓣
const at = deg => [12 + 5 * Math.cos(deg * Math.PI / 180), 12 + 5 * Math.sin(deg * Math.PI / 180)]
const points = Array.from({ length: 6 }, (_, i) => at(i * 60 - 90))
const outline = `M${points[0].join(' ')}${points.map((_, i) => `A3 3 0 1 1 ${points[(i + 1) % 6].join(' ')}`).join('')}Z`

export default () => [outline, circle(12, 12, 2)]
