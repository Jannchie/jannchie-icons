import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛟ othala
export default ({ radius }) => RUNES.othala.paths(crisp(radius))
