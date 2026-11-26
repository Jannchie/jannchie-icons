import { carBody, carOutline, carWheels, SEDAN, SEDAN_LINES, sedanWindows, WHEELS } from '../car'
import { solid } from '../solid'

// 汽车（侧视、车头朝右）：车尾 2.5、车头 21.5，腰线 10.5，车顶 6.5（8.5–15，前后挡风斜下到腰线），底边 15.5
// 腰线横贯车窗下沿：两端顺着车身轮廓的水平段延续（不是斜接），中间一根竖柱把车窗分成前后两扇
// 两个车轮（半径 2.25）嵌在车身里，底边在车轮处断开、线头落在车轮的圆上（几何见 car.js，taxi / police-car / van 共用）
export default ({ radius }) => [...carOutline(SEDAN, radius), ...SEDAN_LINES, ...WHEELS]

// 实心：车身一块，前后两扇车窗挖空；车轮四周让出缝，车轮是实心圆
export const fill = ({ radius, stroke }) => [solid(carBody(SEDAN, radius)), sedanWindows(stroke), ...carWheels]
