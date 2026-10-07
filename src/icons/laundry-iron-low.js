import { LAUNDRY } from '../laundry'

// 洗涤标志：低温熨烫
export default ({ radius }) => LAUNDRY['iron-low'].paths(radius)
