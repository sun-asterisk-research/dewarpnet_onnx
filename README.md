# dewarp_net

In this guide, we will walk through the steps of deploying a PyTorch model to the browser. We will use ONNX Runtime Web, a highly performant and lightweight JavaScript library developed for running ONNX models on web platforms. The tutorial will cover the process of converting a PyTorch model to an ONNX model, optimizing it, and then using ONNX Runtime Web to make predictions in the browser.

## Environment Requirements

For successful installation and execution, certain environment requirements need to be met.

The programming language Python is needed, with a version equal to or higher than 3.9. Having the conda package manager available is also a necessity as it simplifies package management and deployment.

In addition, Node.js is required with a version that is at least 18 or higher. Node.js is an open-source, cross-platform, back-end JavaScript runtime environment, that executes JavaScript code outside a web browser.

## Detailed Implementation Steps

In order to successfully implement the project, the following steps should be strictly adhered to:

1. The first step involves creating a [conda environment](DewarpNet/environment.yml), which is a crucial part of this implementation process. This environment will serve as the workspace for the project.
2. Upon setting up the conda environment, the next step is to run the [main.ipynb](DewarpNet/main.ipynb) notebook. This is a significant step as it helps in exporting the model to ONNX format, a powerful interchange format for AI models.
3. After successfully exporting the model to ONNX format, the next step is to copy the created ONNX file. This file should be transferred into the assets/models folder. This step is important as it ensures the model is stored correctly for future use.
4. The final step is to work within the dewarp_net folder. Here, you will need to run a series of commands as follows:
    1. First, run the `yarn` command. This command will ensure that all the dependencies required for the project are installed correctly.
    2. Next, execute the `yarn build` command. This command will compile your code and create a version that can be run on the environment.
    3. Lastly, to test run the project, use the following command: `yarn add -D serve && yarn serve`. This will add serve as a development dependency and start a local server, allowing you to see the result of your implementation.

## Reference Document

- <https://www.jameslmilner.com/posts/workers-with-webpack-and-typescript/>
- <https://onnxruntime.ai/docs/tutorials/web/>
- <https://github.com/cvlab-stonybrook/DewarpNet>
