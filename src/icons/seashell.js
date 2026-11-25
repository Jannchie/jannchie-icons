import { solid } from '../solid'

// 贝壳（扇贝）：从底下的壳顶往上张开的扇形——上沿是四个往外鼓的波浪瓣（端点在以壳顶 (12, 19.5) 为圆心、半径 12.5 的弧上，每 24° 一个），
// 两条直边收到底下一小段平的铰合部（10–14 在 20.5）；三道壳肋从波浪瓣之间的凹口朝壳顶画进来（只画到一半：再往壳顶去三道线就挤在一起了）
const [hx, hy, R] = [12, 19.5, 12.5]
const f = v => +v.toFixed(3)
// 从正上方量的角度（往右为正）
const at = (deg, k = 1) => `${f(hx + R * k * Math.sin(deg * Math.PI / 180))} ${f(hy - R * k * Math.cos(deg * Math.PI / 180))}`
const lobes = [-36, -12, 12, 36].map(mid => `Q${at(mid, 1.16)} ${at(mid + 12)}`).join('')
const shell = `M${at(-48)}${lobes}L14 20.5H10Z`
const ribs = [-24, 0, 24].map(deg => `M${at(deg)}L${at(deg, 0.5)}`)

export default () => [shell, ...ribs]

// 实心：贝壳一块（壳肋不挖：挖成一道道停在壳里的槽不干净）
export const fill = () => [solid(shell)]
