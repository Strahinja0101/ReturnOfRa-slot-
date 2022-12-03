import Config from '../config';
import Options from '../options';
//import Class
import Sprite from './Sprite';
import Tween from './Tween';
//Class Auto Spin
export default class AutoSpin {
    constructor(scene) {
        this.scene = scene;
        this.autoSpin();
    }

    autoSpin() {
        //button config
        this.buttonAuto = new Sprite(this.scene, Config.width - 300, Config.height - 70, 'spinButton', 'down.png');
        this.buttonAuto.scale = 0.6
        this.txtAutoSpin = this.scene.add.text(Config.width - 320, Config.height - 70, Options.txtAutoSpin, 38);
        // this.txtAutoSpin.setDisplayCallback(this.scene.textCallback);
        this.buttonAuto.on('pointerdown', () => {
            if (!Options.checkClick) {
                this.buttonAuto.setScale(0.6);
                //fuction play speed auto
                this.playSpeedAuto();
            }
        });
        this.buttonAuto.on('pointerup', () => this.buttonAuto.setScale(0.6));
    }

    playSpeedAuto() {
        //set text auto
        if(Options.txtAutoSpin === 'STOP') {
            Options.txtAutoSpin = 'AUTO';
            // this.txtAutoSpin.setText(Options.txtAutoSpin);
            //remove timer event
            if(this.txtSpeed && this.timer) {
                this.txtSpeed.destroy();
                this.timer.remove();
            }   
        } else {
            Options.txtAutoSpin = 'STOP';
            // this.txtAutoSpin.setText(Options.txtAutoSpin);
            //play audio button
            this.scene.audioPlayButton();
            
            //Set background for popUp
            this.bgAuto = new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'splash_screen', 'splash_screen.png');
                this.bgAuto.setScale(0.6);
                this.bgAuto.setAlpha(0.8);
            // this.auto = new Sprite(this.scene, Config.width / 2, Config.height / 2 - 100,
            //     'spinButton', 'spinButton.png');
            
            this.txtAuto = this.scene.add.text(Config.width / 2 - 5, Config.height / 2 - 115,
                Options.txtAuto, { fontSize : '55px', color : '#fff', fontFamily : 'PT Serif' });
            
            //function set text x auto
            this.setXAuto();
            
            //function plus
            this.plus();
            
            //function minus
            this.minus();

            //function play
            this.play();

            //function exit
            this.exit();
        }
    }


    plus() {
        this.btnPlus = new Sprite(this.scene, Config.width / 2 - 100, Config.height / 2 - 100,
            'autoSpin', 'plus_normal.png');
        this.btnPlus.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton();
            if(Options.txtAuto < 100) {
                this.btnMinus.clearTint();
                this.btnPlus.setScale(0.9);
                Options.txtAuto += 5;
                //set text x auto
                Options.txtAuto < 100 ? this.txtAuto.x = 620 :
                    this.txtAuto.x = 610;
                this.txtAuto.setText(Options.txtAuto);
            }
            if(Options.txtAuto === 100) {
                this.btnPlus.setTint(0xa09d9d);
            }
        });
        this.btnPlus.on('pointerup', () => this.btnPlus.setScale(1));
    }

    minus() {
        this.btnMinus = new Sprite(this.scene, Config.width / 2 + 100, Config.height / 2 - 100,
            'autoSpin', 'minus_normal.png');
        this.btnMinus.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton(); 
            if(Options.txtAuto > 5) {
                this.btnPlus.clearTint();
                this.btnMinus.setScale(0.9);
                Options.txtAuto -= 5;
                //function set text x auto
                this.setXAuto();
                this.txtAuto.setText(Options.txtAuto);  
            }
            if(Options.txtAuto === 5) {
                this.btnMinus.setTint(0xa09d9d);
            }  
        });
        this.btnMinus.on('pointerup', () => this.btnMinus.setScale(1));
    }

    play() {
        //Start autoplay
        this.btnPlay = new Sprite(this.scene, Config.width / 2, Config.height / 2 + 100,
            'spinButton', 'spinButton.png').setScale(0.5);
        this.btnPlay.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton();
            //function remove image auto
            this.removeImgAuto();
            if(this.scene.valueMoney >= Options.coin * Options.line) 
                this.speedPlay(Options.txtAuto);
            else
                this.setTextAuto();
        });
    }
    
    exit() {
        this.btnExit = new Sprite(this.scene, Config.width - 100 , 
            Config.height - 635,
            'close_btn', 'cross.png').setScale(0.1);
        this.btnExit.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton();
            //function remove image auto
            this.removeImgAuto();
            //set text auto
            this.setTextAuto();
        });
    }

    speedPlay(speed) {

        this.txtSpeed = this.scene.add.dynamicBitmapText(Config.width - 200, Config.height / 2 - 150, 'txt_bitmap', speed, 120);
        this.txtSpeed.setDisplayCallback(this.scene.textCallback);
        this.timer = this.scene.time.addEvent({
            delay: 500,
            callback: function() {
                //set delay 
                this.timer.delay = 4500;
                if(speed > 0 && this.scene.valueMoney >= 
                    Options.coin * Options.line) {
                    //set color
                    this.scene.baseSpin.setColor();
                    //set check click = true
                    Options.checkClick = true;
                    //detroys line array
                    this.scene.baseSpin.destroyLineArr();
                    //funtion remove text win
                    this.scene.baseSpin.removeTextWin();
                    //save localStorage
                    this.scene.baseSpin.saveLocalStorage();
                    this.tweens = new Tween(this.scene);
                    speed --;
                    this.txtSpeed.setText(speed);
                } else {
                    Options.checkClick = false;
                    this.timer.remove(false);
                    this.txtSpeed.destroy();
                    //set text auto
                    this.setTextAuto();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    setTextAuto() {
        Options.txtAutoSpin = 'AUTO';
    }

    setXAuto() {
        if(Options.txtAuto >= 100) 
            this.txtAuto.x = 610;
        else if(Options.txtAuto >= 10)
            this.txtAuto.x = 620;
        else 
            this.txtAuto.x = 635;
    }
    
    removeImgAuto() {
        this.bgAuto.destroy();
        this.btnPlus.destroy();
        this.btnMinus.destroy();
        this.txtAuto.destroy();
        this.btnPlay.destroy();
        this.btnExit.destroy();
    }
}