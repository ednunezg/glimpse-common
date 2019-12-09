import React from "react";
import TargetImageConfig from './card_rendering/config.json'
var QRCode = require('qrcode.react');


// Given a background design option, get a file path
function getBackDesignFilename(designOption) {
  if(!designOption || !TargetImageConfig.targets[designOption]) {
    const defaultOption = TargetImageConfig.default_target_image
    return TargetImageConfig.targets[defaultOption].file
  }

  return TargetImageConfig.targets[designOption].file
}

// Get all configs for an image name
function getBackDesignConfig(designOption) {
  if(!designOption || !TargetImageConfig.targets[designOption]) {
    const defaultOption = TargetImageConfig.default_target_image
    return TargetImageConfig.targets[defaultOption]
  }

  return TargetImageConfig.targets[designOption]
}

// Get all available categories
function getBackDesignImageCategories() {
  return TargetImageConfig.valid_target_categories
}

// Get selection list
function getBackDesignSelectionList() {
  return TargetImageConfig.target_selection_display_order
}
// Render the front side of the card
class CardFront extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const card = this.props.card

    const config = TargetImageConfig.front_card_presets.v1

    const outerStyle = {
      backgroundColor: "white",
      width: `${config.card_width_px}px`,
      height: `${config.card_height_px}px`,
      marginRight: "200px",
      overflow: "hidden",
      position: "relative",
      userSelect: "none",
      pointerEvents: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none"
    }

    if(card.frontDesignFileObj && card.frontDesignFileObj.url) {
      return (
        <div id="card_front" style={outerStyle}>
          <img alt="front_card_image" style={{width: "100%"}} src={card.frontDesignFileObj.url}/>
        </div>
      )
    }

    // LEGACY. TODO (ED) Deprecate in favor of card.frontDesignFileObj
    // This is the legacy file used for front image design before thumbnails
    // and cropping was introduced
    if(card.frontDesignImageUrl && card.frontDesignImageUrl != "null") {
      return (
        <div id="card_front" style={outerStyle}>
          <img alt="front_card_image" style={{width: "100%"}} src={card.frontDesignImageUrl}/>
        </div>
      )
    }

    return (
      <div id="card_front" style={outerStyle}>
        <div className="info" style={{
          display: "flex",
          float: "center",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          flexDirection: "column",
          flexShrink: 3,
          padding: "15px",
          fontFamily: "Poppins,sans-serif"
        }}>
          <h5 style={{fontSize: "24px"}}>{card.name} </h5>
          <p style={{fontSize: "15px"}}>{card.title}</p>
          <p style={{fontSize: "17px"}}>{card.company}</p>
          <p style={{fontSize: "18px"}}>{card.email}</p>
          <p style={{fontSize: "18px"}}>{card.phone} </p>
          <p style={{fontSize: "15px"}}>{card.address} </p>
          <p style={{fontSize: "15px", marginTop: "6px"}}> {card.about} </p>
        </div>
      </div>
    )
  }
}

class CardBack extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const card = this.props.card

    const config = TargetImageConfig.back_card_presets.v1
    const option = card.backgroundDesignOption || TargetImageConfig.default_target_image
    const targetDependentConfig = TargetImageConfig.targets[option]

    const outerStyle = {
      width: `${config.card_width_px}px`,
      height: `${config.card_height_px}px`,
      marginRight: "200px",
      overflow: "hidden",
      position: "relative",
      userSelect: "none",
      pointerEvents: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none"
    }

    const qrCodeStyle = {
      position: "absolute",
      boxSizing: "content-box",
      width:  `${config.qr_width_px}px`,
      height: `${config.qr_height_px}px`,
      right: `${config.qr_right_gap_px}px`,
      top: `${config.qr_top_gap_px}px`,
      borderRadius: `${config.qr_border_radius_px}px`,
      border: targetDependentConfig.qr_border_enabled ? "1px solid grey" : "1px solid rgba(0,0,0,0)"
    }

    const qrCodeLegacyStyle = {
      position: "absolute",
      width: "106px",
      height: "106px",
      right: "0",
      top: "22px",
      marginRight: "22px",
      overflow: "hidden",
      border: "solid #ffffff",
      backgroundColor: "#ffffff"
    }

    /*
      QR code fallback chain:
        (1) QR code URL with target image in query params
        (2) QR code URL without target image specified in query params (this will only work for default 5 images)
        (3) QR code NOT generated with QR code monkey
    */

    var qrCode

    if(this.props.hideQrCode) {
      qrCode = <img style={qrCodeStyle} className="qrcode" src={require(`./card_rendering/empty_qr_alt.png`)}/>
    }
    else if(this.props.showSaveMsgQrCode) {
      qrCode = <img style={qrCodeStyle} className="qrcode" src={require(`./card_rendering/save_message_qr.png`)}/>
    }
    else if(card.backgroundDesignId && card.qrCodesWithTarget && card.backgroundDesignId in card.qrCodesWithTarget) {
      qrCode = <img style={qrCodeStyle} className="qrcode" src={card.qrCodesWithTarget[card.backgroundDesignId]}/>
    }
    else if(card.qrCodeUrl) {
      qrCode = <img style={qrCodeStyle} className="qrcode" src={card.qrCodeUrl}/>
    }
    else {
      qrCode = (
        <QRCode
          style={qrCodeLegacyStyle}
          value={`https://ar.glimpsecard.com?id=${card.id}?target=${card.backgroundDesignId}`}
          size={100}
        />
      )
    }

    return (
      <div id="card_back" style={outerStyle}>
        <img
          src={require(`./card_rendering/target_img/${getBackDesignFilename(card.backgroundDesignOption)}`)}
        />

        <h2 style={{color: "white", position: "absolute"}}>
          Hit 'Save' to scan the card.
        </h2>
        {
          qrCode
        }
      </div>
    )
  }
}

export default {
  getBackDesignSelectionList: getBackDesignSelectionList,
  getBackDesignImageCategories: getBackDesignImageCategories,
  getBackDesignFilename: getBackDesignFilename,
  getBackDesignConfig: getBackDesignConfig,
  CardFront: CardFront,
  CardBack: CardBack,
};