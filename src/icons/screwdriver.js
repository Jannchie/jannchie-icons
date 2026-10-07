import { rounded } from '../geometry'
import { rotate } from '../transform'

// 螺丝刀：和 tools 里同一把——竖直画（细刀杆在上，下面圆角手柄），再逆时针转 45°：刀头朝左上、手柄朝右下
// 刀杆末端垂直落在手柄顶边正中
export default ({ radius }) => [
  'M12 2.5V11',
  rounded([[10, 11], [14, 11], [14, 21], [10, 21]], Math.min(radius, 1.5)),
].map(d => rotate(d, -45))
