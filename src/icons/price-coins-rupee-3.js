import { priceCoins } from '../price'

// 价格 3 档（偏贵，卢比）：3 层硬币，上面 1 层只留虚线点，顶上立一枚卢比硬币
export default opts => priceCoins('rupee', 3, opts)
