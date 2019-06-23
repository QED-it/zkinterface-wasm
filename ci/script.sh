#!/bin/bash

set +x

echo executing scripit.sh

cd ./zkif-wasm-bundles/zkif-wasm-bulletproofs/
cargo +nightly-2019-06-22 fmt -- --check
cargo +nightly-2019-06-22 clippy -- -D warnings
cargo +nightly-2019-06-22 test

cd ../zkif-wasm-example
cargo +nightly-2019-06-22 fmt -- --check
cargo +nightly-2019-06-22 clippy -- -D warnings
cargo +nightly-2019-06-22 test

cd ../zkif-wasm-zokrates
cargo +nightly-2019-06-22 fmt -- --check
cargo +nightly-2019-06-22 clippy -- -D warnings
cargo +nightly-2019-06-22 test


