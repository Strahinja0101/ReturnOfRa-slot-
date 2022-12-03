import Config from '../config';
import Options from '../options';
//import Class
import Audio from '../base_classes/Audio';
import Sprite from '../base_classes/Sprite';
import Container from '../base_classes/Container';
import Coin from '../base_classes/Coin';
import Line from '../base_classes/Line';
import Maxbet from '../base_classes/Maxbet';
import BaseSpin from '../base_classes/BaseSpin';
import AutoSpin from '../base_classes/AutoSpin';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key:'Game'});
    }

    create() {
        //Class Audio
        this.audioObject = new Audio(this);
        // bitmap text
        Options.hsv = Phaser.Display.Color.HSVColorWheel();
        //add bg image
        const bg = new Sprite(this, Config.width / 2, Config.height / 2, 'base_screen', 'base_screen.png');
        bg.alpha = 0.5;
       
        //Reels
        this.container = new Container(this, Config.width - 940, Config.height - 70);
        this.container2 = new Container(this, Config.width - 800, Config.height - 70);
        this.container3 = new Container(this, Config.width - 650, Config.height - 70);
        this.container4 = new Container(this, Config.width - 510, Config.height - 70);
        this.container5 = new Container(this, Config.width - 350, Config.height - 70);
        //add mask hack
        const mask = new Sprite(this, Config.width / 2, Config.height / 2, 'base_bg_mask', 'base_screen_mask.png');
        const title = new Sprite(this, Config.width / 2, Config.height - 610, 
            'game_logo', 'game_logo.png').setScale(0.18);
        //Balance
        //get inital balance
        this.valueMoney =  Options.money;
          
        //Balance holder
        this.btn = new Sprite(this, Config.width - 985, Config.height - 675, 'button', 'button.png');
        this.btn.setScale(0.3)
        //Text of money
        this.txtMoney = this.add.text(Config.width - 1150, Config.height - 695, this.valueMoney + '$', {
            fontSize : '35px',
            color : '#000',
            fontFamily : 'PT Serif'
        });
        this.setTextX(this.valueMoney);
        //Add sound image
        const musicName = localStorage.getItem('music') ? localStorage.getItem('music')
         : 'btn_music_off.png';
        const soundName = localStorage.getItem('sound') ? localStorage.getItem('sound')
         : 'btn_sound_off.png';
        this.btnMusic = new Sprite(this, Config.width - 120, Config.height - 675, 'sound', musicName).setScale(0.6);
        this.btnSound = new Sprite(this, Config.width - 190, Config.height - 675, 'sound', soundName).setScale(0.6);
        this.audioMusicName = this.btnMusic.frame.name;
        this.audioSoundName = this.btnSound.frame.name;
        this.btnMusic.on('pointerdown', this.onMusic, this);
        this.btnSound.on('pointerdown', this.onSound, this);
        //play audio default
        if(this.audioMusicName === 'btn_music.png') {
            this.audioObject.musicDefault.play();
        }
        //The main interactive interface
        //Class Coin
        this.coin = new Coin(this);
        //Class Line
        this.btnLine = new Line(this);
        //Class Maxbet
        this.maxBet = new Maxbet(this);
        //Class AutoSpin
        this.autoSpin = new AutoSpin(this);
        //Class BaseSpin
        this.baseSpin = new BaseSpin(this);
    }

    onMusic() {
        if(!Options.checkClick) {
            if(this.audioMusicName === 'btn_music.png') {
                this.audioMusicName = 'btn_music_off.png';
                //audio stop
                this.audioObject.musicDefault.stop();
                this.audioObject.audioWin.stop();
            } else {
                this.audioMusicName = 'btn_music.png';
                this.audioPlayButton();
                //audio play
                this.audioObject.musicDefault.play();
            }
            //save localstorage
            if(localStorage.getItem('musics')) {
                localStorage.removeItem('musics');
                localStorage.setItem('music', this.audioMusicName);
            } else {
                localStorage.setItem('music', this.audioMusicName);
            } 
            this.btnMusic.setTexture('sound', this.audioMusicName);
        }
    }

    onSound() {
        if(!Options.checkClick) {
            if(this.audioSoundName === 'btn_sound.png') {
                this.audioSoundName = 'btn_sound_off.png';
            } else {
                this.audioSoundName = 'btn_sound.png';
                this.audioObject.audioButton.play();
            }
            //save localstorage
            if(localStorage.getItem('sounds')) {
                localStorage.removeItem('sounds');
                localStorage.setItem('sound', this.audioSoundName);
            } else {
                localStorage.setItem('sound', this.audioSoundName);
            } 
            this.btnSound.setTexture('sound', this.audioSoundName);
        }
    }

    audioPlayButton() {
        if(this.audioSoundName === 'btn_sound.png') {
            this.audioObject.audioButton.play();
        }
    }

    setTextX(value) {
        if(value >= 100000000) this.txtMoney.x = 217;
        else if(value >= 10000000) this.txtMoney.x = 220;
        else if(value >= 1000000) this.txtMoney.x = 230;
        else if(value >= 100000) this.txtMoney.x = 240;
        else if(value >= 10000) this.txtMoney.x = 240;
        else if(value >= 1000) this.txtMoney.x = 250;
        else if(value >= 100) this.txtMoney.x = 260;
        else if(value >= 10) this.txtMoney.x = 270;
        else this.txtMoney.x = 280;
    }

    textCallback(data) {
        data.tint.topLeft = Options.hsv[Math.floor(Options.i)].color;
        data.tint.topRight = Options.hsv[359 - Math.floor(Options.i)].color;
        data.tint.bottomLeft = Options.hsv[359 - Math.floor(Options.i)].color;
        data.tint.bottomRight = Options.hsv[Math.floor(Options.i)].color;
    
        Options.i += 0.05;
    
        if (Options.i >= Options.hsv.length)
        {
            Options.i = 0;
        }
    
        return data;
    }    
}