// 构建框架组件包和静态 SVG 包，都依赖核心包的产物（packages/core/dist），要在 build:packages 之后运行：
// - packages/vue：@jannchie/icons-vue，<JIcon> 组件 + 全局默认配置（插件 / provideIconDefaults），入口 . 和 ./static
// - packages/react：@jannchie/icons-react，<JIcon> 组件 + IconProvider，入口 . 和 ./static
// - packages/svg：@jannchie/icons-svg，默认样式、bold、sharp 三套 svg/<name>.svg 和 sprite（<symbol id="<name>">）
// 版本号由 scripts/version.mjs 统一写入；这里只校验所有包的版本、组件包对 @jannchie/icons 的 peerDependencies 都一致
// 用法：pnpm build:components
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { buildLib, copyLegal, PACKAGES, readPackage } from './packages.mjs'

const CORE = 'packages/core'
if (!existsSync(`${CORE}/dist/index.js`) || !existsSync(`${CORE}/dist/all.js`)) {
  console.error('packages/core/dist is missing: run pnpm build:packages first')
  process.exit(1)
}

// ---------- 版本号 ----------
const { version } = readPackage(CORE)
const mismatched = PACKAGES.flatMap((dir) => {
  const pkg = readPackage(dir)
  const peer = pkg.peerDependencies?.['@jannchie/icons']
  return [
    pkg.version !== version && `${dir} is ${pkg.version}`,
    peer !== undefined && peer !== `^${version}` && `${dir} peer @jannchie/icons is ${peer}`,
  ].filter(Boolean)
})
if (mismatched.length)
  throw new Error(`package versions differ from ${CORE} (${version}): ${mismatched.join('; ')}. Run node scripts/version.mjs ${version}`)
copyLegal('packages/vue', 'packages/react', 'packages/svg')

// ---------- 组件包 ----------
// 框架和核心包都是 external
// React 主入口用了 hook，加 'use client'（Next.js 的 App Router 需要）；./static 不加，可以在服务端组件里用
async function buildComponents(pkg, external, { useClient = false } = {}) {
  const dir = `packages/${pkg}`
  const entry = { index: `${dir}/src/index.js`, static: `${dir}/src/static.js` }
  await buildLib({ entry, outDir: `${dir}/dist`, root: `${dir}/src`, external })
  if (useClient) {
    for (const ext of ['js', 'cjs']) {
      const file = `${dir}/dist/index.${ext}`
      writeFileSync(file, `'use client';\n${readFileSync(file, 'utf8')}`)
    }
  }
  // 类型声明是手写的（src/*.d.ts）：ESM 原样复制，CJS 版把相互引用的扩展名换成 .cjs
  for (const name of Object.keys(entry)) {
    const dts = readFileSync(`${dir}/src/${name}.d.ts`, 'utf8')
    writeFileSync(`${dir}/dist/${name}.d.ts`, dts)
    writeFileSync(`${dir}/dist/${name}.d.cts`, dts.replace(/from '\.\/(\w+)\.js'/g, `from './$1.cjs'`))
  }
}
await Promise.all([
  buildComponents('vue', ['vue', '@jannchie/icons']),
  buildComponents('react', ['react', 'react-dom', '@jannchie/icons'], { useClient: true }),
])

// ---------- 静态 SVG ----------
// 直接用核心包产物的 toSvg 生成，和 npm 上的 @jannchie/icons 输出一致
const { toSvg } = await import(pathToFileURL(resolve(`${CORE}/dist/index.js`)).href)
const { icons } = await import(pathToFileURL(resolve(`${CORE}/dist/all.js`)).href)
const names = Object.keys(icons).sort()
const SVG = 'packages/svg'
// 三套：默认（圆角 2、regular）、粗线、尖角。其余组合用核心包的 toSvg 或 @jannchie/iconify-json
const VARIANTS = [
  { dir: 'svg', sprite: 'sprite.svg', options: {} },
  { dir: 'svg-bold', sprite: 'sprite-bold.svg', options: { weight: 'bold' } },
  { dir: 'svg-sharp', sprite: 'sprite-sharp.svg', options: { radius: 'sharp' } },
]
// sprite 里的 <symbol>：由文件版改写——压成一行，根元素去掉 xmlns、宽高、aria-hidden（由引用它的 <svg> 决定），
// 描边属性留在 symbol 上，<use> 展开时继承
const SYMBOL_DROP = / (?:xmlns|width|height|aria-hidden)="[^"]*"/g
const toSymbol = (name, file) => file.split('\n').map(l => l.trim()).join('')
  .replace(/^<svg[^>]*>/, root => root.replace(SYMBOL_DROP, '').replace(/^<svg /, `<symbol id="${name}" `))
  .replace(/<\/svg>$/, '</symbol>')
const sizes = []
for (const { dir, sprite, options } of VARIANTS) {
  rmSync(`${SVG}/${dir}`, { recursive: true, force: true })
  mkdirSync(`${SVG}/${dir}`, { recursive: true })
  const symbols = []
  let bytes = 0
  for (const name of names) {
    const file = toSvg(icons[name], options)
    writeFileSync(`${SVG}/${dir}/${name}.svg`, file)
    bytes += Buffer.byteLength(file)
    symbols.push(toSymbol(name, file))
  }
  const out = `<svg xmlns="http://www.w3.org/2000/svg">\n${symbols.join('\n')}\n</svg>\n`
  writeFileSync(`${SVG}/${sprite}`, out)
  sizes.push(`${dir}: ${names.length} files, ${(bytes / 1024).toFixed(0)} KB; ${sprite}: ${(Buffer.byteLength(out) / 1024).toFixed(0)} KB`)
}
writeFileSync(`${SVG}/names.json`, `${JSON.stringify(names)}\n`)

// 产物清单
for (const pkg of ['vue', 'react'])
  console.log(`packages/${pkg}/dist: ${readdirSync(`packages/${pkg}/dist`).sort().join(', ')}`)
for (const s of sizes)
  console.log(`packages/svg/${s}`)
console.log(`built @jannchie/icons-vue, @jannchie/icons-react, @jannchie/icons-svg ${version}`)
