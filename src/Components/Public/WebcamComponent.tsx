import Webcam, { ChildrenProps } from "react-webcam";
import React, { useCallback, useRef } from "react"
import { Group, Stack } from "@mantine/core";

const defaultVideoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
    mirrored: true,
    imageSmoothing: true,
};


function WebcamComponent(props: WebcamComponentProps) {

    const webcamRef = useRef<Webcam | null>(null);

    return (
        <Stack>
            <Webcam
                hidden={props.hidden}
                audio={false}
                height={props.height ?? 300}
                ref={webcamRef}
                screenshotFormat="image/webp"
                width={props.width ?? 300}
                videoConstraints={props.videoConstrains ?? defaultVideoConstraints}
                mirrored={true}
                imageSmoothing
            >
                {/* @ts-ignore */}
                {({ getScreenshot }) => {
                    return props.capture(getScreenshot);
                }}

            </Webcam>

        </Stack >
    );
};


interface WebcamComponentProps {
    width?: number,
    height?: number,

    videoConstrains?: WebcamComponentVideoConstrainsProps,
    // capture: (imageStr: string | null) => JSX.Element
    capture: (data: () => string | null) => JSX.Element,

    hidden?: boolean
}

export type WebcamComponentVideoConstrainsProps = {
    width: number;
    height: number;
    facingMode: string;
    mirrored: boolean;
    imageSmoothing: boolean;

}
export default WebcamComponent;