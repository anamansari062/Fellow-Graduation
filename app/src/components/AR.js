import React from "react";
import {Helmet} from "react-helmet";
export default function AR() {
  return (
    <div>
    <div className="application">
            <Helmet>
              <script src="https://aframe.io/releases/1.0.4/aframe.min.js" type="text/javascript" />
            </Helmet>
            <Helmet>
              <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js" type="text/javascript" />
            </Helmet>
            <Helmet>
              <script src="https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-detector.js" type="text/javascript" />
            </Helmet>
            <Helmet>
              <script src="https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-handler.js" type="text/javascript" />
            </Helmet>
        </div>
    <body className="ar-body">
      <a-scene vr-mode-ui="enabled: false;" loading-screen="enabled: false;"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;" id="scene" embedded gesture-detector>
        <a-marker id="animated-marker" type="pattern" preset="custom" url="/assets1/marker.patt"
            // eslint-disable-next-line react/jsx-no-duplicate-props
            raycaster="objects: .clickable" emitevents="true" cursor="fuse: false; rayOrigin: mouse;">
            <a-image src="app/public/monalisa.jpg" scale="2 2 2" class="clickable" rotation="-90 0 0" gesture-handler>
            </a-image>
        </a-marker>
        <a-entity camera></a-entity>
    </a-scene>
</body>
</div>

  )
}