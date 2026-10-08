// 统一版本号：把 packages/* 两个包的 package.json 的 version 一起改掉（发布时 publish.yml 会校验它们和 tag 一致）
// 用法：node scripts/version.mjs 0.6.0
//       node scripts/version.mjs            只打印当前版本
// 只替换 "version" 那一行，不重新格式化文件
import { readFileSync, writeFileSync } from 'node:fs'

const PACKAGES = ['packages/core/package.json', 'packages/iconify-json/package.json', 'packages/vue/package.json', 'packages/react/package.json', 'packages/svg/package.json']
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9a-z.-]+)?$/i

const next = process.argv[2]?.replace(/^v/, '')
if (!next) {
  for (const file of PACKAGES)
    console.log(`${file}: ${JSON.parse(readFileSync(file, 'utf8')).version}`)
  process.exit(0)
}
if (!SEMVER.test(next)) {
  console.error(`not a semver version: ${next}`)
  process.exit(1)
}
for (const file of PACKAGES) {
  const text = readFileSync(file, 'utf8')
  const { version } = JSON.parse(text)
  const out = text.replace(/("version"\s*:\s*")[^"]*(")/, `$1${next}$2`)
  if (JSON.parse(out).version !== next) {
    console.error(`${file}: could not update the version field`)
    process.exit(1)
  }
  writeFileSync(file, out)
  console.log(`${file}: ${version} → ${next}`)
}
console.log(`\nNext: pnpm brand, node scripts/release-notes.mjs --title v${next} --changelog, commit, then git tag v${next} && git push origin main v${next}`)
