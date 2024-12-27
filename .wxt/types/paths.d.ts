// Generated by wxt
import "wxt/browser";

declare module "wxt/browser" {
  export type PublicPath =
    | "/_locales/fr/messages.json"
    | "/background.js"
    | "/content-scripts/content.js"
    | "/icon/128.png"
    | "/icon/16.png"
    | "/icon/32.png"
    | "/icon/48.png"
    | "/icon/96.png"
    | "/popup.html"
    | "/sidebar.js"
    | "/types.js"
    | "/wxt.svg"
    | "/zsm.jpg"
  type HtmlPublicPath = Extract<PublicPath, `${string}.html`>
  export interface WxtRuntime extends Runtime.Static {
    getURL(path: PublicPath): string;
    getURL(path: `${HtmlPublicPath}${string}`): string;
  }
}
