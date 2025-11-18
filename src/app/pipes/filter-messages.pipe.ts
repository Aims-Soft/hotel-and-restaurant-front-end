import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMessages'
})
export class FilterMessagesPipe implements PipeTransform {
  transform(messages: any[], searchTerm: string): any[] {
    if (!messages || !searchTerm) return messages;

    const lowerSearch = searchTerm.toLowerCase();

    return messages.filter(msg =>
      msg.userName?.toLowerCase().includes(lowerSearch) ||
      msg.contact?.toLowerCase().includes(lowerSearch) ||
      msg.email?.toLowerCase().includes(lowerSearch) ||
      msg.userMessage?.toLowerCase().includes(lowerSearch)
    );
  }
}