import { sparkle } from '../symbols'

// AI 星芒：一大一小两颗星斜着排（见 symbols 的 sparkle），整组放大到墨迹约 2–22
export default ({ radius }) => sparkle([12, 12], 2.6, radius)
