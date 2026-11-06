import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：视觉问答（image + question › text）
export default ({ radius }) => pipeline(['image', 'question'], 'text', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['image', 'question'], 'text', radius, stroke)
