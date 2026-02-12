export const ANALYTIC_EVENT = {
  HEADER_GITHUB: "header-github",
  ICON_COPY: "icon-copy",
  ICON_COPY_TERMINAL: "icon-copy-terminal",
  COMMENT_AUTHOR_LINK: "comment-author-link",
  COMMENT_LUCIDE_ANIMATED_LINK: "comment-lucide-animated-link",
  COMMENT_ANIMATIONS_DEV_LINK: "comment-animations-dev-link",
  COMMENT_BUTTON_CLICK: "comment-button-click",
} as const;

export function track(event: string, data?: umami.EventData): void {
  if (typeof window !== "undefined" && window.umami) {
    if (data) {
      window.umami.track(event, data);
    } else {
      window.umami.track(event);
    }
  }
}
