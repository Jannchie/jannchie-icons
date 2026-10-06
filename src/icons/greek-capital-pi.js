import { GREEK_CAPITAL } from '../greek'

// Π（大写 pi）
export default ({ radius }) => GREEK_CAPITAL.pi(Math.min(radius, 1.5))
