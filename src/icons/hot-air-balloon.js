import { rounded } from '../geometry'
import { solid } from '../solid'

// 热气球：上圆下收的球囊（4.5–19.5，顶到 2.75，底下收成一段平口 9.5–14.5 在 14.5）+ 球囊上两道竖的拼缝（从顶点弯到平口两端里侧）
// + 平口两端垂下来的两根吊绳（长 3，实心版里球囊和吊篮之间也看得见缝）+ 底下的吊篮（9.5–14.5 × 17.5–20.5）
const envelope = 'M12 2.75C16.5 2.75 19.5 5.25 19.5 8.5C19.5 11.25 17 13.25 14.5 14.5H9.5C7 13.25 4.5 11.25 4.5 8.5C4.5 5.25 7.5 2.75 12 2.75Z'
const gores = ['M12 2.75C9.25 5.25 9 10.75 10.5 14.5', 'M12 2.75C14.75 5.25 15 10.75 13.5 14.5']
const ropes = ['M9.5 14.5V17.5', 'M14.5 14.5V17.5']
const basket = radius => rounded([[9.5, 17.5, 0], [14.5, 17.5, 0], [14.5, 20.5], [9.5, 20.5]], Math.min(radius, 1))

export default ({ radius }) => [envelope, ...gores, ...ropes, basket(radius)]

// 实心：球囊是完整的一块（拼缝不挖），吊篮一块；吊绳照旧是线
export const fill = ({ radius }) => [solid([envelope, basket(radius)]), ...ropes]
