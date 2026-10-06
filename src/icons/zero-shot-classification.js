import { pipeline } from '../modality'

// Hugging Face 任务：零样本分类（text + any › tag）
export default ({ radius }) => pipeline(['text', 'any'], 'tag', radius)
