// 机械脑共用：右半边的电路走线（从中间脑沟伸出，末端是空心焊点），左半边用镜像
import { circle } from './geometry'
import { mirror } from './transform'

// 脑沟在 12 上（见 icons/brain.js），走线的横段落在 .5 上
export const RIGHT_TRACES = [
  'M12 9.5H14.25', circle(15.5, 9.5, 1.25),
  'M12 13.5H13.5L15 15', circle(15.9, 15.9, 1.25),
]
export const LEFT_TRACES = RIGHT_TRACES.map(d => mirror(d, 12))
