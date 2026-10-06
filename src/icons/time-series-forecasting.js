import { pipeline } from '../modality'

// Hugging Face 任务：时间序列预测（table › forecast）
export default ({ radius }) => pipeline(['table'], 'forecast', radius)
