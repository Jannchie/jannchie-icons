import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᚠ fehu
export default ({ radius }) => RUNES.fehu.paths(crisp(radius))
