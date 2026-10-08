// 卢恩字母（Elder Futhark 24 个），键按 futhark 顺序，每 8 个一个 ætt；竖笔贯通 3–21
// 字形对照 Unicode ᚠ–ᛟ 的标准写法；r 是尖角处的小圆角
// 单竖的字竖笔落在中线 12 上，左右两竖的字关于 12 对称
import { rounded } from './geometry'

const poly = (points, r) => rounded(points, r, false)

export const RUNES = {
  // Freyr's ætt
  fehu: { zh: 'ᚠ fehu', paths: () => ['M8.5 3V21', 'M8.5 9L16.5 3', 'M8.5 14.5L16.5 8.5'] },
  uruz: { zh: 'ᚢ uruz', paths: r => [poly([[7.5, 21], [7.5, 3], [16.5, 9], [16.5, 21]], r)] },
  thurisaz: { zh: 'ᚦ thurisaz', paths: r => ['M8.5 3V21', poly([[8.5, 7], [15.5, 12], [8.5, 17]], r)] },
  ansuz: { zh: 'ᚨ ansuz', paths: r => [poly([[16.5, 9], [8.5, 3], [8.5, 21]], r), 'M8.5 9L16.5 15'] },
  // 碗和斜腿拆开画：连成一笔时锐角在尖角模式下会刺出竖笔
  raidho: { zh: 'ᚱ raidho', paths: r => [poly([[7.5, 21], [7.5, 3], [15.5, 7.5], [7.5, 12]], r), 'M7.5 12L16.5 21'] },
  // 小尖角，上下居中，不贯通整高
  kaunan: { zh: 'ᚲ kaunan', paths: r => [poly([[15.5, 6.5], [8.5, 12], [15.5, 17.5]], r)] },
  gebo: { zh: 'ᚷ gebo', paths: () => ['M6 3L18 21', 'M18 3L6 21'] },
  wunjo: { zh: 'ᚹ wunjo', paths: r => [poly([[8.5, 21], [8.5, 3], [15.5, 7.5], [8.5, 12]], r)] },
  // Hagal's ætt
  hagalaz: { zh: 'ᚺ hagalaz', paths: () => ['M7.5 3V21', 'M16.5 3V21', 'M7.5 9L16.5 15'] },
  naudiz: { zh: 'ᚾ naudiz', paths: () => ['M12 3V21', 'M7.5 9L16.5 14.5'] },
  isa: { zh: 'ᛁ isa', paths: () => ['M12 3V21'] },
  // 左上一个 <、右下一个 >，错开咬合
  jera: { zh: 'ᛃ jera', paths: r => [poly([[12, 4], [6.5, 9.5], [12, 15]], r), poly([[12, 9], [17.5, 14.5], [12, 20]], r)] },
  eihwaz: { zh: 'ᛇ eihwaz', paths: r => [poly([[16, 7.5], [12, 3], [12, 21], [8, 16.5]], r)] },
  perthro: { zh: 'ᛈ perthro', paths: r => [poly([[16.5, 3], [13, 7], [8.5, 3], [8.5, 21], [13, 17], [16.5, 21]], r)] },
  algiz: { zh: 'ᛉ algiz', paths: r => ['M12 3V21', poly([[6, 3], [12, 10.5], [18, 3]], r)] },
  sowilo: { zh: 'ᛊ sowilo', paths: r => [poly([[16, 3], [8, 8.5], [15, 12.5], [8, 16.5], [16, 21]], r)] },
  // Tyr's ætt
  tiwaz: { zh: 'ᛏ tiwaz', paths: r => ['M12 3V21', poly([[6, 9], [12, 3], [18, 9]], r)] },
  berkana: { zh: 'ᛒ berkana', paths: r => [poly([[8.5, 12], [8.5, 3], [15.5, 7.5], [8.5, 12]], r), poly([[8.5, 12], [15.5, 16.5], [8.5, 21], [8.5, 12]], r)] },
  ehwaz: { zh: 'ᛖ ehwaz', paths: r => [poly([[6.5, 21], [6.5, 3], [12, 9], [17.5, 3], [17.5, 21]], r)] },
  mannaz: { zh: 'ᛗ mannaz', paths: r => [poly([[6.5, 21], [6.5, 3], [17.5, 11]], r), poly([[17.5, 21], [17.5, 3], [6.5, 11]], r)] },
  laguz: { zh: 'ᛚ laguz', paths: r => [poly([[8.5, 21], [8.5, 3], [15.5, 8.5]], r)] },
  // Elder 写法：居中的小菱形
  ingwaz: { zh: 'ᛜ ingwaz', paths: r => [rounded([[12, 6], [18, 12], [12, 18], [6, 12]], r)] },
  // 竖笔和交叉斜线分开画，避免顶角的锐角斜接刺出
  dagaz: { zh: 'ᛞ dagaz', paths: () => ['M6.5 3V21', 'M17.5 3V21', 'M6.5 3L17.5 21', 'M17.5 3L6.5 21'] },
  othala: { zh: 'ᛟ othala', paths: r => [poly([[5, 21], [17.5, 8.5], [12, 3], [6.5, 8.5], [19, 21]], r)] },
}

export const AETTIR = ['freyr', 'hagal', 'tyr']
