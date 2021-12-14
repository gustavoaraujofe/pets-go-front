import Lottie from "react-lottie";
import * as loadingAnimation from '../assets/animation/65014-dog-walking.json'


function Loading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }

    return <Lottie className="lottie-player" options={defaultOptions} height={200} width={200}/>
}


export default Loading;