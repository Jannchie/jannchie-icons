import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛈ perthro
export default ({ radius }) => RUNES.perthro.paths(crisp(radius))
