import React from "react";
import TargetImageConfig from './card_rendering/config.json'
var QRCode = require('qrcode.react');

// Get list of available background design options
function getBackDesignOptions() {
  let options = []
  var option
  for(option in TargetImageConfig.targets) {
    options.push(option)
  }
  return options
}

// Given a background design option, get a file path
function getBackDesignFilename(designOption) {
  if(!designOption || !TargetImageConfig.targets[designOption]) {
    const defaultOption = TargetImageConfig.default_target_image
    return TargetImageConfig.targets[defaultOption].file
  }

  return TargetImageConfig.targets[designOption].file
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
          <p style={{fontSize: "24px", marginTop: "6px"}}> {card.about} </p>
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
      border: targetDependentConfig.qr_border_enabled ? "1px solid black" : "1px solid rgba(0,0,0,0)"
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

    return (
      <div id="card_back" style={outerStyle}>
        <img
          src={require(`./card_rendering/target_img/${getBackDesignFilename(card.backgroundDesignOption)}`)}
        />
        {
          /* Fallback to using QR code generated in front end if none available */
          card.qrCodeUrl ? 
            <img style={qrCodeStyle} className="qrcode" src={card.qrCodeUrl}/>
            :
            <div className="qrcode-legacy">
              <QRCode style={qrCodeLegacyStyle} value={`https://ar.glimpsecard.com?id=${card.id}`} size={100}/>
            </div>
        }
      </div>
    )
  }
}

export default {
  getBackDesignOptions: getBackDesignOptions,
  getBackDesignFilename: getBackDesignFilename,
  CardFront: CardFront,
  CardBack: CardBack,
};