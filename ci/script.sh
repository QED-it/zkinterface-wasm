#!/bin/bash

set +x

echo -e "executing scripit.sh"

echo -e "processing bulletproof: checks & tests:"
cd ./zkif-wasm-bundles/zkif-wasm-bulletproofs/
cargo +nightly-2019-06-22 fmt -- --check
cargo +nightly-2019-06-22 clippy -- -D warnings
cargo +nightly-2019-06-22 test

echo -e "processing zk-interface wasm example: checks & tests:"
cd ../zkif-wasm-example
cargo +nightly-2019-06-22 fmt -- --check
cargo +nightly-2019-06-22 clippy -- -D warnings
cargo +nightly-2019-06-22 test

echo -e "processing zokrates: checks & tests:"
cd ../zkif-wasm-zokrates
cargo +nightly-2019-06-22 fmt -- --check
cargo +nightly-2019-06-22 clippy -- -D warnings
cargo +nightly-2019-06-22 test

cd ../../ci
make
# cd ../demo
#npm install
#npm run build
