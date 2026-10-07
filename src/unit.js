// 兵牌（NATO APP-6 / MIL-STD-2525 的地面部队标号，友军用的矩形框）：外框 + 框里的兵种符号；键的顺序就是预览页的顺序
// 外框按规范宽高比 1.5:1：3.5–21.5 × 6.5–18.5（18 × 12），中心 (12.5, 12.5)——整体右下移半格，框的中线也落在 .5 上
// 框上方 0–6.5 留给部队规模标记（echelon）。兵种符号大多直接用框的对角线、中线，端点就落在框上
import { circle, crisp, rounded } from './geometry'
import { line, snap } from './letters'
import { dot } from './scene'

const [X0, Y0, X1, Y1] = [3.5, 6.5, 21.5, 18.5]
const [CX, CY] = [(X0 + X1) / 2, (Y0 + Y1) / 2]
// 框角只给很小的圆角：步兵的 X 要一直画到角上
const frame = radius => {
  const r = Math.min(radius, 1)
  return r
    ? `M${X0 + r} ${Y0}H${X1 - r}A${r} ${r} 0 0 1 ${X1} ${Y0 + r}V${Y1 - r}A${r} ${r} 0 0 1 ${X1 - r} ${Y1}H${X0 + r}A${r} ${r} 0 0 1 ${X0} ${Y1 - r}V${Y0 + r}A${r} ${r} 0 0 1 ${X0 + r} ${Y0}Z`
    : `M${X0} ${Y0}H${X1}V${Y1}H${X0}Z`
}

// 共用的符号部件
const cross = [`M${X0} ${Y0}L${X1} ${Y1}`, `M${X1} ${Y0}L${X0} ${Y1}`] // 步兵：两条对角线
const track = `M9.5 9.5H15.5A3 3 0 0 1 15.5 15.5H9.5A3 3 0 0 1 9.5 9.5Z` // 装甲：履带形的跑道圆，12 × 6
const wings = `M9.5 ${Y1}A1.5 1.5 0 0 1 ${CX} ${Y1}A1.5 1.5 0 0 1 15.5 ${Y1}` // 空降：贴着底边的一对小拱（半径 1.5，离 X 的两条对角线都还有 2.5 以上）
const slash = `M${X0} ${Y1}L${X1} ${Y0}` // 侦察：左下到右上的斜线
// 框里的字（SF、MP、EW）：细线字（外框的 0.7 倍），粗字重下也不糊
const text = str => [snap(line(str, [CX, CY], 1, 2, 1))].flat().map(d => ({ d, thin: true }))
// 一排小波浪（两栖）：从 x0 起 n 个宽 3 的半波，上下摆幅 1
const waves = (x0, y, n) => `M${x0} ${y}` + Array.from({ length: n }, (_, i) => `Q${x0 + i * 3 + 1.5} ${y + (i % 2 ? 2 : -2)} ${x0 + i * 3 + 3} ${y}`).join('')

export const UNIT = {
  // 步兵：框的两条对角线
  'infantry': { zh: '步兵', paths: () => cross },
  // 装甲：框中间一个横向的跑道圆（履带）
  'armor': { zh: '装甲', paths: () => [track] },
  // 机械化步兵：步兵的 X + 装甲的跑道圆
  'mechanized': { zh: '机械化步兵', paths: () => [...cross, track] },
  // 侦察（骑兵）：左下角到右上角的一条斜线
  'recon': { zh: '侦察', paths: () => [`M${X0} ${Y1}L${X1} ${Y0}`] },
  // 炮兵：中心一个实心圆点
  'artillery': { zh: '炮兵', paths: () => [dot(CX, CY, 4)] },
  // 工兵：桥形——一道横梁，两端和中间各一条腿朝下
  'engineer': { zh: '工兵', paths: () => [`M8.5 14.5V10.5H16.5V14.5`, `M${CX} 10.5V14.5`] },
  // 防空：从框底两角拱起的一道圆弧，拱顶高 4
  'air-defense': { zh: '防空', paths: () => [`M${X0} ${Y1}A12.125 12.125 0 0 1 ${X1} ${Y1}`] },
  // 通信：左上角到右下角的闪电折线，中间往回折一段
  'signal': { zh: '通信', paths: () => [`M${X0} ${Y0}L15 11L10 14L${X1} ${Y1}`] },
  // 医疗：撑满框的十字（框的两条中线）
  'medical': { zh: '医疗', paths: () => [`M${CX} ${Y0}V${Y1}`, `M${X0} ${CY}H${X1}`] },
  // 反坦克：从框底两角到顶边中点的倒 V。顶点比框顶中线低 0.75：顶角的斜接尖伸出顶点 1.67 个半线宽，
  // 顶点压在中线上的话，尖角模式下尖会从框顶外侧冒出来；低 0.75 时三档线宽下尖都藏在框线里，圆角下顶点也仍和框线连着
  'anti-tank': { zh: '反坦克', paths: () => [`M${X0} ${Y1}L${CX} ${Y0 + 0.75}L${X1} ${Y1}`] },
  // 空降步兵：步兵的 X + 底边中间的一对小拱（空降标记单用很少见，这里按最常见的空降步兵组合）
  'airborne': { zh: '空降步兵', paths: () => [...cross, wings] },
  // 特种部队：框里写 SF，细线字（外框的 0.7 倍，和分级图标的字一样），粗字重下也不糊
  'special-forces': { zh: '特种部队', paths: () => text('SF') },
  // —— 以下是补充的常用兵种 / 功能 ——
  // 装甲侦察：侦察的斜线 + 装甲的跑道圆
  'armored-recon': { zh: '装甲侦察', paths: () => [slash, track] },
  // 自行火炮：装甲的跑道圆里一个炮兵圆点（跑道圆是「履带化 / 自行」的修饰）
  'self-propelled-artillery': { zh: '自行火炮', paths: () => [track, dot(CX, CY, 3)] },
  // 迫击炮：底部一个小圆（炮座，圆心 15、半径 1.25），竖线向上，顶端一个闭合的小三角箭头（底边 11.5、尖在 9）
  // 圆和竖线是同一条路径：从圆顶绕一圈再往上，接点是转角而不是线头；竖线垂直落在三角底边中点，线头被底边盖住。
  // 三角离框顶留 2.5、圆离框底留 2.25，粗字重下也不贴框
  'mortar': {
    zh: '迫击炮',
    paths: radius => [
      `M${CX} 13.75A1.25 1.25 0 1 0 ${CX} 16.25A1.25 1.25 0 1 0 ${CX} 13.75V11.5`,
      rounded([[10.75, 11.5], [CX, 9], [14.25, 11.5]], crisp(radius)),
    ],
  },
  // 导弹：竖立的尖头弹体
  'missile': { zh: '导弹', paths: () => [`M10.5 16.5V11L${CX} 8.5L14.5 11V16.5Z`] },
  // 陆军航空兵（旋翼）：横放的领结——两个三角在中心尖对尖
  'aviation': { zh: '陆航（直升机）', paths: () => [`M7.5 9.5L17.5 15.5V9.5L7.5 15.5Z`] },
  // 山地步兵：步兵的 X + 底边中间一个实心小三角（山地修饰）
  'mountain': { zh: '山地步兵', paths: () => [...cross, { d: `M10.5 ${Y1}L${CX} 15.5L14.5 ${Y1}Z`, fill: true }] },
  // 两栖：框中间一排波浪
  'amphibious': { zh: '两栖', paths: () => [waves(6.5, CY, 4)] },
  // 宪兵：框里写 MP
  'military-police': { zh: '宪兵', paths: () => text('MP') },
  // 电子战：框里写 EW
  'electronic-warfare': { zh: '电子战', paths: () => text('EW') },
  // 维修：一根横杆，两端各一个开口朝外的半圆（扳手头）
  'maintenance': { zh: '维修', paths: () => [`M8.5 ${CY}H16.5`, `M6.5 10.5A2 2 0 0 1 6.5 14.5`, `M18.5 10.5A2 2 0 0 0 18.5 14.5`] },
  // 补给：框内下部（底边往上三分之一）一道横线
  'supply': { zh: '补给', paths: () => [`M${X0} 14.5H${X1}`] },
  // 运输：车轮——圆 + 三条直径（六根辐条，用细线；八根在 24 格里会糊成一团）
  'transport': { zh: '运输', paths: () => [circle(CX, CY, 4), { d: [30, 90, 150].map((deg) => {
    const a = deg * Math.PI / 180
    const [c, s] = [Math.cos(a) * 4, Math.sin(a) * 4]
    return `M${CX - c} ${CY - s}L${CX + c} ${CY + s}`
  }).join(''), thin: true }] },
  // 指挥部：空框 + 从左下角往下伸出的旗杆
  'headquarters': { zh: '指挥部', paths: () => [`M${X0} ${Y1}V22.5`] },
}

// 敌我识别外框（affiliation）：友军矩形、敌军菱形、中立方形、不明四叶形；中心都在 (12.5, 12.5)
// 兵种符号按矩形框的坐标画，只配友军框；其余外框单独作为空框图标
export const FRAMES = {
  'friendly': { zh: '友军', paths: radius => [frame(radius)] },
  // 敌军：菱形，四个顶点离中心 10
  'hostile': { zh: '敌军', paths: radius => [rounded([[CX, 2.5], [22.5, CY], [CX, 22.5], [2.5, CY]], Math.min(radius, 1))] },
  // 中立：正方形，边长 14（和友军框高度相近）
  'neutral': { zh: '中立', paths: radius => [rounded([[5.5, 5.5], [19.5, 5.5], [19.5, 19.5], [5.5, 19.5]], Math.min(radius, 1))] },
  // 不明：四叶形——边长 8 的正方形四条边上各鼓出一个半圆
  'unknown': { zh: '不明', paths: () => [`M8.5 8.5A4 4 0 0 1 16.5 8.5A4 4 0 0 1 16.5 16.5A4 4 0 0 1 8.5 16.5A4 4 0 0 1 8.5 8.5Z`] },
}

// 部队规模（echelon）：友军框上方居中的标记，占 y 1–4，底边离框顶 2.5——再近的话粗字重下端点吸附会把标记拉到框上
// 点直径 2、间距 3.5；竖杠高 3、间距 4（偶数间距，两杠、三杠都落在 .5 上）；
// 小叉宽 2.5、高 3、间距 4.75：相邻两叉的端点隔 2.25，粗字重（线宽 2）下也不会碰在一起，四个叉（集团军）占 4.1–20.9
// 竖杠和小叉标成细节（线宽封顶 1.5）：粗字重下小叉会被拥挤检测压成一团
const ECHELON_Y = [1, 4]
const marks = (kind, n) => Array.from({ length: n }, (_, i) => {
  const step = kind === 'dot' ? 3.5 : kind === 'bar' ? 4 : 4.75
  const x = CX + (i - (n - 1) / 2) * step
  if (kind === 'dot')
    return dot(x, 2.5, 2)
  if (kind === 'bar')
    return { d: `M${x} ${ECHELON_Y[0]}V${ECHELON_Y[1]}`, detail: true }
  return { d: `M${x - 1.25} ${ECHELON_Y[0]}L${x + 1.25} ${ECHELON_Y[1]}M${x + 1.25} ${ECHELON_Y[0]}L${x - 1.25} ${ECHELON_Y[1]}`, detail: true }
})
export const ECHELON = {
  'squad': { zh: '班', paths: () => marks('dot', 1) },
  'section': { zh: '组（分队）', paths: () => marks('dot', 2) },
  'platoon': { zh: '排', paths: () => marks('dot', 3) },
  'company': { zh: '连', paths: () => marks('bar', 1) },
  'battalion': { zh: '营', paths: () => marks('bar', 2) },
  'regiment': { zh: '团', paths: () => marks('bar', 3) },
  'brigade': { zh: '旅', paths: () => marks('x', 1) },
  'division': { zh: '师', paths: () => marks('x', 2) },
  'corps': { zh: '军', paths: () => marks('x', 3) },
  'army': { zh: '集团军', paths: () => marks('x', 4) },
}

export const unitFrame = frame
