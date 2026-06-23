import { $, $$ } from "@/utils/dom"
import { applyClassListState, applySelectionState, setText } from "@/utils/ui-state"

export function initCompat(section: HTMLElement) {
  const tabs = $$(section, "[data-browser]")
  const malRender = $(section, "[data-compat-render]")
  const bienLabel = $(section, "[data-compat-bien-label]")
  const malLabel = $(section, "[data-compat-mal-label]")

  const select = (name: string) => {
    applySelectionState(tabs, (tab) => tab.dataset.browser === name, {
      active: ["bg-foreground", "text-background"],
      inactive: ["text-muted"],
    })

    const broken = name !== "Chrome"
    malRender?.classList.toggle("is-broken", broken)
    setText(bienLabel, `Renderizado en ${name} · correcto`)
    if (malLabel) {
      setText(malLabel, broken ? `Roto en ${name}` : `Renderizado en ${name} · correcto`)
      applyClassListState(malLabel, broken, {
        active: ["text-bad"],
        inactive: ["text-accent"],
      })
    }
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => select(tab.dataset.browser as string)))
  select("Chrome")
}
