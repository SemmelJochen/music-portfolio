import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../resources/lotties/loading.json';

export const LoadingAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

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
                options={defaultOptions}
                height={150}
                width={150}
                style={{ margin: "0" }}
                isClickToPauseDisabled={true} 
                //speed={2} -- not working (default: 1)
            />
            </div>
            
        </div>
    );
}
