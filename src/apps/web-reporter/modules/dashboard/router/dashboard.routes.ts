export const DashboardRoutes = [
    {
        path: '/home',
        component: () => {
            if (import.meta.env.VITE_TARGET === 'mobile') {
                // @ts-ignore
                return import('../../../../../responsive-switcher/MobileHomeSwitcher.vue')
            } else {
                // @ts-ignore
                return import('../../../../../responsive-switcher/HomeSwitcher.vue')
            }
        },

        children: [
            {
                path:'dashboard',
                name:'dashboard',
                // @ts-ignore
                component: () => import('../pages/DashboardPage.vue')
            },
        ]

    },
]