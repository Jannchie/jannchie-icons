import { knock, solid } from '../solid'
import { HEART } from './heart'

// 心碎：爱心 + 从凹口到尖点的一道折线裂缝
export default () => [HEART, 'M12 7L10.5 10.5L13.5 13L11 16.5L12 20']

// 实心：爱心一块，挖掉裂缝；裂缝两端竖着穿出凹口和尖点（停在轮廓中线上的线帽只擦到外缘，会留下细桥），心裂成完全分开的两半
export const fill = () => [solid(HEART), knock('M12 3L12 7L10.5 10.5L13.5 13L11 16.5L12 20L12 24')]
