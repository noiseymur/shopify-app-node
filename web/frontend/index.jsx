import ReactDOM from "react-dom/client";

import App from "./App";
import { initI18n } from "./utils/i18nUtils";

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
});
