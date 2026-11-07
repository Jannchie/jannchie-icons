// AI 任务图标用的「模态」小符号（与 symbols.js 一样：c 为中心，k 为缩放，k = 1 时约 7×7）
// 以及「输入 › 输出」的统一构图
// 按 k = 1、中心在整数坐标上设计，每个符号的墨迹以中心为中
import { GAP } from './clearance'
import { circle, crisp, rounded } from './geometry'
import { glyph } from './letters'
import { dot } from './scene'
import { clear, knock, solid, spans, tile } from './solid'
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
  // 三行间距 3，以中心为中
  text: (c, k) => [line(c, k, [-3.5, -3], [3.5, -3]), line(c, k, [-3.5, 0], [3.5, 0]), line(c, k, [-3.5, 3], [1, 3])],
  image: (c, k, r) => plain(image(c, k, r)),
  video: (c, k, r) => [
    rounded(pts(c, k, [[-3.5, -2.5], [1.5, -2.5], [1.5, 2.5], [-3.5, 2.5]]), Math.min(r, k)),
    rounded(pts(c, k, [[1.5, -0.75], [3.5, -2], [3.5, 2], [1.5, 0.75]]), Math.min(r, k * 0.5), false),
  ],
  // 四根竖条间距 2，以中心为中
  audio: (c, k) => [[-3, 1.25], [-1, 3.5], [1, 2.5], [3, 1]].map(([x, h]) => line(c, k, [x, -h], [x, h])),
  music: (c, k, r) => plain(music(c, k, r)),
  // 话筒：立杆在中轴上，胶囊宽 2
  // 话筒：话筒头（到 0）和托弧（半径 3，底到 2.5）之间四周都留 2，常规字重下不会粘成一团
  speech: (c, k) => [
    rounded(pts(c, k, [[-1, -3.5], [1, -3.5], [1, 0], [-1, 0]]), k),
    `M${at(c, k)([-3, -0.5]).join(' ')}A${3 * k} ${3 * k} 0 0 0 ${at(c, k)([3, -0.5]).join(' ')}`,
    line(c, k, [0, 2.5], [0, 3.5]),
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
  // 立方体：半宽取 3（接近 3.5·cos30°），竖棱在中轴上
  cube: (c, k, r) => {
    const [x, h] = [0, 3]
    return [
      rounded(pts(c, k, [[x, -3.5], [x + h, -1.75], [x + h, 1.75], [x, 3.5], [x - h, 1.75], [x - h, -1.75]]), Math.min(r, k * 0.5)),
      `M${at(c, k)([x - h, -1.75]).join(' ')}L${at(c, k)([x, 0]).join(' ')}L${at(c, k)([x + h, -1.75]).join(' ')}`,
      line(c, k, [x, 0], [x, 3.5]),
    ]
  },
  any: (c, k, r) => plain(sparkle(c, k, r)),
  // 另一种语言的文字：线条字母 A（字高 6，放大 1.15 倍），上下以中心为中
  lang: (c, k) => [glyph('A', at(c, k)([-1.75 * 1.15, 0])[0], at(c, k)([0, -3 * 1.15])[1], 1.15 * k)],
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
    // 脊柱在中轴上，左右对称
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
    line(c, k, [-3.5, -3], [3.5, -3]),
    line(c, k, [-3.5, 0], [1.5, 0]),
    line(c, k, [-3.5, 3], [-0.5, 3]),
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
// 两个输入也按 k = 1 画，中心放在 y = 7 / 17
export function pipeline(inputs, output, radius) {
  const ys = inputs.length === 1 ? [12] : [7, 17]
  return [
    ...inputs.flatMap((m, i) => M[m]([6, ys[i]], 1, radius)),
    ...plain(chevronRight([12, 12], 0.55, radius)),
    ...M[output]([18, 12], 1, radius),
  ]
}

// ---------- 实心版 ----------
// 每个模态符号的实心画法，沿用 M 的几何：闭合的部件填实、里面的细节挖空；只有线条的符号（文字、音频、问号、向量……）原样不动
// 表格按墨迹范围分块，要用 stroke
export const MF = {
  // 相框一块，挖掉太阳点和山形线
  image: (c, k, r) => {
    const [frame, ...scene] = M.image(c, k, r)
    return [solid(frame), knock(scene)]
  },
  // 机身和镜头罩各填实
  video: (c, k, r) => [
    solid(M.video(c, k, r)[0]),
    solid(rounded(pts(c, k, [[1.5, -0.75], [3.5, -2], [3.5, 2], [1.5, 0.75]]), Math.min(r, k * 0.5))),
  ],
  // 符头填实，符干、符尾照旧是线
  music: (c, k, r) => {
    const [head, stem] = M.music(c, k, r)
    return [solid(head), stem]
  },
  // 话筒头填实，托弧和立杆照旧是线
  speech: (c, k) => {
    const [head, ...stand] = M.speech(c, k)
    return [solid(head), ...stand]
  },
  // 纸一块，正中挖一道字线：符号只有 7 高，照描边版挖两道时粗字重下两道线连成一个洞，看着像空心的纸
  doc: (c, k, r) => [solid(M.doc(c, k, r)[0]), knock(line(c, k, [-1, 0.5], [1, 0.5]))],
  // 表头、左右两个格子各画一块（见 solid.js 的 tile），块和块之间留 GAP 的缝；格子小，圆角最多 0.5
  table: ([cx, cy], k, r, stroke) => {
    const [cols, [head, body]] = [spans(cx - 3.5 * k, cx + 3.5 * k, [cx - 1.5 * k], stroke), spans(cy - 2.5 * k, cy + 2.5 * k, [cy - 0.5 * k], stroke)]
    const q = Math.min(r, 0.5)
    return [tile([cols[0][0], head[0], cols[1][1], head[1]], q), ...cols.map(([x0, x1]) => tile([x0, body[0], x1, body[1]], q))]
  },
  // 六边形一块，挖掉中间的 Y（分成三个面）
  cube: (c, k, r) => {
    const [hex, ...edges] = M.cube(c, k, r)
    return [solid(hex), knock(edges)]
  },
  // 两颗星都填实
  any: (c, k, r) => solid(M.any(c, k, r)),
  // 被框出来的词填实
  tokens: (c, k, r) => M.tokens(c, k, r).map((p, i) => (i === 2 ? solid(p) : p)),
  // 标签一块，挖掉穿孔
  tag: (c, k, r) => {
    const [body, eyelet] = M.tag(c, k, r)
    return [solid(body), knock(eyelet)]
  },
  // 四个角标照旧是线，中间的目标填实
  detect: (c, k, r) => M.detect(c, k, r).map((p, i) => (i === 4 ? solid(p) : p)),
  // 方框一块，挖掉分界曲线（分成两块区域）
  segment: (c, k, r) => {
    const [frame, edge] = M.segment(c, k, r)
    return [solid(frame), knock(edge)]
  },
  // 两个圆都填实，后面那个在前面那个四周让出缝，不粘成一团
  mask: (c, k) => {
    const [back, front] = M.mask(c, k)
    return [solid(back), clear(front, GAP), solid(front)]
  },
  // 顶层的菱形填实，下面两层照旧是线
  depth: (c, k) => {
    const [top, ...layers] = M.depth(c, k)
    return [solid(top), ...layers]
  },
  // 待填的空格填实
  blank: (c, k, r) => M.blank(c, k, r).map((p, i) => (i === 2 ? solid(p) : p)),
}
const fillOf = m => MF[m] ?? M[m]

// pipeline 的实心版：同样的构图，各模态换成 MF 的画法，› 照旧是线
export function pipelineFill(inputs, output, radius, stroke) {
  const ys = inputs.length === 1 ? [12] : [7, 17]
  return [
    ...inputs.flatMap((m, i) => fillOf(m)([6, ys[i]], 1, radius, stroke)),
    ...plain(chevronRight([12, 12], 0.55, radius)),
    ...fillOf(output)([18, 12], 1, radius, stroke),
  ]
}
