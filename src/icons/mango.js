import { solid } from '../solid'

// 芒果：斜放的肾形果子（右上一头圆、左下一头鼓得更大，一侧略凹）+ 右上顶端一根短果柄 + 一片细长的叶子
const body = 'M15.5 6C19 6 21 9 20.5 12.5C20 17 15.5 21 10 21C6 21 3.25 18.75 3.5 15.5C3.75 12.5 6.5 11.75 9 11C11.5 10.25 12.25 6 15.5 6Z'
const stalk = 'M15.5 6C15.75 4.75 16.5 4 17.5 3.5'
const leaf = 'M16 4.75C14.5 3 11.5 2.5 9 3.25C10.5 5 13.5 5.5 16 4.75Z'

export default () => [body, stalk, leaf]

// 实心：果子、叶子各一块；果柄照旧是线
export const fill = () => [solid([body, leaf]), stalk]
