// AI 任务图标用的「模态」小符号（与 symbols.js 一样：c 为中心，k 为缩放，k = 1 时约 7×7）
// 以及「输入 › 输出」的统一构图
// 像素网格：按 k = 1、中心在整数坐标上设计，横竖线到中心的偏移都是 n.5，落在 .5 上（线宽 1 时清晰）；
// 只有一条居中竖线的符号（话筒、立方体、关键点）整体偏半格
import { circle, crisp, rounded } from './geometry'
import { glyph } from './letters'
import { dot } from './scene'
import { chevronRight, image, music, sparkle } from './symbols'

const at = ([cx, cy], k) => ([x, y]) => [cx + x * k, cy + y * k]
const pts = (c, k, list) => list.map(at(c, k))
const line = (c, k, a, b) => {
  const [p, q] = [at(c, k)(a), at(c, k)(b)]
  return `M${p[0]} ${p[1]}L${q[0]} ${q[1]}`
}
const plain = paths => paths.map(p => p.d ?? p) // 去掉细节标记，交给调用方统一处理

// ---------- 模态 ----------
export const M = {
  // 三行间距 3，整体比中心高半格
  text: (c, k) => [line(c, k, [-3.5, -3.5], [3.5, -3.5]), line(c, k, [-3.5, -0.5], [3.5, -0.5]), line(c, k, [-3.5, 2.5], [1, 2.5])],
  image: (c, k, r) => plain(image(c, k, r)),
  video: (c, k, r) => [
    rounded(pts(c, k, [[-3.5, -2.5], [1.5, -2.5], [1.5, 2.5], [-3.5, 2.5]]), Math.min(r, k)),
    rounded(pts(c, k, [[1.5, -0.75], [3.5, -2], [3.5, 2], [1.5, 0.75]]), Math.min(r, k * 0.5), false),
  ],
  // 四根竖条间距 2，整体比中心偏左半格
  audio: (c, k) => [[-3.5, 1.25], [-1.5, 3.5], [0.5, 2.5], [2.5, 1]].map(([x, h]) => line(c, k, [x, -h], [x, h])),
  music: (c, k, r) => plain(music(c, k, r)),
  // 话筒：居中的立杆要落在 .5 上，整体往右偏半格，胶囊宽 2
  // 话筒：话筒头（到 0）和托弧（半径 3，底到 2.5）之间四周都留 2，常规字重下不会粘成一团
  speech: (c, k) => [
    rounded(pts(c, k, [[-0.5, -3.5], [1.5, -3.5], [1.5, 0], [-0.5, 0]]), k),
    `M${at(c, k)([-2.5, -0.5]).join(' ')}A${3 * k} ${3 * k} 0 0 0 ${at(c, k)([3.5, -0.5]).join(' ')}`,
    line(c, k, [0.5, 2.5], [0.5, 3.5]),
  ],
  doc: (c, k, r) => [
    rounded(pts(c, k, [[-2.5, -3.5], [0.75, -3.5], [2.5, -1.75], [2.5, 3.5], [-2.5, 3.5]]).map((p, i) => (i === 1 || i === 2 ? [...p, crisp(r)] : p)), Math.min(r, k)),
    line(c, k, [-1, -0.5], [1, -0.5]),
    line(c, k, [-1, 1.5], [1, 1.5]),
  ],
  table: (c, k, r) => [
    rounded(pts(c, k, [[-3.5, -2.5], [3.5, -2.5], [3.5, 2.5], [-3.5, 2.5]]), Math.min(r, k)),
    line(c, k, [-3.5, -0.5], [3.5, -0.5]),
    line(c, k, [-1.5, -0.5], [-1.5, 2.5]),
  ],
  // 立方体：半宽取 3（接近 3.5·cos30°），居中的竖棱要落在 .5 上，整体往右偏半格
  cube: (c, k, r) => {
    const [x, h] = [0.5, 3]
    return [
      rounded(pts(c, k, [[x, -3.5], [x + h, -1.75], [x + h, 1.75], [x, 3.5], [x - h, 1.75], [x - h, -1.75]]), Math.min(r, k * 0.5)),
      `M${at(c, k)([x - h, -1.75]).join(' ')}L${at(c, k)([x, 0]).join(' ')}L${at(c, k)([x + h, -1.75]).join(' ')}`,
      line(c, k, [x, 0], [x, 3.5]),
    ]
  },
  any: (c, k, r) => plain(sparkle(c, k, r)),
  // 另一种语言的文字：线条字母 A（字高 6，横画在 4 处）；横画落在中心下方 1.5，整体比居中低 0.35
  lang: (c, k) => [glyph('A', at(c, k)([-1.75 * 1.15, 0])[0], at(c, k)([0, 1.5 - 4 * 1.15])[1], 1.15 * k)],
  // 词元：一行文字里有一个词被框出来
  tokens: (c, k, r) => [
    line(c, k, [-3.5, -2.5], [3.5, -2.5]),
    line(c, k, [-3.5, 1.5], [-3, 1.5]),
    rounded(pts(c, k, [[-1.5, 0.5], [1.5, 0.5], [1.5, 2.5], [-1.5, 2.5]]), Math.min(r, k * 0.5)),
    line(c, k, [3, 1.5], [3.5, 1.5]),
  ],
  question: (c, k) => [
    `M${at(c, k)([-2, -1.25]).join(' ')}A${2 * k} ${2 * k} 0 1 1 ${at(c, k)([0.8, 0.6]).join(' ')}C${at(c, k)([0.25, 0.85]).join(' ')} ${at(c, k)([0, 1.25]).join(' ')} ${at(c, k)([0, 1.75]).join(' ')}`,
    dot(...at(c, k)([0, 3.5])),
  ],

  // ---------- 输出 ----------
  tag: (c, k, r) => [
    rounded(pts(c, k, [[-3.5, -3.5], [0, -3.5], [3.5, 0], [0, 3.5], [-3.5, 0]]), Math.min(r, k)),
    dot(...at(c, k)([-1.5, -1.5]), 1.5),
  ],
  vector: (c, k) => [
    `M${at(c, k)([-1, -3.5]).join(' ')}H${at(c, k)([-2.5, 0])[0]}V${at(c, k)([0, 3.5])[1]}H${at(c, k)([-1, 0])[0]}`,
    `M${at(c, k)([1, -3.5]).join(' ')}H${at(c, k)([2.5, 0])[0]}V${at(c, k)([0, 3.5])[1]}H${at(c, k)([1, 0])[0]}`,
    ...[-2, 0, 2].map(y => dot(...at(c, k)([0, y]), 1.5)),
  ],
  detect: (c, k, r) => {
    const corner = (x, y, dx, dy) => rounded(pts(c, k, [[x, y + dy * 2], [x, y], [x + dx * 2, y]]), Math.min(r, k * 0.75), false)
    return [
      corner(-3.5, -3.5, 1, 1), corner(3.5, -3.5, -1, 1), corner(3.5, 3.5, -1, -1), corner(-3.5, 3.5, 1, -1),
      rounded(pts(c, k, [[-1.5, -1.5], [1.5, -1.5], [1.5, 1.5], [-1.5, 1.5]]), Math.min(r, k * 0.5)),
    ]
  },
  segment: (c, k, r) => [
    rounded(pts(c, k, [[-3.5, -3.5], [3.5, -3.5], [3.5, 3.5], [-3.5, 3.5]]), Math.min(r, k)),
    `M${at(c, k)([-3.5, 1]).join(' ')}C${at(c, k)([-1.5, -2]).join(' ')} ${at(c, k)([1, 2.5]).join(' ')} ${at(c, k)([3.5, -1]).join(' ')}`,
  ],
  mask: (c, k) => [circle(...at(c, k)([-1, -1]), 2.5 * k), circle(...at(c, k)([1.5, 1.5]), 2 * k)],
  keypoints: (c, k) => {
    // 居中的竖线（脊柱）落在 .5 上：整体往右偏半格
    const p = [[0, -3], [0, 0.5], [-3, -1.5], [3, -1.5], [-2, 3.5], [2, 3.5]].map(([x, y]) => [x + 0.5, y])
    return [
      `M${at(c, k)(p[2]).join(' ')}L${at(c, k)(p[0]).join(' ')}L${at(c, k)(p[3]).join(' ')}`,
      `M${at(c, k)(p[0]).join(' ')}L${at(c, k)(p[1]).join(' ')}`,
      `M${at(c, k)(p[4]).join(' ')}L${at(c, k)(p[1]).join(' ')}L${at(c, k)(p[5]).join(' ')}`,
      ...p.map(q => dot(...at(c, k)(q), 1.75)),
    ]
  },
  depth: (c, k) => [
    `M${at(c, k)([-3.5, -1.5]).join(' ')}L${at(c, k)([0, -3.5]).join(' ')}L${at(c, k)([3.5, -1.5]).join(' ')}L${at(c, k)([0, 0.5]).join(' ')}Z`,
    `M${at(c, k)([-3.5, 0.5]).join(' ')}L${at(c, k)([0, 2.5]).join(' ')}L${at(c, k)([3.5, 0.5]).join(' ')}`,
    `M${at(c, k)([-3.5, 2]).join(' ')}L${at(c, k)([0, 4]).join(' ')}L${at(c, k)([3.5, 2]).join(' ')}`,
  ],
  rank: (c, k) => [
    line(c, k, [-3.5, -3.5], [3.5, -3.5]),
    line(c, k, [-3.5, -0.5], [1.5, -0.5]),
    line(c, k, [-3.5, 2.5], [-0.5, 2.5]),
  ],
  blank: (c, k, r) => [
    line(c, k, [-3.5, -2.5], [3.5, -2.5]),
    line(c, k, [-3.5, 1.5], [-3, 1.5]),
    rounded(pts(c, k, [[-1.5, 0.5], [3.5, 0.5], [3.5, 2.5], [-1.5, 2.5]]), Math.min(r, k * 0.5)),
  ],
  score: (c, k) => [
    `M${at(c, k)([-3.5, 2.5]).join(' ')}A${3.5 * k} ${3.5 * k} 0 0 1 ${at(c, k)([3.5, 2.5]).join(' ')}`,
    line(c, k, [0, 2.5], [2, -0.5]),
  ],
  trend: (c, k) => [`M${pts(c, k, [[-3.5, 3], [-1, 0.5], [1, 2], [3.5, -2.5]]).map(p => p.join(' ')).join('L')}`],
  forecast: (c, k) => [
    `M${pts(c, k, [[-3.5, 3], [-1.5, 1], [0, 2]]).map(p => p.join(' ')).join('L')}`,
    ...[[1.25, 0.75], [2.5, -0.75], [3.5, -2.25]].map(q => dot(...at(c, k)(q), 1.5)),
  ],
  check: (c, k) => [`M${pts(c, k, [[-3, 0], [-1, 2], [3, -2]]).map(p => p.join(' ')).join('L')}`],
}

// Hugging Face 的任务名单（图标文件名就是任务名），分类时按名单识别
export const AI_TASKS = ['any-to-any', 'audio-classification', 'audio-text-to-text', 'audio-to-audio', 'automatic-speech-recognition', 'depth-estimation', 'document-question-answering', 'feature-extraction', 'fill-mask', 'graph-machine-learning', 'image-classification', 'image-feature-extraction', 'image-segmentation', 'image-text-to-image', 'image-text-to-text', 'image-text-to-video', 'image-to-3d', 'image-to-image', 'image-to-text', 'image-to-video', 'keypoint-detection', 'mask-generation', 'object-detection', 'question-answering', 'reinforcement-learning', 'robotics', 'sentence-similarity', 'summarization', 'table-question-answering', 'tabular-classification', 'tabular-regression', 'text-classification', 'text-generation', 'text-ranking', 'text-to-3d', 'text-to-audio', 'text-to-image', 'text-to-speech', 'text-to-video', 'time-series-forecasting', 'token-classification', 'translation', 'unconditional-image-generation', 'video-classification', 'video-text-to-text', 'video-to-video', 'visual-document-retrieval', 'visual-question-answering', 'voice-activity-detection', 'zero-shot-classification', 'zero-shot-image-classification', 'zero-shot-object-detection']

// 输入 › 输出：输入在左列（一个居中，两个上下排），中间一个小 ›，输出在右边
// 两个输入也按 k = 1 画（缩小会让横竖线离开 .5），中心放在整数 y 上：7 / 17
export function pipeline(inputs, output, radius) {
  const ys = inputs.length === 1 ? [12] : [7, 17]
  return [
    ...inputs.flatMap((m, i) => M[m]([6, ys[i]], 1, radius)),
    ...plain(chevronRight([12, 12], 0.55, radius)),
    ...M[output]([18, 12], 1, radius),
  ]
}
