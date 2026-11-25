import { knock, solid } from '../solid'

// 番茄：略扁的圆果（3.25–20.75 × 7–21.25）+ 果顶的五角蒂：一根竖直的果柄（到 3）、两片往两边上翘的萼片、两片搭在果子上的萼片，
// 都从果顶正中 (12, 7) 出发；萼片两两连成一笔（在果顶拐角）
const fruit = 'M12 7C17 7 20.75 9.75 20.75 14C20.75 18.25 17 21.25 12 21.25C7 21.25 3.25 18.25 3.25 14C3.25 9.75 7 7 12 7Z'
const stalk = 'M12 7V3'
const up = 'M8 5L12 7L16 5'
const down = 'M9.5 9.75L12 7L14.5 9.75'

export default () => [fruit, stalk, up, down]

// 实心：果子一块，搭在果子上的两片萼片挖空；果柄和上翘的萼片照旧是线
export const fill = () => [solid(fruit), knock(down), stalk, up]
