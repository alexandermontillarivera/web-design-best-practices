import { $, $$ } from "@/utils/dom"
import { applySelectionState, setText } from "@/utils/ui-state"

export function initNav(section: HTMLElement) {
  const pages: Record<string, { crumb: string[]; title: string; body: string }> = {
    inicio: { crumb: ["Inicio"], title: "Bienvenido", body: "Página principal de la tienda." },
    productos: {
      crumb: ["Inicio", "Productos"],
      title: "Productos",
      body: "Catálogo completo de artículos disponibles.",
    },
    ofertas: {
      crumb: ["Inicio", "Ofertas"],
      title: "Ofertas",
      body: "Descuentos destacados de esta semana.",
    },
    contacto: {
      crumb: ["Inicio", "Contacto"],
      title: "Contacto",
      body: "Formas de comunicarte con nosotros.",
    },
  }
  const malBodies = [
    "ERROR 404 — recurso no encontrado",
    "Volviste al inicio sin querer…",
    "Página en construcción 🚧",
    "¿Esto era lo que buscabas?",
  ]

  const tabs = $$(section, "[data-nav-tab]")
  const crumb = $(section, "[data-nav-crumb]")
  const title = $(section, "[data-nav-title]")
  const body = $(section, "[data-nav-body]")
  const malTitle = $(section, "[data-nav-mal-title]")
  const malBody = $(section, "[data-nav-mal-body]")
  const bienTabs = $$(section, "[data-nav-bien-tab]")

  const select = (key: string) => {
    const page = pages[key]
    if (!page) return

    tabs.forEach((tab) => tab.setAttribute("aria-current", tab.dataset.navTab === key ? "true" : "false"))
    applySelectionState(bienTabs, (tab) => tab.dataset.navBienTab === key, {
      active: ["bg-accent", "text-accent-foreground"],
      inactive: ["border-border", "text-muted"],
    })

    if (crumb) {
      crumb.innerHTML = page.crumb
        .map((item, index) =>
          index === page.crumb.length - 1
            ? `<span class="text-accent">${item}</span>`
            : `<span>${item}</span><span class="text-border">/</span>`,
        )
        .join("")
    }

    setText(title, page.title)
    setText(body, page.body)
    setText(malTitle, `Página ${Math.floor(Math.random() * 9000 + 1000)}?`)
    setText(malBody, malBodies[Math.floor(Math.random() * malBodies.length)])
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => select(tab.dataset.navTab as string)))
  select("inicio")
}
