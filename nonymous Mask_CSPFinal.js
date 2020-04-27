
```
let faceapi;
let video;
let detections;
let angles = [];

// by default all options are set to true
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
}


function preload() {
  img1 = loadImage('sadface.png');
  img2 = loadImage('happyface.png');

}

function setup() {
  createCanvas(360, 270);


  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  // video.hide(); // Hide the video element, and just show the canvas
  faceapi = ml5.faceApi(video, detection_options, modelReady)
  // textAlign(RIGHT);
}

function modelReady() {
  console.log('ready!')
  console.log(faceapi)
  faceapi.detect(gotResults)

}

function gotResults(err, result) {
  if (err) {
    console.log(err)
    return
  }
  // console.log(result)
  detections = result;

  // background(220);
  background(255);
  image(video, 0, 0, width, height)
  if (detections) {
    if (detections.length > 0) {
      // console.log(detections)
      drawBox(detections)
      drawLandmarks(detections)

      //image(img1, 10, 10, 50, 50);


    } else {
      //  image(img2, 10, 10, 50, 50);


    }

  }
  faceapi.detect(gotResults)
}

function drawBox(detections, img) {
  for (let i = 0; i < detections.length; i++) {
    const alignedRect = detections[i].alignedRect;
    const x = alignedRect._box._x
    const y = alignedRect._box._y
    const boxWidth = alignedRect._box._width
    const boxHeight = alignedRect._box._height

    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);
    if (img == "happy") {
      image(img1, x, y, boxWidth, boxHeight);
    }

    if (img == "sad") {
      image(img2, x, y, boxWidth, boxHeight);
    }

  }

}

function drawLandmarks(detections) {

  noFill();
  stroke(161, 95, 251)
  strokeWeight(2)

  for (let i = 0; i < detections.length; i++) {
    const mouth = detections[i].parts.mouth;
    const nose = detections[i].parts.nose;

    const leftEye = detections[i].parts.leftEye;
    const rightEye = detections[i].parts.rightEye;
    const rightEyeBrow = detections[i].parts.rightEyeBrow;
    const leftEyeBrow = detections[i].parts.leftEyeBrow;

    // console.log(detections[i].parts.mouth[0].x);
    //console.log(detections[i].parts.mouth[19].y);



    let v0 = createVector(detections[i].parts.nose[0].x, detections[i].parts.nose[0].y);

    let v1 = createVector(detections[i].parts.nose[5].x, detections[i].parts.nose[5].y);

    let v2 = createVector(detections[i].parts.mouth[0].x, detections[i].parts.mouth[0].y);



    drawArrow(v0, v1, 'red');
    drawArrow(v2, v1, 'red');

    //console.log



    var current = degrees(v0.sub(v1).angleBetween(v2))
    angles.push(current)

    //(degrees(v0.sub(v1).angleBetween(v2)))

    //console.log(max(angles))
    // console.log(min(angles))

    maxx = max(angles)
    minx = min(angles)
    avg = (maxx + minx) / 2
    if (current - avg < 0) {
      print("happy")
      drawBox(detections, "happy")

    }

    if (current - avg > 0) {
      drawBox(detections, "sad")

      print("sad")
    }



    drawPart(mouth, true);
    drawPart(nose, false);
    drawPart(leftEye, true);
    drawPart(leftEyeBrow, false);
    drawPart(rightEye, true);
    drawPart(rightEyeBrow, false);

  }

}

function drawPart(feature, closed) {

  beginShape();
  for (let i = 0; i < feature.length; i++) {
    // console.log(feature.length)
    const x = feature[i]._x
    const y = feature[i]._y
    // vertex(x, y)

  }

  if (closed === true) {
    endShape(CLOSE);
  } else {
    endShape();
  }


}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(0.5);
  fill(myColor);
  translate(base.x, base.y);
  let delta = p5.Vector.sub(vec, base);
  line(0, 0, delta.x, delta.y);
  rotate(delta.heading());
  let arrowSize = 7;
  translate(delta.mag() - arrowSize, 0);
  //triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

```
