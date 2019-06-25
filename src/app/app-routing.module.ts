import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component'
import { LoginComponent } from './login/login.component';
import { AuthGuard} from './guards/auth.guard'
import { ProdutoComponent } from './produto/produto.component';

const routes: Routes = [ 

  { 
    path: 'sistema',    
    canActivate: [AuthGuard], 
    children: [
      { path: 'cliente', component: ClienteComponent},
      { path: 'produto', component: ProdutoComponent},
    ]
  }, 
  
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
