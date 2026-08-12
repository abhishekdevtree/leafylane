import { Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../providers/auth.guard.service';

export const routes: Routes = [
    {path:'',loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    {path:'products',loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
    {path:'search',loadComponent: () => import('./search/search').then(m => m.Search) },
    {path:'product/:productId',loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
    {path:'category/:categoryId',loadComponent: () => import('./category-listing/category-listing.component').then(m => m.CategoryListingComponent) },
    {path:'blog-list',loadComponent: () => import('./blog-list/blog-list.component').then(m => m.BlogListComponent) },
    {path:'blogs/:blogId',loadComponent: () => import('./blog-details/blog-details.component').then(m => m.BlogDetailsComponent) },
    {path:'contact-us',loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
    {path:'cart',loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent), data: { roles: ['guest', 'customer'] }, canActivate: [AuthGuard] },
    {path:'checkout',loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent), data: { roles: ['guest', 'customer'] }, canActivate: [AuthGuard] },
    {path:'payments',loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent), data: { roles: ['customer'] }, canActivate: [AuthGuard] },
    {path:'profile/:menuItem',loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent), data: { roles: ['customer'] }, canActivate: [AuthGuard] },
    {path:'profile',loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent), data: { roles: ['customer'] }, canActivate: [AuthGuard] },
    {path:'privacy-policy',loadComponent: () => import('./privacy-policy/privacy-policy').then(m => m.PrivacyPolicy)},
    {path:'about-us',loadComponent: () => import('./about-us/about-us').then(m => m.AboutUs)},
    {path:'faq',loadComponent: () => import('./faq/faq').then(m => m.Faq)},
    {path:'return-policy',loadComponent: () => import('./return-policy/return-policy').then(m => m.ReturnPolicy)},
    {path:'terms-and-condition',loadComponent: () => import('./terms/terms').then(m => m.Terms)},
    {path:'**',loadComponent: () => import('./error-page/error-page.component').then(m => m.ErrorPageComponent) },

];
