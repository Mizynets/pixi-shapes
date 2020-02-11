import { WHITE, BLACK, WIDTH, HEIGHT, colors } from "./constans.js";
import { shapesArr } from "./data.js";
import { createShape, baseDimensions, randomInt } from "./utils.js";
import {
  numOfShapes,
  surfaceArea,
  shapesValue,
  gravityValue,
  shapeDec,
  shapeInc,
  gravityDec,
  gravityInc,
  root
} from "./elements.js";

let gravity = 4;
let shapesOnStage = 1;
let shapes = [];
let shapesCountInRec = [];
let shapesArea = 0;

shapeDec.addEventListener("click", () => {
  if (shapesOnStage !== 1) {
    shapesOnStage--;
    shapesValue.innerHTML = shapesOnStage;
  }
});
shapeInc.addEventListener("click", () => {
  shapesOnStage++;
  shapesValue.innerHTML = shapesOnStage;
});

gravityDec.addEventListener("click", () => {
  if (gravity !== 4) {
    gravity -= 4;
    gravityValue.innerHTML = gravity / 4;
  }
});

gravityInc.addEventListener("click", () => {
  gravity += 4;
  gravityValue.innerHTML = gravity / 4;
});

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true
});
app.renderer.backgroundColor = WHITE;
document.querySelector("#root").appendChild(app.view);
const mousePosition = app.renderer.plugins.interaction.mouse.global;

root.addEventListener("click", e => {
        model.drawCustomShape()
    /* attempt to solve the bug with removing the main figures */
//   shapesCountInRec.some(shape => {
//     const isLeftTop = mousePosition.x < shape.x && mousePosition.y < shape.y;
//     const isRightBottom =
//       mousePosition.x > shape.x + 100 && mousePosition.y > shape.y + 100;

//     if (isLeftTop || isRightBottom) {
//       model.drawCustomShape();
//       return true;
//     }
//     return false;
//   });
});

const model = {
  drawShape() {
    const inAreaX = WIDTH - 100;
    const shapeY = -100;
    const shapeX = randomInt(100, inAreaX);
    const onClick = () => {
      shapes = shapes.filter(shape => shape.id !== randShape.id);
    };
    const randNameShape = shapesArr[randomInt(0, shapesArr.length - 1)];
    const randShape = createShape(randNameShape, baseDimensions);
    console.log(randShape);
    randShape.x = shapeX;
    randShape.y = shapeY;
    randShape.id = uuid();
    randShape.interactive = true;
    randShape.on("pointerdown", onClick);
    randShape.on("pointerdown", controller.clearShape);
    shapes.push(randShape);
    app.stage.addChild(randShape);
  },
  drawCustomShape() {
    const customShape = new PIXI.Graphics();
    customShape.lineStyle(2, BLACK, 1);
    customShape.beginFill(colors[randomInt(0, colors.length)]);
    customShape.drawStar(0, 0, 4, 50);
    customShape.area = 777;
    customShape.id = uuid();
    customShape.x = mousePosition.x;
    customShape.y = mousePosition.y;
    shapes.push(customShape);
    app.stage.addChild(customShape);
  },
  shapesCountAndArea() {
    shapesCountInRec = shapes.filter(
      shape => shape.y > 50 && shape.y < app.screen.height
    );
    numOfShapes.innerHTML = shapesCountInRec.length;
    shapesArea = shapesCountInRec.reduce((a, c) => a + c.area, 0);
    surfaceArea.innerHTML = shapesArea;
  }
};

const view = {
  loadedGame() {
    model.drawShape();
    setInterval(() => {
      for (let i = 0; i < shapesOnStage; i++) {
        model.drawShape();
      }
    }, 1000);

    app.ticker.add(() => {
      model.shapesCountAndArea();
      for (let i = 0; i < shapes.length; i++) {

        const shape = shapes[i];
        shape.y += gravity;
        if (app.screen.height + 100 < shape.y) {
          shapes = shapes.filter((el, indx) => indx !== i);
        }
      }
    });
  }
};

const controller = {
  clearShape() {
    this.clear();
  }
};

view.loadedGame();
