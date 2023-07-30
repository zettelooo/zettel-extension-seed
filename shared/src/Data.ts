import { ZettelTypes } from '@zettelooo/api-types'

export type Data = ZettelTypes.Data.Builder<{
  page: {
    readonly disabled?: boolean
    readonly tipIsClosed?: boolean
  }

  card: {
    readonly text: string
  }
}>
