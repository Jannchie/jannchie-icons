import { solid } from '../solid'
import { mirror } from '../transform'

// 耳环（一对）：左右对称的两只吊坠耳环——顶上一个往外弯的耳钩（竖线 7.5 / 16.5 往上，绕过半径 1.5 的弯钩），
// 钩底挂一颗水滴形的吊坠（4.75–10.25，尖朝上接在耳钩上，底到 19.25）
// 耳钩 + 垂下的吊坠是耳环的记号，成对画和 necklace（单个吊坠挂在链子上）区分开
const hook = 'M7.5 10V5.5A1.5 1.5 0 0 0 4.5 5.5V6.5'
const drop = 'M7.5 10C7.5 10 4.75 13.5 4.75 16.5A2.75 2.75 0 0 0 10.25 16.5C10.25 13.5 7.5 10 7.5 10Z'
const hooks = [hook, mirror(hook)]
const drops = [drop, mirror(drop)]

export default () => [...hooks, ...drops]

// 实心：两颗吊坠填实；耳钩照旧是线
export const fill = () => [solid(drops), ...hooks]
