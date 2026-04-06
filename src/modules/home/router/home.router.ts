export const HomeRouter = [
    {
        path: "/home",
        // @ts-ignore
        component: () => import("../../../layouts/LayoutOne.vue"),
        children: [
          {
            path: "welcome",
            name: "welcome",
            // @ts-ignore
            component: () => import("../pages/HomePage.vue"),
          },
          
        ]
      },
    // {
    //     path: '/home',
    //     component: () => {
    //         if (import.meta.env.VITE_TARGET === 'mobile') {
    //             // @ts-ignore
    //             return import('../../../responsive-switcher/MobileHomeSwitcher.vue')
    //         } else {
    //             // @ts-ignore
    //             return import('../../../responsive-switcher/HomeSwitcher.vue')
    //         }
    //     },

    //     children: [
    //         {
    //             path:'welcome',
    //             name:'welcome',
    //             // @ts-ignore
    //             component: () => import('../pages/HomePage.vue'),
    //             meta: {
    //                 requiresAuth: true
    //             }
    //         },
    //     ]

    // },
]