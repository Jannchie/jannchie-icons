import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：表格问答（table + question › text）
export default ({ radius }) => pipeline(['table', 'question'], 'text', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['table', 'question'], 'text', radius, stroke)
