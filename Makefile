build:
	wasm-pack build --out-dir ../www/pkg/zkif-wasm-zokrates/     zkif-wasm-zokrates
	wasm-pack build --out-dir ../www/pkg/zkif-wasm-bulletproofs/ zkif-wasm-bulletproofs

web-dev:
	cd www && npm run start
