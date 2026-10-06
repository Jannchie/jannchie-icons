import { ring } from '../marks'

// PS 面键 ✕：圆圈 + 叉
export default ({ radius }) => [
  ring(),
  'M8.75 8.75L15.25 15.25',
  'M15.25 8.75L8.75 15.25',
]
