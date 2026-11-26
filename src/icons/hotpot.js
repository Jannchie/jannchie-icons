import { oval } from '../geometry'
import { knock, stacked } from '../solid'

// 火锅（鸳鸯锅，斜俯视）：锅口的椭圆（4.5–19.5，圆心 (12, 10.5)，半高 3）+ 锅里一道 S 形的隔板（从锅口后沿弯到前沿，分开红汤和清汤）
// + 锅身（往下圆收到 19）+ 两侧一对小耳朵 + 锅下一圈矮矮的炉座 + 锅上两缕热气
// S 形隔板是火锅的记号，和侧视、带锅盖的汤锅区分开
const rim = oval(12, 10.5, 7.5, 3)
const body = 'M4.5 10.5V14C4.5 17 7.75 19 12 19C16.25 19 19.5 17 19.5 14V10.5'
const divider = 'M12 7.5C9 9 15 12 12 13.5'
const ears = ['M4.5 12.5H3.5V14.5H4.5', 'M19.5 12.5H20.5V14.5H19.5']
// 炉座两条竖边的上端落在锅底的弧上
const stand = 'M8.5 18.485V20.5H15.5V18.485'
const steam = ['M8.5 5.5C7.5 4.5 9.5 3.75 8.5 2.75', 'M15.5 5.5C14.5 4.5 16.5 3.75 15.5 2.75']

export default () => [rim, body, divider, ...ears, stand, ...steam]

// 实心：锅身一块，锅口椭圆在前、锅身在它四周让出缝；隔板挖空；耳朵、炉座、热气照旧是线
export const fill = () => [...stacked(`${body}Z`, rim), knock(divider), ...ears, stand, ...steam]
