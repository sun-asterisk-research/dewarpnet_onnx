import * as ort from "onnxruntime-web";
import * as cv from "@techstark/opencv-js";
declare class WorkerClient {
    private worker;
    private ready;
    private listener;
    constructor();
    release(): void;
    setListener(listener: (imageData: ImageData) => void | undefined): void;
    removeListener(): void;
    preprocess(mat: cv.Mat): ort.Tensor;
    communicate(source: HTMLImageElement): void;
}
export { WorkerClient };
