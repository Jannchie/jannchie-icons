import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：视频分类（video › tag）
export default ({ radius }) => pipeline(['video'], 'tag', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['video'], 'tag', radius, stroke)
