// 统一版本号：唯一写 version 的地方。把 packages/*/package.json 的 version 一起改掉，
// 组件包 peerDependencies 里的 @jannchie/icons 跟着改成 ^<version>（devDependencies 里的 workspace:^ 不动）
// 发布时 publish.yml 校验它们和 tag 一致，build-components.mjs 构建前也会校验
// 用法：node scripts/version.mjs 0.6.0
//       node scripts/version.mjs            只打印当前版本
// 只替换对应的那一行，不重新格式化文件
import { readFileSync, writeFileSync } from 'node:fs'
import { PACKAGES, readPackage } from './packages.mjs'

const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9a-z.-]+)?$/i

const next = process.argv[2]?.replace(/^v/, '')
if (!next) {
  for (const dir of PACKAGES)
    console.log(`${dir}: ${readPackage(dir).version}`)
  process.exit(0)
}
if (!SEMVER.test(next)) {
  console.error(`not a semver version: ${next}`)
  process.exit(1)
}
for (const dir of PACKAGES) {
  const file = `${dir}/package.json`
  const text = readFileSync(file, 'utf8')
  const { version } = JSON.parse(text)
  const out = text
    .replace(/("version"\s*:\s*")[^"]*(")/, `$1${next}$2`)
    .replace(/("@jannchie\/icons"\s*:\s*")\^[^"]*(")/, `$1^${next}$2`)
  const pkg = JSON.parse(out)
  const peer = pkg.peerDependencies?.['@jannchie/icons']
  if (pkg.version !== next || (peer !== undefined && peer !== `^${next}`)) {
    console.error(`${file}: could not update the version fields`)
    process.exit(1)
  }
  writeFileSync(file, out)
  console.log(`${file}: ${version} → ${next}`)
}
console.log(`\nNext: pnpm brand, node scripts/release-notes.mjs --title v${next} --changelog, commit, then git tag v${next} && git push origin main v${next}`)
