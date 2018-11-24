'use strict';

import MessageTypes from '../message-types';
import PopupManager from './popup-manager';
import ExtensionContentServer from './extension-content-server';

export default class CTBackground{
    constructor(){
        this.extensionContentServer = new ExtensionContentServer();
        this.popupManager = new PopupManager(this.serviceProvider);
    }

    run(){
        this.extensionContentServer.listen();
        this.popupManager.init();
    }
}