import { ZODIAC } from '../zodiac'

// 黄道十二宫：♊ 双子
export default ({ radius }) => ZODIAC.gemini.paths(Math.min(radius, 1.5))
