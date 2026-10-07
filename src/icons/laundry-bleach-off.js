import { LAUNDRY } from '../laundry'

// 洗涤标志：不可漂白
export default ({ radius }) => LAUNDRY['bleach-off'].paths(radius)
