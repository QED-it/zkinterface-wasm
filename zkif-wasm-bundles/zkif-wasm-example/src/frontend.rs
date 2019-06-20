use wasm_bindgen::prelude::wasm_bindgen;
use zkinterface::examples::{
    example_circuit_inputs, write_example_constraints, write_example_witness_inputs,
};

/// Generate a test circuit constraints.
#[wasm_bindgen]
pub fn make_circuit(x: u32, y: u32, zz: u32) -> Vec<u8> {
    let mut msg = vec![];

    write_example_constraints(&mut msg).unwrap();

    example_circuit_inputs(x, y, zz).write(&mut msg).unwrap();

    msg
}

/// Generate a witness.
#[wasm_bindgen]
pub fn make_witness(x: u32, y: u32) -> Vec<u8> {
    let mut msg = vec![];
    write_example_witness_inputs(&mut msg, x, y).unwrap();
    msg
}
