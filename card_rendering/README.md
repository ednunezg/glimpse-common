# Card rendering utilities and image targets

This is where all card rendering related functions and utilities live.

This is also the source of truth for the image targets that we use for AR tracking.

The steps for adding new target images is as follows:

  (1) Add a new jpg file in ./raw-targets folder. Make sure dimensions are 2004 × 1128

  (2) Add new entry in config.json with image information

  (3) Go to 8thwall-targets and run `npm run start` to generate all 8th wall targets

  (4) Upload target images on the 8th wall website
