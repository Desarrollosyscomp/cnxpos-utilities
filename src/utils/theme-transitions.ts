import { ref } from "vue"

export let visible = ref(false)

export const toggleTheme = () => {
    const html = document.documentElement
    html.classList.add('theme-transition')
    const theme = html.getAttribute('data-theme')
    html.setAttribute('data-theme',theme === 'dark' ? 'light' : 'dark')
    setTimeout(()=>{html.classList.remove('theme-transition')},500)
    visible.value = !visible.value
}