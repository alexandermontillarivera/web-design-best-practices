import { $ } from "@/utils/dom"

function runPanel(panel: HTMLElement, loadMs: number) {
  const skeleton = $(panel, "[data-skeleton]")
  const content = $(panel, "[data-content]")
  const timer = $(panel, "[data-timer]")
  const progress = $(panel, "[data-progress]")
  if (!skeleton || !content || !timer) return

  skeleton.classList.remove("demo-hidden")
  content.classList.add("demo-hidden")
  content.classList.remove("fade-in")
  if (progress) progress.style.width = "0%"

  const start = performance.now()
  let raf = 0
  const frame = () => {
    const elapsed = performance.now() - start
    const seconds = Math.min(elapsed, loadMs) / 1000
    timer.textContent = `${seconds.toFixed(1)}s`
    if (progress) progress.style.width = `${Math.min(100, (elapsed / loadMs) * 100)}%`

    if (elapsed < loadMs) {
      raf = requestAnimationFrame(frame)
      return
    }

    cancelAnimationFrame(raf)
    timer.textContent = `${(loadMs / 1000).toFixed(1)}s`
    if (progress) progress.style.width = "100%"
    skeleton.classList.add("demo-hidden")
    content.classList.remove("demo-hidden")
    content.classList.add("fade-in")
  }

  raf = requestAnimationFrame(frame)
}

export function initTiming(section: HTMLElement) {
  const run = () => {
    const bien = $(section, '[data-timing="bien"]')
    const mal = $(section, '[data-timing="mal"]')
    if (bien) runPanel(bien, 700)
    if (mal) runPanel(mal, 4600)
  }

  $(section, '[data-action="reload"]')?.addEventListener("click", run)
  run()
}
