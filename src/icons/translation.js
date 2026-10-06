import { pipeline } from '../modality'

// Hugging Face 任务：翻译（text › lang）
export default ({ radius }) => pipeline(['text'], 'lang', radius)
