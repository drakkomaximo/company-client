export const enum ROUTES {
    HOME = '/',
    LOGIN = '/login',
    LOGOUT = '/logout',
    PROFILE = '/profile',
    VERIFYTOKEN = '/auth/verify',
    REGISTER = '/register',
    REGISTERTEST = '/registertest',
    COMPANIES = '/companies',
    COMPANY = '/company',
    CREATECOMPANY = '/create-company',
    EDITCOMPANY = '/edit-company',
    EDITCOMPANYBYID = '/edit-company/:id',
    COMPANYBYID = '/company/:id',
    PRODUCTS = '/products',
    PRODUCT = '/product',
    CREATEPRODUCT = '/create-product',
    CREATEPRODUCTBYCOMPANYID = '/create-product/:companyId',
    EDITPRODUCT = '/edit-product',
    EDITPRODUCTBYID = '/edit-product/:id',
    PRODUCTBYID = '/product/:id',
}

export const profileOptions = [
    {
        id: 0,
        route: ROUTES.REGISTER,
        label: 'Create new user'
    },
    {
        id: 1,
        route: ROUTES.COMPANIES,
        label: 'Companies manager'
    },
]