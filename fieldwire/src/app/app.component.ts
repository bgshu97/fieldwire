import { isPlatformBrowser } from '@angular/common';
import { Component, Input, Output, Pipe } from '@angular/core';
import * as EventEmitter from 'events';
import { ApiService } from 'src/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'fieldwire';

  @Input() searchQuery: string;
  @Input() sort: string;
  @Input() window: string;
  @Input() page: number;

  public links = [];

  constructor(
    private api: ApiService
  ) { }

  getAll(searchQuery, sort?, window?, page?) {
    this.api.getAll(searchQuery, sort, window, page).subscribe((results) => {
      for (var i = 0; i < results.data.length; i++) {
        if (results.data[i].images) {
          this.links.push(results.data[i].images[0].link);
        } else {
          this.links.push(results.data[i].link);
        }
      }
      console.log('JSON Response = ', JSON.stringify(results));
      console.log(this.links);
    });
  }

  search() {
    this.links = [];
    this.page = 1;
    console.log(this.searchQuery);
    console.log(this.sort);
    console.log(this.window);
    this.getAll(this.searchQuery, this.sort, this.window, this.page);
  }

  zoom(index) {
    var image = document.getElementById(index);
    console.log(image);

    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById('img1');
    var modalVid = document.getElementById('vid1');
    var modalVidContainer = document.getElementById('vidContainer');
    modal.style.display = "block";

    if (index.endsWith('.mp4')) {
      modalVidContainer.style.display = "block";
      modalImg.style.display = "none";

      modalVid.setAttribute('src', index);
    } else {
      modalVidContainer.style.display = "none";
      modalImg.style.display = "block";

      modalImg.setAttribute('src', index);
    }
  }

  closeImage() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
  }

  previousPage() {
    if (this.page !== 1) {
      this.page--;
    }
    this.links = [];
    this.getAll(this.searchQuery, this.sort, this.window, this.page);
  }

  nextPage() {
    this.page++;
    this.links = [];
    this.getAll(this.searchQuery, this.sort, this.window, this.page);
  }

  ngOnInit() {
  }
}
