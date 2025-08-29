    import { Injectable } from '@angular/core';
    import { Subject } from 'rxjs';

    @Injectable({
      providedIn: 'root'
    })
    export class AuthSharedService {
       private menuTriggerSource = new Subject<void>();
        menuTrigger$ = this.menuTriggerSource.asObservable();
        
        triggerMenu() {
            this.menuTriggerSource.next();
        }
    }