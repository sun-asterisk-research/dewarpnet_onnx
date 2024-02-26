import * as ort from "onnxruntime-web";

import onnxModel from "./assets/models/e2e.onnx";

ort.env.wasm.numThreads = 1

var session: ort.InferenceSession | undefined = undefined;


const ctx: Worker = self as any;

ctx.onmessage = async (e) => {
    const isForInitialization = e.data === null;

    if (isForInitialization) {
        try {
            if (session === undefined) {
                const startTime = performance.now()
                const buffer = await (await fetch(onnxModel)).arrayBuffer();
                session = await ort.InferenceSession.create(
            buffer,
            {
                executionProviders: ["cpu"],
                graphOptimizationLevel: 'all',
                interOpNumThreads: 4
            });
                const message = `Load time: ${performance.now() - startTime} milliseconds`
                ctx.postMessage({
                    message: message,
                    ready: true,
                });
            }
        } catch (err) {
            ctx.postMessage({
                message: `Load model failed with error: ${err}`,
                ready: false,
            });
        }
    } else {
        const tensorInfo = e.data;
        if (!session) {
            ctx.postMessage({
                message: "Session has not been initialized.",
                ready: false,
            });
            return;
        }
        const startTime = performance.now()
        const outputs = await session.run({
            input: new ort.Tensor(tensorInfo.type, tensorInfo.cpuData, tensorInfo.dims)
        })

        const message = `Running time: ${performance.now() - startTime} milliseconds`

        ctx.postMessage({
            output: outputs.output,
            "message": message
        });
    }
}
