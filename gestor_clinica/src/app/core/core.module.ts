import { NgModule } from '@angular/core';
import { FormatDateTimePipe } from './pipes/format-date-time.pipe';

@NgModule({
  declarations: [FormatDateTimePipe],
  exports: [FormatDateTimePipe],
})
export class CoreModule {}
