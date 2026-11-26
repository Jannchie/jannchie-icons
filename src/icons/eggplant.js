import { knock, solid } from '../solid'
import { rotate, scale, translate } from '../transform'

// 茄子：竖着画一根细长的茄子（颈 9.5–14.5，往下慢慢变粗到 8–16，底圆到 22.5），肩上一道 W 形的萼片（三个尖朝下），顶上一根短果柄；
// 再绕 (12, 13) 顺时针转 45°，果柄朝右上、肚子朝左下。长度是宽的两倍多：短胖了就成了梨
// 转完整体往左上挪 (−0.35, −1.7)、再放大 1.1 倍：墨迹居中，撑满对角线
const tilt = d => scale(translate(rotate(d, 45, [12, 13]), -0.35, -1.7), 1.1)
const body = tilt('M12 5.5C13.75 5.5 14.5 6.75 14.5 8.5C14.5 11 16 13.5 16 17.5C16 20.5 14.25 22.5 12 22.5C9.75 22.5 8 20.5 8 17.5C8 13.5 9.5 11 9.5 8.5C9.5 6.75 10.25 5.5 12 5.5Z')
// 萼片的两头落在颈的两条边上（顶点 (9.5, 8.5) / (14.5, 8.5)）
const calyx = tilt('M9.5 8.5L10.75 11L12 8.75L13.25 11L14.5 8.5')
const stalk = tilt('M12 5.5C12 4.25 12.5 3.25 13.5 2.5')

export default () => [body, calyx, stalk]

// 实心：茄子一块，萼片的折线挖空；果柄照旧是线
export const fill = () => [solid(body), knock(calyx), stalk]
