// 机械脑共用：右半边的电路走线（从中间脑沟伸出，末端是空心焊点），左半边用镜像
import { circle } from './geometry'
import { mirror } from './transform'

export const RIGHT_TRACES = [
  'M12 9.5H14.25', circle(15.5, 9.5, 1.25),
  'M12 13H13.5L15 14.5', circle(15.9, 15.4, 1.25),
]
export const LEFT_TRACES = RIGHT_TRACES.map(d => mirror(d))
