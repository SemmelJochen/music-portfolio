import Lottie from 'lottie-react';
import animationData from '../../resources/lotties/loading.json';

export const LoadingAnimation = () => {
    return (
        <div style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            margin: "0"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%"
            }}>
                <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ height: 150, width: 150, margin: "0" }}
                />
            </div>
        </div>
    );
}
