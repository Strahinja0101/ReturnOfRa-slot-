import Config from '../config';
import Options from '../options';
import Sprite from './Sprite';
//Class Coin
export default class Coin {
    constructor(scene) {
        this.scene = scene;
        this.addCoin();
    }

    addCoin() {
        this.coin = new Sprite(this.scene, Config.width - 668, Config.height - 50, 'button', 'button.png');
        this.coin.setScale(0.3)
        this.txtCoin = this.scene.add.dynamicBitmapText(Config.width - 720, Config.height - 70, 'txt_bitmap', Options.txtCoin, 38);
        this.txtCoin.setDisplayCallback(this.scene.textCallback);
        const holder = this.scene.add.graphics();
        holder.fillStyle(0x222222, 1);
        holder.fillRect(Config.width - 710, Config.height - 150, 70, 60);
        this.txtCountCoin = this.scene.add.text(Config.width - 700, Config.height - 140, Options.coin, {
            fontSize : '35px',
            color : '#fff',
            fontFamily : 'PT Serif'
        });
        //pointer down
        this.coin.on('pointerdown', this.onCoin, this);
        //pointer up
        this.coin.on('pointerup', () => this.coin.setScale(0.30));
    }

    onCoin() {
        if (!Options.checkClick && Options.txtAutoSpin === 'AUTO') {
            this.coin.setScale(0.35);
            //play audio button
            this.scene.audioPlayButton();
            if (Options.coin < 50) {
                Options.coin += 10;
                this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText('BET: ' + Options.coin * Options.line);
            } else {
                Options.coin = 10;
                this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText('BET: ' + Options.coin * Options.line);
            }
        }
    }
}