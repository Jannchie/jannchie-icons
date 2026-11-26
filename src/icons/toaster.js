import { rounded } from '../geometry'
import { knock, stacked } from '../solid'

// 烤面包机（正面）：圆角机身（3.5–20.5 × 10.5–19.5）+ 从顶上弹出来的一片吐司（面包片的轮廓：上面鼓出两只「耳朵」，
// 6–18，顶到 4.5；下半截 7.5–16.5 插在机身里，两端落在机身顶边上）+ 机身右侧一道竖的压杆槽
// 弹出来的吐司是烤面包机的记号；吐司的鼓边让它不像两根柱子或一个盒子
const body = radius => rounded([[3.5, 10.5], [20.5, 10.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5))
const toast = 'M7.5 10.5V7.5C6.7 7.5 6 6.8 6 6C6 5 7.2 4.5 9 4.5H15C16.8 4.5 18 5 18 6C18 6.8 17.3 7.5 16.5 7.5V10.5'
const lever = 'M17.5 13.5V15.5'

export default ({ radius }) => [body(radius), toast, lever]

// 实心：吐司一块，机身一块叠在前面，吐司在机身四周让出 GAP 的缝；压杆槽挖空
export const fill = ({ radius }) => [...stacked(`${toast}Z`, body(radius)), knock(lever)]
