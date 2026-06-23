import { $, $$ } from "@/utils/dom"

function setup(root: HTMLElement) {
  const clip = $(root, "[data-clip]")
  const divider = $(root, "[data-divider]")
  const handle = $(root, "[data-handle]")
  if (!clip || !divider || !handle) return

  let dragging = false

  const setPosition = (percent: number) => {
    const p = Math.min(100, Math.max(0, percent))
    clip.style.clipPath = `inset(0 ${100 - p}% 0 0)`
    divider.style.left = `${p}%`
    handle.setAttribute("aria-valuenow", String(Math.round(p)))
  }

  const pointerToPercent = (clientX: number) => {
    const rect = root.getBoundingClientRect()
    return ((clientX - rect.left) / rect.width) * 100
  }

  const startDrag = (e: PointerEvent) => {
    dragging = true
    divider.setPointerCapture?.(e.pointerId)
    e.preventDefault()
  }

  divider.addEventListener("pointerdown", startDrag)
  divider.addEventListener("pointermove", (e) => {
    if (dragging) setPosition(pointerToPercent(e.clientX))
  })
  window.addEventListener("pointermove", (e) => {
    if (dragging) setPosition(pointerToPercent(e.clientX))
  })
  window.addEventListener("pointerup", () => (dragging = false))

  handle.setAttribute("role", "slider")
  handle.setAttribute("aria-valuemin", "0")
  handle.setAttribute("aria-valuemax", "100")
  handle.setAttribute("aria-valuenow", "50")
  handle.addEventListener("keydown", (e) => {
    const current = parseFloat(divider.style.left) || 50
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setPosition(current - 4)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setPosition(current + 4)
    } else if (e.key === "Home") {
      e.preventDefault()
      setPosition(0)
    } else if (e.key === "End") {
      e.preventDefault()
      setPosition(100)
    }
  })
}

$$(document, "[data-comparison]").forEach(setup)
