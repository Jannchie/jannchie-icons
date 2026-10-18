import { priceCoins } from '../price'

// 价格 3 档（偏贵，美元）：3 层硬币，上面 1 层只留虚线点，顶上立一枚美元硬币
export default opts => priceCoins('dollar', 3, opts)
