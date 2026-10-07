import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᚷ gebo
export default ({ radius }) => RUNES.gebo.paths(crisp(radius))
