// 构建可发布的包（都从 src/ 生成）：
// - packages/core：@jannchie/icons，引擎 + 图标定义，ESM、按模块保留结构，可以 tree-shaking
// - packages/iconify-json：@jannchie/iconify-json，Iconify 格式，每种「圆角 × 字重」一个集合（5 × 3 = 15 个）
// 用法：pnpm build:packages
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { build, createServer } from 'vite'
// 这两个模块没有依赖，直接导入；类型声明里的字重、圆角、角色联合类型从它们生成，不手抄
import { CORNERS, WEIGHTS } from '../src/options.js'
import { ROLES } from '../src/tone.js'

const names = readdirSync('src/icons').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)).sort()
// 导出名：Icon + PascalCase（加前缀避开 import、2k 这类不能直接当标识符的名字）
const exportName = name => `Icon${name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('')}`
const { version } = JSON.parse(readFileSync('packages/core/package.json', 'utf8'))

// ---------- 核心包 ----------
const GEN = 'packages/core/.gen'
rmSync(GEN, { recursive: true, force: true })
mkdirSync(`${GEN}/icons`, { recursive: true })
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
  '',
].join('\n'))
// 按名字查图标（会引入全部图标，不能 tree-shaking）
writeFileSync(`${GEN}/all.js`, [
  ...names.map(n => `import ${exportName(n)} from './icons/${n}.js'`),
  '',
  `export const icons = {\n${names.map(n => `  '${n}': ${exportName(n)},`).join('\n')}\n}`,
  '',
].join('\n'))

await build({
  configFile: false,
  logLevel: 'warn',
  publicDir: false,
  build: {
    outDir: 'packages/core/dist',
    emptyOutDir: true,
    minify: false,
    lib: { entry: { index: `${GEN}/index.js`, all: `${GEN}/all.js` }, formats: ['es'] },
    rollupOptions: { output: { preserveModules: true, preserveModulesRoot: GEN, entryFileNames: '[name].js' } },
  },
})
rmSync(GEN, { recursive: true, force: true })

// 类型声明：手写的公共接口 + 生成的图标名联合类型和每个图标的导出（Icon<'folder-plus'> 这样带着字面量名字）
const DTS = `// 由 scripts/build-packages.mjs 生成，不要手改
export type Radius = ${CORNERS.map(c => (c.sharp ? `'sharp'` : c.radius)).join(' | ')}
export type Weight = ${WEIGHTS.map(w => `'${w.id}'`).join(' | ')}
/** 双色变体里叠加记号的语义角色 */
export type Role = ${Object.keys(ROLES).map(r => `'${r}'`).join(' | ')}
export type Theme = 'light' | 'dark'

/** 图标的造型函数收到的参数（radius 是 0–3 的圆角半径，尖角时为 0） */
export interface DrawOptions {
  radius: number
  stroke: number
  weight: Weight
}
/** 造型函数返回的路径：SVG path 数据，或带样式标记的对象 */
export type PathSpec = string | { d: string, [key: string]: unknown }

export interface Icon<N extends string = IconName> {
  readonly name: N
  draw: (options: DrawOptions) => PathSpec[]
  /** 只有动画图标才有：周期（毫秒）、每周期采样帧数、按进度 t（0–1）画一帧 */
  animation?: {
    duration: number
    frames: number
    draw: (options: DrawOptions & { t: number }) => PathSpec[]
  }
}

export interface ColorOptions {
  /** 角标、划掉的斜杠等叠加记号按语义着色 */
  duo?: boolean
  /** duo 的推荐色用亮色还是暗色主题 */
  theme?: Theme
  /** 覆盖个别角色或主体颜色；不给 primary 就是 currentColor */
  colors?: Partial<Record<'primary' | Role, string>>
}
export interface SvgOptions extends ColorOptions {
  radius?: Radius
  weight?: Weight
  /** SVG 的宽高（px），默认 24 */
  size?: number
}
export interface PathsOptions extends ColorOptions {
  radius?: Radius
  weight?: Weight
  /** 显示的设备像素数：给出时把线条对齐到像素网格；0（默认）不对齐 */
  px?: number
}
export interface SvgAttrs {
  'fill': 'none'
  'stroke': string
  'stroke-width': number
  'stroke-linecap': 'square' | 'round'
  'stroke-linejoin': 'miter' | 'round'
  'stroke-miterlimit'?: number
}
export interface PathAttrs {
  'd': string
  'stroke-width'?: number
  'stroke'?: string
  'fill'?: string
  /** 个别小零件（如军衔的星）在尖角模式下也用圆角 */
  'stroke-linecap'?: 'round'
  'stroke-linejoin'?: 'round'
  /** 动画图标的 <animate> 属性 */
  'animate'?: { attributeName: 'd', dur: string, repeatCount: 'indefinite', values: string }
}

export declare function toSvg(icon: Icon<string>, options?: SvgOptions): string
export declare function toPaths(icon: Icon<string>, options?: PathsOptions): { svg: SvgAttrs, paths: PathAttrs[] }
export declare function resolveColors(options?: ColorOptions): ({ primary?: string } & Record<Role, string>) | undefined
export declare const CORNERS: ReadonlyArray<{ label: string, radius: number, sharp?: boolean }>
export declare const WEIGHTS: ReadonlyArray<{ id: Weight, stroke: number }>
export declare const ROLES: Readonly<Record<Role, { light: string, dark: string }>>

export type IconName =
${names.map(n => `  | '${n}'`).join('\n')}

${names.map(n => `export declare const ${exportName(n)}: Icon<'${n}'>`).join('\n')}
`
writeFileSync('packages/core/dist/index.d.ts', DTS)
writeFileSync('packages/core/dist/all.d.ts', `// 由 scripts/build-packages.mjs 生成，不要手改
import type { Icon, IconName } from './index.js'

/** 按名字查图标（会引入全部图标） */
export declare const icons: { readonly [N in IconName]: Icon<N> }
`)

// ---------- Iconify JSON ----------
const server = await createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom', logLevel: 'error' })
const { icons } = await server.ssrLoadModule('/src/iconset.js')
const { pathsOf } = await server.ssrLoadModule('/src/render.js')
const { iconifyBody } = await server.ssrLoadModule('/src/export.js')

const OUT = 'packages/iconify-json'
const info = {
  name: 'Jannchie Icons',
  total: icons.length,
  version,
  author: { name: 'Jianqi Pan', url: 'https://github.com/Jannchie/jannchie-icons' },
  license: { title: 'MIT', spdx: 'MIT', url: 'https://github.com/Jannchie/jannchie-icons/blob/main/LICENSE' },
  samples: ['folder-plus', 'send', 'loading-atom'],
  height: 24,
  category: 'General',
  palette: false,
}
// 前缀：jannchie[-圆角][-字重]，默认的圆角 2、字重 regular 省略——jannchie、jannchie-bold、jannchie-sharp、jannchie-r1-light……
// 文件名是去掉 jannchie- 的前缀，默认集合叫 icons.json
const cap = s => s[0].toUpperCase() + s.slice(1)
const collections = []
for (const corner of CORNERS) {
  const radiusPart = corner.sharp ? 'sharp' : corner.radius === 2 ? '' : `r${corner.radius}`
  for (const weight of WEIGHTS) {
    const parts = [radiusPart, weight.id === 'regular' ? '' : weight.id].filter(Boolean)
    const prefix = ['jannchie', ...parts].join('-')
    const set = {
      prefix,
      info: { ...info, name: `${info.name} (${corner.sharp ? 'Sharp' : `Radius ${corner.radius}`} ${cap(weight.id)})` },
      width: 24,
      height: 24,
      icons: Object.fromEntries(icons.map(icon => [icon.name, { body: iconifyBody(pathsOf(icon, corner, weight), { stroke: weight.stroke, sharp: !!corner.sharp }) }])),
    }
    const file = `${parts.length ? parts.join('-') : 'icons'}.json`
    writeFileSync(`${OUT}/${file}`, `${JSON.stringify(set)}\n`)
    collections.push({ prefix, file, radius: corner.sharp ? 'sharp' : corner.radius, weight: weight.id })
  }
}
// 集合清单：前缀、文件、圆角、字重
writeFileSync(`${OUT}/collections.json`, `${JSON.stringify(collections, null, 2)}\n`)
writeFileSync(`${OUT}/info.json`, `${JSON.stringify(info, null, 2)}\n`)
await server.close()

// 第三方角色与商标的说明放在 NOTICE 里，不混进 LICENSE：混进去 GitHub 就认不出这是 MIT
for (const pkg of ['packages/core', OUT]) {
  for (const file of ['LICENSE', 'NOTICE'])
    copyFileSync(file, `${pkg}/${file}`)
}

console.log(`packages built: ${names.length} icons (core v${version})`)
