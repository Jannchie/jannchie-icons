import { rotate } from '../transform'

// 斧：长柄从斧头上方贯穿下来 + 一侧的大斧头（靠柄的一边是直的，刃口是往外鼓的弧）；竖着画再逆时针转 45°
export default () => [
  rotate('M12 3V21.5', -45),
  rotate('M12 4.5L8 3A10 10 0 0 0 8 14L12 12.5', -45),
]
