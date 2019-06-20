[![Build Status](https://travis-ci.org/QED-it/zkinterface-wasm.svg?branch=master)](https://travis-ci.org/QED-it/zkinterface-wasm)

# zkinterface-wasm
A zkInterface in WebAssembly

live demo: https://qed-it.github.io/zkinterface-wasm-demo (hosted @ https://github.com/QED-it/zkinterface-wasm-demo)

the code for the demo can be found at [/demo](https://github.com/QED-it/zkinterface-wasm/tree/master/demo)

## Progress Tracker:
| System             | ZK-Interface  support | WebAssembly supports      |  Demo integration  |
|--------------------|-----------------------|---------------------------|--------------------|
| Bellman            | :heavy_check_mark:    | :heavy_check_mark:        | :heavy_check_mark: |
| Bulletproof        | :heavy_check_mark:    | :heavy_check_mark:        | :heavy_check_mark: |
| Zokrates           | :heavy_check_mark:    | :heavy_check_mark:        | :heavy_check_mark: |
| websnark           |                       |                    |                    |

## How to contribue:

Every system (frontend/backend) that supports Zk-Interface have 2 main stages and an optional final stage.

### Stage 1:
Implememnt Zk-Interface support inside the system. 

### Stage 2:
Add Support for WebAssembly

### Stage 3:
Integrate the compiled wasm to the demo and witness the magic.


