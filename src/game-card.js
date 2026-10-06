// 功能牌共用：竖长圆角牌面 + 斜放的椭圆牌心（牌心里放符号），左上、右下两个角标位
import { rounded } from './geometry'
import { rotate } from './transform'

export const card = radius => [
  rounded([[5, 2.5], [19, 2.5], [19, 21.5], [5, 21.5]], Math.min(radius, 2)),
  rotate('M12 5.5C16.5 5.5 18 9 18 12C18 15 16.5 18.5 12 18.5C7.5 18.5 6 15 6 12C6 9 7.5 5.5 12 5.5Z', 30),
]
