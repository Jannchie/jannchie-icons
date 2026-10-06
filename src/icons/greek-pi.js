import { GREEK } from '../greek'

// π（pi）
export default ({ radius }) => GREEK.pi(Math.min(radius, 1.5))
