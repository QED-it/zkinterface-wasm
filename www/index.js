import * as zkif_example from "./pkg/zkif-wasm-example";
import * as zkif_bulletproofs from "./pkg/zkif-wasm-bulletproofs";

// Common circuit.
let x = 3, y = 4, zz = x*x + y*y;
let circuit = zkif_example.make_circuit(x, y, zz);

// Prove.
let witness = zkif_example.make_witness(x, y);
let proof = zkif_bulletproofs.prove(circuit, witness);

// Verify.
let verif = zkif_bulletproofs.verify(circuit, proof);

let status = `The statement ${x}^2 + ${y}^2 = ${zz} is ${verif && "proven" || "NOT proven"}.`;
document.getElementById("status").innerText = status;
