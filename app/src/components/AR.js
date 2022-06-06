export default function AR()
{
  return (
    <div>
        <a-scene vr-mode-ui="enabled: false;" loading-screen="enabled: false;"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;" id="scene" embedded gesture-detector>
        <a-marker id="animated-marker" type="pattern" preset="custom" url={process.env.PUBLIC_URL + '/marker.patt'}
            raycaster="objects: .clickable" emitevents="true" cursor="fuse: false; rayOrigin: mouse;">
            <a-image src={process.env.PUBLIC_URL+"/outputs/fullStyle.png"} scale="2 2 2" class="clickable" rotation="-90 0 0" gesture-handler>
            </a-image>
        </a-marker>

        <a-entity camera></a-entity>
    </a-scene>
</div>
  )
}