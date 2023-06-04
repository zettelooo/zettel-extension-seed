export type PageExtensionData =
  | undefined
  | {
      readonly enabled?: boolean
      readonly command?: boolean
      readonly tipIsClosed?: boolean
    }
