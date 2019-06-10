import * as zkif_zokrates from "./pkg/zkif-wasm-zokrates";
import * as zkif_bulletproofs from "./pkg/zkif-wasm-bulletproofs";

// Common program.
let code = `

def main(field x, private field y) -> (field):
    field xx = x * x
    field yy = y * y
    return xx + yy

`;
document.getElementById("program").innerText = code.trim();

let constraints = zkif_zokrates.make_constraint_system(code);
document.getElementById("cs").innerText = zkif_zokrates.pretty(constraints);

// Prove.
let x = 3, y = 4;
let {prover_msg, verifier_msg} = zkif_zokrates.make_witness(code, x, y);

let proof = zkif_bulletproofs.prove(constraints, prover_msg);

document.getElementById("prover").innerText = `
x = ${x}
y = ${y}

${zkif_zokrates.pretty(prover_msg)}
`.trim();

document.getElementById("verifier").innerText = `
${zkif_zokrates.pretty(verifier_msg)}
Bulletproof: ${proof.length} bytes
`.trim();

// …Prover sends verifier_msg and proof to the verifier…

// Verify.
let verif = zkif_bulletproofs.verify(constraints, verifier_msg, proof);

// Display what we verified.
function statement(msg) {
    let public_inputs = zkif_zokrates.parse_verifier_msg(msg);
    let x = public_inputs[1][0];
    let zz = public_inputs[2][0];
    return `${x}^2 + y^2 = ${zz}`
}

let status = `The statement is ${verif && "proven" || "NOT proven"}:  ${statement(verifier_msg)}`;
document.getElementById("status").innerText = status;
