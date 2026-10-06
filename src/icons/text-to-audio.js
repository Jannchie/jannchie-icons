import { pipeline } from '../modality'

// Hugging Face 任务：文本到音频（text › music）
export default ({ radius }) => pipeline(['text'], 'music', radius)
