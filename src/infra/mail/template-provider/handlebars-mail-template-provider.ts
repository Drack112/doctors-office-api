import fs from 'node:fs'

import { ParseMailTemplateDTO } from '@/infra/mail/dtos'

import handlebars from 'handlebars'

export class HandlebarsMailTemplateProvider {
  public async parse (params: ParseMailTemplateDTO): Promise<string> {
    const { file, variables } = params
    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' })
    const parseTemplate = handlebars.compile(templateFileContent)
    return parseTemplate(variables)
  }
}
