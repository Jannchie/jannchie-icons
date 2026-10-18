import { priceCoins } from '../price'

// 价格 3 档（偏贵，比特币）：3 层硬币，上面 1 层只留虚线点，顶上立一枚比特币硬币
export default opts => priceCoins('bitcoin', 3, opts)
