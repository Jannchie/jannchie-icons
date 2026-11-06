import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：零样本分类（text + any › tag）
export default ({ radius }) => pipeline(['text', 'any'], 'tag', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['text', 'any'], 'tag', radius, stroke)
