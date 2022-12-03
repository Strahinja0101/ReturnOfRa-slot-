import Config from '../config';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({key: 'Preload'});
    }

    preload() {
        //load image
        this.load.path = '../../assets/';
    
        this.load.image('splash_screen', 'images/bg/splash_screen.png');
        this.load.image('base_screen', 'images/bg/base_screen.png');
        this.load.image('game_logo', 'images/logo/game_logo.png');
        this.load.image('button', 'images/buttons/button.png');
        this.load.image('base_bg_mask', 'images/bg/base_screen_mask.png');
        this.load.atlas('autoSpin', 'images/autoSpin/btns.png','images/autoSpin/btns.json');
        this.load.image('close_btn', 'images/autoSpin/cross.png');

        this.load.atlas('spinButton', 'images/buttons/spin_button.png', 'images/buttons/spin_button.json');
        this.load.atlas('symbols', 'images/symbols/symbols.png', 'images/symbols/symbols.json');
        this.load.atlas('symbols_blur', 'images/symbols/symbols_blur.png', 'images/symbols/symbols_blur.json');
        this.load.atlas('line', 'images/lines/line.png', 'images/lines/line.json');
        this.load.atlas('sound', 'images/sound/sound.png','images/sound/sound.json');
        this.load.bitmapFont('txt_bitmap', 'fonts/bitmap/text_slot_machine.png', 'fonts/bitmap/text_slot_machine.xml');
        //load audio
        this.load.audio('reels', 'audio/reels.mp3');
        this.load.audio('reelStop', 'audio/reel_stop.mp3');
        this.load.audio('win', 'audio/win.mp3');
        this.load.audio('button', 'audio/button.mp3');
        this.load.audio('lose', 'audio/lose.mp3');
        this.load.audio('musicDefault', 'audio/music_default.mp3');

        this.progressBar = this.add.graphics();
        //load text
        this.loadingText = this.make.text({
            x: Config.width / 2,
            y: Config.height / 2 - 60,
            text: '0%',
            style: {
                font: '30px PT Serif',
                fill: '#ffffff'
            }
        });
        this.loadingText.setOrigin(0.5, 0.5);
        this.load.on('progress', (value) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0xbe6530, 1);
            this.progressBar.fillRect(Config.width / 2 - 450, Config.height / 2 - 80, 880 * value, 40);
            this.loadingText.setText(parseInt(value * 100) + '%');
        });
        this.load.on('complete', this.onComplete, this);
        for(let i = 0; i < 100; i++) {
            this.load.atlas('spinButton', 'images/buttons/spin_button.png', 'images/buttons/spin_button.json');
        }
    }

    create() {
        //Create splash screen
        this.scene.start('Boot');
    }


    onComplete() {
        this.progressBar.destroy();
        this.loadingText.destroy();
    }
}