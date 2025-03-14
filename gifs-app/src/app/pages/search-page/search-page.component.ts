import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from 'src/app/gifs/components/gif-list/gif-list.component';
import { Gif } from 'src/app/gifs/interfaces/gif.interface';
import { GifService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    });
  }
}
