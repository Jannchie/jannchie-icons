import { LAUNDRY } from '../laundry'

// 洗涤标志：干洗 F（石油溶剂）
export default ({ radius }) => LAUNDRY['dry-clean-f'].paths(radius)
