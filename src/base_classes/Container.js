import Options from '../options';
//Class Symbols Container
export default class Container extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);
        //symbols column
        const symbols1 = scene.add.sprite(0, 0, 'symbols', 'symbols_' + this.randomBetween(0, 9) + '.png');
        const symbols2 = scene.add.sprite(0, - Options.symbolHeight, 'symbols', 'symbols_' + this.randomBetween(0, 9) + '.png');
        const symbols3 = scene.add.sprite(0, - Options.symbolHeight * 2, 'symbols', 'symbols_' + this.randomBetween(0, 9) + '.png');
        const symbols4 = scene.add.sprite(0, - Options.symbolHeight * 3, 'symbols', 'symbols_' + this.randomBetween(0, 9) + '.png');
        const symbols5 = scene.add.sprite(0, - Options.symbolHeight * 4, 'symbols', 'symbols_' + this.randomBetween(0, 9) + '.png');
        symbols1.setScale(0.53,0.53)
        symbols2.setScale(0.53,0.53)
        symbols3.setScale(0.53,0.53)
        symbols4.setScale(0.53,0.53)
        symbols5.setScale(0.53,0.53)
        this.add([symbols1, symbols2, symbols3, symbols4, symbols5]);
    }

    randomBetween(min, max) {
        //choose random texture for outcome
        return Phaser.Math.Between(min, max); 
    }
}