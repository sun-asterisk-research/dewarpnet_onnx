import ONNXWorker from "worker-loader!./worker";
import WorkerClient from "./client";


window.onload = () => {
    const worker = new ONNXWorker();
    const client = new WorkerClient(worker, () => { document.getElementById("button").removeAttribute("disabled") });

    function runAfter(imageData: ImageData) {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.putImageData(imageData, 0, 0);
    };

    client.setListener(runAfter);
    document.getElementById("button").addEventListener("click", () => {
        const source = document.getElementById("input") as HTMLImageElement
        client.communicate(source);
    })
}