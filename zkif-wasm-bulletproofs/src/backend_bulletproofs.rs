use wasm_bindgen::prelude::wasm_bindgen;
use zkinterface::reading::Messages;
use bulletproofs::r1cs::{
    R1CSProof,
    zkinterface_backend,
};


/// Prove using the circuit and the witness.
#[wasm_bindgen]
pub fn prove(circuit: &[u8], witness: &[u8]) -> Vec<u8> {
    let messages = &mut Messages::new(1);
    messages.push_message(Vec::from(circuit)).unwrap();
    messages.push_message(Vec::from(witness)).unwrap();

    let proof = zkinterface_backend::prove(&messages).unwrap();

    bincode::serialize(&proof).unwrap()
}


/// Verify using the circuit and the proof.
#[wasm_bindgen]
pub fn verify(circuit: &[u8], proof_ser: &[u8]) -> bool {
    let messages = &mut Messages::new(1);
    messages.push_message(Vec::from(circuit)).unwrap();

    let proof: R1CSProof = bincode::deserialize(proof_ser).unwrap();

    zkinterface_backend::verify(&messages, &proof).is_ok()
}
