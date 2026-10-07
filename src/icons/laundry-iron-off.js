import { LAUNDRY } from '../laundry'

// 洗涤标志：不可熨烫
export default ({ radius }) => LAUNDRY['iron-off'].paths(radius)
