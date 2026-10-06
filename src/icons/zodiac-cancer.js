import { ZODIAC } from '../zodiac'

// 黄道十二宫：♋ 巨蟹
export default ({ radius }) => ZODIAC.cancer.paths(Math.min(radius, 1.5))
