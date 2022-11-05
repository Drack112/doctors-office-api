import { resolve, join } from 'node:path'

import { HandlebarsMailTemplateProvider } from '@/infra/mail/template-provider'

import puppeteer from 'puppeteer'

export class PDFProvider {
  constructor (private readonly templateProvider: HandlebarsMailTemplateProvider) {}

  public async generate (): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    const file = resolve(__dirname, 'views/index.hbs')
    const template = await this.templateProvider.parse({ file, variables: { abc: 'abc 81Y38Y381' } })
    await page.setContent(template, { waitUntil: 'domcontentloaded' })
    const pdf = await page.pdf({
      printBackground: true,
      format: 'A4',
      path: join(__dirname, '../../../pdfs/patient.pdf')
    })
    await browser.close()
    return pdf
  }
}
