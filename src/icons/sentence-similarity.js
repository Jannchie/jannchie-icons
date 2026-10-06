import { pipeline } from '../modality'

// Hugging Face 任务：句子相似度（text + text › score）
export default ({ radius }) => pipeline(['text', 'text'], 'score', radius)
