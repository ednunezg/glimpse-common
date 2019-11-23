// Contains constants global ot all Glimspe projects
module.exports = {
  /* <--------- HOSTNAMES ---------> */

  BACKEND_API_HOSTNAMES: {
    PRODUCTION: "https://api.glimpsecard.com",
    STAGING: "https://stagingapi.glimpsecard.com",
    LOCAL: "http://localhost:8080"
  },

  /* <----------- STRIPE ----------------> */

  STRIPE_KEY: {
    PROD: "pk_live_QiCelM1iNees4DCcGrIaepe100LZdcMh0u",
    DEV: "pk_test_8aYdcZRo6ENXOQFrpaIn7WNG00SpbBzoNV"
  },
  

  /* <----------- MEDIA FILES -----------> */

  MEDIA_FORMATS: {
    MAX_UPLOAD_SIZE_MB: 30,
    PICTURE: {
      SUPPORTED_EXTENSIONS: ["png", "jpg", "jpeg", "gif"],
      SUPPORTED_FORMATS: ["image/x-png", "image/png", "image/jpg", "image/jpeg", "image/gif"],
      DESCRIPTION: "Images with format of PNG, JPG, JPEG, and GIF are acceptable."
    },
    VIDEO: {
      SUPPORTED_EXTENSIONS: ["mp4", "mov"],
      SUPPORTED_FORMATS: ["video/quicktime", "video/mp4"],
      DESCRIPTION: "Videos with format of MP4 or MOV are acceptable."
    }
  },

  /* <--------- SUBSCRIPTIONS ---------> */

  // List of available subscription tiers and their properties
  TIERS: {
    TRIAL: 0,
    PREMIUM: 1,
    LEGACY: 2,
    props: {
      0: {
        hasDailyViewLimit: true,
        dailyViewLimit: 5,
        monthlyCostCents: 0,
        tierTypeStr: "Trial Plan"
      },
      1: {
        stripe_tier_id_prod: "plan_Fmpz784hFGp0i8",
        stripe_tier_id_test: "plan_FlkYQIA19oMNCY",
        hasDailyViewLimit: false,
        monthlyCostCents: 1500,
        tierTypeStr: "Premium Plan"
      },
      2: {
        stripe_tier_id_prod: "plan_FlqesIacx56vBV",
        stripe_tier_id_test: "plan_Fmp0d5AlvGWrQO",
        hasDailyViewLimit: false,
        monthlyCostCents: 0,
        tierTypeStr: "Legacy Plan"
      },
    }
  },

  /* <--------- MEDIA DISPLAY ------------> */

  MEDIA_CROP_TYPES: {
    RECTANGLE: 0,
    CIRCLE: 1,
    ROUNDED_CORNERS: 2,
    props: {
      0: {name: "Rectangle", isDefault: true, icon:'crop-rectangle.png', btnLabel: "Rectangle"},
      1: {name: "Circle", isDefault: false, icon:'crop-circle.png', btnLabel: "Circle"},
      2: {name: "Rounded Corners", isDefault: false, icon:'crop-rounded-corners.png', btnLabel: "Rounded\nCorners"}
    },
    all: [0,1,2]
  }
}