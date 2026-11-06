import { knock, solid } from '../solid'
import { HEART } from './heart'

// 心碎：爱心 + 从凹口到尖点的一道折线裂缝
export default () => [HEART, 'M12 7L10.5 10.5L13.5 13L11 16.5L12 20']

// 实心：爱心一块，挖掉裂缝；裂缝从凹口通到尖点，心裂成两半
export const fill = () => [solid(HEART), knock('M12 7L10.5 10.5L13.5 13L11 16.5L12 20')]
