import { priceCoins } from '../price'

// 价格 2 档（中等，卢布）：2 层硬币，上面 2 层只留虚线点，顶上立一枚卢布硬币
export default opts => priceCoins('ruble', 2, opts)
