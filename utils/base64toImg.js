export const base64ToImage = (base64) => {
    var image = new Image();
    image.src = base64;
    return image
  }