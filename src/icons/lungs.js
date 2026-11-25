import { solid } from '../solid'
import { mirror } from '../transform'

// 肺：左右两片肺叶（各是一条闭合轮廓：内侧一条竖直的边 9.5 / 14.5，外侧从肺尖鼓到肺底，2.75–21.25 × 6.5–20.5）
// + 正中一根气管（从 3 落到 10.5）+ 气管底下分到两片肺叶内侧的两根支气管
const lobe = 'M9.5 9.5C9.5 7.75 8.75 6.5 7.75 6.5C5.25 6.5 2.75 11 2.75 16.5C2.75 18.75 3.75 20.5 5.5 20.5C7.5 20.5 9.5 19 9.5 16.5Z'
const lobes = [lobe, mirror(lobe)]
const trachea = 'M12 3V10.5'
const bronchi = 'M9.5 12.5L12 10.5L14.5 12.5'

export default () => [...lobes, trachea, bronchi]

// 实心：两片肺叶各一块；气管、支气管照旧是线
export const fill = () => [solid(lobes), trachea, bronchi]
