export const HomeRoutes = [
    {
        path: '/home',
        component: () => import.meta.env.VITE_TARGET === 'mobile'
            // @ts-ignore
            ? import('../../pages/MobileHomePage.vue')
            // @ts-ignore
            : import('../../pages/HomePage.vue'),

        children: [
            // {
            //     path:'login',
            //     name:'login',
            //     meta: {
            //         // @ts-ignore
            //         headerComponent: () => import('../components/mobile/MobileHomeLayout.vue')
            //     },
            //     // @ts-ignore
            //     component: () => import('../components/forms/Login.vue')
            // },
            // {
            //     path:'forgot-password',
            //     name:'forgot-password',
            //     meta: {
            //         // @ts-ignore
            //         headerComponent: () => import('../../auth/components/mobile/MobileLoginLayout.vue')
            //     },
            //     // @ts-ignore
            //     component: () => import('../components/forms/ForgotPassword-form.vue')
            // },
            // {
            //     path:'check-email',
            //     name:'check-email',
            //     meta: {
            //         // @ts-ignore
            //         headerComponent: () => import('../../auth/components/mobile/MobileLoginLayout.vue'),
            //         logoStyle: true,
            //     },
                
            //     // @ts-ignore
            //     component: () => import('../components/forms/CheckEmail.vue')
            // },
            // {
            //     path:'enter-code',
            //     name:'enter-code',
            //     meta: {
            //         // @ts-ignore
            //         headerComponent: () => import('../../auth/components/mobile/MobileLoginLayout.vue'),
            //         logoStyle: true,
            //     },
                
            //     // @ts-ignore
            //     component: () => import('../components/forms/EnterCode.vue')
            // },
            // {
            //     path:'reset-password',
            //     name:'reset-password',
            //     meta: {
            //         // @ts-ignore
            //         headerComponent: () => import('../../auth/components/mobile/MobileLoginLayout.vue'),
            //         logoStyle: true,
            //     },
                
            //     // @ts-ignore
            //     component: () => import('../components/forms/ResetPassword.vue')
            // },
            // {
            //     path:'process-finished',
            //     name:'process-finished',
            //     meta: {
            //         // @ts-ignore
            //         headerComponent: () => import('../../auth/components/mobile/MobileLoginLayout.vue'),
            //         logoStyle: true,
            //     },
                
            //     // @ts-ignore
            //     component: () => import('../components/forms/ProcessFinished.vue')
            // },
        ]

    },
]