miniGame.rocket = function(spec) {
    'use strict';

    let rotation = 0;
    let imageReady = false;
    let image = new Image();

    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function updateRotation(howMuch) {
        rotation += howMuch;
        if(Math.abs(rotation) >= 2*Math.PI){rotation=0}
        //console.log(rotation);
    }

    function moveLeft(elapsedTime) {
        //spec.center.x -= (spec.moveRate * elapsedTime);
        updateRotation(-.01);
    }

    function moveRight(elapsedTime) {
        //spec.center.x += (spec.moveRate * elapsedTime);
        updateRotation(.01);
    }

    function moveUp(elapsedTime) {
        console.log("move up");
        //spec.center.y -= (spec.moveRate * elapsedTime);
        // console.log('y: ',Math.cos(rotation));
        // console.log('x: ',Math.sin(rotation));
        spec.center.y -= Math.cos(rotation);
        spec.center.x += Math.sin(rotation);
    }

    function moveDown(elapsedTime) {
        //spec.center.y += (spec.moveRate * elapsedTime);
    }

    function moveTo(pos) {
        spec.center.x = pos.x;
        spec.center.y = pos.y;
    }

    function center(pos) {
        spec.center.x = 20;
        spec.center.y = 20;
    }

    function render() {
        const context = spec.context
        const center = spec.center
        const size = spec.size
        
        context.save();

        center.y += .2;
        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height
        );

        context.restore();
    }

    let api = {
        updateRotation: updateRotation,
        moveLeft: moveLeft,
        moveRight: moveRight,
        moveUp: moveUp,
        moveDown: moveDown,
        moveTo: moveTo,
        render: render,
        center: center,
        get imageReady() { return imageReady; },
        get rotation() { return rotation; },
        get image() { return image; },
        get center() { return spec.center; },
        get radius() { return spec.radius; },
        get size() { return spec.size; }
    };

    return api;
}