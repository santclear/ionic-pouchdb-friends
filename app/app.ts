import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';

declare var require: any;
var pouch = require('pouchdb');
var pouchFind = require('pouchdb-find');


@Component({
	template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
	rootPage: any = HomePage;

	constructor(platform: Platform) {
		platform.ready().then(() => {
			StatusBar.styleDefault();
		});
		pouch.plugin(pouchFind);
		let db = new pouch('friendsdb');

		let doc = {
			'_id': 'friends',
			'name': 'framework',
			'description': 'Ionic 2, PouchDB and PouchDB Find are friends'
		};

		db.put(doc);

		let found = db.find({
			selector: { _id: { $gte: 'friends' } },
			sort: ['_id']
		}).then(function (result) {
			console.log(result.docs[0]);
		});
	}
}

ionicBootstrap(MyApp);
