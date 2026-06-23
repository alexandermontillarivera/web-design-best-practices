import { $$ } from "@/utils/dom"
import { applySelectionState } from "@/utils/ui-state"

const widths: Record<string, number> = {
  mobile: 320,
  tablet: 560,
  desktop: 820,
}

export function initViewport(section: HTMLElement) {
  const tabs = $$(section, "[data-device]")
  const frames = $$(section, "[data-frame]")

  const select = (device: string) => {
    const width = widths[device] ?? widths.mobile
    frames.forEach((frame) => {
      frame.style.width = `${width}px`
    })
    applySelectionState(tabs, (tab) => tab.dataset.device === device, {
      active: ["bg-foreground", "text-background"],
      inactive: ["text-muted"],
    })
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => select(tab.dataset.device as string)))
  select("mobile")
}
