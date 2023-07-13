import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "@translations/ru/index.json";
import novoyaz from "@translations/novoyaz/index.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: ru
      },
      novoyaz: {
        translation: novoyaz
      }
    },
    
    lng: "novoyaz",
    fallbackLng: "ru",

    interpolation: {
      escapeValue: false
    }
  });