import Webcam, { ChildrenProps } from "react-webcam";
import React, { useCallback, useRef } from "react";
import { Group, Stack } from "@mantine/core";

const defaultVideoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
    mirrored: false,
    imageSmoothing: true,
};

function WebcamComponent(props: WebcamComponentProps) {
    const { width, height, videoConstrains, capture, webcamRef } = props;

    return (
        <>
            <Webcam
                audio={false}
                height={height}
                ref={webcamRef}
                width={width}
                screenshotFormat="image/webp"
                videoConstraints={videoConstrains ?? defaultVideoConstraints}
                mirrored={false}
                imageSmoothing
            >
                {/* @ts-ignore */}
                {({ getScreenshot }) => {
                    if (props.capture) {
                        return props.capture(getScreenshot);
                    }
                }}
            </Webcam>
        </>
    );
}

interface WebcamComponentProps {
    width?: number | string;
    height?: number | string;

    videoConstrains?: WebcamComponentVideoConstrainsProps;
    // capture: (imageStr: string | null) => JSX.Element
    capture?: (data: () => string | null) => JSX.Element;
    webcamRef?: React.MutableRefObject<Webcam | null>;
}

export type WebcamComponentVideoConstrainsProps = {
    width: number;
    height: number;
    facingMode: string;
    mirrored: boolean;
    imageSmoothing: boolean;
};

export default WebcamComponent;
