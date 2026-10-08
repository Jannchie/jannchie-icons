// 计数符号：几种逐笔累加的计数法，每种一节，n 是计到第几（键顺序就是预览页的节顺序）
// - zheng 正字（中日）：按笔顺 横、竖、横、竖、横 逐笔写出「正」，五笔一个字
// - five 西式五道：四道竖线，第五道斜贯四道
// - square 方框（法国、巴西、拉美）：左、上、右、下四条边围成方框，第五道是对角线
// - dot 点线（北美林业等）：先点四个角（1–4），再连四条边（5–8），最后两条对角线（9–10），十个一组
// - rod 算筹（纵式）：1–5 是并排的竖筹，6–9 顶上一根横筹代表五、下面挂 n−5 根竖筹
// 笔画之间的相接都是垂直相接（T 字、L 字），或者连成同一条折线、落在点里，不留斜接的线头
import { dot } from './scene'

// 正：上横 6–18 @4.5、中竖 x 12（4.5–19.5）、中横 12–17 @11.5、左竖 x 7（11.5–19.5）、下横 4–20 @19.5
const ZHENG = ['M6 4.5H18', 'M12 4.5V19.5', 'M12 11.5H17', 'M7 11.5V19.5', 'M4 19.5H20']

// 西式五道：竖线高 5.5–18.5、间距 4；整组居中在 x 12
const fiveX = n => Array.from({ length: n }, (_, i) => 12 + (i - (n - 1) / 2) * 4)
function five(n) {
  const xs = fiveX(Math.min(n, 4))
  // 竖线和斜线放在同一条路径里：同一路径里的交叉不会被断开，第五道是压在四道上面贯穿过去
  const d = xs.map(x => `M${x} 5.5V18.5`).join('') + (n === 5 ? 'M3 15.5L21 8.5' : '')
  return [d]
}

// 方框：6.5–17.5 的正方形；已经画出的边连成一条折线（拐角是转折，不是两个线头对接）
const SQ = [[6.5, 17.5], [6.5, 6.5], [17.5, 6.5], [17.5, 17.5]]
function square(n) {
  const sides = Math.min(n, 4)
  const pts = sides === 4 ? [...SQ, SQ[0]] : SQ.slice(0, sides + 1)
  const out = [`M${pts.map(p => p.join(' ')).join('L')}${sides === 4 ? 'Z' : ''}`]
  if (n === 5)
    out.push('M6.5 17.5L17.5 6.5') // 对角线：两端落在方框的直角里
  return out
}

// 点线：四个角上的点（直径 3），四条边连在点之间（端点落在点里），两条对角线
const C = [[5.5, 5.5], [18.5, 5.5], [18.5, 18.5], [5.5, 18.5]] // 左上、右上、右下、左下
function dots(n) {
  const out = C.slice(0, Math.min(n, 4)).map(([x, y]) => dot(x, y, 3))
  const edges = Math.max(0, Math.min(n, 8) - 4)
  for (let i = 0; i < edges; i++) {
    const [a, b] = [C[i], C[(i + 1) % 4]]
    out.push(`M${a.join(' ')}L${b.join(' ')}`)
  }
  // 两条对角线放在同一条路径里：在中心交叉，不被断开
  if (n >= 9)
    out.push(`M5.5 5.5L18.5 18.5${n === 10 ? 'M18.5 5.5L5.5 18.5' : ''}`)
  return out
}

// 算筹：竖筹高 6.5–17.5、间距 3，整组居中在 x 12
const rodX = n => Array.from({ length: n }, (_, i) => 12 + (i - (n - 1) / 2) * 3)
function rod(n) {
  if (n <= 5)
    return rodX(n).map(x => `M${x} 6.5V17.5`)
  const xs = rodX(n - 5)
  // 横筹两端比外侧竖筹各伸出 2，竖筹从横筹上垂直挂下
  const w = Math.max(xs.at(-1) - xs[0] + 4, 8)
  const c = (xs[0] + xs.at(-1)) / 2
  return [`M${c - w / 2} 6.5H${c + w / 2}`, ...xs.map(x => `M${x} 6.5V17.5`)]
}

export const TALLY = {
  zheng: { zh: '正字', count: 5, paths: n => ZHENG.slice(0, n) },
  five: { zh: '西式五道', count: 5, paths: five },
  square: { zh: '方框', count: 5, paths: square },
  dot: { zh: '点线', count: 10, paths: dots },
  rod: { zh: '算筹', count: 9, paths: rod },
}

export const tally = (system, n) => TALLY[system].paths(n)
