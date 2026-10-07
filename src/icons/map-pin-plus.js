import { circle } from '../geometry'
import { plus } from '../symbols'

// 新增地点：定位针往左挪 2（针尖 (10, 21.5)），右下角一个加号；加号作为刀，针的轮廓在加号附近断开
export default () => [
  'M10 21.5C10 21.5 3 15 3 9.5A7 7 0 0 1 17 9.5C17 15 10 21.5 10 21.5Z',
  circle(10, 9.5, 2.5),
  ...plus([18.5, 18.5], 1.2).map(p => ({ d: p.d ?? p, cut: true, tone: 'success' })),
]
