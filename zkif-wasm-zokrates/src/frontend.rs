use std::collections::HashMap;
use wasm_bindgen::prelude::{JsValue, wasm_bindgen};
use zkinterface::{
    reading::{Messages, split_messages},
    zkinterface_generated::zkinterface::get_size_prefixed_root_as_root,
};
use zokrates_core::{
    compile::compile,
    ir::Prog,
    proof_system::zkinterface::{generate_proof, setup},
};
use zokrates_field::field::FieldPrime;


fn compile_prog(code: &str) -> Prog<FieldPrime> {
    compile::<FieldPrime, &[u8], &[u8], std::io::Error>(
        &mut code.as_bytes(), None, None).unwrap()
}

/// Generate a constraint system.
#[wasm_bindgen]
pub fn make_constraint_system(code: &str) -> Vec<u8> {
    let mut msg = Vec::<u8>::new();
    setup(compile_prog(code), &mut msg);
    msg
}

/// Generate a witness.
/// Return (data for prover, data for verifier).
#[wasm_bindgen]
pub fn make_witness(code: &str, x: u32, y: u32) -> JsValue /* Instance */ {
    let mut prover_msg = Vec::<u8>::new();

    let program = compile_prog(code);

    let witness = program
        .clone()
        .execute::<FieldPrime>(&vec![FieldPrime::from(x), FieldPrime::from(y)])
        .unwrap();

    generate_proof(program, witness, &mut prover_msg);

    let verifier_msg = get_verifier_msg(&prover_msg).unwrap();

    JsValue::from_serde(&Instance { prover_msg, verifier_msg }).unwrap()
}

#[derive(Serialize)]
pub struct Instance {
    /// Contains public and private inputs.
    prover_msg: Vec<u8>,
    /// Contains only public inputs.
    verifier_msg: Vec<u8>,
}

/// Search for the circuit message.
fn get_verifier_msg(prover_messages: &[u8]) -> Option<Vec<u8>> {
    for msg in split_messages(prover_messages) {
        let root = get_size_prefixed_root_as_root(msg);
        if root.message_as_circuit().is_some() {
            return Some(Vec::from(msg));
        }
    }
    None
}

#[wasm_bindgen]
pub fn parse_verifier_msg(verifier_msg: &[u8]) -> JsValue /* HashMap<u64, Vec<u8>> */ {
    let messages = &mut Messages::new(1);
    messages.push_message(Vec::from(verifier_msg)).unwrap();

    let connections = messages.connection_variables().unwrap();

    let mut public_inputs = HashMap::<u64, Vec<u8>>::new();
    for var in connections {
        public_inputs.insert(var.id, Vec::from(var.value));
    }

    JsValue::from_serde(&public_inputs).unwrap()
}

#[wasm_bindgen]
pub fn pretty(msg: Vec<u8>) -> String {
    let messages = &mut Messages::new(1);
    messages.push_message(msg).unwrap();
    format!("{:?}", messages)
}
