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
