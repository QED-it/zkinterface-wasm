build:
	wasm-pack build --out-dir ../../demo/pkg/zkif-wasm-zokrates/     zkif-wasm-bundles/zkif-wasm-zokrates
	wasm-pack build --out-dir ../../demo/pkg/zkif-wasm-bulletproofs/ zkif-wasm-bundles/zkif-wasm-bulletproofs

web-dev:
	cd www && npm run start
