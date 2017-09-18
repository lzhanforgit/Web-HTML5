/**
 * Created by lzhan on 2017/9/17.
 */
import { Injectable }     from '@angular/core';
import { CanActivate , Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot }    from '@angular/router';
import {LocalStorage} from './localStorage.service';
import {GlobaleService} from './global.service';



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private  ls:LocalStorage,
    private  router:Router,
    private global:GlobaleService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    console.log('AuthGuard#canActivate called');
    if(this.ls.get('token')){
      return true;
    }else{
      let url: string = state.url;
      console.log(url +"-----------");
      this.global.activeUrl=url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
