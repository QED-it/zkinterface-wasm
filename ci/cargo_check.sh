#!/bin/bash

set +x

echo executing cargo_check.sh

cd ../zkif-wasm-bundles/zkif-wasm-bulletproofs/
cargo fmt -- --check
cargo clippy -- -D warnings
cargo test

cd ../zkif-wasm-example
cargo fmt -- --check
cargo clippy -- -D warnings
cargo test

cd ../zkif-wasm-zokrates
cargo fmt -- --check
cargo clippy -- -D warnings
cargo test


