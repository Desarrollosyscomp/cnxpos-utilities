export const AuthRoutes = [
    {
        path: '/auth',
        // @ts-ignore
        component: () => import('../components/mobile/LoginLayout.vue'),

        children: [
            {
                path:'login',
                name:'login',
                // @ts-ignore
                component: () => import('../components/mobile/Login.vue')
            },
            {
                path:'forgot-password',
                name:'forgot-password',
                // @ts-ignore
                component: () => import('../components/mobile/Login.vue')
            }
        ]
    }
]