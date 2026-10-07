import { circle, crisp } from '../geometry'
import { airframe, nose } from '../aircraft'

// 预警机：客机式机身、中等后掠的主翼，机背上一个圆盘雷达压在机身和翼根上（盖住的线删掉）
// （坐标按机头朝上写，见 aircraft.js）
export default ({ radius }) => nose([
  airframe([
    [12, 2.5],
    [13.5, 5],
    [13.5, 8.5],
    [21.5, 14, crisp(radius)],
    [21.5, 15.5],
    [13.5, 12.5],
    [13.5, 18.5],
    [17.5, 20.5, crisp(radius)],
    [17.5, 21.5],
    [12, 21.5],
  ], Math.min(radius, 1)),
  { d: circle(12, 14.5, 3.25), cut: true, gap: 0.5, occlude: true },
])
