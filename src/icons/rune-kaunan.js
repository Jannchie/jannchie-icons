import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᚲ kaunan
export default ({ radius }) => RUNES.kaunan.paths(crisp(radius))
