import * as zkif_zokrates from "../pkg/zkif-wasm-zokrates";
import * as zkif_bulletproofs from "../pkg/zkif-wasm-bulletproofs";
import CodeMirror from 'codemirror';

// Common program.
let code = `
def main(field x, private field y) -> (field):
    field xx = x * x
    field yy = y * y
    return xx + yy - 1
`;

var editor = CodeMirror.fromTextArea(document.getElementById("program"), {
    lineNumbers: true,
    mode: "javascript"
});
editor.setValue(code);

editor.on('change', function () {
    var code = editor.getValue()

});


// Compile the code to ZkInterface constraints with the ZoKrates module.
let constraints = zkif_zokrates.make_constraint_system(code);
document.getElementById("cs").innerText = zkif_zokrates.pretty(constraints).trim();

// Prover's View.

// Compute the ZkInterface witness with the ZoKrates module.
let x = 3, y = 4;
let {prover_msg, verifier_msg} = zkif_zokrates.make_witness(code, x, y);

// Generate a proof with the Bulletproofs module.
let proof = zkif_bulletproofs.prove(constraints, prover_msg);

// Display.
document.getElementById("prover").innerText = `
x = ${x}, y = ${y}
${zkif_zokrates.pretty(prover_msg)}
`.trim();

// Prover sends verifier_msg and proof to the verifier.
document.getElementById("verifier").innerText = `
${zkif_zokrates.pretty(verifier_msg)}
Verifying proof (${proof.length} bytes)
`.trim();

// Verify the proof using the Bulletproofs module and the messages.
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
