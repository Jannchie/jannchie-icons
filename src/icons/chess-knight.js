import { base } from '../chess'
import { eye } from '../scene'

// 国际象棋·马：朝左的马头侧影（鬃毛、口鼻、下颌）+ 眼睛 + 底座
export default ({ radius }) => [
  'M15.75 17.5C15.75 13.5 17.5 11 17.5 8C17.5 5 15.5 3.5 12.5 3.5L11.5 5L9 6.75L6.5 10.5L7.75 12.25L10.5 11L9 14L8.25 17.5Z',
  eye(12, 7.5, 1.75),
  base(radius),
]
