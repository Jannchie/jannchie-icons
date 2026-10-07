import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᚦ thurisaz
export default ({ radius }) => RUNES.thurisaz.paths(crisp(radius))
