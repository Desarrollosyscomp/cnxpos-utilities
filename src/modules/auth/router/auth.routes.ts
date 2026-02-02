export const AuthRoutes = [
    {
        path: '/auth',
        component: () => import.meta.env.VITE_TARGET === 'mobile'
            // @ts-ignore
            ? import('../../pages/MobileAuthPage.vue')
            // @ts-ignore
            : import('../../pages/AuthPage.vue'),

        children: [
            {
                path:'login',
                name:'login',
                meta: {
                    // @ts-ignore
                    headerComponent: () => import('../components/beto-messages/LoginBetoMessage.vue')
                },
                // @ts-ignore
                component: () => import('../components/desktop/Login.vue')
            },
            {
                path:'forgot-password',
                name:'forgot-password',
                meta: {
                    // @ts-ignore
                    headerComponent: () => import('../components/beto-messages/LoginBetoMessage.vue')
                },
                // @ts-ignore
                component: () => import('../components/desktop/Login.vue')
            }
        ]

    },
]