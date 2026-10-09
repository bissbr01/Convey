import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  {
    extends: [...nextCoreWebVitals],
  },
  {
    // These rules are new in the Next 16 preset. The call sites are existing
    // Pages Router code and are not part of this upgrade.
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
  {
    // next lint never checked these trees.
    ignores: ["cypress/**", "public/**"],
  },
]);
