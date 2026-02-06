export const HomeRoutes = [
    {
        path: '/home',
        // @ts-ignore
        component: () => import('../../pages/MobileHomePage.vue'),

        // children: [ 
        //     {
        //         path:'login',
        //         name:'login',
        //         meta: {
        //             // @ts-ignore
        //             headerComponent: () => import('../components/beto-messages/LoginBetoMessage.vue')
        //         },
        //         // @ts-ignore
        //         component: () => import('../components/desktop/Login.vue')
        //     },
        //     {
        //         path:'forgot-password',
        //         name:'forgot-password',
        //         meta: {
        //             // @ts-ignore
        //             headerComponent: () => import('../components/beto-messages/LoginBetoMessage.vue')
        //         },
        //         // @ts-ignore
        //         component: () => import('../components/desktop/Login.vue')
        //     }
        // ]

    },
]