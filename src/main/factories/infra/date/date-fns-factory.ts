import { DateFNSProvider } from '@/infra/date'

export const DateFNSProviderFactory = (): DateFNSProvider => {
  return new DateFNSProvider()
}
