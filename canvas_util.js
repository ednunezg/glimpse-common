import Constants from './constants'


// Draws a rectangle on a canvas with some width and height
let drawRoundedRectangle = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Draws a circle on a canvas
let drawCircle = (ctx, centerX, centerY, radius) => {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.closePath();
}

// Draws an ellipse on a canvas
let drawEllipse = (ctx, centerX, centerY, radiusX, radiusY) => {
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  ctx.closePath();
}

const Exported = {
  createCroppedImageCanvas: (el, fileRef, cropType, crop, opts) => {
    opts = opts || {}

    // Size of the uploaded media
    const mediaWidth = fileRef.naturalWidth || fileRef.videoWidth
    const mediaHeight = fileRef.naturalHeight || fileRef.videoHeight

    // Size of the crop view
    const elWidth = fileRef.width || fileRef.clientWidth
    const elHeight = fileRef.height || fileRef.clientHeight

    // The dimensions of the crop view element might be smaller than dimensions of media itself
    // We scale up the size of the canvas to avoid pixelation
    const scaleX = mediaWidth / elWidth;
    const scaleY = mediaHeight / elHeight;

    // Make dimensions of the canvas the natural size of the cropped section of the image, or scale down if max width is specified
    let canvasWidth = crop.width
    let canvasHeight = crop.height
    if(opts.staticCanvasWidth) {
      let width = opts.staticCanvasWidth
      canvasWidth = crop.width > crop.height ? width : Math.round((crop.width / crop.height) * width)
      canvasHeight = crop.height > crop.width ? width : Math.round((crop.height / crop.width) * width)
    }

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let ctx = canvas.getContext('2d')

    // Set canvas shape appropiately to crop type and draw image
    if(cropType === Constants.MEDIA_CROP_TYPES.ROUNDED_CORNERS) {
      drawRoundedRectangle(ctx, 0, 0, canvasWidth, canvasHeight, 30)
      ctx.clip();
    }
    if(cropType === Constants.MEDIA_CROP_TYPES.CIRCLE) {
      drawEllipse(ctx, canvasWidth/2, canvasHeight/2, canvasWidth/2, canvasHeight/2)
      ctx.clip();
    }

    ctx.drawImage(
      el,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.width * (canvasHeight/canvasWidth) * scaleY,
      // crop.height * scaleY,
      0,
      0,
      canvasWidth,
      canvasHeight
    )

    // Draw an overlay icon if any is specified
    if(opts.overlayIconFile) {
      const iconWidth = canvasWidth / 3
      const iconHeight = canvasWidth / 3

      ctx.drawImage(
        opts.overlayIconFile,
        canvasWidth / 2 - iconWidth / 2,
        canvasHeight / 2 - iconHeight / 2,
        iconWidth,
        iconHeight
      );
    }

    return canvas
  },

  drawRoundedRectangle: drawRoundedRectangle,
  drawCircle: drawCircle,
  drawEllipse: drawEllipse

}

export default Exported