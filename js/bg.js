// Image Background
const body = document.querySelector("body");

const IMG_NUMBER = 5;

// function handleImgLoad(){
//   console.log("finished loading");
// }

function paintImage(imgNumber){
  const image = new Image();
  image.src = `img/${imgNumber + 1}.jpg`;
  // body.appendChild(image);
  body.prepend(image);
  // image.addEventListener("loadend", handleImgLoad);
  image.classList.add("bgImage");
}

function genRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function bgInit(){
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

bgInit();