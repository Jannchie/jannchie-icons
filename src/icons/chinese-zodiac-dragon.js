import { CHINESE_ZODIAC, CHINESE_ZODIAC_FILL } from '../chinese-zodiac'

// 十二生肖：龙
export default ({ radius }) => CHINESE_ZODIAC.dragon.paths(radius)

// 实心版见 chinese-zodiac.js
export const fill = ({ radius }) => CHINESE_ZODIAC_FILL.dragon(radius)
