import { OnInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})

@NgModule({
    imports: [FormsModule],
    declarations: [LoginComponent]
})

export class LoginComponent implements OnInit {
    email:string;
    senha:string;

    constructor(private loginService: LoginService) {
    }

    ngOnInit(): void {       
    }

    logar() {
        this.loginService.login(this.email,this.senha);
    }

}