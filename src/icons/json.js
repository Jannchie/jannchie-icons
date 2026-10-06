import braces from './code-braces'
import { dot } from '../scene'

// JSON：花括号 + 中间三个点
export default () => [...braces(), dot(9, 12), dot(12, 12), dot(15, 12)]
