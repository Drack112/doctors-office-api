import fs from 'node:fs'
import path from 'node:path'

import uploadConfig from '@/main/config/upload'

export class LocalStorageUpload {
  public async saveFile (filename: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, filename),
      path.resolve(uploadConfig.uploadsFolder, filename)
    )
    return filename
  }

  public async deleteFile (filename: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, filename)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
