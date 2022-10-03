import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeTime'
})
export class PipeTimePipe implements PipeTransform {

  transform(time: string): string {
      if(time){
        const partTime = parseInt(time.toString().split('.')[0],10);
        let minutes = Math.floor(partTime/60).toString();
        if(minutes.length === 1){
          minutes = '0' + minutes;
        }
        let seconds = (partTime%60).toString();
        if (seconds.length === 1){
          seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
      }

  }
}
