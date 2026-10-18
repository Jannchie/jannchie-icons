import { priceCoins } from '../price'

// 价格 2 档（中等，人民币 / 日元）：2 层硬币，上面 2 层只留虚线点，顶上立一枚人民币 / 日元硬币
export default opts => priceCoins('yen', 2, opts)
