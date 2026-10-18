import { priceCoins } from '../price'

// 价格 3 档（偏贵，人民币 / 日元）：3 层硬币，上面 1 层只留虚线点，顶上立一枚人民币 / 日元硬币
export default opts => priceCoins('yen', 3, opts)
