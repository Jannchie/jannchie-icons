import { pipeline } from '../modality'

// Hugging Face 任务：文本排序（text › rank）
export default ({ radius }) => pipeline(['text'], 'rank', radius)
