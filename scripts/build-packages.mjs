// 构建可发布的包（都从 src/ 生成）：
// - packages/core：@jannchie/icons，引擎 + 图标定义，ESM + CJS、按模块保留结构，可以 tree-shaking
//   入口：.（全功能）、./all（按名字查）、./static（预先算好的默认样式，不带渲染引擎）、./meta（分类、标签）、./icons/*（单个图标）、
//   ./runtime（框架组件包共用的纯函数）
// - packages/iconify-json：@jannchie/iconify-json，Iconify 格式，每种「圆角 × 字重」一个集合（5 × 3 = 15 个）
// 用法：pnpm build:packages
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
// 这几个模块没有依赖，直接导入；类型声明里的字重、圆角、角色联合类型从它们生成，不手抄
// 改名留下的兼容别名（旧名 → 现名），见 src/aliases.js、docs/naming.md
import { ALIASES, exportName, resolveName, validateAliases } from '../src/aliases.js'
import { CORNERS, WEIGHTS } from '../src/options.js'
import { ROLES } from '../src/tone.js'
import { createSsrServer, load } from './audit-baseline.mjs'
import { buildLib, copyLegal, readPackage } from './packages.mjs'

// 排序都按 UTF-16 码点（和 Array#sort 的默认顺序一致），不随系统语言变
const byKey = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
const byFirst = ([a], [b]) => byKey(a, b)

const names = readdirSync('src/icons').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)).sort(byKey)
// 别名：[旧名, 现名]，按旧名排序；规则见 validateAliases（现名存在、旧名没有文件、不链式、导出名不撞）
const aliasErrors = validateAliases(names)
if (aliasErrors.length)
  throw new Error(`invalid aliases in src/aliases.js:\n${aliasErrors.join('\n')}`)
const aliasList = Object.entries(ALIASES).sort(byFirst)
const deprecatedDoc = (old, name, indent = '') => `${indent}/** @deprecated Renamed to '${name}'. Use ${exportName(name)} */`
const { version } = readPackage('packages/core')
const json = v => JSON.stringify(v)

// 预计算、Iconify、元数据都要跑 src/ 里的引擎（import.meta.glob、无扩展名导入），借 vite 的 SSR 加载
const server = await createSsrServer()
const { icons, byName } = await load(server, '/src/iconset.js')
const { pathsOf, svgAttrs } = await load(server, '/src/render.js')
const { iconifyBody, mergedPaths } = await load(server, '/src/export.js')
const { categorize } = await load(server, '/src/categories.js')
const { t } = await load(server, '/src/i18n.js')
// 标签、加入版本、第三方标记、旧名
const { metaOf } = await load(server, '/src/meta/meta.js')

// 分类：图标名 → 分类 id；分类标题用英文
const categories = categorize(icons)
const categoryOf = new Map(categories.flatMap(c => c.groups.flatMap(g => g.icons.map(i => [i.name, c.id]))))
const categoryTitle = id => t(`cat.${id}`)

// ---------- 核心包 ----------
const GEN = 'packages/core/.gen'
rmSync(GEN, { recursive: true, force: true })
mkdirSync(`${GEN}/icons`, { recursive: true })
mkdirSync(`${GEN}/static/icons`, { recursive: true })
// 改名留下的旧名：深路径 ./icons/<旧名>（./static/icons/<旧名> 同样）转发到新图标
const writeForwards = (dir) => {
  for (const [o, n] of aliasList)
    writeFileSync(`${dir}/${o}.js`, `// 已改名为 ${n}（见 src/aliases.js）\nexport { default } from './${n}.js'\n`)
}
// 入口里每个图标一行导出；旧名指向新图标（name 是新名字），带 @deprecated
const iconExports = () => [
  ...names.map(n => `export { default as ${exportName(n)} } from './icons/${n}.js'`),
  ...aliasList.flatMap(([o, n]) => [deprecatedDoc(o, n), `export { default as ${exportName(o)} } from './icons/${n}.js'`]),
]

// 每个图标一个入口：{ name, draw, animation }；只有动画图标才带 animation
for (const name of names) {
  const src = `../../../../src/icons/${name}.js`
  writeFileSync(`${GEN}/icons/${name}.js`, byName.get(name).animation
    ? `import draw, { animation } from '${src}'\n\nexport default { name: '${name}', draw, animation }\n`
    : `import draw from '${src}'\n\nexport default { name: '${name}', draw }\n`)
}
writeForwards(`${GEN}/icons`)
writeFileSync(`${GEN}/index.js`, [
  `export { resolveColors, toPaths, toSvg } from '../../../src/export.js'`,
  `export { CORNERS, WEIGHTS } from '../../../src/options.js'`,
  `export { ROLES } from '../../../src/tone.js'`,
  ...iconExports(),
  '',
].join('\n'))
// 按名字查图标（会引入全部图标，不能 tree-shaking）；旧名也能查到
writeFileSync(`${GEN}/all.js`, [
  ...names.map(n => `import ${exportName(n)} from './icons/${n}.js'`),
  '',
  `export const icons = {\n${[...names.map(n => `  '${n}': ${exportName(n)},`), ...aliasList.map(([o, n]) => `  '${o}': ${exportName(n)},`)].join('\n')}\n}`,
  '',
].join('\n'))
// 框架组件包共用的纯函数（尺寸解析、默认配置合并、设备像素比订阅、根元素属性）
writeFileSync(`${GEN}/runtime.js`, `export * from '../../../src/runtime.js'\n`)

// 轻量入口 ./static：默认样式（圆角 2、regular、单色）的路径在构建时算好，运行时只拼字符串，不带渲染引擎
// toSvg / toPaths 的实现在 src/svg-root.js（和核心包的 toSvg 共用转义、序列化），这里只生成默认样式的根属性
const DEFAULT_CORNER = CORNERS.find(c => !c.sharp && c.radius === 2)
const DEFAULT_WEIGHT = WEIGHTS.find(w => w.id === 'regular')
for (const name of names) {
  const paths = mergedPaths(pathsOf(byName.get(name), DEFAULT_CORNER, DEFAULT_WEIGHT))
  writeFileSync(`${GEN}/static/icons/${name}.js`, `export default { name: '${name}', paths: ${json(paths)} }\n`)
}
writeFileSync(`${GEN}/static/svg.js`, `// 由 scripts/build-packages.mjs 生成：默认样式的根属性，和不依赖渲染引擎的 toSvg、toPaths
import { staticPaths, staticSvg } from '../../../../src/svg-root.js'

export const SVG_ATTRS = ${json(svgAttrs(DEFAULT_WEIGHT.stroke, false))}

export const toSvg = (icon, options) => staticSvg(icon, SVG_ATTRS, options)
export const toPaths = (icon, options) => staticPaths(icon, SVG_ATTRS, options)
`)
writeForwards(`${GEN}/static/icons`)
writeFileSync(`${GEN}/static/index.js`, [
  `export { SVG_ATTRS, toPaths, toSvg } from './svg.js'`,
  ...iconExports(),
  '',
].join('\n'))

// 元数据入口 ./meta：{ 图标名: { category, tags, since?, thirdParty?, oldNames? } }，分类标题另给
const metaEntries = names.map((name) => {
  const { tags, since, thirdParty, oldNames } = metaOf(name)
  const entry = { category: categoryOf.get(name), tags }
  if (since !== undefined)
    entry.since = since
  if (thirdParty)
    entry.thirdParty = true
  if (oldNames?.length)
    entry.oldNames = oldNames
  return [name, entry]
})
// 旧名：和新图标同一份元数据，另标 deprecated 和 replacedBy
const metaByName = Object.fromEntries(metaEntries)
const metaObj = { ...metaByName, ...Object.fromEntries(aliasList.map(([o, n]) => [o, { ...metaByName[n], deprecated: true, replacedBy: n }])) }
const categoryTitles = Object.fromEntries(categories.map(c => [c.id, categoryTitle(c.id)]))
writeFileSync(`${GEN}/meta.js`, `export const categories = ${json(categoryTitles)}\n\nexport const meta = ${json(metaObj)}\n`)

const entry = {
  'index': `${GEN}/index.js`,
  'all': `${GEN}/all.js`,
  'static/index': `${GEN}/static/index.js`,
  'meta': `${GEN}/meta.js`,
  'runtime': `${GEN}/runtime.js`,
  // 旧名的深路径文件没有被别的入口引用，单独作为入口
  ...Object.fromEntries(aliasList.flatMap(([o]) => [[`icons/${o}`, `${GEN}/icons/${o}.js`], [`static/icons/${o}`, `${GEN}/static/icons/${o}.js`]])),
}
await buildLib({ entry, outDir: 'packages/core/dist', root: GEN })
rmSync(GEN, { recursive: true, force: true })

// 类型声明：手写的公共接口 + 生成的图标名联合类型和每个图标的导出（Icon<'folder-plus'> 这样带着字面量名字）
// ESM（.d.ts）和 CJS（.d.cts）各一份，内容相同，只是互相引用时的扩展名不同
// 每个图标（和旧名）一行声明：type 是 Icon 或 StaticIcon
const iconDeclarations = type => `${names.map(n => `export declare const ${exportName(n)}: ${type}<'${n}'>`).join('\n')}

${aliasList.map(([o, n]) => `${deprecatedDoc(o, n)}\nexport declare const ${exportName(o)}: ${type}<'${n}'>`).join('\n')}
`
const DTS = `// 由 scripts/build-packages.mjs 生成，不要手改
export type Radius = ${CORNERS.map(c => (c.sharp ? `'sharp'` : c.radius)).join(' | ')}
export type Weight = ${WEIGHTS.map(w => `'${w.id}'`).join(' | ')}
/** Semantic role of an overlay mark (badge, strike-through) in the duo-tone variant */
export type Role = ${Object.keys(ROLES).map(r => `'${r}'`).join(' | ')}
export type Theme = 'light' | 'dark'

/** Options passed to an icon's draw function (radius is the 0–3 corner radius, 0 for sharp) */
export interface DrawOptions {
  radius: number
  stroke: number
  weight: Weight
}
/** A path returned by a draw function: SVG path data, or an object with style flags */
export type PathSpec = string | { d: string, [key: string]: unknown }

export interface Icon<N extends string = IconName> {
  readonly name: N
  draw: (options: DrawOptions) => PathSpec[]
  /** Only on animated icons: period (ms), frames sampled per period, and a draw function for progress t (0–1) */
  animation?: {
    duration: number
    frames: number
    draw: (options: DrawOptions & { t: number }) => PathSpec[]
  }
}

/** Value of an extra root attribute; null and undefined drop the attribute */
export type AttrValue = string | number | boolean | null | undefined
/** Extra attributes for the root <svg> element (class, style, data-*, aria-*, ...); they override the defaults */
export type RootAttrs = Record<string, AttrValue>

export interface ColorOptions {
  /** Color badges and strike-throughs by their meaning */
  duo?: boolean
  /** Light or dark recommended colors for duo */
  theme?: Theme
  /** Overrides for single roles or the main color; primary defaults to currentColor */
  colors?: Partial<Record<'primary' | Role, string>>
}
export interface A11yOptions {
  /**
   * Accessible name. When given, the root gets role="img" and a <title> child (toPaths returns it as \`title\`);
   * otherwise the icon is decorative and gets aria-hidden="true".
   */
  title?: string
  /** Extra attributes for the root element; values are escaped by toSvg */
  attrs?: RootAttrs
}
export interface SvgOptions extends ColorOptions, A11yOptions {
  radius?: Radius
  weight?: Weight
  /** Width and height of the SVG: a number (px) or a CSS length such as '1em'. Defaults to 24 */
  size?: number | string
}
export interface PathsOptions extends ColorOptions, A11yOptions {
  radius?: Radius
  weight?: Weight
  /** Displayed size in device pixels: snaps strokes to the pixel grid when given; 0 (default) means no snapping */
  px?: number
}
export interface SvgAttrs {
  'fill': 'none'
  'stroke': string
  'stroke-width': number
  'stroke-linecap': 'square' | 'round'
  'stroke-linejoin': 'miter' | 'round'
  'stroke-miterlimit'?: number
  /** Present unless a title is given */
  'aria-hidden'?: 'true'
  /** Present when a title is given */
  'role'?: 'img'
}
export interface AnimateAttrs {
  attributeName: 'd'
  dur: string
  repeatCount: 'indefinite'
  values: string
}
export interface PathAttrs {
  'd': string
  'stroke-width'?: number
  'stroke'?: string
  'fill'?: string
  /** Small parts (such as rank stars) that stay round in sharp mode */
  'stroke-linecap'?: 'round'
  'stroke-linejoin'?: 'round'
  /** Attributes of the <animate> child on animated icons */
  'animate'?: AnimateAttrs
}
export interface PathsResult {
  svg: SvgAttrs & RootAttrs
  paths: PathAttrs[]
  /** The title option, to render as a <title> child */
  title?: string
}

export declare function toSvg(icon: Icon<string>, options?: SvgOptions): string
export declare function toPaths(icon: Icon<string>, options?: PathsOptions): PathsResult
export declare function resolveColors(options?: ColorOptions): ({ primary?: string } & Record<Role, string>) | undefined
export declare const CORNERS: ReadonlyArray<{ label: string, radius: number, sharp?: boolean }>
export declare const WEIGHTS: ReadonlyArray<{ id: Weight, stroke: number }>
export declare const ROLES: Readonly<Record<Role, { light: string, dark: string }>>

export type IconName =
${names.map(n => `  | '${n}'`).join('\n')}

/** Old names of renamed icons, still accepted (see docs/naming.md) */
export type DeprecatedIconName =
${aliasList.length ? aliasList.map(([o]) => `  | '${o}'`).join('\n') : '  never'}

${iconDeclarations('Icon')}`
const ALL_DTS = ext => `// 由 scripts/build-packages.mjs 生成，不要手改
import type { Icon, IconName } from './index.${ext}'

/** Every icon by name (imports all icons); old names of renamed icons also resolve, to the renamed icon */
export declare const icons: { readonly [N in IconName]: Icon<N> } & {
${aliasList.map(([o, n]) => `${deprecatedDoc(o, n, '  ')}\n  readonly '${o}': Icon<'${n}'>`).join('\n')}
}
`
// 深路径 ./icons/<name>：所有文件共用一份声明
const ICON_DTS = ext => `// 由 scripts/build-packages.mjs 生成，不要手改
import type { Icon, IconName } from './index.${ext}'

declare const icon: Icon<IconName>
export default icon
`
const STATIC_DTS = ext => `// 由 scripts/build-packages.mjs 生成，不要手改
import type { A11yOptions, IconName, PathAttrs, PathsResult } from '../index.${ext}'

/** An icon with its path data precomputed for the default style (radius 2, regular weight, single color) */
export interface StaticIcon<N extends string = IconName> {
  readonly name: N
  readonly paths: readonly PathAttrs[]
}
export interface StaticSvgOptions extends A11yOptions {
  /** Width and height of the SVG: a number (px) or a CSS length such as '1em'. Defaults to 24 */
  size?: number | string
}
/** Root attributes of the default style (stroke currentColor, width 1.5, round caps and joins) */
export declare const SVG_ATTRS: {
  readonly 'fill': 'none'
  readonly 'stroke': 'currentColor'
  readonly 'stroke-width': number
  readonly 'stroke-linecap': 'round'
  readonly 'stroke-linejoin': 'round'
}
export declare function toSvg(icon: StaticIcon<string>, options?: StaticSvgOptions): string
/** Root and path attributes for framework components, shaped like toPaths from @jannchie/icons (the root attributes leave out xmlns, size and viewBox) */
export declare function toPaths(icon: StaticIcon<string>, options?: A11yOptions): PathsResult

${iconDeclarations('StaticIcon')}`
const STATIC_ICON_DTS = ext => `// 由 scripts/build-packages.mjs 生成，不要手改
import type { StaticIcon } from './index.${ext}'
import type { IconName } from '../index.${ext}'

declare const icon: StaticIcon<IconName>
export default icon
`
const META_DTS = ext => `// 由 scripts/build-packages.mjs 生成，不要手改
import type { DeprecatedIconName, IconName } from './index.${ext}'

export type CategoryId = ${categories.map(c => `'${c.id}'`).join(' | ')}
export interface IconMeta {
  category: CategoryId
  /** Search keywords */
  tags: readonly string[]
  /** Version in which the icon was added ("next" when not released yet) */
  since?: string
  /** Set when the icon depicts a third-party character or mark (see NOTICE) */
  thirdParty?: true
  /** Former names of a renamed icon, still accepted as deprecated aliases */
  oldNames?: readonly string[]
  /** Set on the old name of a renamed icon */
  deprecated?: true
  /** On the old name of a renamed icon: its current name */
  replacedBy?: IconName
}
/** English title of each category */
export declare const categories: { readonly [C in CategoryId]: string }
/** Metadata of every icon; old names of renamed icons are included with deprecated and replacedBy */
export declare const meta: { readonly [N in IconName]: IconMeta } & { readonly [N in DeprecatedIconName]: IconMeta & { deprecated: true, replacedBy: IconName } }
`
const RUNTIME_DTS = `// 由 scripts/build-packages.mjs 生成，不要手改
// Helpers shared by @jannchie/icons-vue and @jannchie/icons-react; no rendering engine, no framework

/** Pixel size of a size prop: numbers and '20' / '20px' strings; 0 for other CSS lengths such as '1em' */
export declare function pixelSize(size: number | string | null | undefined): number
/** Merge component defaults: inner overrides outer, colors are merged role by role */
export declare function mergeDefaults<T extends { colors?: object }>(outer: T, inner: T): T
/** Current device pixel ratio (1 on the server) */
export declare function getDpr(): number
/** Call back when the device pixel ratio may have changed (zoom, moving to another screen); returns an unsubscribe function */
export declare function subscribeDpr(callback: () => void): () => void
/** Root attributes that do not depend on the style: namespace, size and the 24-unit viewBox */
export declare function rootAttrs<S extends number | string = 24>(size?: S): { xmlns: 'http://www.w3.org/2000/svg', width: S, height: S, viewBox: '0 0 24 24' }
`
const D = 'packages/core/dist'
for (const [ts, ext] of [['d.ts', 'js'], ['d.cts', 'cjs']]) {
  writeFileSync(`${D}/index.${ts}`, DTS)
  writeFileSync(`${D}/all.${ts}`, ALL_DTS(ext))
  writeFileSync(`${D}/icon.${ts}`, ICON_DTS(ext))
  writeFileSync(`${D}/meta.${ts}`, META_DTS(ext))
  writeFileSync(`${D}/runtime.${ts}`, RUNTIME_DTS)
  writeFileSync(`${D}/static/index.${ts}`, STATIC_DTS(ext))
  writeFileSync(`${D}/static/icon.${ts}`, STATIC_ICON_DTS(ext))
}

// ---------- Iconify JSON ----------
const OUT = 'packages/iconify-json'
// 构建时间（Unix 秒）；设了 SOURCE_DATE_EPOCH 就用它，方便复现构建
const lastModified = Number(process.env.SOURCE_DATE_EPOCH) || Math.floor(Date.now() / 1000)
const samples = ['folder-plus', 'send', 'loading-atom']
for (const s of samples) {
  if (!byName.has(s))
    throw new Error(`sample icon not found: ${s}`)
}
const info = {
  name: 'Jannchie Icons',
  total: icons.length,
  version,
  author: { name: 'Jianqi Pan', url: 'https://github.com/Jannchie/jannchie-icons' },
  license: { title: 'MIT', spdx: 'MIT', url: 'https://github.com/Jannchie/jannchie-icons/blob/main/LICENSE' },
  samples,
  height: 24,
  category: 'General',
  tags: ['Uses Stroke'],
  palette: false,
}
// 分类：英文标题 → 图标名（只列主名，别名跟着主名走）
const categoriesOf = present => Object.fromEntries(categories
  .map(c => [categoryTitle(c.id), c.groups.flatMap(g => g.icons.map(i => i.name)).filter(n => present.has(n))])
  .filter(([, list]) => list.length))
// 前缀：jannchie[-圆角][-字重]，默认的圆角 2、字重 regular 省略——jannchie、jannchie-bold、jannchie-sharp、jannchie-r1-light……
// 文件名是去掉 jannchie- 的前缀，默认集合叫 icons.json
const cap = s => s[0].toUpperCase() + s.slice(1)
const sortKeys = o => Object.fromEntries(Object.entries(o).sort(byFirst))
const hyphens = n => n.split('-').length
// 所有名字：现名 + 改名留下的旧名
const allNames = [...names, ...aliasList.map(([o]) => o)]
// collections.json 的条目；stats：每个集合的主名数、别名数（只用来打印）
const collections = []
const stats = []
let defaultSet = null
for (const corner of CORNERS) {
  const radiusPart = corner.sharp ? 'sharp' : corner.radius === 2 ? '' : `r${corner.radius}`
  for (const weight of WEIGHTS) {
    const parts = [radiusPart, weight.id === 'regular' ? '' : weight.id].filter(Boolean)
    const prefix = ['jannchie', ...parts].join('-')
    // 外观完全相同（body 相同）的图标只存一份：连字符最少（更通用）的名字做主名，一样多时按字母序；
    // 其余写成指向它的别名，原来的名字都还能用
    const groups = new Map()
    for (const icon of icons) {
      const body = iconifyBody(pathsOf(icon, corner, weight), { stroke: weight.stroke, sharp: !!corner.sharp })
      groups.set(body, [...(groups.get(body) ?? []), icon.name])
    }
    const setIcons = {}
    const parentOf = new Map()
    for (const [body, group] of groups) {
      const [parent] = group.sort((a, b) => hyphens(a) - hyphens(b) || byKey(a, b))
      setIcons[parent] = { body }
      for (const n of group)
        parentOf.set(n, parent)
    }
    // 每个名字的主名：改名留下的旧名先解析到现名，再取现名所在那组的主名（不留链式别名）
    const canonical = name => parentOf.get(resolveName(name))
    const aliases = Object.fromEntries(allNames.filter(n => canonical(n) !== n).map(n => [n, { parent: canonical(n) }]))
    const present = new Set(Object.keys(setIcons))
    const set = {
      prefix,
      info: { ...info, name: `${info.name} (${corner.sharp ? 'Sharp' : `Radius ${corner.radius}`} ${cap(weight.id)})`, total: present.size },
      lastModified,
      icons: sortKeys(setIcons),
      ...(Object.keys(aliases).length ? { aliases: sortKeys(aliases) } : {}),
      categories: categoriesOf(present),
      width: 24,
      height: 24,
    }
    const file = `${parts.length ? parts.join('-') : 'icons'}.json`
    writeFileSync(`${OUT}/${file}`, `${JSON.stringify(set)}\n`)
    collections.push({ prefix, file, radius: corner.sharp ? 'sharp' : corner.radius, weight: weight.id })
    stats.push({ prefix, total: present.size, aliases: Object.keys(aliases).length })
    if (!parts.length)
      defaultSet = set
  }
}
// 集合清单：前缀、文件、圆角、字重
writeFileSync(`${OUT}/collections.json`, `${JSON.stringify(collections, null, 2)}\n`)
// 和 @iconify-json/* 一样：info.json 是默认集合的 info（带前缀），metadata.json 放分类（和标签）
writeFileSync(`${OUT}/info.json`, `${JSON.stringify({ prefix: defaultSet.prefix, ...info, total: defaultSet.info.total }, null, 2)}\n`)
// Iconify 的元数据没有按图标的标签字段，这里沿用 categories 的写法：图标名 → 关键词
const metadata = {
  categories: defaultSet.categories,
  tags: Object.fromEntries(metaEntries.filter(([, e]) => e.tags.length).map(([n, e]) => [n, e.tags])),
}
writeFileSync(`${OUT}/metadata.json`, `${JSON.stringify(metadata)}\n`)
writeFileSync(`${OUT}/index.js`, `// 由 scripts/build-packages.mjs 生成，不要手改
import icons from './icons.json' with { type: 'json' }
import info from './info.json' with { type: 'json' }
import metadata from './metadata.json' with { type: 'json' }

export { icons, info, metadata }
`)
writeFileSync(`${OUT}/index.cjs`, `// 由 scripts/build-packages.mjs 生成，不要手改
'use strict'

exports.icons = require('./icons.json')
exports.info = require('./info.json')
exports.metadata = require('./metadata.json')
`)
const ICONIFY_DTS = `// 由 scripts/build-packages.mjs 生成，不要手改
// Structurally compatible with IconifyJSON / IconifyInfo / IconifyMetaData from @iconify/types
export interface IconifyInfo {
  name: string
  total?: number
  version?: string
  author: { name: string, url?: string }
  license: { title: string, spdx?: string, url?: string }
  samples?: string[]
  height?: number | number[]
  category?: string
  tags?: string[]
  palette?: boolean
}
export interface IconifyIcon {
  body: string
  left?: number
  top?: number
  width?: number
  height?: number
  rotate?: number
  hFlip?: boolean
  vFlip?: boolean
  hidden?: boolean
}
export interface IconifyAlias extends Partial<Omit<IconifyIcon, 'body'>> {
  parent: string
}
export interface IconifyMetaData {
  /** Category title → icon names */
  categories?: Record<string, string[]>
  /** Icon name → search keywords (not part of the Iconify spec) */
  tags?: Record<string, string[]>
}
export interface IconifyJSON {
  prefix: string
  info?: IconifyInfo
  lastModified?: number
  icons: Record<string, IconifyIcon>
  aliases?: Record<string, IconifyAlias>
  categories?: Record<string, string[]>
  width?: number
  height?: number
}

/** The default collection (prefix jannchie: radius 2, regular weight) */
export declare const icons: IconifyJSON
export declare const info: IconifyInfo & { prefix: string }
export declare const metadata: IconifyMetaData
`
writeFileSync(`${OUT}/index.d.ts`, ICONIFY_DTS)
writeFileSync(`${OUT}/index.d.cts`, ICONIFY_DTS)
await server.close()

copyLegal('packages/core', OUT)

const aliasTotal = stats.reduce((n, c) => n + c.aliases, 0)
console.log(`packages built: ${names.length} icons (core v${version}); iconify: ${stats.map(c => `${c.prefix} ${c.total}+${c.aliases}`).join(', ')} (${aliasTotal} aliases)`)
