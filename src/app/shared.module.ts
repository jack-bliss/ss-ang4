import { NgModule } from '@angular/core';

import { AsyncContentDirective } from './directives/async-content.directive';

@NgModule({
  declarations: [
    AsyncContentDirective
  ],
  exports: [
    AsyncContentDirective
  ]
})
export class SharedModule {}
