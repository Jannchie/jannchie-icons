import { priceCoins } from '../price'

// 价格 1 档（便宜，美元）：1 层硬币，上面 3 层只留虚线点，顶上立一枚美元硬币
export default opts => priceCoins('dollar', 1, opts)
