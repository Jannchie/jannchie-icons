import { circle } from '../geometry'
import { solid } from '../solid'

// 派生：上方两个节点汇合到中间，再往下连到底部节点
export default () => [
  // 中轴在 12，上面两个节点在 7 / 17
  circle(7, 5.5, 2.5),
  circle(17, 5.5, 2.5),
  circle(12, 18.5, 2.5),
  'M7 8V9A2.5 2.5 0 0 0 9.5 11.5H14.5A2.5 2.5 0 0 0 17 9V8',
  'M12 11.5V16',
]

// 实心：三个节点填实，连线照旧是线
export const fill = () => [
  solid([circle(7, 5.5, 2.5), circle(17, 5.5, 2.5), circle(12, 18.5, 2.5)]),
  'M7 8V9A2.5 2.5 0 0 0 9.5 11.5H14.5A2.5 2.5 0 0 0 17 9V8',
  'M12 11.5V16',
]
