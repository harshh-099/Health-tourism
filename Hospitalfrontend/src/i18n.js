import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Navbar translations
          "home": "Home",
          "filterByCountry": "Filter by Country",
          "filterByState": "Filter by State",
          "filterByCity": "Filter by City",
          "filterBySpecialty": "Filter by Specialty",
          "allCountries": "All Countries",
          "allStates": "All States",
          "allCities": "All Cities",
          "allSpecialties": "All Specialties",
          "searchPlaceholder": "Search country or name",
          "country": "Country",
          "state": "State",
          "city": "City",
          "specialty": "Specialty",
          "Multi-Specialty": "Multi-specialty",

          
          // Home translations
          "seeDetails": "SEE DETAILS",
          "bestValue": "Best Value",
          "Cardiology": "Cardiology",
          "noHospitals": "No hospitals match your filter criteria",
          "tryChanging": "Try changing your filters or view all hospitals",
          
          // Language toggle
          "english": "English",
          "hindi": "हिंदी"
        }
      },
      hi: {
        translation: {
          // Navbar translations
          "home": "होम",
          "filterByCountry": "देश द्वारा फ़िल्टर करें",
          "filterByState": "राज्य द्वारा फ़िल्टर करें",
          "filterByCity": "शहर द्वारा फ़िल्टर करें",
          "filterBySpecialty": "विशेषता द्वारा फ़िल्टर करें",
          "allCountries": "सभी देश",
          "allStates": "सभी राज्य",
          "allCities": "सभी शहर",
          "allSpecialties": "सभी विशेषताएं",
          "searchPlaceholder": "राज्य या बीमारी खोजें",
          "country": "देश",
          "state": "राज्य",
          "city": "शहर",
          "specialty": "विशेषता",
          "Multi-Specialty": "मल्टी विशेषता",
          
          // Home translations
          "seeDetails": "विवरण देखें",
          "bestValue": "सर्वोत्तम मूल्य",
          "Cardiology": "कार्डियोलॉजी",
          "noHospitals": "आपके फ़िल्टर मानदंडों से मेल खाने वाले कोई अस्पताल नहीं हैं",
          "tryChanging": "अपने फ़िल्टर बदलें या सभी अस्पताल देखें",
          
          // Language toggle
          "english": "English",
          "hindi": "हिंदी"
        }
      }
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;