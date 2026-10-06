import { cloud } from '../symbols'
import { dot } from '../scene'

// 雪：云 + 两排错开的雪点
export default () => [
  ...cloud([12, 9.5], 2.2),
  ...[[8, 18], [12, 18], [16, 18], [10, 21], [14, 21]].map(([x, y]) => dot(x, y)),
]
