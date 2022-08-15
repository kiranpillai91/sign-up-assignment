import { Pipe, PipeTransform } from '@angular/core';
import { TranslationTree } from '../constants/translation.model';
import { Translation } from '../constants/translation';

@Pipe({
  name: 'transalation'
})
export class TransalationPipe implements PipeTransform {

  transform(transalationKey: string) : string {
    return Translation[transalationKey as keyof TranslationTree] || '';
  }

}
