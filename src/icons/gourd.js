import { meet } from '../geometry'
import { solid } from '../solid'

// 葫芦：上小下大的两个圆肚（上肚圆心 (12, 8.25)、半径 3.25，下肚圆心 (12, 15.5)、半径 5.75）连成一条闭合轮廓，中间收成细腰；
// 顶上一根往右弯的短藤
const [x, y1, r1, y2, r2] = [12, 8.25, 3.25, 15.5, 5.75]
const f = v => +v.toFixed(3)
// 两个圆的交点（腰的两侧）
const [[wl, wy], [wr]] = meet([x, y1], r1, [x, y2], r2).map(p => p.map(f))
const body = `M${wl} ${wy}A${r1} ${r1} 0 1 1 ${wr} ${wy}A${r2} ${r2} 0 1 1 ${wl} ${wy}Z`
const vine = 'M12 5V4C12 3.25 12.75 2.75 13.75 2.75'

export default () => [body, vine]

// 实心：葫芦一块；藤照旧是线
export const fill = () => [solid(body), vine]
