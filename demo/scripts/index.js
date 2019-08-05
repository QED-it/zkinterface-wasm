import * as zkif_zokrates from "../pkg/zkif-wasm-zokrates";
import * as zkif_bulletproofs from "../pkg/zkif-wasm-bulletproofs";

// global vars:
var prover_msg, verifier_msg, proof, constraints;
var x = 3, y = 4;

// Common program.
let code = `
    def main(field x, private field y) -> (field):
        field xx = x * x
        field yy = y * y
        return xx + yy - 1

    `;
    
document.getElementById("program").innerText = code.trim();
document.getElementById("generateConstraintsBtn").addEventListener("click", generateConstraints); 

function generateConstraints (e){
    console.log("generateConstraints invoked");

    disableBtn(e);

    var programCode = document.getElementById("program").innerText;
    console.log("programCode, programCode: " + programCode);

    // Compile the code to ZkInterface constraints with the ZoKrates module.
    constraints = zkif_zokrates.make_constraint_system(programCode);
    console.log("generated constraints, constraints: " + constraints);
    document.getElementById("cs").innerText = zkif_zokrates.pretty(constraints).trim();

    console.log("generateConstraints finished");
}

document.getElementById("computeWitnessBtn").addEventListener("click", computeWitness); 

function computeWitness(e){
    console.log("computeWitness invoked");
    // Prover's View.

    disableBtn(e);

    console.log("input parameter, code: " + code);
    console.log("x: " + x);
    console.log("y: " + y);

    // Compute the ZkInterface witness with the ZoKrates module.
    let res  = zkif_zokrates.make_witness(code, x, y);
    
    prover_msg = res.prover_msg;
    verifier_msg = res.verifier_msg;

    console.log("output parameter, prover_msg: " + prover_msg);
    console.log("output parameter, verifier_msg: " + verifier_msg);

    // Display.
    document.getElementById("prover").innerText = `
    x = ${x}, y = ${y}
    ${zkif_zokrates.pretty(prover_msg)}
    `.trim();

    console.log("computeWitness finished");
}

document.getElementById("createProofBtn").addEventListener("click", createProof); 

function createProof(e){
    console.log("createProof invoked");
    console.log("input parameter constraints value: " + constraints);
    console.log("input parameter prover_msg value: " + prover_msg);

    if (!constraints) {
        window.alert("constraints are empty, please generate constraints first.");
        return;
    }
    
    if (!prover_msg) {
        window.alert("witness is empty, please compute witness first.");
        return;
    }

    disableBtn(e);

    // Generate a proof with the Bulletproofs module.
    proof = zkif_bulletproofs.prove(constraints, prover_msg);
    console.log("output parameter proof value: " + proof);

    var proofHex =  toHexString(proof);
    var proofHexSubset = proofHex.substring(0, 20);

    var verifierEle = document.getElementById("verifier");
    verifierEle.innerText = "Prover:\n";
    verifierEle.insertAdjacentText("beforeend","Proof created, proof-content=" +  proofHexSubset +"... (" + proof.length + " bytes)\n");

    console.log("createProof finished");
}

document.getElementById("verifyProofBtn").addEventListener("click", verifyProof); 

function verifyProof(e){
    console.log("computeWitness invoked");
    console.log("input parameter, verifier_msg: " + verifier_msg);
    console.log("input parameter, proof: " + proof);
    console.log("input parameter, constraints: " + constraints);

    if (!verifier_msg) {
        window.alert("witness is empty, please compute witness first.");
        return;
    }

    if (!constraints) {
        window.alert("constraints are empty, please generate constraints first.");
        return;
    }

    if (!proof) {
        window.alert("proof is empty, please create proof first.");
        return;
    }

    disableBtn(e);

    // Prover sends verifier_msg and proof to the verifier.
    document.getElementById("verifier").insertAdjacentText("beforeend","\nVerify: \
    " + zkif_zokrates.pretty(verifier_msg) + "\n\
    Verifying proof (" +proof.length + " bytes)");

    // Verify the proof using the Bulletproofs module and the messages.
    let verif = zkif_bulletproofs.verify(constraints, verifier_msg, proof);

    // Display what we verified.
    function statement(msg) {
        let public_inputs = zkif_zokrates.parse_verifier_msg(msg);
        let x = public_inputs[1][0];
        let zz = public_inputs[2][0];
        return `${x}^2 + y^2 - 1 = ${zz}`;
    }

    let status = `The statement is ${verif && "proven" || "NOT proven"}:  ${statement(verifier_msg)}`;
    document.getElementById("status").innerText = status;

    console.log("output parameter verif value: " + verif);
    console.log("output parameter proof value: " + proof);

    console.log("verifyProof finished");
}

function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }

  function disableBtn(clickEvent) {
    var ele = clickEvent.target || clickEvent.srcElement;
    ele.setAttribute("disabled", "disabled");
    ele.classList.add("disabled");
}