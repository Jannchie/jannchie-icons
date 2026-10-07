import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛒ berkana
export default ({ radius }) => RUNES.berkana.paths(crisp(radius))
