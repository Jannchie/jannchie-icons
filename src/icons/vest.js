import { dot } from '../scene'
import { knock, solid } from '../solid'

// 马甲（西装背心，正面）：没有袖子——窄窄的肩带（7–9.5、14.5–17）往下挖出深深的袖窿，衣身两侧直落（4.5 / 19.5），
// 领口是一个深 V（尖在 (12, 12)），V 尖往下一道门襟，下摆在门襟两边各收成一个尖角；门襟右边两颗纽扣
// 深袖窿 + 尖下摆是西装背心的记号，和 t-shirt、jacket 的袖子区分开
const shape = 'M9.5 3.5H7C7 6.5 6.5 9 4.5 10V18.5L10 20.5L12 19L14 20.5L19.5 18.5V10C17.5 9 17 6.5 17 3.5H14.5L12 12Z'
const placket = 'M12 12V19'
const buttons = [{ ...dot(15, 14), round: true }, { ...dot(15, 17), round: true }]

export default () => [shape, placket, ...buttons]

// 实心：马甲一块，门襟从 V 尖一直挖穿下摆，分成左右两片；纽扣挖成圆孔
export const fill = () => [solid(shape), knock(['M12 12V23', ...buttons])]
