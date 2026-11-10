import { circle } from '../geometry'
import { dot } from '../scene'
import { solid } from '../solid'

// Hugging Face 任务：关键点检测（姿态估计）。一个张开手脚的火柴人骨架，手、脚、髋这些关节是圆点
// 库里的 accessibility 是圆圈里的小人，没有关节点
// 头：圆心 (12, 5.25)、半径 2.25（圆形，上缘外凸到 2.25）；躯干从头下到髋 (12, 14.5)；
// 手 (5.5, 12.5) / (18.5, 12.5)、脚 (7.5, 20) / (16.5, 20) 四个端点和髋各一个直径 2.5 的关节点；肩在躯干的 10.25 处
const head = `${circle(12, 5.25, 2.25)}Z`
const bones = [
  'M12 8.25V14.5',
  'M5.5 12.5L12 10.25L18.5 12.5',
  'M7.5 20L12 14.5L16.5 20',
]
const joints = [[5.5, 12.5], [18.5, 12.5], [12, 14.5], [7.5, 20], [16.5, 20]].map(([x, y]) => dot(x, y, 2.5))

export default () => [head, ...bones, ...joints]

// 实心：头填实，骨架和关节点照旧
export const fill = () => [solid(head), ...bones, ...joints]
