import { crisp, rounded } from '../geometry'
import { solid } from '../solid'
import { rotate } from '../transform'

// 螺丝（木螺丝）：沉头（倒梯形，顶宽 9）+ 螺杆（宽 4）+ 收尖的螺丝尖，连成一条闭合轮廓；螺杆上三道斜的螺纹，两头各伸出螺杆 1.25
// 竖着画（头在上，顶边 y = 5.25，尖到 23.25，比居中位置整体下移，转完以后墨迹在对角线上居中），再顺时针转 45°：头在右上、尖朝左下
// 靠「伸出螺杆的斜螺纹 + 尖头」认出来：钉子没有螺纹，螺栓是平头的
const t = d => rotate(d, 45)
const body = radius => t(rounded([[7.5, 5.25], [16.5, 5.25], [14, 9], [14, 19.5], [12, 23.25, crisp(radius)], [10, 19.5], [10, 9]], Math.min(radius, 1)))
const threads = [11.25, 14.25, 17.25].map(y => t(`M8.75 ${y + 0.75}L15.25 ${y - 0.75}`))

export default ({ radius }) => [body(radius), ...threads]

// 实心：螺丝一块；螺纹照旧是线，只剩两头伸出螺杆的小齿，螺杆不切开
export const fill = ({ radius }) => [solid(body(radius)), ...threads]
