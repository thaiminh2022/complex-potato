import * as faceapi from "face-api.js";
import { FaceDetection, FaceMatcher } from "face-api.js";

await Promise.all([
    faceapi.loadFaceLandmarkTinyModel("/faceverification"),
    faceapi.loadFaceDetectionModel("/faceverification"),
    faceapi.loadTinyFaceDetectorModel("/faceverification"),
    faceapi.loadFaceRecognitionModel("/faceverification"),
]);

export class DetectionHelper {
    detectionsData: faceapi.WithFaceDescriptor<
        faceapi.WithFaceLandmarks<
            {
                detection: faceapi.FaceDetection;
            },
            faceapi.FaceLandmarks68
        >
    >[] = [];

    constructor() {}

    public MatchDimensions(
        canvas: HTMLCanvasElement,
        displaySize: CanvasDisplaySize
    ) {
        faceapi.matchDimensions(canvas, displaySize);
    }
    public async TinyFaceDetectAsync(video: HTMLVideoElement) {
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks(true)
            .withFaceDescriptors();

        this.detectionsData = detections;

        return detections;
    }
    public GetMatcher() {
        return new faceapi.FaceMatcher(this.detectionsData);
    }
    public DrawDetectionsToCanvas(
        canvas: HTMLCanvasElement,
        displaySize: CanvasDisplaySize,
        detections: any
    ) {
        const resizeDetection = faceapi.resizeResults(detections, displaySize);
        canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizeDetection);
    }

    public FaceMatcherFromJSON(json: any) {
        return FaceMatcher.fromJSON(JSON.parse(json));
    }

    public CompareToDetections(matcher: FaceMatcher) {
        return matcher.findBestMatch(this.detectionsData[0].descriptor);
    }
}

type CanvasDisplaySize = {
    width: number;
    height: number;
};
