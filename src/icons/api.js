import { LABEL, line, snap } from '../letters'

// API：三个线条大写字母，不加外框（字高 9，字宽 3.7，字距 2）；横竖笔画整组对齐像素网格
export default () => snap(line('API', [12, 12], 1.05, 2, 1.5, LABEL))
