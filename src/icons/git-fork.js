import { circle } from '../geometry'

// 派生：上方两个节点汇合到中间，再往下连到底部节点
export default () => [
  circle(6.5, 5.5, 2.5),
  circle(17.5, 5.5, 2.5),
  circle(12, 18.5, 2.5),
  'M6.5 8V9.5A2.5 2.5 0 0 0 9 12H15A2.5 2.5 0 0 0 17.5 9.5V8',
  'M12 12V16',
]
