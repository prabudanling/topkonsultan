/**
 * 195 bahasa dunia yang dapat dipilih pengunjung.
 * - code   : penanda BCP-47 / ISO 639 yang dipakai untuk <html lang> & Oracle AI
 * - native : nama bahasa dalam aksara aslinya (dipakai di pemilih bahasa)
 * - id     : nama bahasa dalam Bahasa Indonesia
 * - en     : nama bahasa dalam Bahasa Inggris (membantu pencarian)
 * - rtl    : bahasa kanan-ke-kiri
 * - popular: ditampilkan di bagian "Populer" pemilih bahasa
 */

export type LanguageRegion =
  | "Asia Tenggara"
  | "Asia Timur"
  | "Asia Selatan"
  | "Asia Tengah & Kaukasus"
  | "Timur Tengah"
  | "Eropa"
  | "Afrika"
  | "Amerika"
  | "Oseania"
  | "Internasional";

export interface LanguageEntry {
  code: string;
  native: string;
  id: string;
  en: string;
  region: LanguageRegion;
  rtl?: boolean;
  popular?: boolean;
}

export const LANGUAGES: LanguageEntry[] = [
  /* ------------------------------ Asia Tenggara ----------------------------- */
  { code: "id", native: "Bahasa Indonesia", id: "Bahasa Indonesia", en: "Indonesian", region: "Asia Tenggara", popular: true },
  { code: "ms", native: "Bahasa Melayu", id: "Bahasa Melayu", en: "Malay", region: "Asia Tenggara" },
  { code: "jv", native: "Basa Jawa", id: "Bahasa Jawa", en: "Javanese", region: "Asia Tenggara" },
  { code: "su", native: "Basa Sunda", id: "Bahasa Sunda", en: "Sundanese", region: "Asia Tenggara" },
  { code: "ban", native: "Basa Bali", id: "Bahasa Bali", en: "Balinese", region: "Asia Tenggara" },
  { code: "mad", native: "Basa Madhura", id: "Bahasa Madura", en: "Madurese", region: "Asia Tenggara" },
  { code: "bug", native: "Basa Ugi", id: "Bahasa Bugis", en: "Buginese", region: "Asia Tenggara" },
  { code: "min", native: "Baso Minangkabau", id: "Bahasa Minangkabau", en: "Minangkabau", region: "Asia Tenggara" },
  { code: "ace", native: "Basa Acèh", id: "Bahasa Aceh", en: "Acehnese", region: "Asia Tenggara" },
  { code: "bjn", native: "Bahasa Banjar", id: "Bahasa Banjar", en: "Banjarese", region: "Asia Tenggara" },
  { code: "tl", native: "Filipino", id: "Bahasa Filipino", en: "Filipino", region: "Asia Tenggara" },
  { code: "ceb", native: "Binisaya", id: "Bahasa Cebuano", en: "Cebuano", region: "Asia Tenggara" },
  { code: "th", native: "ไทย", id: "Bahasa Thai", en: "Thai", region: "Asia Tenggara", popular: true },
  { code: "vi", native: "Tiếng Việt", id: "Bahasa Vietnam", en: "Vietnamese", region: "Asia Tenggara" },
  { code: "km", native: "ខ្មែរ", id: "Bahasa Khmer", en: "Khmer", region: "Asia Tenggara" },
  { code: "lo", native: "ລາວ", id: "Bahasa Lao", en: "Lao", region: "Asia Tenggara" },
  { code: "my", native: "ဗမာ", id: "Bahasa Burma", en: "Burmese", region: "Asia Tenggara" },
  { code: "tet", native: "Tetun", id: "Bahasa Tetum", en: "Tetum", region: "Asia Tenggara" },
  /* -------------------------------- Asia Timur ------------------------------- */
  { code: "ja", native: "日本語", id: "Bahasa Jepang", en: "Japanese", region: "Asia Timur", popular: true },
  { code: "ko", native: "한국어", id: "Bahasa Korea", en: "Korean", region: "Asia Timur", popular: true },
  { code: "zh-CN", native: "简体中文", id: "Bahasa Tionghoa (Sederhana)", en: "Chinese (Simplified)", region: "Asia Timur", popular: true },
  { code: "zh-TW", native: "繁體中文", id: "Bahasa Tionghoa (Tradisional)", en: "Chinese (Traditional)", region: "Asia Timur" },
  { code: "yue", native: "粵語", id: "Bahasa Kanton", en: "Cantonese", region: "Asia Timur" },
  { code: "nan", native: "閩南語", id: "Bahasa Hokkien", en: "Min Nan (Hokkien)", region: "Asia Timur" },
  { code: "hak", native: "客家话", id: "Bahasa Hakka", en: "Hakka Chinese", region: "Asia Timur" },
  { code: "wuu", native: "吴语", id: "Bahasa Wu (Shanghai)", en: "Wu Chinese", region: "Asia Timur" },
  { code: "mn", native: "Монгол хэл", id: "Bahasa Mongolia", en: "Mongolian", region: "Asia Timur" },
  { code: "bo", native: "བོད་སྐད་", id: "Bahasa Tibet", en: "Tibetan", region: "Asia Timur" },
  { code: "ug", native: "ئۇيغۇرچە", id: "Bahasa Uighur", en: "Uyghur", region: "Asia Timur", rtl: true },
  /* ------------------------------- Asia Selatan ------------------------------ */
  { code: "hi", native: "हिन्दी", id: "Bahasa Hindi", en: "Hindi", region: "Asia Selatan", popular: true },
  { code: "bn", native: "বাংলা", id: "Bahasa Bengali", en: "Bengali", region: "Asia Selatan" },
  { code: "ur", native: "اردو", id: "Bahasa Urdu", en: "Urdu", region: "Asia Selatan", rtl: true },
  { code: "ta", native: "தமிழ்", id: "Bahasa Tamil", en: "Tamil", region: "Asia Selatan" },
  { code: "te", native: "తెలుగు", id: "Bahasa Telugu", en: "Telugu", region: "Asia Selatan" },
  { code: "kn", native: "ಕನ್ನಡ", id: "Bahasa Kannada", en: "Kannada", region: "Asia Selatan" },
  { code: "ml", native: "മലയാളം", id: "Bahasa Malayalam", en: "Malayalam", region: "Asia Selatan" },
  { code: "mr", native: "मराठी", id: "Bahasa Marathi", en: "Marathi", region: "Asia Selatan" },
  { code: "gu", native: "ગુજરાતી", id: "Bahasa Gujarat", en: "Gujarati", region: "Asia Selatan" },
  { code: "pa", native: "ਪੰਜਾਬੀ", id: "Bahasa Punjabi", en: "Punjabi", region: "Asia Selatan" },
  { code: "or", native: "ଓଡ଼ିଆ", id: "Bahasa Odia", en: "Odia", region: "Asia Selatan" },
  { code: "as", native: "অসমীয়া", id: "Bahasa Assam", en: "Assamese", region: "Asia Selatan" },
  { code: "ne", native: "नेपाली", id: "Bahasa Nepal", en: "Nepali", region: "Asia Selatan" },
  { code: "si", native: "සිංහල", id: "Bahasa Sinhala", en: "Sinhala", region: "Asia Selatan" },
  { code: "sa", native: "संस्कृतम्", id: "Bahasa Sanskerta", en: "Sanskrit", region: "Asia Selatan" },
  { code: "mai", native: "मैथिली", id: "Bahasa Maithili", en: "Maithili", region: "Asia Selatan" },
  { code: "bho", native: "भोजपुरी", id: "Bahasa Bhojpuri", en: "Bhojpuri", region: "Asia Selatan" },
  { code: "kok", native: "कोंकणी", id: "Bahasa Konkani", en: "Konkani", region: "Asia Selatan" },
  { code: "brx", native: "बड़ो", id: "Bahasa Bodo", en: "Bodo", region: "Asia Selatan" },
  { code: "lus", native: "Mizo ṭawng", id: "Bahasa Mizo", en: "Mizo", region: "Asia Selatan" },
  { code: "tcy", native: "ತುಳು", id: "Bahasa Tulu", en: "Tulu", region: "Asia Selatan" },
  { code: "hne", native: "छत्तीसगढ़ी", id: "Bahasa Chhattisgarhi", en: "Chhattisgarhi", region: "Asia Selatan" },
  { code: "mni", native: "ꯃꯤꯇꯩꯂꯣꯟ", id: "Bahasa Meitei", en: "Meitei (Manipuri)", region: "Asia Selatan" },
  { code: "pnb", native: "پنجابی", id: "Bahasa Punjabi Barat", en: "Western Punjabi", region: "Asia Selatan", rtl: true },
  { code: "skr", native: "سرائیکی", id: "Bahasa Saraiki", en: "Saraiki", region: "Asia Selatan", rtl: true },
  /* ------------------------ Asia Tengah & Kaukasus --------------------------- */
  { code: "kk", native: "Қазақ тілі", id: "Bahasa Kazakh", en: "Kazakh", region: "Asia Tengah & Kaukasus" },
  { code: "uz", native: "Oʻzbek tili", id: "Bahasa Uzbek", en: "Uzbek", region: "Asia Tengah & Kaukasus" },
  { code: "ky", native: "Кыргызча", id: "Bahasa Kirgiz", en: "Kyrgyz", region: "Asia Tengah & Kaukasus" },
  { code: "tg", native: "Тоҷикӣ", id: "Bahasa Tajik", en: "Tajik", region: "Asia Tengah & Kaukasus" },
  { code: "tk", native: "Türkmen dili", id: "Bahasa Turkmen", en: "Turkmen", region: "Asia Tengah & Kaukasus" },
  { code: "az", native: "Azərbaycan dili", id: "Bahasa Azerbaijan", en: "Azerbaijani", region: "Asia Tengah & Kaukasus" },
  { code: "hy", native: "Հայերեն", id: "Bahasa Armenia", en: "Armenian", region: "Asia Tengah & Kaukasus" },
  { code: "ka", native: "ქართული", id: "Bahasa Georgia", en: "Georgian", region: "Asia Tengah & Kaukasus" },
  { code: "ce", native: "Нохчийн", id: "Bahasa Chechnya", en: "Chechen", region: "Asia Tengah & Kaukasus" },
  { code: "tt", native: "Татар теле", id: "Bahasa Tatar", en: "Tatar", region: "Asia Tengah & Kaukasus" },
  { code: "ba", native: "Башҡортса", id: "Bahasa Bashkir", en: "Bashkir", region: "Asia Tengah & Kaukasus" },
  { code: "cv", native: "Чӑвашла", id: "Bahasa Chuvash", en: "Chuvash", region: "Asia Tengah & Kaukasus" },
  { code: "kbd", native: "Къэбэрдеибзэ", id: "Bahasa Kabardian", en: "Kabardian", region: "Asia Tengah & Kaukasus" },
  { code: "av", native: "Авар мацӏ", id: "Bahasa Avar", en: "Avaric", region: "Asia Tengah & Kaukasus" },
  { code: "lez", native: "Лезги чӏал", id: "Bahasa Lezgi", en: "Lezgian", region: "Asia Tengah & Kaukasus" },
  { code: "crh", native: "Qırımtatarca", id: "Bahasa Tatar Krimea", en: "Crimean Tatar", region: "Asia Tengah & Kaukasus" },
  { code: "sah", native: "Саха тыла", id: "Bahasa Sakha", en: "Yakut (Sakha)", region: "Asia Tengah & Kaukasus" },
  { code: "tyv", native: "Тыва дыл", id: "Bahasa Tuva", en: "Tuvan", region: "Asia Tengah & Kaukasus" },
  /* ------------------------------- Timur Tengah ------------------------------ */
  { code: "ar", native: "العربية", id: "Bahasa Arab", en: "Arabic", region: "Timur Tengah", rtl: true, popular: true },
  { code: "fa", native: "فارسی", id: "Bahasa Persia", en: "Persian (Farsi)", region: "Timur Tengah", rtl: true },
  { code: "he", native: "עברית", id: "Bahasa Ibrani", en: "Hebrew", region: "Timur Tengah", rtl: true },
  { code: "ku", native: "کوردی", id: "Bahasa Kurdi", en: "Kurdish", region: "Timur Tengah", rtl: true },
  { code: "ckb", native: "کوردیی ناوەندی", id: "Bahasa Kurdi Sorani", en: "Sorani Kurdish", region: "Timur Tengah", rtl: true },
  { code: "ps", native: "پښتو", id: "Bahasa Pashto", en: "Pashto", region: "Timur Tengah", rtl: true },
  { code: "sd", native: "سنڌي", id: "Bahasa Sindhi", en: "Sindhi", region: "Timur Tengah", rtl: true },
  { code: "bal", native: "بلوچی", id: "Bahasa Balochi", en: "Balochi", region: "Timur Tengah", rtl: true },
  { code: "zza", native: "Zazakî", id: "Bahasa Zaza", en: "Zazaki", region: "Timur Tengah" },
  { code: "mzn", native: "مازِرونی", id: "Bahasa Mazanderani", en: "Mazanderani", region: "Timur Tengah", rtl: true },
  { code: "glk", native: "گیلکی", id: "Bahasa Gilaki", en: "Gilaki", region: "Timur Tengah", rtl: true },
  { code: "os", native: "Ирон", id: "Bahasa Ossetia", en: "Ossetian", region: "Timur Tengah" },
  /* --------------------------------- Eropa ----------------------------------- */
  { code: "en", native: "English", id: "Bahasa Inggris", en: "English", region: "Eropa", popular: true },
  { code: "fr", native: "Français", id: "Bahasa Prancis", en: "French", region: "Eropa", popular: true },
  { code: "de", native: "Deutsch", id: "Bahasa Jerman", en: "German", region: "Eropa", popular: true },
  { code: "es", native: "Español", id: "Bahasa Spanyol", en: "Spanish", region: "Eropa", popular: true },
  { code: "pt", native: "Português", id: "Bahasa Portugis", en: "Portuguese", region: "Eropa", popular: true },
  { code: "it", native: "Italiano", id: "Bahasa Italia", en: "Italian", region: "Eropa" },
  { code: "nl", native: "Nederlands", id: "Bahasa Belanda", en: "Dutch", region: "Eropa" },
  { code: "ru", native: "Русский", id: "Bahasa Rusia", en: "Russian", region: "Eropa", popular: true },
  { code: "uk", native: "Українська", id: "Bahasa Ukraina", en: "Ukrainian", region: "Eropa" },
  { code: "be", native: "Беларуская", id: "Bahasa Belarus", en: "Belarusian", region: "Eropa" },
  { code: "pl", native: "Polski", id: "Bahasa Polandia", en: "Polish", region: "Eropa" },
  { code: "cs", native: "Čeština", id: "Bahasa Ceko", en: "Czech", region: "Eropa" },
  { code: "sk", native: "Slovenčina", id: "Bahasa Slovakia", en: "Slovak", region: "Eropa" },
  { code: "hu", native: "Magyar", id: "Bahasa Hungaria", en: "Hungarian", region: "Eropa" },
  { code: "ro", native: "Română", id: "Bahasa Rumania", en: "Romanian", region: "Eropa" },
  { code: "bg", native: "Български", id: "Bahasa Bulgaria", en: "Bulgarian", region: "Eropa" },
  { code: "mk", native: "Македонски", id: "Bahasa Makedonia", en: "Macedonian", region: "Eropa" },
  { code: "sr", native: "Српски", id: "Bahasa Serbia", en: "Serbian", region: "Eropa" },
  { code: "hr", native: "Hrvatski", id: "Bahasa Kroasia", en: "Croatian", region: "Eropa" },
  { code: "bs", native: "Bosanski", id: "Bahasa Bosnia", en: "Bosnian", region: "Eropa" },
  { code: "sl", native: "Slovenščina", id: "Bahasa Slovenia", en: "Slovenian", region: "Eropa" },
  { code: "sq", native: "Shqip", id: "Bahasa Albania", en: "Albanian", region: "Eropa" },
  { code: "el", native: "Ελληνικά", id: "Bahasa Yunani", en: "Greek", region: "Eropa" },
  { code: "sv", native: "Svenska", id: "Bahasa Swedia", en: "Swedish", region: "Eropa" },
  { code: "da", native: "Dansk", id: "Bahasa Denmark", en: "Danish", region: "Eropa" },
  { code: "nb", native: "Norsk bokmål", id: "Bahasa Norwegia", en: "Norwegian Bokmål", region: "Eropa" },
  { code: "fi", native: "Suomi", id: "Bahasa Finlandia", en: "Finnish", region: "Eropa" },
  { code: "is", native: "Íslenska", id: "Bahasa Islandia", en: "Icelandic", region: "Eropa" },
  { code: "fo", native: "Føroyskt", id: "Bahasa Faroe", en: "Faroese", region: "Eropa" },
  { code: "et", native: "Eesti", id: "Bahasa Estonia", en: "Estonian", region: "Eropa" },
  { code: "lv", native: "Latviešu", id: "Bahasa Latvia", en: "Latvian", region: "Eropa" },
  { code: "lt", native: "Lietuvių", id: "Bahasa Lituania", en: "Lithuanian", region: "Eropa" },
  { code: "ca", native: "Català", id: "Bahasa Katalan", en: "Catalan", region: "Eropa" },
  { code: "gl", native: "Galego", id: "Bahasa Galisia", en: "Galician", region: "Eropa" },
  { code: "eu", native: "Euskara", id: "Bahasa Basque", en: "Basque", region: "Eropa" },
  { code: "oc", native: "Occitan", id: "Bahasa Oksitan", en: "Occitan", region: "Eropa" },
  { code: "co", native: "Corsu", id: "Bahasa Korsika", en: "Corsican", region: "Eropa" },
  { code: "sc", native: "Sardu", id: "Bahasa Sardinia", en: "Sardinian", region: "Eropa" },
  { code: "scn", native: "Sicilianu", id: "Bahasa Sisilia", en: "Sicilian", region: "Eropa" },
  { code: "ast", native: "Asturianu", id: "Bahasa Asturia", en: "Asturian", region: "Eropa" },
  { code: "rm", native: "Rumantsch", id: "Bahasa Romansh", en: "Romansh", region: "Eropa" },
  { code: "lb", native: "Lëtzebuergesch", id: "Bahasa Luksemburg", en: "Luxembourgish", region: "Eropa" },
  { code: "fy", native: "Frysk", id: "Bahasa Frisia", en: "Frisian", region: "Eropa" },
  { code: "nds", native: "Plattdüütsch", id: "Bahasa Jerman Rendah", en: "Low German", region: "Eropa" },
  { code: "cy", native: "Cymraeg", id: "Bahasa Wales", en: "Welsh", region: "Eropa" },
  { code: "ga", native: "Gaeilge", id: "Bahasa Irlandia", en: "Irish", region: "Eropa" },
  { code: "gd", native: "Gàidhlig", id: "Bahasa Gaelik Skotlandia", en: "Scottish Gaelic", region: "Eropa" },
  { code: "gv", native: "Gaelg", id: "Bahasa Manx", en: "Manx", region: "Eropa" },
  { code: "br", native: "Brezhoneg", id: "Bahasa Breton", en: "Breton", region: "Eropa" },
  { code: "kw", native: "Kernewek", id: "Bahasa Kernowak", en: "Cornish", region: "Eropa" },
  { code: "mt", native: "Malti", id: "Bahasa Malta", en: "Maltese", region: "Eropa" },
  { code: "se", native: "Davvisámegiella", id: "Bahasa Sami Utara", en: "Northern Sami", region: "Eropa" },
  { code: "la", native: "Latine", id: "Bahasa Latin", en: "Latin", region: "Eropa" },
  { code: "yi", native: "ייִדיש", id: "Bahasa Yiddish", en: "Yiddish", region: "Eropa", rtl: true },
  { code: "lad", native: "Djudeo-Espanyol", id: "Bahasa Ladino", en: "Ladino", region: "Eropa" },
  /* --------------------------------- Afrika ---------------------------------- */
  { code: "sw", native: "Kiswahili", id: "Bahasa Swahili", en: "Swahili", region: "Afrika", popular: true },
  { code: "am", native: "አማርኛ", id: "Bahasa Amharik", en: "Amharic", region: "Afrika" },
  { code: "ti", native: "ትግርኛ", id: "Bahasa Tigrinya", en: "Tigrinya", region: "Afrika" },
  { code: "so", native: "Soomaali", id: "Bahasa Somali", en: "Somali", region: "Afrika" },
  { code: "aa", native: "Qafaraf", id: "Bahasa Afar", en: "Afar", region: "Afrika" },
  { code: "om", native: "Afaan Oromoo", id: "Bahasa Oromo", en: "Oromo", region: "Afrika" },
  { code: "ha", native: "Hausa", id: "Bahasa Hausa", en: "Hausa", region: "Afrika" },
  { code: "yo", native: "Yorùbá", id: "Bahasa Yoruba", en: "Yoruba", region: "Afrika" },
  { code: "ig", native: "Asụsụ Igbo", id: "Bahasa Igbo", en: "Igbo", region: "Afrika" },
  { code: "ff", native: "Fulfulde", id: "Bahasa Fula", en: "Fula", region: "Afrika" },
  { code: "wo", native: "Wolof", id: "Bahasa Wolof", en: "Wolof", region: "Afrika" },
  { code: "bm", native: "Bamanankan", id: "Bahasa Bambara", en: "Bambara", region: "Afrika" },
  { code: "ee", native: "Eʋegbe", id: "Bahasa Ewe", en: "Ewe", region: "Afrika" },
  { code: "tw", native: "Asante Twi", id: "Bahasa Twi", en: "Akan (Twi)", region: "Afrika" },
  { code: "fon", native: "Fɔngbè", id: "Bahasa Fon", en: "Fon", region: "Afrika" },
  { code: "ln", native: "Lingála", id: "Bahasa Lingala", en: "Lingala", region: "Afrika" },
  { code: "mos", native: "Mooré", id: "Bahasa Mooré", en: "Mossi", region: "Afrika" },
  { code: "rn", native: "Ikirundi", id: "Bahasa Kirundi", en: "Kirundi", region: "Afrika" },
  { code: "rw", native: "Ikinyarwanda", id: "Bahasa Kinyarwanda", en: "Kinyarwanda", region: "Afrika" },
  { code: "ny", native: "Chichewa", id: "Bahasa Chichewa", en: "Chichewa", region: "Afrika" },
  { code: "sn", native: "Chishona", id: "Bahasa Shona", en: "Shona", region: "Afrika" },
  { code: "ve", native: "Tshivenda", id: "Bahasa Venda", en: "Venda", region: "Afrika" },
  { code: "ts", native: "Xitsonga", id: "Bahasa Tsonga", en: "Tsonga", region: "Afrika" },
  { code: "st", native: "Sesotho", id: "Bahasa Sesotho", en: "Southern Sotho", region: "Afrika" },
  { code: "tn", native: "Setswana", id: "Bahasa Tswana", en: "Tswana", region: "Afrika" },
  { code: "zu", native: "isiZulu", id: "Bahasa Zulu", en: "Zulu", region: "Afrika" },
  { code: "xh", native: "isiXhosa", id: "Bahasa Xhosa", en: "Xhosa", region: "Afrika" },
  { code: "nso", native: "Sepedi", id: "Bahasa Sepedi", en: "Northern Sotho", region: "Afrika" },
  { code: "af", native: "Afrikaans", id: "Bahasa Afrikaans", en: "Afrikaans", region: "Afrika" },
  { code: "pcm", native: "Naijá", id: "Bahasa Pijin Nigeria", en: "Nigerian Pidgin", region: "Afrika" },
  { code: "kri", native: "Krio", id: "Bahasa Krio", en: "Krio", region: "Afrika" },
  { code: "mg", native: "Malagasy", id: "Bahasa Malagasi", en: "Malagasy", region: "Afrika" },
  { code: "zgh", native: "ⵜⴰⵎⴰⵣⵉⵖⵜ", id: "Bahasa Tamazight", en: "Tamazight", region: "Afrika" },
  /* --------------------------------- Amerika --------------------------------- */
  { code: "qu", native: "Runa Simi", id: "Bahasa Quechua", en: "Quechua", region: "Amerika" },
  { code: "ay", native: "Aymar aru", id: "Bahasa Aymara", en: "Aymara", region: "Amerika" },
  { code: "gn", native: "Avañe'ẽ", id: "Bahasa Guarani", en: "Guarani", region: "Amerika" },
  { code: "nah", native: "Nāhuatl", id: "Bahasa Nahuatl", en: "Nahuatl", region: "Amerika" },
  { code: "yua", native: "Màaya T'àan", id: "Bahasa Maya Yucatan", en: "Yucatec Maya", region: "Amerika" },
  { code: "arn", native: "Mapudungun", id: "Bahasa Mapuche", en: "Mapuche", region: "Amerika" },
  { code: "chr", native: "ᏣᎳᎩ", id: "Bahasa Cherokee", en: "Cherokee", region: "Amerika" },
  { code: "ht", native: "Kreyòl Ayisyen", id: "Bahasa Kreol Haiti", en: "Haitian Creole", region: "Amerika" },
  { code: "srn", native: "Sranantongo", id: "Bahasa Sranan Tongo", en: "Sranan Tongo", region: "Amerika" },
  { code: "pap", native: "Papiamento", id: "Bahasa Papiamento", en: "Papiamento", region: "Amerika" },
  { code: "iu", native: "ᐃᓄᒃᑎᑐᑦ", id: "Bahasa Inuktitut", en: "Inuktitut", region: "Amerika" },
  { code: "kl", native: "Kalaallisut", id: "Bahasa Kalaallisut", en: "Greenlandic", region: "Amerika" },
  /* --------------------------------- Oseania --------------------------------- */
  { code: "mi", native: "Te Reo Māori", id: "Bahasa Maori", en: "Māori", region: "Oseania" },
  { code: "sm", native: "Gagana Sāmoa", id: "Bahasa Samoa", en: "Samoan", region: "Oseania" },
  { code: "to", native: "Lea faka-Tonga", id: "Bahasa Tonga", en: "Tongan", region: "Oseania" },
  { code: "fj", native: "Na Vosa Vakaviti", id: "Bahasa Fiji", en: "Fijian", region: "Oseania" },
  { code: "ty", native: "Reo Tahiti", id: "Bahasa Tahiti", en: "Tahitian", region: "Oseania" },
  { code: "haw", native: "ʻŌlelo Hawaiʻi", id: "Bahasa Hawaii", en: "Hawaiian", region: "Oseania" },
  { code: "ch", native: "CHamoru", id: "Bahasa Chamorro", en: "Chamorro", region: "Oseania" },
  { code: "tpi", native: "Tok Pisin", id: "Bahasa Tok Pisin", en: "Tok Pisin", region: "Oseania" },
  { code: "bi", native: "Bislama", id: "Bahasa Bislama", en: "Bislama", region: "Oseania" },
  /* ------------------------------- Internasional ----------------------------- */
  { code: "eo", native: "Esperanto", id: "Bahasa Esperanto", en: "Esperanto", region: "Internasional" },
  { code: "ia", native: "Interlingua", id: "Bahasa Interlingua", en: "Interlingua", region: "Internasional" },
];

/** Jumlah bahasa yang tersedia (195). */
export const LANGUAGE_COUNT = LANGUAGES.length;

const LANGUAGE_MAP: Record<string, LanguageEntry> = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l])
);

/** Cari entri bahasa berdasarkan kodenya. */
export function getLanguage(code: string): LanguageEntry | undefined {
  return LANGUAGE_MAP[code];
}

/** Daftar bahasa populer untuk bagian unggulan di pemilih bahasa. */
export const POPULAR_LANGUAGES = LANGUAGES.filter((l) => l.popular);
