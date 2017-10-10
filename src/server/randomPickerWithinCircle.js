function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const randomPointOnCircle = (radius, center) => {
  // Randomly pick
// dSquared (0..radius^2) and
// theta (0..2pi), then

  let originX, originY, dSquared, theta;
  [originX, originY] = [...center];
  dSquared = getRandomArbitrary(0, Math.pow(radius, 2));
  console.log(dSquared, originX, originY);
  theta = getRandomArbitrary(0, 2*Math.PI);
  console.log(theta);
  let x = parseFloat(Math.sqrt(dSquared) * Math.cos(theta) + originX).
    toFixed(7);
  let y = parseFloat(Math.sqrt(dSquared) * Math.sin(theta) + originY).
    toFixed(7);
  return `(${x}, ${y})`;
};

console.log(randomPointOnCircle(0.5, [114, 22]));
