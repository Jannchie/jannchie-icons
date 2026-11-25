import { eye } from '../scene'
import { knock, stacked } from '../solid'
import { mirror } from '../transform'

// 鹿：正面头像。上宽下收的长脸（7.5–16.5 × 7.5–20.5）+ 两侧往外上方撇的叶形耳朵（耳根在脸的竖边上）+ 头顶一对鹿角（各一根往外弯的主枝 + 一根朝上的小杈）
// + 两只眼睛 + 嘴尖上一颗实心的鼻头
const face = 'M7.5 10C7.5 8.5 9.5 7.5 12 7.5C14.5 7.5 16.5 8.5 16.5 10V13.5C16.5 17.5 14.5 20.5 12 20.5C9.5 20.5 7.5 17.5 7.5 13.5Z'
const ear = 'M7.5 11.75C5.5 11.75 3.75 10.75 2.75 9C4.75 8.5 6.5 9 7.5 10'
const ears = [ear, mirror(ear)]
const antler = ['M9.5 7.75C9.5 5.5 8.5 4.25 6 4', 'M8.5 4.9V2.75']
const antlers = [...antler, ...antler.map(d => mirror(d))]
const features = [
  eye(10, 12),
  eye(14, 12),
  { d: 'M10.75 18A1.25 0.9 0 1 0 13.25 18A1.25 0.9 0 1 0 10.75 18Z', fill: true, round: true },
]

export default () => [face, ...ears, ...antlers, ...features]

// 实心：两只耳朵封口各成一块，在脸四周让出缝，脸一块，眼睛、鼻头挖空；鹿角照旧是线
export const fill = () => [...stacked(ears.map(d => `${d}Z`), face), knock(features), ...antlers]
