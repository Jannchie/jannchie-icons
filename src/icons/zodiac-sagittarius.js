import { ZODIAC } from '../zodiac'

// 黄道十二宫：♐ 射手
export default ({ radius }) => ZODIAC.sagittarius.paths(Math.min(radius, 1.5))
