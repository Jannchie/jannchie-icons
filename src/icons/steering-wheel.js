import { circle } from '../geometry'
import { solid } from '../solid'

// 方向盘：外圈（半径 9）+ 正中的轮毂（半径 2.5）+ 三根辐条（左、右、下，从轮毂接到外圈，都是径向线）
// 圆的起点放在两根辐条之间并闭合（同 helm）：起点落在辐条上的话，首尾那一点会被当成线头
const at = (r, deg) => `${+(12 + r * Math.cos(deg * Math.PI / 180)).toFixed(3)} ${+(12 + r * Math.sin(deg * Math.PI / 180)).toFixed(3)}`
const ring = r => `M${at(r, -45)}A${r} ${r} 0 1 1 ${at(r, 135)}A${r} ${r} 0 1 1 ${at(r, -45)}Z`
const spokes = ['M3 12H9.5', 'M14.5 12H21', 'M12 14.5V21']

export default () => [ring(9), ring(2.5), ...spokes]

// 实心：轮毂填实，外圈和辐条照旧是线（同 helm）
export const fill = () => [solid(circle(12, 12, 2.5)), ring(9), ...spokes]
