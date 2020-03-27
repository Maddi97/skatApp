import { Pipe, PipeTransform } from '@angular/core';
import { Specs } from 'src/assets/classes/round';

@Pipe({name: 'spec'})
export class SpecPipe implements PipeTransform {
  transform(value: Specs): string {
    switch(value) {
        case("schwarzAngesagt"): {
            return "Schwarz angesagt"
        }
        case("schneiderAngesagt"): {
            return "Schneider angesagt"
        }
        default: {
            return value
        }
    }
  }
}