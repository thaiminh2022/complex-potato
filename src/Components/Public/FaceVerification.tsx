import { DetectionHelper } from "@/Helper/FaceDetection/DetectionHelper";
import { useInterval } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import WebcamComponent from "./WebcamComponent";
import { Button, Divider, Group, Loader, Stack, Text } from "@mantine/core";
import { FaceMatch, FaceMatcher } from "face-api.js";
import { NewNotificationWithGoodBad } from "@/Helper/notifications/normalNotification";
import { IconCheck } from "@tabler/icons";

const dth = new DetectionHelper();

function FaceVerification(props: FaceVerificationProps) {
    const webcamRef = useRef<Webcam>(null);
    const [statusText, setStatusText] =
        useState<DetectionStatus>("Importing Lib");

    const interval = useInterval(async () => {
        if (!webcamRef.current || !webcamRef.current.video) {
            return;
        }

        const detections = await dth.TinyFaceDetectAsync(
            webcamRef.current.video
        );

        if (detections.length > 0) {
            setStatusText("Detected");
        } else {
            setStatusText("Detecting");
        }
    }, 100);

    useEffect(() => {
        interval.start();
        return () => {
            interval.stop();
        };
    }, []);

    const handleImageCapture = async () => {
        if (!webcamRef.current || statusText != "Detected") {
            NewNotificationWithGoodBad(
                {
                    title: "Camera not ready or cannot detect faces",
                    message: "Check your camera or refresh this page",
                },
                true
            );
            return;
        }

        // Allow capture if status detect some faces
        const screenshot = webcamRef.current.getScreenshot();
        const faceMatcher = dth.GetMatcher();

        if (props.onCapture) {
            await props.onCapture({ screenshot, faceMatcher });
        }

        if (props.faceMatcher) {
            const faceMatcher =
                typeof props.faceMatcher == "string"
                    ? dth.FaceMatcherFromJSON(props.faceMatcher)
                    : props.faceMatcher;

            const distance = await handleVerifying(faceMatcher);

            if (props.onVerified) {
                await props.onVerified(distance);
            }
        }
    };

    const handleVerifying = async (faceMatcher: FaceMatcher) => {
        const data = dth.CompareToDetections(faceMatcher);
        return data.distance;
    };

    return (
        <>
            <Stack>
                <WebcamComponent
                    webcamRef={webcamRef}
                    width={props.width}
                    height={props.height}
                />
                <Text color={"red"} weight={450}>
                    {props.error}
                </Text>
            </Stack>
            <Group position="apart">
                <Button onClick={handleImageCapture} disabled={props.disable}>
                    Capture
                </Button>
                <Group>
                    {statusText != "Detected" ? (
                        <Loader />
                    ) : (
                        <IconCheck></IconCheck>
                    )}
                    <Text>{statusText}</Text>
                </Group>
            </Group>
        </>
    );
}

interface FaceVerificationProps {
    width?: number | string;
    height?: number | string;

    onCapture?: (data: FaceVerificationCapture) => void | Promise<void>;

    faceMatcher?: FaceMatcher | string;
    onVerified?: (distance: number) => void | Promise<void>;

    disable?: boolean;
    error?: string;
}

type FaceVerificationCapture = {
    screenshot: string | null;
    faceMatcher: FaceMatcher;
};
export default FaceVerification;
