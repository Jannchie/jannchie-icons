import { pipeline } from '../modality'

// Hugging Face 任务：文本分类（text › tag）
export default ({ radius }) => pipeline(['text'], 'tag', radius)
