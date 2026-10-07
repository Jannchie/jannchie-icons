import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᚺ hagalaz
export default ({ radius }) => RUNES.hagalaz.paths(crisp(radius))
