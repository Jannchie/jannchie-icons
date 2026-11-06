import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：表格分类（table › tag）
export default ({ radius }) => pipeline(['table'], 'tag', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['table'], 'tag', radius, stroke)
