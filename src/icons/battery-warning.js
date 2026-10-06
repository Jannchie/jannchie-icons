import { shell } from '../battery'

// 电池警告：电池壳 + 中间感叹号
// 感叹号的点画成一小段和竖线等粗的线（不用固定直径的圆点，否则细字重下点比竖粗很多）
export default ({ radius }) => [...shell(radius), 'M11 9.25V12', 'M11 14.5V14.6']
