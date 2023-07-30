import { ZettelExtensions } from '@zettelooo/extension-api'
import { Data } from 'shared'

export const registerCardPart: ZettelExtensions.Helper<'card', 'card', [], void, Data> = function ({ cardApi }) {
  const partRegistration = this.register(
    cardApi.registry.part<Data['card']>(() => ({
      initialState: cardApi.data.card.data,
      render: ({ renderContext, un }) => ({
        encapsulated: true,
        html:
          renderContext.state?.text === undefined
            ? ''
            : `
<style>
  #root {
    white-space: break-spaces;
    word-break: break-word;
  }
</style>

<div id="root">${renderContext.state.text}</div>
`,
      }),
    })),
    {
      condition: data => !data.page.data?.disabled,
    }
  )

  this.register(
    cardApi.watch(
      data => data.card.data,
      cardData => partRegistration.reference.current?.setState(cardData)
    )
  )
}
