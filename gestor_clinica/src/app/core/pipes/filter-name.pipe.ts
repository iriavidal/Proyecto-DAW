import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName',
})
export class FilterNamePipe implements PipeTransform {
  transform(items: any[], searchText: string, fields: string[] = []): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((item) =>
      fields.some((field) =>
        item[field]?.toString().toLowerCase().includes(searchText)
      )
    );
  }
}
