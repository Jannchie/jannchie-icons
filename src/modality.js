// AI 任务图标用的「模态」小符号（与 symbols.js 一样：c 为中心，k 为缩放，k = 1 时约 7×7）
// 以及「输入 › 输出」的统一构图
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
  text: (c, k) => [line(c, k, [-3.5, -2.5], [3.5, -2.5]), line(c, k, [-3.5, 0], [3.5, 0]), line(c, k, [-3.5, 2.5], [1, 2.5])],
  image: (c, k, r) => plain(image(c, k, r)),
  video: (c, k, r) => [
    rounded(pts(c, k, [[-3.5, -2.75], [1.75, -2.75], [1.75, 2.75], [-3.5, 2.75]]), Math.min(r, k)),
    rounded(pts(c, k, [[1.75, -0.75], [3.5, -2], [3.5, 2], [1.75, 0.75]]), Math.min(r, k * 0.5), false),
  ],
  audio: (c, k) => [[-3, 1], [-1.5, 2.5], [0, 3.5], [1.5, 2], [3, 0.75]].map(([x, h]) => line(c, k, [x, -h], [x, h])),
  music: (c, k, r) => plain(music(c, k, r)),
  speech: (c, k) => [
    rounded(pts(c, k, [[-1.25, -3.5], [1.25, -3.5], [1.25, 0.5], [-1.25, 0.5]]), 1.25 * k),
    `M${at(c, k)([-2.5, -0.5]).join(' ')}A${2.5 * k} ${2.5 * k} 0 0 0 ${at(c, k)([2.5, -0.5]).join(' ')}`,
    line(c, k, [0, 2], [0, 3.5]),
  ],
  doc: (c, k, r) => [
    rounded(pts(c, k, [[-2.75, -3.5], [1, -3.5], [2.75, -1.75], [2.75, 3.5], [-2.75, 3.5]]).map((p, i) => (i === 1 || i === 2 ? [...p, crisp(r)] : p)), Math.min(r, k)),
    line(c, k, [-1.25, 0], [1.25, 0]),
    line(c, k, [-1.25, 2], [1.25, 2]),
  ],
  table: (c, k, r) => [
    rounded(pts(c, k, [[-3.5, -3], [3.5, -3], [3.5, 3], [-3.5, 3]]), Math.min(r, k)),
    line(c, k, [-3.5, -0.75], [3.5, -0.75]),
    line(c, k, [-1, -0.75], [-1, 3]),
  ],
  cube: (c, k, r) => {
    const h = 3.5 * Math.cos(Math.PI / 6)
    return [
      rounded(pts(c, k, [[0, -3.5], [h, -1.75], [h, 1.75], [0, 3.5], [-h, 1.75], [-h, -1.75]]), Math.min(r, k * 0.5)),
      `M${at(c, k)([-h, -1.75]).join(' ')}L${at(c, k)([0, 0]).join(' ')}L${at(c, k)([h, -1.75]).join(' ')}`,
      line(c, k, [0, 0], [0, 3.5]),
    ]
  },
  any: (c, k, r) => plain(sparkle(c, k, r)),
  // 另一种语言的文字：线条字母 A
  lang: (c, k) => [glyph('A', at(c, k)([-1.75 * 1.15, 0])[0], at(c, k)([0, -3 * 1.15])[1], 1.15 * k)],
  // 词元：一行文字里有一个词被框出来
  tokens: (c, k, r) => [
    line(c, k, [-3.5, -2.5], [3.5, -2.5]),
    line(c, k, [-3.5, 1], [-2.25, 1]),
    rounded(pts(c, k, [[-0.75, -0.25], [2, -0.25], [2, 2.25], [-0.75, 2.25]]), Math.min(r, k * 0.5)),
    line(c, k, [3.25, 1], [3.5, 1]),
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
    const p = [[0, -3], [0, 0.5], [-3, -1.5], [3, -1.5], [-2, 3.5], [2, 3.5]]
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
    line(c, k, [-3.5, -2.5], [3.5, -2.5]),
    line(c, k, [-3.5, 0], [1.5, 0]),
    line(c, k, [-3.5, 2.5], [-0.5, 2.5]),
  ],
  blank: (c, k, r) => [
    line(c, k, [-3.5, -2.5], [3.5, -2.5]),
    line(c, k, [-3.5, 1], [-2, 1]),
    rounded(pts(c, k, [[-0.75, -0.25], [3.5, -0.25], [3.5, 2.25], [-0.75, 2.25]]), Math.min(r, k * 0.5)),
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
export function pipeline(inputs, output, radius) {
  const ys = inputs.length === 1 ? [12] : [7.25, 16.75]
  const kIn = inputs.length === 1 ? 1 : 0.85
  return [
    ...inputs.flatMap((m, i) => M[m]([6, ys[i]], kIn, radius)),
    ...plain(chevronRight([12, 12], 0.55, radius)),
    ...M[output]([18, 12], 1, radius),
  ]
}
