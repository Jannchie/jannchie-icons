import { cornerStar, notched, notchedSolid } from '../ai'
import { rounded } from '../geometry'
import { hole, solid } from '../solid'

// Hugging Face 任务：文本到视频（文生视频）。一块屏幕 + 播放三角（视频），右上角一颗实心四角星（凭一句话生成）
// *-to-video 一族都有播放三角；库里的 video-sparkle 是摄像机 + 星，这里是屏幕 + 播放键
// 屏幕外缘 3–21 × 6–21，星的尖 12–21 × 3–12，整体墨迹框约 3–21.75 × 2.25–21；屏幕的横竖边都在 3 的整数倍上
// 缺角屏幕和角上的星见 ai.js（星尖到中心 4.5，屏幕在星外面断开；image-text-to-video 也用，那边屏幕是 3–21 的方相框）
// 播放三角：竖边在 8.5（细字重下落在 .5 上），尖在 14.25，高 7，放在屏幕的左下，避开星的下尖
const play = radius => rounded([[8.5, 10.25], [14.25, 13.75], [8.5, 17.25]], Math.min(radius, 1))

export default ({ radius, stroke }) => [notched(stroke, radius, 6), play(radius), cornerStar]

// 实心：屏幕一块（右上让给星），三角挖空，星填实
export const fill = ({ radius, stroke }) => [notchedSolid(stroke, radius, 6), hole(play(radius)), solid(cornerStar)]
