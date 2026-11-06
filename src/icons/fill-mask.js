import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：完形填空（text › blank）
export default ({ radius }) => pipeline(['text'], 'blank', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['text'], 'blank', radius, stroke)
