export const HomeRouter = [
    {
        path: '/web-report-v2',
        // @ts-ignore
        component: () => import('../../../layouts/MobileHomeLayout.vue'),

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