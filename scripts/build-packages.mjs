// 构建可发布的包（都从 src/ 生成）：
// - packages/core：@jannchie/icons，引擎 + 图标定义，ESM、按模块保留结构，可以 tree-shaking
// - packages/iconify-json：@jannchie/iconify-json，Iconify 格式，圆角 2、四档字重各一个集合
// 用法：pnpm build:packages
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { build, createServer } from 'vite'

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

// ---------- Iconify JSON ----------
const server = await createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom', logLevel: 'error' })
const { icons } = await server.ssrLoadModule('/src/iconset.js')
const { pathsOf } = await server.ssrLoadModule('/src/render.js')
const { iconifyBody } = await server.ssrLoadModule('/src/export.js')
const { CORNERS, WEIGHTS } = await server.ssrLoadModule('/src/options.js')
const corner = CORNERS.find(c => !c.sharp && c.radius === 2)

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
const files = { light: 'light.json', regular: 'icons.json', bold: 'bold.json', heavy: 'heavy.json' }
for (const weight of WEIGHTS) {
  const prefix = weight.id === 'regular' ? 'jannchie' : `jannchie-${weight.id}`
  const set = {
    prefix,
    info: { ...info, name: weight.id === 'regular' ? info.name : `${info.name} ${weight.id[0].toUpperCase()}${weight.id.slice(1)}` },
    width: 24,
    height: 24,
    icons: Object.fromEntries(icons.map(icon => [icon.name, { body: iconifyBody(pathsOf(icon, corner, weight), { stroke: weight.stroke, sharp: false }) }])),
  }
  writeFileSync(`${OUT}/${files[weight.id]}`, `${JSON.stringify(set)}\n`)
}
writeFileSync(`${OUT}/info.json`, `${JSON.stringify(info, null, 2)}\n`)
await server.close()

for (const pkg of ['packages/core', OUT])
  copyFileSync('LICENSE', `${pkg}/LICENSE`)

console.log(`packages built: ${names.length} icons (core v${version})`)
