import { pipeline } from '../modality'

// Hugging Face 任务：视觉文档检索（text › doc）
export default ({ radius }) => pipeline(['text'], 'doc', radius)
