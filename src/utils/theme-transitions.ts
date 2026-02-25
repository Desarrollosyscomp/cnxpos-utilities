import { ref } from "vue"
import { useAppStore } from "../store/app.store"

export let visible = ref(false)
const appStore = useAppStore()
export const toggleTheme = () => {
    const html = document.documentElement
    html.classList.add('theme-transition')
    const theme = html.getAttribute('data-theme')
    html.setAttribute('data-theme',theme === 'dark' ? 'light' : 'dark')
    setTimeout(()=>{html.classList.remove('theme-transition')},500)
    console.log(theme)
    appStore.changeTheme(theme === 'dark' ? 'light' : 'dark')
}
