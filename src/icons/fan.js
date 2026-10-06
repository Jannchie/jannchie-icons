import { ring } from '../marks'
import { dot } from '../scene'
import { rotate } from '../transform'

// 风扇：外框圆 + 三片绕轴心的弯叶片（同一片转 120°）+ 轴心
export default ({ radius }) => [
  ring(),
  rotate('M12 12C12 9 13 6.5 15.5 6.5C17 6.5 17.5 8 16.5 9.5C15.5 11 13.5 12 12 12Z', 0),
  rotate('M12 12C12 9 13 6.5 15.5 6.5C17 6.5 17.5 8 16.5 9.5C15.5 11 13.5 12 12 12Z', 120),
  rotate('M12 12C12 9 13 6.5 15.5 6.5C17 6.5 17.5 8 16.5 9.5C15.5 11 13.5 12 12 12Z', 240),
  dot(12, 12),
]
