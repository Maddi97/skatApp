import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Skat App';

  scrollTop = 0;
  hideNav = false;

  onScroll(event) {
  this.hideNav = this.scrollTop < event.target.scrollTop;
  this.scrollTop = event.target.scrollTop;
}

  ngOnInit(){
  }

}
