const images = require('./../fixtures/productimages.json');

export const getRandomImage = () => {
  const image = images[Math.floor(Math.random()*images.length)]; //random image
  return image;
};
