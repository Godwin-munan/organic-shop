import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { async } from '@firebase/util';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
[x: string]: any;
  appUser!: AppUser;
  cart$!: Observable<ShoppingCart>

  constructor(
    private auth: AuthService, 
    private router: Router,
    private cartService: ShoppingCartService
    ){}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}

}
