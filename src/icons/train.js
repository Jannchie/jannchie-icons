import { dot } from '../scene'
import { knock, solid } from '../solid'

// 列车（高铁，侧视、车头朝右）：长车身（车顶 6.5、车底 15.5，车尾平切在 2.5），车头从车顶一路流线形收到右下的鼻尖；
// 一排三个车窗点 + 车头的驾驶室斜窗；车底下一条铁轨（2.5–21.5 在 18.5）
const body = 'M2.5 6.5H12C16 6.5 19.25 9.25 21 12.75C21.75 14.25 21 15.5 19.5 15.5H2.5Z'
const windows = [dot(5.25, 10.5), dot(8.5, 10.5), dot(11.75, 10.5)]
const cab = 'M15 9.5L17 11.5'
const rail = 'M2.5 18.5H21.5'

export default () => [body, ...windows, cab, rail]

// 实心：车身一块，车窗和驾驶室斜窗挖空；铁轨照旧是线
export const fill = () => [solid(body), knock([...windows, cab]), rail]
