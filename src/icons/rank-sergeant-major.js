import { enlisted } from '../rank'

// 军衔：总军士长（3 道 V + 3 道弧 + 星，美军 E-9）
export default ({ radius }) => enlisted(3, 3, true)
