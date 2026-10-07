import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛗ mannaz
export default ({ radius }) => RUNES.mannaz.paths(crisp(radius))
