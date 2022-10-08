import fs from 'node:fs'
import { resolve } from 'node:path'

import uploadConfig from '@/main/config/upload'

export class LocalStorageUpload {
  public async saveFile (file: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(uploadConfig.uploadsFolder, file)
    )
    return file
  }

  public async deleteFile (filename: string): Promise<void> {
    const file = resolve(uploadConfig.uploadsFolder, filename)
    try {
      await fs.promises.stat(file)
    } catch {
      return
    }
    await fs.promises.unlink(file)
  }
}
