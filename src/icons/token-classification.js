import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：词元分类（tokens › tag）
export default ({ radius }) => pipeline(['tokens'], 'tag', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['tokens'], 'tag', radius, stroke)
