import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᚹ wunjo
export default ({ radius }) => RUNES.wunjo.paths(crisp(radius))
