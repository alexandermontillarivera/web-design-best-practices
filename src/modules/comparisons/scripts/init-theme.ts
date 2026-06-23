import { $, $$ } from "@/utils/dom"
import { setText } from "@/utils/ui-state"

export function initTheme(section: HTMLElement) {
  const button = $(section, '[data-action="theme"]')
  let light = false

  button?.addEventListener("click", () => {
    light = !light
    $$(section, "[data-theme-scope]").forEach((element) =>
      element.setAttribute("data-theme", light ? "light" : "dark"),
    )
    setText(button, light ? "Cambiar a modo oscuro" : "Cambiar a modo claro")
  })
}
