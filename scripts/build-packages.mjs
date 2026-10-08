// 构建可发布的包（都从 src/ 生成）：
// - packages/core：@jannchie/icons，引擎 + 图标定义，ESM + CJS、按模块保留结构，可以 tree-shaking
//   入口：.（全功能）、./all（按名字查）、./static（预先算好的默认样式，不带渲染引擎）、./meta（分类、标签）、./icons/*（单个图标）
// - packages/iconify-json：@jannchie/iconify-json，Iconify 格式，每种「圆角 × 字重」一个集合（5 × 3 = 15 个）
// 用法：pnpm build:packages
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { build, createServer } from 'vite'
// 这两个模块没有依赖，直接导入；类型声明里的字重、圆角、角色联合类型从它们生成，不手抄
import { CORNERS, WEIGHTS } from '../src/options.js'
import { ROLES } from '../src/tone.js'
// 改名留下的兼容别名（旧名 → 现名），见 src/aliases.js、docs/naming.md
import { ALIASES } from '../src/aliases.js'

const names = readdirSync('src/icons').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)).sort()
// 导出名：Icon + PascalCase（加前缀避开 import、2k 这类不能直接当标识符的名字）
const exportName = name => `Icon${name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('')}`

// 别名：[旧名, 现名]，按旧名排序；现名必须存在、旧名不能还有文件、不能链式，导出名也不能和现有图标撞
const aliasList = Object.entries(ALIASES).sort(([a], [b]) => (a < b ? -1 : 1))
{
  const present = new Set(names)
  const exportNames = new Set(names.map(exportName))
  for (const [old, name] of aliasList) {
    if (!present.has(name))
      throw new Error(`alias ${old} → ${name}: target icon not found`)
    if (present.has(old))
      throw new Error(`alias ${old} → ${name}: src/icons/${old}.js still exists`)
    if (name in ALIASES)
      throw new Error(`alias ${old} → ${name}: chained alias`)
    if (exportNames.has(exportName(old)))
      throw new Error(`alias ${old}: export name ${exportName(old)} clashes with an icon`)
  }
}
const deprecatedDoc = (old, name, indent = '') => `${indent}/** @deprecated Renamed to '${name}'. Use ${exportName(name)} */`
const { version } = JSON.parse(readFileSync('packages/core/package.json', 'utf8'))
const json = v => JSON.stringify(v)

// 预计算、Iconify、元数据都要跑 src/ 里的引擎（import.meta.glob、无扩展名导入），借 vite 的 SSR 加载
const server = await createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom', logLevel: 'error' })
const { icons } = await server.ssrLoadModule('/src/iconset.js')
const { pathsOf } = await server.ssrLoadModule('/src/render.js')
const { iconifyBody, mergedPaths } = await server.ssrLoadModule('/src/export.js')
const { categorize } = await server.ssrLoadModule('/src/categories.js')
const { t } = await server.ssrLoadModule('/src/i18n.js')
// 标签、加入版本、第三方标记（src/meta/meta.js 的 metaOf）；还没有这个模块时跳过
let metaOf = null
if (existsSync('src/meta/meta.js')) {
  try {
    metaOf = (await server.ssrLoadModule('/src/meta/meta.js')).metaOf ?? null
  }
  catch (e) {
    console.warn(`src/meta/meta.js failed to load, skipping tags: ${e.message}`)
  }
}

// 分类：图标名 → 分类 id；分类标题用英文
const categories = categorize(icons)
const categoryOf = new Map(categories.flatMap(c => c.groups.flatMap(g => g.icons.map(i => [i.name, c.id]))))
const categoryTitle = id => t(`cat.${id}`)

// ---------- 核心包 ----------
const GEN = 'packages/core/.gen'
rmSync(GEN, { recursive: true, force: true })
mkdirSync(`${GEN}/icons`, { recursive: true })
mkdirSync(`${GEN}/static/icons`, { recursive: true })
// 每个图标一个入口：{ name, draw, animation }；只有动画图标才带 animation
for (const name of names) {
  const src = `../../../../src/icons/${name}.js`
  const animated = /export const animation\b/.test(readFileSync(`src/icons/${name}.js`, 'utf8'))
  writeFileSync(`${GEN}/icons/${name}.js`, animated
    ? `import draw, { animation } from '${src}'\n\nexport default { name: '${name}', draw, animation }\n`
    : `import draw from '${src}'\n\nexport default { name: '${name}', draw }\n`)
}
writeFileSync(`${GEN}/index.js`, [
  `export { resolveColors, toPaths, toSvg } from '../../../src/export.js'`,
  `export { CORNERS, WEIGHTS } from '../../../src/options.js'`,
  `export { ROLES } from '../../../src/tone.js'`,
  ...names.map(n => `export { default as ${exportName(n)} } from './icons/${n}.js'`),
  // 改名前的旧名：指向新图标（name 是新名字）
  ...aliasList.flatMap(([o, n]) => [deprecatedDoc(o, n), `export { default as ${exportName(o)} } from './icons/${n}.js'`]),
  '',
].join('\n'))
// 深路径 ./icons/<旧名>：转发到新图标
for (const [o, n] of aliasList)
  writeFileSync(`${GEN}/icons/${o}.js`, `// 已改名为 ${n}（见 src/aliases.js）\nexport { default } from './${n}.js'\n`)
// 按名字查图标（会引入全部图标，不能 tree-shaking）；旧名也能查到
writeFileSync(`${GEN}/all.js`, [
  ...names.map(n => `import ${exportName(n)} from './icons/${n}.js'`),
  '',
  `export const icons = {\n${[...names.map(n => `  '${n}': ${exportName(n)},`), ...aliasList.map(([o, n]) => `  '${o}': ${exportName(n)},`)].join('\n')}\n}`,
  '',
].join('\n'))

// 轻量入口 ./static：默认样式（圆角 2、regular、单色）的路径在构建时算好，运行时只拼字符串，不带渲染引擎
const DEFAULT_CORNER = CORNERS.find(c => !c.sharp && c.radius === 2)
const DEFAULT_WEIGHT = WEIGHTS.find(w => w.id === 'regular')
const { svgAttrs } = await server.ssrLoadModule('/src/render.js')
const STATIC_ROOT = Object.fromEntries(Object.entries(svgAttrs(DEFAULT_WEIGHT.stroke, false)).filter(([, v]) => v !== undefined))
const byName = new Map(icons.map(i => [i.name, i]))
for (const name of names) {
  const paths = mergedPaths(pathsOf(byName.get(name), DEFAULT_CORNER, DEFAULT_WEIGHT))
  writeFileSync(`${GEN}/static/icons/${name}.js`, `export default { name: '${name}', paths: ${json(paths)} }\n`)
}
writeFileSync(`${GEN}/static/svg.js`, `// 由 scripts/build-packages.mjs 生成：默认样式的根属性和一个不依赖渲染引擎的 toSvg
export const SVG_ATTRS = ${json(STATIC_ROOT)}

const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const NAME = /^[^\\s"'<>/=\\x00-\\x1F]+$/
function attrs(o) {
  let s = ''
  for (const k in o) {
    if (o[k] == null)
      continue
    if (!NAME.test(k))
      throw new TypeError('Invalid attribute name: ' + JSON.stringify(k))
    s += ' ' + k + '="' + esc(o[k]) + '"'
  }
  return s
}

export function toSvg(icon, { size = 24, title, attrs: extra } = {}) {
  if (!icon || !Array.isArray(icon.paths))
    throw new TypeError('Expected an icon object such as IconHeart from @jannchie/icons/static')
  let body = title ? '<title>' + esc(title) + '</title>' : ''
  for (const { animate, ...p } of icon.paths)
    body += '<path' + attrs(p) + (animate ? '><animate' + attrs(animate) + '/></path>' : '/>')
  const root = { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', ...SVG_ATTRS, ...(title ? { role: 'img' } : { 'aria-hidden': 'true' }), ...extra }
  return '<svg' + attrs(root) + '>' + body + '</svg>'
}
`)
for (const [o, n] of aliasList)
  writeFileSync(`${GEN}/static/icons/${o}.js`, `// 已改名为 ${n}（见 src/aliases.js）\nexport { default } from './${n}.js'\n`)
writeFileSync(`${GEN}/static/index.js`, [
  `export { SVG_ATTRS, toSvg } from './svg.js'`,
  ...names.map(n => `export { default as ${exportName(n)} } from './icons/${n}.js'`),
  ...aliasList.flatMap(([o, n]) => [deprecatedDoc(o, n), `export { default as ${exportName(o)} } from './icons/${n}.js'`]),
  '',
].join('\n'))

// 元数据入口 ./meta：{ 图标名: { category, tags, since?, thirdParty? } }，分类标题另给
const metaEntries = names.map((name) => {
  const m = metaOf?.(name) ?? {}
  const entry = { category: categoryOf.get(name), tags: Array.isArray(m.tags) ? m.tags : [] }
  if (m.since !== undefined)
    entry.since = m.since
  if (m.thirdParty !== undefined && m.thirdParty !== null && m.thirdParty !== false)
    entry.thirdParty = m.thirdParty
  return [name, entry]
})
// 旧名：和新图标同一份元数据，另标 deprecated 和 replacedBy
const metaByName = Object.fromEntries(metaEntries)
const metaObj = { ...metaByName, ...Object.fromEntries(aliasList.map(([o, n]) => [o, { ...metaByName[n], deprecated: true, replacedBy: n }])) }
const categoryTitles = Object.fromEntries(categories.map(c => [c.id, categoryTitle(c.id)]))
writeFileSync(`${GEN}/meta.js`, `export const categories = ${json(categoryTitles)}\n\nexport const meta = ${json(metaObj)}\n`)
// thirdParty 的类型按实际数据定
const tsOf = (vals) => {
  const kinds = new Set(vals.map(v => (Array.isArray(v) ? 'array' : typeof v)))
  if (!kinds.size)
    return 'true | string'
  return [...kinds].map(k => ({ boolean: 'boolean', string: 'string', number: 'number', array: 'readonly string[]' }[k] ?? 'unknown')).join(' | ')
}
const thirdPartyType = tsOf(metaEntries.map(([, e]) => e.thirdParty).filter(v => v !== undefined))
const sinceType = tsOf(metaEntries.map(([, e]) => e.since).filter(v => v !== undefined))

const entry = {
  'index': `${GEN}/index.js`,
  'all': `${GEN}/all.js`,
  'static/index': `${GEN}/static/index.js`,
  'meta': `${GEN}/meta.js`,
  // 旧名的深路径文件没有被别的入口引用，单独作为入口
  ...Object.fromEntries(aliasList.flatMap(([o]) => [[`icons/${o}`, `${GEN}/icons/${o}.js`], [`static/icons/${o}`, `${GEN}/static/icons/${o}.js`]])),
}
// ESM 和 CJS 各打一份；CJS 统一用具名导出（exports.default），和 .d.cts 里的 export default 对得上
for (const [format, ext] of [['es', 'js'], ['cjs', 'cjs']]) {
  await build({
    configFile: false,
    logLevel: 'warn',
    publicDir: false,
    build: {
      outDir: 'packages/core/dist',
      emptyOutDir: format === 'es',
      minify: false,
      lib: { entry, formats: [format] },
      rollupOptions: { output: { preserveModules: true, preserveModulesRoot: GEN, entryFileNames: `[name].${ext}`, exports: 'named' } },
    },
  })
}
rmSync(GEN, { recursive: true, force: true })

// 类型声明：手写的公共接口 + 生成的图标名联合类型和每个图标的导出（Icon<'folder-plus'> 这样带着字面量名字）
// ESM（.d.ts）和 CJS（.d.cts）各一份，内容相同，只是互相引用时的扩展名不同
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

${names.map(n => `export declare const ${exportName(n)}: Icon<'${n}'>`).join('\n')}

${aliasList.map(([o, n]) => `${deprecatedDoc(o, n)}\nexport declare const ${exportName(o)}: Icon<'${n}'>`).join('\n')}
`
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
import type { A11yOptions, IconName, PathAttrs } from '../index.${ext}'

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

${names.map(n => `export declare const ${exportName(n)}: StaticIcon<'${n}'>`).join('\n')}

${aliasList.map(([o, n]) => `${deprecatedDoc(o, n)}\nexport declare const ${exportName(o)}: StaticIcon<'${n}'>`).join('\n')}
`
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
  /** Version in which the icon was added */
  since?: ${sinceType}
  /** Set when the icon depicts a third-party character or mark (see NOTICE) */
  thirdParty?: ${thirdPartyType}
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
const D = 'packages/core/dist'
for (const [ts, ext] of [['d.ts', 'js'], ['d.cts', 'cjs']]) {
  writeFileSync(`${D}/index.${ts}`, DTS)
  writeFileSync(`${D}/all.${ts}`, ALL_DTS(ext))
  writeFileSync(`${D}/icon.${ts}`, ICON_DTS(ext))
  writeFileSync(`${D}/meta.${ts}`, META_DTS(ext))
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
const sortKeys = o => Object.fromEntries(Object.entries(o).sort(([a], [b]) => (a < b ? -1 : 1)))
const collections = []
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
    const hyphens = n => n.split('-').length
    const setIcons = {}
    const aliases = {}
    for (const [body, group] of groups) {
      const [parent, ...rest] = group.sort((a, b) => hyphens(a) - hyphens(b) || (a < b ? -1 : 1))
      setIcons[parent] = { body }
      for (const n of rest)
        aliases[n] = { parent }
    }
    // 改名留下的旧名：指向新名（新名本身被去重成别名时，直接指向它的主名，不留链式别名）
    for (const [o, n] of aliasList)
      aliases[o] = { parent: setIcons[n] ? n : aliases[n].parent }
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
    collections.push({ prefix, file, radius: corner.sharp ? 'sharp' : corner.radius, weight: weight.id, total: present.size, aliases: Object.keys(aliases).length })
    if (!parts.length)
      defaultSet = set
  }
}
// 集合清单：前缀、文件、圆角、字重
writeFileSync(`${OUT}/collections.json`, `${JSON.stringify(collections.map(({ total, aliases, ...c }) => c), null, 2)}\n`)
// 和 @iconify-json/* 一样：info.json 是默认集合的 info（带前缀），metadata.json 放分类（和标签）
writeFileSync(`${OUT}/info.json`, `${JSON.stringify({ prefix: defaultSet.prefix, ...info, total: defaultSet.info.total }, null, 2)}\n`)
const metadata = { categories: defaultSet.categories }
if (metaOf) {
  // Iconify 的元数据没有按图标的标签字段，这里沿用 categories 的写法：图标名 → 关键词
  metadata.tags = Object.fromEntries(metaEntries.filter(([, e]) => e.tags.length).map(([n, e]) => [n, e.tags]))
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

// 第三方角色与商标的说明放在 NOTICE 里，不混进 LICENSE：混进去 GitHub 就认不出这是 MIT
for (const pkg of ['packages/core', OUT]) {
  for (const file of ['LICENSE', 'NOTICE'])
    copyFileSync(file, `${pkg}/${file}`)
}

const aliasTotal = collections.reduce((n, c) => n + c.aliases, 0)
console.log(`packages built: ${names.length} icons (core v${version}); iconify: ${collections.map(c => `${c.prefix} ${c.total}+${c.aliases}`).join(', ')} (${aliasTotal} aliases)${metaOf ? '; tags from src/meta/meta.js' : ''}`)
