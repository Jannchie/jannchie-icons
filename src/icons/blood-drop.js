import { knock, solid } from '../solid'
import { DROP as drop } from './droplet'

// 血滴：和 droplet 同一颗水滴（5.5–18.5，尖在 3.5），肚子正中一个十字（圆心 (12, 14.25)，臂长 2.5）
// 十字把它和普通的水滴分开：读成献血、血液、医疗
const plus = ['M12 11.75V16.75', 'M9.5 14.25H14.5']

export default () => [drop, ...plus]

// 实心：水滴一块，十字挖空
export const fill = () => [solid(drop), knock(plus)]
