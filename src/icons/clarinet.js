import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 单簧管：竖着画再逆时针转 45°（吹嘴朝左上，喇叭口朝右下；flute 是另一个方向、两头平齐的笛管）。
// 顶上收窄的吹嘴（1.5 宽，往下张到管宽）+ 吹嘴和管身之间一道接缝 + 直筒管身（宽 4，x 10–14）
// + 底下往外弯开的喇叭口（到 7.5–16.5）+ 管身上三个按孔；靠"一头尖、一头喇叭口的直管"和 flute、saxophone 区分开
const t = d => rotate(d, -45)
const tube = 'M11.25 1.75H12.75L14 5.5V15.5C14 18 15 19.5 16.5 21H7.5C9 19.5 10 18 10 15.5V5.5Z'
const keys = [8.5, 11.25, 14].map(y => ({ d: t(`M12 ${y}h0`), dot: 1.5 }))

export default () => [t(tube), t('M10 5.5H14'), ...keys]

// 实心：管身一块，接缝两头挖穿（吹嘴和管身分开），按孔挖空（按 eye 封顶，尖角模式下也是圆孔）
export const fill = ({ stroke }) => [
  solid(t(tube)),
  knock(t(`M${10 - stroke} 5.5H${14 + stroke}`)),
  knock(keys.map(k => ({ ...k, eye: true, round: true }))),
]
