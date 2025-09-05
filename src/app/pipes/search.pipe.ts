import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, field?: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      if (field) {
        // search in specific field
        return item[field]?.toString().toLowerCase().includes(searchText);
      } else {
        // search across all fields of object
        return Object.values(item).some(val =>
          val?.toString().toLowerCase().includes(searchText)
        );
      }
    });
  }

}
