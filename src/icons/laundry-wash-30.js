import { LAUNDRY } from '../laundry'

// 洗涤标志：水洗 30℃
export default ({ radius }) => LAUNDRY['wash-30'].paths(radius)
