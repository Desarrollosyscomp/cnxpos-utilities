export const AuthRoutes = [
    {
        path: '/auth',
        // @ts-ignore
        component: () => import('../components/LoginLayout.vue'),
        children: [
            {
                path:'login',
                name:'login',
                meta: {
                    // @ts-ignore
                    headerComponent: () => import('../components/beto-messages/LoginBetoMessage.vue')
                },
                // @ts-ignore
                component: () => import('../components/Login.vue')
            }
        ]

    }
]