import { rounded } from '../geometry'
import { rotate } from '../transform'

// 监控摄像头：长方机身逆时针倾斜 20°（镜头朝左下）+ 机身前端上沿的遮光檐 + 从机身底部折到墙上的支架 + 右侧墙板
const tilt = d => rotate(d, -20, [10, 9])
export default ({ radius }) => [
  tilt(rounded([[3.5, 6.25], [16.5, 6.25], [16.5, 11.75], [3.5, 11.75]], Math.min(radius, 1.5))),
  tilt('M3.5 6.25H1.75'),
  'M14.25 10.5L15.25 14H20.5',
  'M20.5 10.5V17.5',
]
