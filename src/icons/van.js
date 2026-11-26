import { carBody, carOutline, carWheels, WHEELS } from '../car'
import { rounded } from '../geometry'
import { hole, solid } from '../solid'
import { shrink } from '../tag'

// 面包车（侧视、车头朝右）：一厢式的高车身，车尾 2.5、车顶 4.5（一直平到 15），前挡风斜下到 (18.5, 9.5)，
// 再一小段短车头到 (21.5, 10.5)；底边、车轮和 car 一样（见 car.js）
// 一道腰线（9.5）从车尾通到挡风下沿，一根窗柱（12.5）把车窗分成后面一长条侧窗和前面的驾驶窗
// 和 car 区分靠又高又长的方车顶、几乎没有车头；和 bus 区分靠斜挡风和短车头
const SHELL = [[2.5, 4.5], [15, 4.5], [18.5, 9.5], [21.5, 10.5]]

export default ({ radius }) => [...carOutline(SHELL, radius), 'M2.5 9.5H18.5', 'M12.5 4.5V9.5', ...WHEELS]

// 实心：车身一块，侧窗和驾驶窗挖空（窗洞和描边版窗框的内缘一样大；5 高的车窗粗字重下最多收 1.6，同 car）；车轮四周让出缝
export const fill = ({ radius, stroke }) => {
  const k = Math.min(stroke, 1.6)
  const r = Math.max(0, Math.min(radius, 1.5) - stroke) / 2
  return [
    solid(carBody(SHELL, radius)),
    hole([
      rounded(shrink([[2.5, 4.5], [12.5, 4.5], [12.5, 9.5], [2.5, 9.5]], k), r),
      rounded(shrink([[12.5, 4.5], [15, 4.5], [18.5, 9.5], [12.5, 9.5]], k), 0),
    ]),
    ...carWheels,
  ]
}
