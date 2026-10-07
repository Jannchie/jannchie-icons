import { warning } from '../tone'
import { withIcon } from '../user'
import crown from './crown'

// 所有者：人像 + 右下角皇冠
export default opts => withIcon(crown, opts, warning)
