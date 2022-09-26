import { RequestError } from '@/errors'
import { LoginService } from '@/services/auth'

import { Request, Response } from 'express'

export class LoginController {
  constructor (private readonly loginService: LoginService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const { access_token, user } = await this.loginService.execute(req.body)
      res.status(200).json({ access_token, user })
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
