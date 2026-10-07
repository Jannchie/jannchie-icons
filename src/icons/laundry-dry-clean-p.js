import { LAUNDRY } from '../laundry'

// 洗涤标志：干洗 P（四氯乙烯）
export default ({ radius }) => LAUNDRY['dry-clean-p'].paths(radius)
