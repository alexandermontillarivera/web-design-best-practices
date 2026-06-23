import { $, $$ } from "@/utils/dom"
import { setText } from "@/utils/ui-state"

export function initOrder(section: HTMLElement) {
  const button = $(section, '[data-action="order"]')
  let visible = false

  button?.addEventListener("click", () => {
    visible = !visible
    $$(section, "[data-order-scope]").forEach((element) =>
      element.setAttribute("data-show-order", String(visible)),
    )
    setText(button, visible ? "Ocultar orden de lectura" : "Mostrar orden de lectura")
  })
}
