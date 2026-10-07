import { LAUNDRY } from '../laundry'

// 洗涤标志：仅非氯漂白
export default ({ radius }) => LAUNDRY['bleach-non-chlorine'].paths(radius)
