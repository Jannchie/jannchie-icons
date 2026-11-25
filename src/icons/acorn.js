import { knock, solid } from '../solid'

// 橡果：上面一顶圆帽（壳斗，5.5–18.5，顶到 5.5，帽檐平直在 10.5）+ 帽下收成尖的果身（7–17，尖到 21.25）+ 帽顶一根往右弯的短柄
const cap = 'M5.5 10.5C5.5 7.5 8.5 5.5 12 5.5C15.5 5.5 18.5 7.5 18.5 10.5Z'
const nut = 'M7 10.5C7 16 9.5 20.25 12 21.25C14.5 20.25 17 16 17 10.5'
const stem = 'M12 5.5V4C12 3.25 12.75 2.75 13.75 2.75'

export default () => [cap, nut, stem]

// 实心：圆帽、果身各一块，帽檐的接缝整条挖穿；短柄照旧是线
export const fill = () => [solid([cap, `${nut}Z`]), knock('M3 10.5H21'), stem]
