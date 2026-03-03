export const HomeRouter = [
    {
        path: '/home',
        component: () => {
            if (import.meta.env.VITE_TARGET === 'mobile') {
                // @ts-ignore
                return import('../../../responsive-switcher/MobileHomeSwitcher.vue')
            } else {
                // @ts-ignore
                return import('../../../responsive-switcher/HomeSwitcher.vue')
            }
        },

        children: [
            {
                path:'welcome',
                name:'welcome',
                // @ts-ignore
                component: () => import('../pages/HomePage.vue'),
                meta: {
                    requiresAuth: true
                }
            },
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