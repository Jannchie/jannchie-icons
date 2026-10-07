import { rounded } from '../geometry'

// Option ⌥：左上一横接一道斜线落到右下再一横，右上另一横
export default ({ radius }) => [
  rounded([[3.5, 6.5], [8.5, 6.5], [15.5, 17.5], [20.5, 17.5]], Math.min(radius, 1), false),
  'M14.5 6.5H20.5',
]
