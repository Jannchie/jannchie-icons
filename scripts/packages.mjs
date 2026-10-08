// 构建 / 发版脚本共用：包清单、许可证文件、库构建
import { copyFileSync, existsSync, readdirSync, readFileSync } from 'node:fs'
import { build } from 'vite'

// 所有可发布的包：packages/*/package.json，按目录名排序
export const PACKAGES = readdirSync('packages', { withFileTypes: true })
  .filter(d => d.isDirectory() && existsSync(`packages/${d.name}/package.json`))
  .map(d => `packages/${d.name}`)
  .sort()

export const readPackage = dir => JSON.parse(readFileSync(`${dir}/package.json`, 'utf8'))

// 第三方角色与商标的说明放在 NOTICE 里，不混进 LICENSE：混进去 GitHub 就认不出这是 MIT
export function copyLegal(...dirs) {
  for (const dir of dirs) {
    for (const file of ['LICENSE', 'NOTICE'])
      copyFileSync(file, `${dir}/${file}`)
  }
}

// 打一个库：ESM（.js）和 CJS（.cjs）在一次构建里出两份，按模块保留结构（可以 tree-shaking）
// CJS 统一用具名导出（exports.default），和 .d.cts 里的 export default 对得上；external：不打包进来的依赖（包名，含子路径）
export async function buildLib({ entry, outDir, root, external = [] }) {
  const output = format => ({
    format,
    preserveModules: true,
    preserveModulesRoot: root,
    entryFileNames: `[name].${format === 'es' ? 'js' : 'cjs'}`,
    exports: 'named',
  })
  await build({
    configFile: false,
    logLevel: 'warn',
    publicDir: false,
    build: {
      outDir,
      emptyOutDir: true,
      minify: false,
      lib: { entry },
      rollupOptions: {
        external: id => external.some(e => id === e || id.startsWith(`${e}/`)),
        output: [output('es'), output('cjs')],
      },
    },
  })
}
