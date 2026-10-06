import { ZODIAC } from '../zodiac'

// 黄道十二宫：♒ 水瓶
export default ({ radius }) => ZODIAC.aquarius.paths(Math.min(radius, 1.5))
