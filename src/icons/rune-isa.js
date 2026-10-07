import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛁ isa
export default ({ radius }) => RUNES.isa.paths(crisp(radius))
