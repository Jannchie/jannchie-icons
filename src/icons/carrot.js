import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 胡萝卜：锥形萝卜身 + 两道纹 + 三根缨子；竖着画再顺时针转 45°，尖朝左下
export default ({ radius }) => [
  rotate('M9 7H15C15 12 13.5 17 12 21.5C10.5 17 9 12 9 7Z', 45),
  rotate('M9.5 10.5H11.5', 45),
  rotate('M12.5 14H14', 45),
  rotate('M12 7V3', 45),
  rotate('M12 7L9.5 3.5', 45),
  rotate('M12 7L14.5 3.5', 45),
]

// 实心：萝卜身一块，挖掉两道纹（贴边的一端多伸一个线宽，切出干净的缺口）；缨子照旧是线
export const fill = ({ stroke }) => [
  solid(rotate('M9 7H15C15 12 13.5 17 12 21.5C10.5 17 9 12 9 7Z', 45)),
  knock([rotate(`M${9.5 - stroke} 10.5H11.5`, 45), rotate(`M12.5 14H${14 + stroke}`, 45)]),
  rotate('M12 7V3', 45),
  rotate('M12 7L9.5 3.5', 45),
  rotate('M12 7L14.5 3.5', 45),
]
