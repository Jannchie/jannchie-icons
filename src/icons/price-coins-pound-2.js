import { priceCoins } from '../price'

// 价格 2 档（中等，英镑）：2 层硬币，上面 2 层只留虚线点，顶上立一枚英镑硬币
export default opts => priceCoins('pound', 2, opts)
