// 공통 적용
import { nextJsConfig } from "@repo/eslint-config/next-js";

export default nextJsConfig;
// import { dirname } from "node:path";
// import { fileURLToPath } from "node:url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;
