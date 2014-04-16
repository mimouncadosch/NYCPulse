'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
	controller('AppCtrl', function ($scope, $http) {

		var map;	// Declare map globally for other functions to use
		var markers = [];
		function initialize() {
		  var mapOptions = {
		    center: new google.maps.LatLng(40.759661, -73.982502),
		    zoom: 13
		  };
		  map = new google.maps.Map(document.getElementById("map-canvas"),
		      mapOptions);
		}

		google.maps.event.addDomListener(window, 'load', initialize);

		$('document').ready(function() {
			console.log('Ready, let us start');
			tick();
		});

		function tick() {
			console.log('calling tick');
			var now = new Date();
			getData(now);
			var t = setTimeout(tick, 30000);
		}

		function getData(time) {
			console.log('calling getData');
			console.log(time);
			// Add 0 in front of time if it's less than 10am
			var hr = (hr = time.getHours()) < 10 ? '0' + hr : hr.toString()
			var min = (min = time.getMinutes()) < 10 ? '0' + min : min.toString()

			console.log(hr, min);

			$http({
				method: 'GET',
				url: '/api/times',
				params: {
					min: min,
					hr: hr
				}
			}).success(function (data, status, headers, config) {
				console.log('markers', markers.length);
				clearMap();			// Clear map of previous markers
				addMarkers(data);	// Add new markers to array
				populateMap(data);	// Populate map anew
			}).error(function (data, status, headers, config) {
				console.log('error!');
			});
		}

		// Add relevant markers to array of markers
		function addMarkers(data) {
			console.log('adding markers');
			var res = data.result;
			for (var i = 0; i < res.length; i++) {
				var stop = res[i];
				var myLatlng = new google.maps.LatLng(stop['lat'], stop['lon']);
				var marker = new google.maps.Marker({
					position: myLatlng,
					title: stop['name'],
					icon: 'train.png',
					animation: google.maps.Animation.DROP
				});
				markers.push(marker);
			}
		}

		function populateMap() {
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(map);
			}
		}

		function clearMap() {
			markers = [];
		}

	}).
	controller('MyCtrl1', function ($scope) {
	// write Ctrl here

	}).
	controller('MyCtrl2', function ($scope) {
	// write Ctrl here

	});