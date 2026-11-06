import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：视频到视频（video › video）
export default ({ radius }) => pipeline(['video'], 'video', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['video'], 'video', radius, stroke)
