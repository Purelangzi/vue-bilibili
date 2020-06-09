export default {
    name: 'edit',
    path: '/edit',
    meta: {
        isToken: true
    },
    component: () => import('@/views/Edit/Edit')
}