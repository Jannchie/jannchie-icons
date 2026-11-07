import { solid } from '../solid'
import { rotate } from '../transform'

// 斧：长柄从斧头上方贯穿下来 + 一侧的大斧头（靠柄的一边是直的，刃口是往外鼓的弧）；竖着画再逆时针转 45°
const handle = 'M12 3V21.5'
const head = 'M12 4.5L8 3A10 10 0 0 0 8 14L12 12.5'

export default () => [
  rotate(handle, -45),
  rotate(head, -45),
]

// 实心：斧头沿柄封口成一块，长柄照旧是线
export const fill = () => [
  solid(rotate(`${head}Z`, -45)),
  rotate(handle, -45),
]
