import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'latest',
    loadChildren: './pages/latest/home.module#HomePageModule'
  },
  {
    path: 'photo/:id', loadChildren: './pages/photo/photo.module#PhotoPageModule'
  },
  {
    path: 'photo/:id/fullimage', loadChildren: './pages/fullimage/fullimage.module#FullimagePageModule'
  },
  {
    path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesPageModule'
  },
  {
    path: 'popular', loadChildren: './pages/popular/popular.module#PopularPageModule'
  },
  {
    path: 'about', loadChildren: './pages/about/about.module#AboutPageModule'
  },
  { path: 'home', loadChildren: './pages/home/search.module#SearchPageModule' },
  { path: 'categorie/:id', loadChildren: './pages/categorie/categorie.module#CategoriePageModule' },
  { path: 'profile/:username', loadChildren: './pages/profile/profile.module#ProfilePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
