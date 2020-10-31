# alter

Alter is a Node service that provides real-time image manipulation for responsive images using URL.

## Comparison
| Method          | Pros                              | Cons                                           |
| ------          | ----                              | ----                                           |
| __3rd Party__   | Very easy and simple to implement | - Lots of features which are not required      |
|                 |                                   | - Bounded to 3rd party for any new requirement |
|                 |                                   | - Conversion of existing URLs                  |
| __Pre-Compute__ | Easy to implement                 | - Too many moving parts in background          |
|                 |                                   | - Too many files to stores                     |
|                 |                                   | - Maintaining a script for back-filling        |
| __Real Time__   | Easy and simple to implement      | - High latencies                               |
|                 |                                   | - Heavy core machines                          |

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
