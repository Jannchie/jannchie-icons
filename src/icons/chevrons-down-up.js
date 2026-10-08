import { crisp, rounded } from '../geometry'

// 上下收起：chevrons-up-down 的反向——上面的折角朝下、下面的折角朝上，两尖相对指向中线
// 折角尺寸和 chevrons-up-down 一样（宽 9、深 4.5），尖端 9 / 15 隔 6
export default ({ radius }) => [
  rounded([[7.5, 4.5], [12, 9], [16.5, 4.5]], crisp(radius), false),
  rounded([[7.5, 19.5], [12, 15], [16.5, 19.5]], crisp(radius), false),
]
