/**
 * Created by lzhan on 2017/8/27.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shrinkStringLength'})
export class ShrinkString implements PipeTransform {
  transform(value: string, exponent: string): string {
    let exp = parseFloat(exponent) || 30;
    return value.substr(0,exp-3)+'...';
  }
}
