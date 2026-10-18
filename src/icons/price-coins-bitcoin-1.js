import { priceCoins } from '../price'

// 价格 1 档（便宜，比特币）：1 层硬币，上面 3 层只留虚线点，顶上立一枚比特币硬币
export default opts => priceCoins('bitcoin', 1, opts)
