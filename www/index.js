import * as zkif_zokrates from "./pkg/zkif-wasm-zokrates";
import * as zkif_bulletproofs from "./pkg/zkif-wasm-bulletproofs";
const log = console.log;

// Common program.
let code = `

def main(field x, private field y) -> (field):
    field xx = x * x
    field yy = y * y
    return xx + yy

`;
let constraints = zkif_zokrates.make_constraint_system(code);

// Prove.
let x = 3, y = 4;
let {prover_msg, verifier_msg} = zkif_zokrates.make_witness(code, x, y);
let proof = zkif_bulletproofs.prove(constraints, prover_msg);

// …Prover sends verifier_msg and proof to the verifier…

// Verify.
let verif = zkif_bulletproofs.verify(constraints, verifier_msg, proof);

// Display what we verified.
let public_inputs = zkif_zokrates.parse_verifier_msg(verifier_msg);
let v_x = public_inputs[1][0];
let v_zz = public_inputs[2][0];

let status = `The statement ${v_x}^2 + y^2 = ${v_zz} is ${verif && "proven" || "NOT proven"}.`;
document.getElementById("status").innerText = status;

// Display the details of all messages.
log("Constraint system", zkif_zokrates.pretty(constraints));
log("Prover", zkif_zokrates.pretty(prover_msg));
log("Verifier", zkif_zokrates.pretty(verifier_msg));
