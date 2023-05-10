import { ExtensionHelperFunction } from "@zettelyay/extension-api";
import { PageExtensionData } from "../../shared/PageExtensionData";

export const watchPageExtensionData: ExtensionHelperFunction<
  "pagePanelRendered" | "publicPageViewRendered",
  "api",
  [onUpdate?: () => void],
  {
    pageExtensionDataRef: {
      readonly current: PageExtensionData | undefined;
    };
  }
> = function ({ api }, onUpdate?) {
  let pageExtensionData = this.data.page.extensionManagedData[
    api.extensionHeader.id
  ] as PageExtensionData;

  this.register(
    this.watch(
      (data) =>
        data.page.extensionManagedData[
          api.extensionHeader.id
        ] as PageExtensionData,
      (newValue, oldValue) => {
        pageExtensionData = newValue;
        onUpdate?.();
      }
    )
  );

  return {
    pageExtensionDataRef: {
      get current() {
        return pageExtensionData;
      },
    },
  };
};
