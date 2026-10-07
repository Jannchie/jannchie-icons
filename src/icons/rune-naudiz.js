import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᚾ naudiz
export default ({ radius }) => RUNES.naudiz.paths(crisp(radius))
