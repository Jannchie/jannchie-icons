import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：图片到视频（image › video）
export default ({ radius }) => pipeline(['image'], 'video', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['image'], 'video', radius, stroke)
