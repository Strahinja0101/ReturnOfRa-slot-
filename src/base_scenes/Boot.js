import Sprite from '../base_classes/Sprite';
import Audio from '../base_classes/Audio';
import Options from '../options';
import Config from '../config';

//This is the pre-game screen
export default class BootScene extends Phaser.Scene {
    constructor() {
        super({key: 'Boot'});
    }

    create() {
        //Create bg splash_screen
        const bgloading = new Sprite(this, Config.width / 2, Config.height / 2, 'splash_screen', 'splash_screen.png');
        //Create logo
        const title = new Sprite(this, Config.width / 2, Config.height - 600, 
            'game_logo', 'game_logo.png').setScale(0.2);
        //Create continue
        this.txtSplash = this.add.dynamicBitmapText(Config.width - 930, Config.height - 70, 'txt_bitmap', Options.txtSplash, 45);
        this.txtSplash.setDisplayCallback(this.scene.textCallback);
        const scaleObject = {
            default : 1,
            scale : 1.1,
            scale2 : 1
        };
        //looping text for user focus
        const timer = this.time.addEvent({
            delay: 450,
            callback: () => {
                if(this.txtSplash.scale === scaleObject.default) 
                    this.txtSplash.setScale(scaleObject.scale);
                else if(this.txtSplash.scale === scaleObject.scale) 
                    this.txtSplash.setScale(scaleObject.scale2);
                else 
                    this.txtSplash.setScale(scaleObject.default);
            },
            callbackScope: this,
            loop: true
        });
        //event on click screen
        bgloading.on('pointerdown', () => {
            timer.remove();
            //Create main game scene
            this.scene.start('Game');
        });
    }
}