// 加载图标：每个都有静态造型（still，进度 t0 那一帧）和动画（animation，见 render.js 的 animatedPaths）
// 动画逐帧采样，同一路径各帧的命令序列必须一致，所以这里不用会随参数增减命令的 rounded()，圆弧也拆成两段、各不超过 180°，
// 大弧标志在各帧之间不会跳变
import { dot } from './scene'

const C = 12
const TAU = Math.PI * 2
const rad = deg => deg * Math.PI / 180
const at = (r, deg) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))]
const pt = p => `${p[0]} ${p[1]}`
// 圆上从 a 度到 b 度的弧（b > a，顺时针），拆成两段
function arc(r, a, b) {
  const m = (a + b) / 2
  return `M${pt(at(r, a))}A${r} ${r} 0 0 1 ${pt(at(r, m))}A${r} ${r} 0 0 1 ${pt(at(r, b))}`
}
// 中心在 C、纵半轴 ry、横半轴 rx 的椭圆，整体顺时针转 tilt 度：两段弧连接纵轴的两端
function ellipse(rx, ry, tilt) {
  const [s, c] = [Math.sin(rad(tilt)), Math.cos(rad(tilt))]
  const top = [C + ry * s, C - ry * c]
  const bottom = [C - ry * s, C + ry * c]
  return `M${pt(top)}A${rx} ${ry} ${tilt} 0 1 ${pt(bottom)}A${rx} ${ry} ${tilt} 0 1 ${pt(top)}`
}
// 0–1 循环的进度
const wrap = v => v - Math.floor(v)
// 0 → 1 → 0 的平滑起伏
const swell = v => 0.5 - 0.5 * Math.cos(TAU * v)
// 折线（点数固定，各帧结构一致）
const polyline = pts => `M${pts.map(pt).join('L')}`
// 以 C 为圆心的整圆
const ring = r => `M${C - r} ${C}A${r} ${r} 0 1 0 ${C + r} ${C}A${r} ${r} 0 1 0 ${C - r} ${C}`
// 实心圆，半径可以逐帧变化
const disc = (x, y, r) => ({ d: `M${x - r} ${y}A${r} ${r} 0 0 0 ${x + r} ${y}A${r} ${r} 0 0 0 ${x - r} ${y}Z`, fill: true })
// 中心在 C、边长 2h 的正方形周长上进度 s（0–1，从左上角顺时针）处的点
function onSquare(h, s) {
  const d = wrap(s) * 8 * h
  const side = Math.floor(d / (2 * h))
  const u = d - side * 2 * h - h
  return [[C + u, C - h], [C + h, C + u], [C - u, C + h], [C - h, C - u]][side]
}
// ∞（伯努利双纽线），θ 走一圈画完整条
function lemniscate(a, th) {
  const k = 1 + Math.sin(th) ** 2
  return [C + a * Math.cos(th) / k, C + a * Math.sin(th) * Math.cos(th) / k]
}

// 键的顺序就是预览页里的排序
export const LOADING = {
  // 思考中（来自 preferred-harness 的 AtomSpinner）：三条轨道绕同一中心，各倾斜 0° / 60° / 120°；
  // 每条轨道是一个转动的圆环，正面看是圆、侧面看是线——横半轴取转角的 |cos|，三条轨道的相位依次错开三分之一周期
  atom: {
    duration: 2400,
    frames: 48,
    t0: 0,
    draw: ({ t }) => [0, 1, 2].map((k) => {
      const R = 9
      const rx = Math.max(0.01, R * Math.abs(Math.cos(Math.PI * (2 * t + 2 * k / 3))))
      return ellipse(rx, R, k * 60)
    }),
  },
  // 旋转的立方体线框：绕竖轴转一整圈（转 90° 虽然外形重合，但每条棱要回到自己的位置，动画才能首尾相接），
  // 再固定前倾 25° 看得到顶面，正交投影；外接球半径 9
  cube: {
    duration: 4800,
    frames: 64,
    t0: 0.07,
    draw: ({ t }) => {
      const a = 9 / Math.sqrt(3)
      const [yaw, tilt] = [TAU * t, rad(25)]
      const project = ([x, y, z]) => {
        const [x1, z1] = [x * Math.cos(yaw) + z * Math.sin(yaw), -x * Math.sin(yaw) + z * Math.cos(yaw)]
        return [C + x1 * a, C + (y * Math.cos(tilt) - z1 * Math.sin(tilt)) * a]
      }
      const v = [-1, 1].flatMap(x => [-1, 1].flatMap(y => [-1, 1].map(z => [x, y, z])))
      const edges = v.flatMap((p, i) => v.slice(i + 1).filter(q => p.filter((c, k) => c !== q[k]).length === 1).map(q => [p, q]))
      return edges.map(([p, q]) => polyline([project(p), project(q)]))
    },
  },
  // 自转的地球仪：外轮廓 + 三条经线（宽度取 |cos|，和 atom 的轨道同理）+ 两条纬线，整体倾斜 20°
  globe: {
    duration: 3600,
    frames: 48,
    t0: 0.08,
    draw: ({ t }) => {
      const R = 9
      const tilt = -20
      const turn = ([x, y]) => {
        const [c, s] = [Math.cos(rad(tilt)), Math.sin(rad(tilt))]
        return [C + (x - C) * c - (y - C) * s, C + (x - C) * s + (y - C) * c]
      }
      const lat = h => polyline([turn([C - Math.sqrt(R * R - h * h), C + h]), turn([C + Math.sqrt(R * R - h * h), C + h])])
      return [
        ring(R),
        ...[0, 1, 2].map(k => ellipse(Math.max(0.01, R * Math.abs(Math.cos(Math.PI * t + k * Math.PI / 3))), R, tilt)),
        lat(-5),
        lat(5),
      ]
    },
  },
  // DNA 双螺旋：两条相位差半圈的链竖直盘绕，碱基对横档随转动伸缩，整体向上流动
  helix: {
    duration: 2400,
    frames: 48,
    t0: 0.1,
    draw: ({ t }) => {
      const x = (y, phase) => C + 5 * Math.sin(TAU * ((y - 3) / 12 - t) + phase)
      const strand = phase => polyline(Array.from({ length: 31 }, (_, i) => [x(3 + i * 0.6, phase), 3 + i * 0.6]))
      const rungs = [5.25, 9.75, 14.25, 18.75].map(y => polyline([[x(y, 0), y], [x(y, Math.PI), y]]))
      return [strand(0), strand(Math.PI), ...rungs]
    },
  },
  // 牛顿摆：顶杆 + 五个球，右端的球摆出去、撞回来，左端的球接着摆出去
  cradle: {
    duration: 1600,
    frames: 48,
    t0: 0.2,
    draw: ({ t }) => {
      const [top, L, r, A] = [4.5, 9.5, 1.1, rad(30)]
      const swing = Math.sin(TAU * t)
      return [
        'M5 4.5H19',
        ...[7.5, 9.75, 12, 14.25, 16.5].flatMap((px, k) => {
          const th = k === 4 ? A * Math.max(0, swing) : k === 0 ? -A * Math.max(0, -swing) : 0
          const ball = [px + L * Math.sin(th), top + L * Math.cos(th)]
          return [{ d: polyline([[px, top], [ball[0], ball[1] - r]]), thin: true }, disc(ball[0], ball[1], r)]
        }),
      ]
    },
  },
  // 示波器：3:2 的李萨如图形，一段亮线沿着细轨迹游走
  lissajous: {
    duration: 2400,
    frames: 64,
    t0: 0.1,
    draw: ({ t }) => {
      const at = th => [C + 8.5 * Math.sin(3 * th + Math.PI / 2), C + 8.5 * Math.sin(2 * th)]
      return [
        { d: `${polyline(Array.from({ length: 97 }, (_, i) => at(TAU * i / 96)))}Z`, thin: true },
        polyline(Array.from({ length: 21 }, (_, i) => at(TAU * (t + i * 0.18 / 20)))),
        // 前端的光点，看得出运动方向
        disc(...at(TAU * (t + 0.18)), 1.5),
      ]
    },
  },
  // 圆弧旋转：270° 的弧转一整圈
  spinner: {
    duration: 900,
    frames: 24,
    t0: 0,
    draw: ({ t }) => [arc(9, 360 * t - 90, 360 * t + 180)],
  },
  // 伸缩的圆弧：一边转一边由短变长再变短，像 Material 的加载圈
  ring: {
    duration: 1600,
    frames: 32,
    t0: 0.5,
    draw: ({ t }) => {
      const sweep = 30 + 220 * swell(t)
      const head = 360 * t + sweep / 2 - 90
      return [arc(9, head - sweep, head)]
    },
  },
  // 内外两段圆弧反向旋转
  arcs: {
    duration: 1500,
    frames: 30,
    t0: 0,
    draw: ({ t }) => [arc(9, 360 * t - 90, 360 * t + 30), arc(5, -360 * t + 90, -360 * t + 210)],
  },
  // 一圈圆点，领头的最大，后面的依次缩小
  'dots-circle': {
    duration: 1000,
    frames: 32,
    t0: 0,
    draw: ({ t }) => Array.from({ length: 8 }, (_, k) => disc(...at(7.5, k * 45 - 90), 0.4 + 1.3 * (1 - wrap(t - k / 8)) ** 2)),
  },
  // 活动指示器：八根辐条，领头的最长，后面的依次缩短（用长度代替透明度）
  spokes: {
    duration: 1000,
    frames: 32,
    t0: 0,
    draw: ({ t }) => Array.from({ length: 8 }, (_, k) => {
      const age = wrap(t - k / 8)
      const len = 1.5 + 3.5 * (1 - age) ** 2
      const deg = k * 45 - 90
      return `M${pt(at(4.5, deg))}L${pt(at(4.5 + len, deg))}`
    }),
  },
  // 小点绕着中心的圆运行
  orbit: {
    duration: 1500,
    frames: 32,
    t0: 0.875,
    draw: ({ t }) => [
      ring(3.5),
      dot(...at(8.5, 360 * t - 90), 3),
    ],
  },
  // 时钟：分针转四圈、时针转一圈
  clock: {
    duration: 6000,
    frames: 96,
    // 静态造型：时针约 2 点、分针约 10 点，两针张开
    t0: 0.2,
    draw: ({ t }) => [
      ring(9),
      `M${C} ${C}L${pt(at(6.5, 360 * 4 * t - 90))}`,
      `M${C} ${C}L${pt(at(4, 360 * t - 90))}`,
    ],
  },
  // 三个点依次跳起
  dots: {
    duration: 1200,
    frames: 24,
    t0: 0.15,
    draw: ({ t }) => [6, 12, 18].map((x, k) => {
      const lift = Math.max(0, Math.sin(TAU * (t - k / 6))) ** 2
      return dot(x, 13.5 - 4 * lift, 3)
    }),
  },
  // 三个圆点依次放大缩小
  pulse: {
    duration: 1200,
    frames: 24,
    t0: 0.2,
    draw: ({ t }) => [6, 12, 18].map((x, k) => disc(x, C, 0.6 + 1.4 * swell(t - k / 6))),
  },
  // 3×3 圆点沿对角线依次脉动
  grid: {
    duration: 1400,
    frames: 28,
    t0: 0.25,
    draw: ({ t }) => [6.5, 12, 17.5].flatMap((y, j) => [6.5, 12, 17.5].map((x, i) => disc(x, y, 0.5 + 1.3 * swell(t - (i + j) / 8)))),
  },
  // 均衡器：四根竖条依次起伏；四根正好以 12 为中心对称，又都落在 .5 网格上
  bars: {
    duration: 1000,
    frames: 24,
    t0: 0.3,
    draw: ({ t }) => [4.5, 9.5, 14.5, 19.5].map((x, k) => {
      const h = 2 + 6 * swell(t - k / 8)
      return `M${x} ${C - h}V${C + h}`
    }),
  },
  // 流动的正弦波
  wave: {
    duration: 1400,
    frames: 24,
    t0: 0,
    draw: ({ t }) => [polyline(Array.from({ length: 31 }, (_, i) => {
      const x = 3 + i * 0.6
      return [x, C + 3.5 * Math.sin(TAU * ((x - 3) / 12 - t))]
    }))],
  },
  // 一段线绕着方框追逐
  square: {
    duration: 1600,
    frames: 48,
    t0: 0.1,
    draw: ({ t }) => [polyline(Array.from({ length: 17 }, (_, i) => onSquare(7.5, t + i * 0.3 / 16)))],
  },
  // 一段线沿 ∞ 游走，底下一条细轨道
  infinity: {
    duration: 2000,
    frames: 48,
    t0: 0.15,
    draw: ({ t }) => [
      { d: `${polyline(Array.from({ length: 65 }, (_, i) => lemniscate(9, TAU * i / 64)))}Z`, thin: true },
      polyline(Array.from({ length: 17 }, (_, i) => lemniscate(9, TAU * (t + i * 0.3 / 16)))),
      disc(...lemniscate(9, TAU * (t + 0.3)), 1.5),
    ],
  },
  // 不确定进度条：滑块在轨道里来回；轨道 9.5–13.5，滑块落在 11.5 的 .5 网格上
  progress: {
    duration: 1600,
    frames: 32,
    t0: 0.25,
    draw: ({ t }) => {
      const a = 6.5 + 5 * swell(t)
      return [
        `M5 9.5H19A2 2 0 0 1 19 13.5H5A2 2 0 0 1 5 9.5Z`,
        `M${a} 11.5H${a + 6}`,
      ]
    },
  },
}

// 图标文件用：静态造型和动画定义
export const still = key => opts => LOADING[key].draw({ ...opts, t: LOADING[key].t0 })
export const animation = key => ({ duration: LOADING[key].duration, frames: LOADING[key].frames, draw: LOADING[key].draw })
