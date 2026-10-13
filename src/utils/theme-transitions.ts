// ==================== UTILIDAD: cambio de tema ====================
// Alterna data-theme (claro/oscuro) con transición y lo guarda en app.store.
import { ref } from "vue"
import { useAppStore } from "../store/app.store"

export let visible = ref(false)
const appStore = useAppStore()
// -------------------- Alterna el tema y lo persiste --------------------
export const toggleTheme = () => {
    const html = document.documentElement
    html.classList.add('theme-transition')
    const theme = html.getAttribute('data-theme')
    html.setAttribute('data-theme',theme === 'dark' ? 'light' : 'dark')
    setTimeout(()=>{html.classList.remove('theme-transition')},500)
    appStore.changeTheme(theme === 'dark' ? 'light' : 'dark')
}
