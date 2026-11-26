import { clip } from '../clip'
import { mirror, rotate, scale, translate } from '../transform'
import hand, { PALM } from './hand'

// 鼓掌：两只 hand 前后叠着——前面一只缩到 0.75 倍、往右歪 25°，放在右下；后面一只左右镜像、往左歪 10°，放在左上，
// 被前面那只手挡住的部分裁掉（离前手轮廓留一个线宽加 0.75 的缝），只露出左上的几根指尖；右上角三道短线是拍手的响声
// SILHOUETTE 是 hand 的整个外轮廓（闭合），只用来裁后面那只手
// 都是线，没有实心版（同 hand）
const SILHOUETTE = `M7.5 12.1V6A1.5 1.5 0 0 1 10.5 6V4.5A1.5 1.5 0 0 1 13.5 4.5V6A1.5 1.5 0 0 1 16.5 6V8A1.5 1.5 0 0 1 19.5 8${PALM}Z`
const front = d => translate(rotate(scale(d, 0.75), 25), 1.25, 2.25)
const back = d => translate(rotate(scale(mirror(d), 0.75), -10), -3.25, -1)

export default (opts) => {
  const cover = front(SILHOUETTE)
  const behind = hand(opts).map(d => clip(back(d), [cover], opts.stroke + 0.75, [cover])).filter(Boolean)
  return [
    ...behind,
    ...hand(opts).map(front),
    'M17.25 4.25L18 2.75',
    'M19.5 6.25L21 5.5',
    'M20 8.5H21.5',
  ]
}
