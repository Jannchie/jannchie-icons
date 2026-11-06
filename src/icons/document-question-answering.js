import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：文档问答（doc + question › text）
export default ({ radius }) => pipeline(['doc', 'question'], 'text', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['doc', 'question'], 'text', radius, stroke)
