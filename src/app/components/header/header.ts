import {Component, View, NgIf} from 'angular2/angular2';
import { RouterLink } from 'angular2/router';
import { FavStore } from '../../stores/favStore';

@Component({
	selector: 'header'
})

@View({
	directives: [RouterLink, NgIf],
	template: `
	<header id="header" class="page-topbar">
		<nav class="cyan">
			<div class="nav-wrapper container">
				<a [router-link]="['/Home']" class="brand-logo">{{title}}</a>
				<ul id="nav-mobile" class="right hide-on-med-and-down">
					<li><a [router-link]="['/Favourites']">My favourites <span *ng-if="newFavourites && newFavourites.length > 0" class="new badge pink">{{newFavourites.length}}</span></a></li>
					<li><a [router-link]="['/Search']">Search an artist</a></li>
				</ul>
			</div>
		</nav>
	</header>
	`
})

export class Header {
	title: string;
	favStore: FavStore;
	newFavourites: any;

	constructor(favStore: FavStore) {
		this.title = 'Angular 2 & Echonest API';
		this.favStore = favStore;
	}

	onInit() {
        this.favStore.favourites
			.subscribe(data =>
				this.newFavourites = data.filter((artist) => {
					return artist.isNew === true
				}
				));
	}



}
