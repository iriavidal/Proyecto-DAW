import { NgModule } from '@angular/core';
import { FormatDateTimePipe } from './pipes/format-date-time.pipe';
import { FilterNamePipe } from './pipes/filter-name.pipe';

@NgModule({
  declarations: [FormatDateTimePipe, FilterNamePipe],
  exports: [FormatDateTimePipe, FilterNamePipe],
})
export class CoreModule {}
