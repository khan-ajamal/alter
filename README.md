# alter

Alter is a Node service that provides real-time image manipulation for responsive images using URL.

## Architecture

The proposed architecture is to put it behind a CDN for better performance.

![Alter Architecture](https://res.cloudinary.com/ajamalkhan/image/upload/f_auto/v1603975699/projects/alter/architecture.png)

## Transformations

The following transformations are available -

- Resize
  - Change either `width` or `height` will keep `aspect ratio` intact
  - To resize image provide both height and width. Default crop is `center`.
- Image format
  - WebP
  - JPEG
- Blur
- Thumbnail
