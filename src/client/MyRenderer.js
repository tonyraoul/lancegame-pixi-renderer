"'use strict';"

import Renderer from 'lance/render/Renderer';
import * as PIXI from 'pixi.js';

export default class MyRenderer extends Renderer {

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.sprites = {};
        this.app = new PIXI.Application(400,400);
        const _self = this;
        document.addEventListener("DOMContentLoaded",function(){
            document.body.appendChild(_self.app.view);
        });
    }

    draw(t, dt) {
        super.draw(t, dt);
        for (let objId of Object.keys(this.sprites)) {
            if (this.sprites[objId]) {
                this.sprites[objId].y = this.gameEngine.world.objects[objId].position.y;
                this.sprites[objId].x = this.gameEngine.world.objects[objId].position.x;
            }
        }
    }

    addSprite(obj, objName) {
        let graphic = new PIXI.Graphics();
        graphic.beginFill(0xCCCCCC);
        graphic.lineStyle(4,0xFF3300,1);
        if (objName === 'paddle'){
            objName += obj.playerId;
            graphic.drawRect(0,0,10,50);
            graphic.endFill();
        }
        else if (objName == 'ball'){
            graphic.drawRect(0,0,5,5);
            graphic.endFill();
        }
        this.app.stage.addChild(graphic);
        this.sprites[obj.id] = graphic;
    }

}
