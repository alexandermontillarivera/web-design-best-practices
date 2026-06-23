import { $$, closest } from "@/utils/dom"
import { initCompat } from "@/modules/comparisons/scripts/init-compat"
import { initNav } from "@/modules/comparisons/scripts/init-nav"
import { initOrder } from "@/modules/comparisons/scripts/init-order"
import { initTheme } from "@/modules/comparisons/scripts/init-theme"
import { initTiming } from "@/modules/comparisons/scripts/init-timing"
import { initViewport } from "@/modules/comparisons/scripts/init-viewport"

const initializers: Record<string, (section: HTMLElement) => void> = {
  compat: initCompat,
  nav: initNav,
  order: initOrder,
  theme: initTheme,
  timing: initTiming,
  viewport: initViewport,
}

$$<HTMLElement>(document, "[data-demo]").forEach((element) => {
  const section = closest<HTMLElement>(element, "section")
  const demo = element.dataset.demo
  if (!section || !demo) return

  const init = initializers[demo]
  if (init) init(section)
})
