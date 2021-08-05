import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { createRxNgHooks, ngHooks, rxAsync, RxNgHooks } from 'rxlize';
import { UserService } from '../../services/user/user.service';

const hooks = ngHooks(['ngOnDestroy']);

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  readonly id$ = this.route.params.pipe(map(params => +params.id));

  readonly userIdCtrl = new FormControl(1);

  @RxNgHooks(hooks)
  readonly rxLife = createRxNgHooks(hooks);

  readonly rxUser = rxAsync(this.id$, $ => $.pipe(switchMap(this.sUser.readUser)));

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly sUser: UserService,
  ) {
    this.id$.pipe(tap(id => this.userIdCtrl.setValue(id, { emitEvent: false }))).subscribe();

    this.userIdCtrl.valueChanges
      .pipe(
        takeUntil(this.rxLife.ngOnDestroy),
        tap(id => this.router.navigate(['/', 'user', id])),
      )
      .subscribe();
  }
}
