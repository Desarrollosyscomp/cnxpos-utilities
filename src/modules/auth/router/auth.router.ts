export const AuthRouter = [
    {
        path: '/auth',
        component: ()=>{
            if (import.meta.env.VITE_TARGET === 'mobile') {
                // @ts-ignore
              return import('../../pages/MobileAuthPage.vue')
            } else {
                // @ts-ignore
              return import('../../pages/AuthPage.vue')
            }
        },

        children: [
            {
                path:'login',
                name:'login',
                meta: {
                    // @ts-ignore
                    headerComponent: () => import('../components/beto-messages/LoginBetoMessage.vue')
                },
                // @ts-ignore
                component: () => import('../components/forms/Login.vue')
            },
            {
                path:'forgot-password',
                name:'forgot-password',
                meta: {
                    // @ts-ignore
                    headerComponent: () => import('../components/beto-messages/ForgotPasswordBetoMessage.vue')
                },
                // @ts-ignore
                component: () => import('../components/forms/ForgotPasswordForm.vue')
            },
            {
                path:'check-email',
                name:'check-email',
                meta: {
                    // @ts-ignore
                    headerComponent: () => import('../components/beto-messages/CheckEmailBetoMessage.vue'),
                    logoStyle: true,
                },
                
                // @ts-ignore
                component: () => import('../components/forms/CheckEmail.vue')
            },
            {
                path:'enter-code',
                name:'enter-code',
                meta: {
                    // @ts-ignore
                    headerComponent: () => import('../components/beto-messages/EnterCodeBetoMessage.vue'),
                    logoStyle: true,
                },
                
                // @ts-ignore
                component: () => import('../components/forms/EnterCode.vue')
            },
            {
                path:'reset-password',
                name:'reset-password',
                meta: {
                    // @ts-ignore
                    headerComponent: () => import('../components/beto-messages/ResetPasswordBetoMessage.vue'),
                    logoStyle: false,
                },
                
                // @ts-ignore
                component: () => import('../components/forms/ResetPassword.vue')
            },
            {
                path:'process-finished',
                name:'process-finished',
                meta: {
                    // @ts-ignore
                    headerComponent: () => import('../components/beto-messages/ProcessFinishedBetoMessage.vue'),
                    logoStyle: true,
                },
                
                // @ts-ignore
                component: () => import('../components/forms/ProcessFinished.vue')
            },
        ]

    },
]