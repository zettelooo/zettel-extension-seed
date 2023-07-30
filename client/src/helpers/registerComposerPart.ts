import { ZettelExtensions } from '@zettelooo/extension-api'
import { Data } from 'shared'

export const registerComposerPart: ZettelExtensions.Helper<'composer', 'activated' | 'composer', [], void, Data> =
  function ({ activatedApi, composerApi }) {
    const partRegistration = this.register(
      composerApi.registry.part<{ readonly text: string }>(() => ({
        render: ({ renderContext, un }) => ({
          html: `<div id="${un.root}"></div>`,
          onRendered: ({ sanitizedHtml, containerElement, currentContext }) => {
            const root = containerElement.querySelector(`#${un.root}`) as HTMLDivElement

            const textFieldRegistration = this.register(
              activatedApi.registry.renderedTextField(() => ({
                container: root,
                variant: 'outlined',
                fullWidth: true,
                placeholder: 'Type here...',
                value: currentContext.state.text,
                onValueUpdate: newValue => {
                  partRegistration.reference.current?.setState(current => ({ ...current, text: newValue }))
                },
                label: 'Text',
                multiline: true,
                autoFocus: true,
              }))
            )

            root.addEventListener('keydown', event => {
              if ((event.code === 'Enter' || event.code === 'NumpadEnter') && (event.ctrlKey || event.metaKey)) {
                composerApi.access.submit()
              }
            })

            return {
              onUpdateState: ({ previousState }) => {
                textFieldRegistration.reference.current?.update({ value: currentContext.state.text })
              },
              onCleanUp: () => {
                textFieldRegistration.deactivate()
              },
            }
          },
        }),
        formatState: data => ({ text: data?.text ?? '' }),
        parseState: (state, previousData) => ({ text: state.text }),
      })),
      {
        condition: data => !data.page.data?.disabled,
      }
    )
  }
