import { ZettelExtensions } from '@zettelooo/extension-api'
import { Data } from 'shared'

ZettelExtensions.setCardData<Data>({
  description:
    'This data is a raw text representation of the card. If exists, it contains a string `text` property that contains the raw text value for the card.',

  construct(previousData, extractions) {
    let text = previousData?.text
    extractions.forEach(extraction => {
      text = text ?? extraction?.text
    })
    if (typeof text === 'string') return { text }
    return undefined
  },

  extractors: {},

  commonExtractor: {
    to(data) {
      if (data?.text === undefined) return undefined
      return { text: data.text }
    },
    from(data) {
      if (data?.text === undefined) return undefined
      return { text: data.text }
    },
  },
})
