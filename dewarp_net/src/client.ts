import * as ort from "onnxruntime-web";
import * as cv from "@techstark/opencv-js";

class WorkerClient {
    private worker: Worker;
    private ready: boolean = false;
    private listener: (imageData: ImageData) => void | undefined;

    constructor(worker: Worker, callback: Function) {
        this.worker = worker
        this.worker.postMessage(null);
        this.worker.onmessage = (evt) => {
            const data = evt.data;
            this.ready = data.ready;
            callback();
        }
    }

    release() {
        this.worker.terminate();
    }

    setListener(listener: (imageData: ImageData) => void | undefined) {
        this.listener = listener;
    }

    removeListener() {
        this.listener = undefined;
    }

    preprocess(mat: cv.Mat): ort.Tensor {
        const matC3 = new cv.Mat(mat.rows, mat.cols, cv.CV_8UC3);
        cv.cvtColor(mat, matC3, cv.COLOR_RGBA2BGR);
        const tensor = new ort.Tensor("uint8", matC3.data, [matC3.rows, matC3.cols, 3]);
        matC3.delete();
        return tensor
    }

    communicate(source: HTMLImageElement) {
        if (!this.ready) {
            console.log("Worker is not ready");
            return
        }
        const mat = cv.imread(source);

        this.worker.postMessage(this.preprocess(mat));

        this.worker.onmessage = (evt) => {
            if (this.listener) {
                const tensorInfo = evt.data.output;
                const mat = new cv.Mat(tensorInfo.dims[0], tensorInfo.dims[1], cv.CV_8UC3);
                mat.data.set(tensorInfo.cpuData);

                const dst = new cv.Mat();
                cv.cvtColor(mat, dst, cv.COLOR_RGB2RGBA);
                const resized = new cv.Mat();
                cv.resize(dst, resized, new cv.Size(source.width, source.height), 0, 0, cv.INTER_AREA);

                const imageData = new ImageData(new Uint8ClampedArray(resized.data), resized.cols, resized.rows);
                dst.delete();
                mat.delete();
                resized.delete();
                this.listener(imageData);

            }
            mat.delete();
        }
    }
}

export default WorkerClient;
