import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 压低地形：抬升的镜像——地平线抬到 y = 10.5，中间往下挖出一个洼坑，坑底 (12.5, 20.5)
// 一支向下的箭头从上方插进坑口（竖线落在 x = 12.5，3.5 → 14），箭头两翼 2.5，离坑壁和坑底都留出 4 以上
export default ({ radius }) => [
  'M2.5 10.5H5.5C8.5 10.5 9.5 20.5 12.5 20.5C15.5 20.5 16.5 10.5 19.5 10.5H21.5',
  'M12.5 3.5V14',
  rounded(arrow(12.5, 14, 'down', 2.5), crisp(radius), false),
]
