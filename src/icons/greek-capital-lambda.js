import { GREEK_CAPITAL } from '../greek'

// Λ（大写 lambda）
export default ({ radius }) => GREEK_CAPITAL.lambda(Math.min(radius, 1.5))
