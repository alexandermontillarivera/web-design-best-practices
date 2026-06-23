export const $ = <T extends Element = HTMLElement>(root: ParentNode, selector: string) =>
  root.querySelector<T>(selector)

export const $$ = <T extends Element = HTMLElement>(root: ParentNode, selector: string) =>
  Array.from(root.querySelectorAll<T>(selector))

export const closest = <T extends Element = HTMLElement>(element: Element, selector: string) =>
  element.closest(selector) as T | null
