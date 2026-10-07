import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛉ algiz
export default ({ radius }) => RUNES.algiz.paths(crisp(radius))
