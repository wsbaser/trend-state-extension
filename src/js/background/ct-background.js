'use strict';

import MessageTypes from '../message-types';
import guid from 'guid';

export default class CTBackground{
    constructor(){
    	this.notifications = {};
    }

    run(){
        setInterval(function(){
        	this.requestCandles(this.analyzeCandles.bind(this));
        }.bind(this), 5000);
        chrome.notifications.onClicked.addListener(this.onNotificationClick);
    }

    onNotificationClick(notificationId){
    	var newURL = "https://olymptrade.com/platform";
    	chrome.tabs.create({ url: newURL });
    }

    analyzeCandles(candles){
    	let lastCandle = candles[candles.length-1];
    	var symbol = 'EURUSD';
    	let notification = this.notifications[symbol];
    	if(!lastCandle.volume && notification){
    		this.notifications[symbol] = null;
    	}
		else if(lastCandle.volume && !notification){
			this.showNotification(symbol, lastCandle.volume);
		}
    }

    requestCandles(onSuccess){
	    $.ajax({
			url : "http://92.53.120.34/api/SampleData/Candles", 
			type: "GET",
			contentType:"application/json; charset=utf-8",
			dataType:"json",
			success: function(data, textStatus, jqXHR)
			{	
				onSuccess(data);
			},
			error: function (jqXHR, textStatus, errorThrown)
			{
				console.log(errorThrown);
			}
		});
    }

    showNotification(symbol, volume){
    	var imgArray = ['github.png', 'github-codercat.png', 'github-female.png', 'github-los-muertos.png', 'github-old.png', 'github-rainbow.png', 'github-starwars.png'];
		var rand = imgArray[Math.floor(Math.random() * imgArray.length)];
        var options = {
			type: "basic",
			title: "Trend State: stake opportunity",
			message: symbol + " - " + volume,
			iconUrl: "images/" + rand
		};

		chrome.notifications.create(guid(), options, function(notificationId) {
			this.notifications[symbol] = notificationId;
		}.bind(this));
    }
}