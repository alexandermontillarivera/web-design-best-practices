type ClassListState = {
  active: string[]
  inactive: string[]
}

export function applyClassListState(
  element: Element,
  isActive: boolean,
  { active, inactive }: ClassListState,
) {
  active.forEach((token) => element.classList.toggle(token, isActive))
  inactive.forEach((token) => element.classList.toggle(token, !isActive))
}

export function applySelectionState<T extends Element>(
  elements: T[],
  isActive: (element: T) => boolean,
  classes: ClassListState,
) {
  elements.forEach((element) => applyClassListState(element, isActive(element), classes))
}

export function setAttributeForAll(elements: Element[], name: string, value: string) {
  elements.forEach((element) => element.setAttribute(name, value))
}

export function setText(node: Node | null | undefined, value: string) {
  if (node) node.textContent = value
}
