/**
 * Created by lzhan on 2017/8/27.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sarchBooks'})
export class SearchBooks implements PipeTransform {
  transform(books: any, exponent: string): any {
    var ex=exponent || '';
    if(ex){
      return books.filter(function (book) {
        if(book.brand.indexOf(ex)!=-1){
          return book;
        }
      })
    }else {
      return books;
    }
  }
}
