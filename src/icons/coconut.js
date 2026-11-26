import { oval } from '../geometry'
import { hole, knock, stacked } from '../solid'

// 椰子（劈开的半个，斜俯视）：碗形的壳（3–21，口沿在 9，壳底到 18.5）+ 口沿的椭圆（外圈是壳的切口，半高 4；
// 内圈是白色椰肉的里缘，5.5 × 1.5，和外圈上下差 2.5，粗字重下中间还留得出白）
// + 壳上三道短短的纤维纹（细节线，放在口沿和壳底的正中；两边的壳带太窄，放不下）。一圈厚厚的椰肉和毛糙的壳是记号，和碗、切开的橙子区分开
const shell = 'M3 9C3 14.5 7 18.5 12 18.5C17 18.5 21 14.5 21 9'
const rim = oval(12, 9, 9, 4)
const flesh = oval(12, 9, 5.5, 1.5)
const fibers = ['M9.25 14.5L9 15.5', 'M12 15V16', 'M14.75 14.5L15 15.5'].map(d => ({ d, detail: true }))

export default () => [shell, rim, flesh, ...fibers]

// 实心：壳一块，口沿的椭圆在前、壳在它四周让出缝；椰肉的里缘挖成洞（椰汁），纤维纹挖空
export const fill = ({ stroke }) => [...stacked(`${shell}Z`, rim), hole(oval(12, 9, 5.5 - stroke / 2, 1.5 - stroke / 2)), knock(fibers)]
