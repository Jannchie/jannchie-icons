// Hugging Face 任务图标（AI 分类）的任务列表和共用部件
// 每个任务画成一个单一标志：轮廓按「输出」定（标签 = 分类，气泡 = 输出文字，相框 = 图片，播放三角 = 视频，
// 斜二测盒子 = 3D，取景角 = 检测），输入只作为轮廓里的一处细节；实心四角星统一表示「凭一句话 / 零样本」。
// 外缘尽量取 3 的整数倍：既是整数（细字重下中心线落在 .5 上），又是 1.5 的整数倍（16px 下两条边都落在像素边界上），
// 线宽变粗时往里长
import { GAP } from './clearance'
import { crisp, rounded, through } from './geometry'
import { dot } from './scene'
import { clear, knock, solid } from './solid'
import { shrink } from './tag'

export const AI_TASKS = ['any-to-any', 'audio-classification', 'audio-text-to-text', 'audio-to-audio', 'automatic-speech-recognition', 'depth-estimation', 'document-question-answering', 'feature-extraction', 'fill-mask', 'graph-machine-learning', 'image-classification', 'image-feature-extraction', 'image-segmentation', 'image-text-to-image', 'image-text-to-text', 'image-text-to-video', 'image-to-3d', 'image-to-image', 'image-to-text', 'image-to-video', 'keypoint-detection', 'mask-generation', 'object-detection', 'question-answering', 'reinforcement-learning', 'robotics', 'sentence-similarity', 'summarization', 'table-question-answering', 'tabular-classification', 'tabular-regression', 'text-classification', 'text-generation', 'text-ranking', 'text-to-3d', 'text-to-audio', 'text-to-image', 'text-to-speech', 'text-to-video', 'time-series-forecasting', 'token-classification', 'translation', 'unconditional-image-generation', 'video-classification', 'video-text-to-text', 'video-to-video', 'visual-document-retrieval', 'visual-question-answering', 'voice-activity-detection', 'zero-shot-classification', 'zero-shot-image-classification', 'zero-shot-object-detection']

const f = n => +n.toFixed(3)

// ---------- 线条工具 ----------
// 折线：中间的拐点用固定小圆角
export const polyline = (pts, radius) => rounded(pts.map((p, i) => (i && i < pts.length - 1 ? [...p, crisp(radius)] : p)), 0, false)
// 实心版里挖一条折线：两端顺着走向各伸出两个线宽，穿出外轮廓，不留细桥
export const cutLine = (pts, stroke) => {
  const e = 2 * stroke
  const ext = (a, b) => {
    const l = Math.hypot(a[0] - b[0], a[1] - b[1])
    return [a[0] + (a[0] - b[0]) / l * e, a[1] + (a[1] - b[1]) / l * e]
  }
  const q = [ext(pts[0], pts[1]), ...pts.slice(1, -1), ext(pts.at(-1), pts.at(-2))]
  return `M${q.map(p => p.map(f).join(' ')).join('L')}`
}

// ---------- 星（凭一句话 / 零样本） ----------
// 实心四角星：尖到中心 R，四条边是往中心收的二次曲线（控制点离中心 C，0 时最瘦）。
// 描边版也填实：空心的星在 16px 下中间只剩针眼。尖要长、腰要细，小尺寸下才读成星而不是一个圆团
export const star4 = (cx, cy, R, C = 0) => ({
  d: `M${cx} ${cy - R}Q${cx + C} ${cy - C} ${cx + R} ${cy}Q${cx + C} ${cy + C} ${cx} ${cy + R}Q${cx - C} ${cy + C} ${cx - R} ${cy}Q${cx - C} ${cy - C} ${cx} ${cy - R}Z`,
  fill: true,
  round: true,
})

// ---------- 相框（图片） ----------
// 相框：外缘 [x0, y0, x1, y1]，线宽往里长
export const frame = (stroke, radius, [x0, y0, x1, y1] = [3, 3, 21, 21]) => {
  const h = stroke / 2
  return rounded([[x0 + h, y0 + h], [x1 - h, y0 + h], [x1 - h, y1 - h], [x0 + h, y1 - h]], radius)
}
// 3–21 相框里的山脊：两条 45° 斜线，山顶 (8.25, 12.75)，两端落在相框左边、底边的中心线上
export const ridge = (stroke) => {
  const [a, b] = [3 + stroke / 2, 21 - stroke / 2]
  return [[a, 21 - a], [8.25, 12.75], [b - 4.5, b]]
}
// 3–21 相框里压在右下的矮山（天空要放东西时用）：从底边起，45° 上到 (12.75, 16.5)，下到山谷，再上到右边；dx 把整座山往右挪
export const lowRange = (stroke, dx = 0) => {
  const b = 21 - stroke / 2
  return [[9 + dx, b], [12.75 + dx, b - 3.75], [15 + dx, b - 1.5], [b, b - 1.5 - (b - 15 - dx)]]
}

// ---------- 竖分隔线（同模态变换：image-to-image、image-text-to-image） ----------
// 相框外缘 3–21 × 6–18，分隔线在 x、墨迹 3–21（上下各出头 3）；山脊 45°，山顶 peak，两端落在相框左边、底边的中心线上，右坡越过分隔线
export const split = (stroke, radius, x, peak) => {
  const [l, b] = [3 + stroke / 2, 18 - stroke / 2]
  const ridge = [[l, peak[1] + peak[0] - l], peak, [peak[0] + b - peak[1], b]]
  const divider = `M${x} ${3 + stroke / 2}V${21 - stroke / 2}`
  const box = frame(stroke, radius, [3, 6, 21, 18])
  return {
    outline: [box, polyline(ridge, radius), divider],
    // 实心版：相框一块，山脊线挖空并穿出框外；分隔线两侧各让出 GAP 的缝（相框分成左右两块），再把分隔线画回去
    solid: marks => [solid(box), knock(cutLine(ridge, stroke)), ...marks, clear(divider, GAP), divider],
  }
}

// ---------- 缺角屏幕 + 角上的星（*-to-video 的生成版） ----------
// 屏幕外缘 3–21 × top–21；星：中心 (16.5, 7.5)，尖到中心 4.5——尖长、腰细，16px 下读得出是星。
// 屏幕的顶边、右边在星的外面断开：顶边墨迹到 10，右边墨迹从 14 起，离星的墨迹（连描边 11.25 / 12.75）各 1.25，粗字重下还剩 1
export const cornerStar = star4(16.5, 7.5, 4.5)
export const notched = (stroke, radius, top) => {
  const h = stroke / 2
  const [l, t, r, b] = [3 + h, top + h, 21 - h, 21 - h]
  return rounded([[10 - h, t], [l, t], [l, b], [r, b], [r, 14 + h]], radius, false)
}
// 实心版的屏幕：一整块，右上角切掉一块给星让位，切口的两条边和描边版的断口对齐
export const notchedSolid = (stroke, radius, top) => {
  const h = stroke / 2
  const [l, t, r, b] = [3 + h, top + h, 21 - h, 21 - h]
  return solid(rounded([[l, t], [10 - h, t], [10 - h, 14 + h], [r, 14 + h], [r, b], [l, b]], Math.min(radius, 2)))
}

// ---------- 标签（*-classification） ----------
// 标签外缘：上下 3–21（整数，又是 1.5 的整数倍）；右边 22，尖头外缘在 1.5，常规圆角下被削圆后墨迹左缘约在 2，和右边对称。
// 比 tag-horizontal（4–20）高一圈：标签面要放内容，内部 15 高。线宽变粗时外缘不动、往里长（shrink）
const TAG = [[1.5, 12], [8.5, 3], [22, 3], [22, 21], [8.5, 21]]
// 中心线的五个顶点：尖头、上肩、右上、右下、下肩
export const tagPoints = stroke => shrink(TAG, stroke / 2)
export const tag = (stroke, radius) => rounded(tagPoints(stroke), Math.min(radius, 2))
// 穿孔画成实心点（直径 2）：圆环在 16px 下只是一团灰，点更干净，也给内容多留地方
export const tagPunch = dot(7.25, 12)
// 标签面上的山脊：从底边 45° 上到山顶 (15, 底边上 5)，下到山谷，再 45° 上到右边，两端都落在标签的直边上
export const tagRidge = (stroke) => {
  const [r, b] = [22 - stroke / 2, 21 - stroke / 2]
  return [[10, b], [15, b - 5], [17.5, b - 2.5], [r, b - 2.5 - (r - 17.5)]]
}

// ---------- 对话气泡（*-text-to-text） ----------
// 不沿用对话系列的外形（2–22 × 3–17）：主体外缘取 3–21 × 3–18，16px 下四条边同时清晰，内部 12 高。
// 尾巴 45°，尾尖墨迹到 21，根部在 x 10
const bubbleBox = (stroke) => {
  const h = stroke / 2
  return { l: 3 + h, t: 3 + h, r: 21 - h, b: 18 - h }
}
// 轮廓不闭合（和对话系列一样，尾巴左边那条竖边不画）
export const bubble = (stroke, radius) => {
  const { l, t, r, b } = bubbleBox(stroke)
  return rounded([[7, b], [l, b], [l, t], [r, t], [r, b], [10, b], [7, b + 3]], radius, false)
}
// 实心版：连尾巴封口，尾巴的两个角用固定小圆角
export const bubbleSolid = (stroke, radius) => {
  const { l, t, r, b } = bubbleBox(stroke)
  return solid(rounded([[7, b, crisp(radius)], [l, b], [l, t], [r, t], [r, b], [10, b], [7, b + 3, crisp(radius)]], radius))
}

// ---------- 斜二测盒子（*-to-3d） ----------
// 正面外缘 3–15 × 9–21（12 见方 = 16px 下 8 像素），厚度往右上 6（45°），整体墨迹框 3–21 × 3–21；
// 正面右边和后面右边之间空 4.5（16px 下 3 像素）
const DEPTH = 6
// 中心线：l / t / r / b 是整体，f 是正面右边，g 是正面上边
export const box3d = (stroke) => {
  const h = stroke / 2
  return { l: 3 + h, t: 3 + h, r: 21 - h, b: 21 - h, f: 15 - h, g: 9 + h }
}
const hex = ({ l, t, r, b, f, g }, radius) => rounded([[l, g], [l + DEPTH, t], [r, t], [r, b - DEPTH], [f, b], [l, b]], Math.min(radius, 1.5))
// 描边版：六边形外轮廓 + 正面的上边和右边 + 连到后面的那条斜棱
export const boxLines = (stroke, radius) => {
  const s = box3d(stroke)
  const { l, t, r, b, f, g } = s
  return [hex(s, radius), rounded([[l, g], [f, g, crisp(radius)], [f, b]], 0, false), `M${f} ${g}L${r} ${t}`]
}
// 实心版：六边形一块，三条内棱挖成缝并各自穿出外轮廓（正面、顶面、侧面三块各自独立，没有死胡同）
export const boxSolid = (stroke, radius) => {
  const s = box3d(stroke)
  const { l, t, r, b, f, g } = s
  const e = 2 * stroke
  return [solid(hex(s, radius)), knock([`M${l - e} ${g}H${f}V${b + e}`, through([f, g], [r, t], 0, e)])]
}

// ---------- 问号（*-question-answering） ----------
// 手画的问号，用正常线宽（symbols.js 的 question 放大不到 2 倍时按细节线宽画，会比外框的线细）：
// 钩是半径 r 的圆弧（圆心 (cx, cy)，从正左方顺时针绕过顶部），收进竖笔后停在圆心下方 1.55r；点在 dotY，直径 size
export const questionMark = (cx, cy, r, dotY, size = 2) => {
  const p = (x, y) => `${+(cx + x * r).toFixed(3)} ${+(cy + y * r).toFixed(3)}`
  return [`M${p(-1, 0)}A${r} ${r} 0 1 1 ${p(0.4, 0.924)}C${p(0.153, 1.047)} ${p(0, 1.247)} ${p(0, 1.545)}`, dot(cx, dotY, size)]
}

// ---------- 取景角（*-object-detection） ----------
// 外缘在 3 / 21，臂的墨迹伸到 8.25，线宽变粗时往里长
const ARM = 4.5
const corner = ([x, y], dx, dy, radius) => rounded([[x, y + dy * ARM], [x, y], [x + dx * ARM, y]], Math.min(radius, 2), false)
export const corners = (radius, stroke) => {
  const [a, b] = [3 + stroke / 2, 21 - stroke / 2]
  return [corner([a, a], 1, 1, radius), corner([b, a], -1, 1, radius), corner([b, b], -1, -1, radius), corner([a, b], 1, -1, radius)]
}

// ---------- 方括号（*-feature-extraction） ----------
// 外缘 x0–x1 × 3–21，横臂墨迹长 arm，线宽变粗时往里长
export const brackets = (stroke, radius, [x0, x1, arm]) => {
  const h = stroke / 2
  const [t, b] = [3 + h, 21 - h]
  const r = Math.min(radius, 1.5)
  return [
    rounded([[x0 + arm - h, t], [x0 + h, t], [x0 + h, b], [x0 + arm - h, b]], r, false),
    rounded([[x1 - arm + h, t], [x1 - h, t], [x1 - h, b], [x1 - arm + h, b]], r, false),
  ]
}
