import { WHITE, BLACK, PI } from './constans.js'
import { colors } from './constans.js'

const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const baseDimensions = () => {
    const res = new PIXI.Graphics();
    res.lineStyle(2, BLACK, 1);
    res.beginFill(colors[randomInt(0, colors.length)]);
    return res;
}


const createShape = (type, cb) => {
    switch(type) {
        case "rectangle": {
            let w = 100;
            let h = 100
            const rectangle = cb();
            rectangle.drawRect(0, 0, w, h)
            rectangle.area = w*h;
            return rectangle
        } 
        case "circle": {
            let d = 50
            const circle = cb();
            circle.drawCircle(0, 0, d)
            circle.area = Math.floor((PI / 4) * Math.pow(d, 2))
            return circle
        } 
        case "ellipse": {
            let w = 60;
            let h = 30;
            const ellipse = cb();
            ellipse.drawEllipse(0, 0, w, h);
            ellipse.area = Math.floor(PI * (w/2) * (h/2));
            return ellipse
        } 
        case "triangle": {
            const triangle = cb();
            let a = 32;
            let bc = 64;
            let p = (a + bc) / 2;
            triangle.drawPolygon([-a, bc, a, bc, 0,0])
            triangle.area = Math.floor(Math.sqrt(p*(p-a)*(p-bc)*(p-bc)))
            return triangle
        } 
        case "pentagon": {
            let w = 100;
            let h = 50;
            let p = (h + h + w) / 2;
            const pentagon = cb();
            pentagon.drawPolygon([0, 0, w, 0, w, h, h, w, 0, h])
            pentagon.area = Math.floor((w * h) + Math.sqrt(p*(p-h)*(p-h)*(p-w)))
            return pentagon
        } 
        case "hexagon": {
            let hexagonRadius = 60;
            let hexagonHeight = hexagonRadius * Math.sqrt(3);
            const hexagon = cb();
            hexagon.drawPolygon([
                -hexagonRadius, 0,
                -hexagonRadius/2, hexagonHeight/2,
                hexagonRadius/2, hexagonHeight/2,
                hexagonRadius, 0,
                hexagonRadius/2, -hexagonHeight/2,
                -hexagonRadius/2, -hexagonHeight/2,
              ])
              hexagon.area = Math.floor((hexagonHeight * hexagonRadius)/2);
            return hexagon
        } 
        // case "star": {
        //     const star = cb();
        //     star.drawStar(0, 0, 4, 50)
        //     star.area = 777
        //     return star
        // } 

        default : {
            const rectangle = cb();
            rectangle.drawRect(0, 0, 100, 100)
            return rectangle
        } 
             
    }
};

export {createShape, baseDimensions, randomInt} ;