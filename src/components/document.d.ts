export interface FileInfo {
  name: string
  size: number
  type: string
}

export interface DocumentState {
  step: number
  fileInfo: Array<FileInfo>
}
