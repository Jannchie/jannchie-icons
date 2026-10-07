import { rounded } from '../geometry'
import { rotate } from '../transform'

// 铁锹：竖直画——顶上 T 形握把、长柄、下面尖头的锹面（闭合五边形，尖两侧的斜边不是 45°，转过之后不会变成落在半格外的横竖线；，柄垂直落在锹面顶边正中），再顺时针转 45°：锹面朝左下
export default ({ radius }) => [
  'M9.5 2.5H14.5',
  'M12 2.5V13.5',
  rounded([[9, 13.5], [15, 13.5], [15, 17], [12, 21], [9, 17]], Math.min(radius, 1)),
].map(d => rotate(d, 45))
