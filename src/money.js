// 货币符号：全尺寸（约 16 高）画在 24 网格中间；硬币版缩小后放进圆里
// 横竖笔画都对齐像素网格（snap 整组一起吸附，居中的竖线吸到 11.5，符号跟着整体平移半格）
import { glyph, snap } from './letters'
import { scale } from './transform'

const G = 2.5 // 线条字母放大倍数：3.5 × 6 → 8.75 × 15
const big = (c, x = 12 - 1.75 * G) => glyph(c, x, 4.5, G)

const RAW = {
  // $：S + 贯穿的竖线
  dollar: { zh: '美元', paths: () => [big('S'), 'M12 2.5V21.5'] },
  // €：C 往右挪 + 两道横线
  // 硬币版两道横拉开到 4（缩小后隔 2.4）：原来的 3 缩到 1.8，常规线宽下两道横就贴在一起了
  euro: { zh: '欧元', paths: () => [big('C', 8.5), 'M5.5 10.5H13.5', 'M5.5 13.5H13.5'], coin: () => [big('C', 8.5), 'M5.5 10H13.5', 'M5.5 14H13.5'] },
  // ¥：Y + 两道横线（人民币、日元通用）
  yen: { zh: '人民币 / 日元', paths: () => [big('Y'), 'M8 13.5H16', 'M8 16.5H16'] },
  // £：上方弯钩落成竖笔，底部向左收尾，中间一道横
  pound: { zh: '英镑', paths: () => ['M16 7A3.5 3.5 0 0 0 9.5 8.75V16A3.5 3.5 0 0 1 7 19.5H17', 'M7 13H14'] },
  // ₩：W + 两道横线
  won: { zh: '韩元', paths: () => [big('W'), 'M5 10H19', 'M5 13H19'] },
  // ₹：上方两道横，半圆碗，再一笔斜落
  rupee: { zh: '卢比', paths: () => ['M6.5 4.5H17.5', 'M6.5 8.75H17.5', 'M6.5 4.5H10A4.25 4.25 0 0 1 10 13H6.5L14.5 20.5'] },
  // ₽：P + 底部一道横
  ruble: { zh: '卢布', paths: () => ['M8.5 20.5V3.5H13.5A4.5 4.5 0 0 1 13.5 12.5H6', 'M6 16.5H14'] },
  // ₿：B + 上下各两根短竖
  bitcoin: {
    zh: '比特币',
    paths: () => [big('B'), 'M10 2.5V4.5', 'M12.5 2.5V4.5', 'M10 19.5V21.5', 'M12.5 19.5V21.5'],
  },
}

export const CURRENCIES = Object.fromEntries(Object.entries(RAW).map(([k, v]) => [k, { ...v, paths: () => snap(v.paths()) }]))
// 硬币版：缩小到 0.6 倍后重新对齐网格；有 coin 的符号用它（缩小后线挤在一起的，单独拉开间距）
export const coin = key => snap((RAW[key].coin ?? RAW[key].paths)().map(d => scale(d, 0.6)))
