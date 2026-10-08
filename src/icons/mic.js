import { rounded } from '../geometry'

// 麦克风：胶囊 + U 形支架 + 立杆 + 底座
export default () => [
  rounded([[9, 3], [15, 3], [15, 14], [9, 14]], 3),
  'M6 11A6 6 0 0 0 18 11',
  'M12 17V20.5',
  'M8.5 20.5H15.5',
]
