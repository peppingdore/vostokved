import { useMemo, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Images, CheckCircle, XCircle, ChevronLeft, ChevronRight, X } from "lucide-react";

// =======================
// Настройки
// =======================
const LINKS = {
  vk: "https://vk.com/club226835222",
  tg: "https://t.me/orient_Kazan",
};

const imageNames = [
"1AtLbVcBiFPKZEuTCTOx9gFzQznie4HBiwp1YJVjeRhycmSPwqNNrPsIuPRNLhFD_z69xW9gLAizZETYqjJUsjhK.jpg",
"ATl47W9S5AaasdNPpoZoewMoNlW_I1jdz3BXYy90CVjYvtnf2JeX6vGWOz4WpZISkjkZIPg8bTAOJxKTf6FADXTK.jpg",
"J4DQJadxvyYvUP1uSe8L-SlLPuks4IQ1L4h5oFWyp-95dl6qeEpZSYSWDcq2sQoyYMaKv4zx-PiBnVZkVDVSqjMx.jpg",
"K8vNs4Zgc32Cny7HRCZLN5tU-xGFweeQShOL6tPVRKW9ocr-BNXRfs2WY9vUM3Ax1HqQWwgLGaJaRyhq0vufHJ-6.jpg",
"QTV-ctw9FVMfuhdf3cwWXWwMTRx4sM16-W8iTbmGAaWwgcDM02g1OQ34PyJDAhOobD3KLIIYceLXTrxLve03lCfa.jpg",
"RMScI_e7KxRljD5xBrrHvxzARwX0LckUXmBaH444TBbW2ly4U5sTPtrz7qI6OkhIBowiVlbUcULM1C9PsfSXXUJL.jpg",
"ZpzyV8GtiwidYaMfDfgg8EspXjJMuVx_CqM71OkcNs_lsIJc80yBgVMQQ0aIBokCzLfNdetFMK7GgaECiyiXST_t.jpg",
"dhxw4Yxge_wDHX71yeWM5Rz3-6TPrHZ9G0VYmZz2s5Rq9181er4KgVHQarX0q1jR7hp2Ib6-NnwMhfMF2u7g6wf8.jpg",
"lYqOZZtjapn4_iLc5RFHd3sa2hSlSXfA7a6KV-gFnNPUZv10SYmpTfvjbfwZBtukBWAmpnA4Sd3GXwv7mGxP_qnj.jpg",
"oHhb7WsLtrd0mNjnOrfUksYcF4rQu91A0EW8zV_5zQRsgaFlZuv0eBs_H9WdH26iVoY-kueCqjtegbB4DaXZLT5J.jpg",
"vZCMueJYaHpFzP0Idsz6rhpQq8RD-gPaaCk9OaIP4nQ_yva62ivbk-kYS7wERboBPj3wv5bykxC2hjm_dOExKGtk.jpg",
]

var imageUrls: any[] = [
  
];

imageNames.forEach(it => {
	imageUrls.push({min: "/images/minified/" + it, og: "/images/" + it})
});


const FORM_URL = "";

const PROJECT_DESCRIPTION = `«Восток & Ведение» – это развивающая программа, которая даёт условия для
самореализации молодёжи Республики Татарстан, способствует прохождению стажировок и улучшению востоковедческих навыков`;

import mainLogo from "./assets/main_logo.jpg"
const LOGOS = { main: mainLogo, rosmol: "" };

const THEME = {
  primary: "bg-gradient-to-r from-[#f7b308] to-[#f7b308]",
  primaryText: "text-stone-900",
  accent: "bg-gradient-to-r from-[#0a4029] to-[#0a4029]",
  accentText: "text-white",
  brownText: "text-stone-800",
  brownBg: "bg-stone-50",
  buttonText: "text-stone-900",
};

// =======================
// Диагностика
// =======================
function runDiagnostics() {
  const urlRe = /^https?:\/\//i;
  const tests: { name: string; pass: boolean; details?: string }[] = [];

  tests.push({
    name: "VK ссылка корректная",
    pass: typeof LINKS.vk === "string" && urlRe.test(LINKS.vk) && LINKS.vk.includes("vk.com"),
  });
  tests.push({
    name: "TG ссылка корректная",
    pass: typeof LINKS.tg === "string" && urlRe.test(LINKS.tg) && LINKS.tg.includes("t.me"),
  });

  const allStrings = imageUrls.every((u) => typeof u === "string" && !!u);
  tests.push({ name: "Картинки — все строки", pass: allStrings });
  tests.push({ name: "Картинок не более 30", pass: imageUrls.length <= 30, details: `сейчас: ${imageUrls.length}` });

  const dupCount = imageUrls.length - new Set(imageUrls).size;
  tests.push({ name: "Нет дубликатов картинок", pass: dupCount === 0, details: `дубликатов: ${dupCount}` });

  const seasonalChecks = [
    { m: 0, expected: false },
    { m: 7, expected: true },
    { m: 8, expected: true },
    { m: 9, expected: false },
  ];
  seasonalChecks.forEach(({ m, expected }) => {
    const isFormSeasonForMonth = (month: number) => [7, 8].includes(month);
    tests.push({ name: `Сезон для месяца ${m}`, pass: isFormSeasonForMonth(m) === expected });
  });

  return tests;
}

// =======================
// Основной компонент
// =======================
export default function App() {
  const [viewer, setViewer] = useState<number | null>(null);
  const [showDiag, _] = useState(false);

  const now = new Date();
  const month = now.getMonth();
  const isFormSeason = [7, 8].includes(month);
  const isFormReady = Boolean(FORM_URL);

  const openImages = useMemo(() => imageUrls.slice(0, 30), []);
  const tests = useMemo(() => runDiagnostics(), []);

  const navigateLightbox = (direction: "prev" | "next") => {
    if (viewer === null) return;
    const len = openImages.length;
    setViewer(direction === "prev" ? (viewer - 1 + len) % len : (viewer + 1) % len);
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans">
      {/* Hero */}
      <header className={`${THEME.brownBg} relative overflow-hidden `}>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-tr from-[#f7b308] to-[#f7b308] opacity-20 blur-3xl animate-spin-slow"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-[#18945f] to-[#18945f] opacity-20 blur-3xl animate-spin-slow"></div>

        <div className="mx-auto max-w-6xl px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            {LOGOS.main ? (
              <img src={LOGOS.main} alt="Логотип проекта" className="h-30 w-auto rounded-2xl shadow-lg" />
            ) : (
              <div className="h-20 w-20 rounded-2xl bg-[#f7b308] grid place-items-center text-stone-900 font-bold text-lg">ЛОГО</div>
            )}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900">
                Восток & Ведение
              </h1>
              <p className="mt-4 text-stone-600 max-w-prose">{PROJECT_DESCRIPTION}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            <a href={LINKS.vk} target="_blank" rel="noreferrer">
              <Button className={`rounded-3xl shadow-md flex items-center gap-2 bg-white hover:bg-stone-100 border  ${THEME.buttonText}`}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/VK.com-logo.svg" alt="VK" className="h-4 w-4" /> VK
              </Button>
            </a>
            <a href={LINKS.tg} target="_blank" rel="noreferrer">
              <Button className={`rounded-3xl shadow-md flex items-center gap-2 bg-white hover:bg-stone-100 border  ${THEME.buttonText}`}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" className="h-4 w-4" /> Telegram
              </Button>
            </a>
			<a href="#request">
              <Button className={`rounded-3xl shadow-md flex items-center gap-2 bg-white hover:bg-stone-100 border  ${THEME.buttonText}`}>
            	Участвовать в проекте <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Галерея */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 flex items-center gap-2">
            <Images className="h-6 w-6" /> Фотографии мероприятий
          </h2>
          <a href={"https://vk.com/albums-226835222"} target="_blank" rel="noreferrer" className="text-sm text-stone-600 hover:underline flex items-center gap-1">
            Больше фото ВК <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {openImages.length === 0 ? (
          <p className="text-stone-600">Добавьте ссылки на изображения в массив <code>imageUrls</code></p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {openImages.map((image, idx) => (
              <button
                key={idx}
                className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
                onClick={() => setViewer(idx)}
                aria-label={`Открыть фото ${idx + 1}`}
              >
                <img src={image.min} alt={`Фото ${idx + 1}`} loading="lazy" className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </button>
            ))}
          </div>
        )}

        {/* Лайтбокс */}
        {viewer !== null && (
          <div key={viewer} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center p-4">
            <img src={openImages[viewer].og} loading="lazy" alt={`Фото ${viewer + 1}`} className="max-h-[85vh] w-auto rounded-3xl shadow-2xl animate-fadeIn" />
            <button className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={() => setViewer(null)}>
              <X className="h-6 w-6" />
            </button>
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={() => navigateLightbox("prev") }>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={() => navigateLightbox("next") }>
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </section>

      {/* Заявка */}
      <section className={`${THEME.brownBg} py-12`}>
        <div id="request" className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">Заявка на участие</h2>
          <p className="text-stone-700 mb-6 max-w-prose mx-auto">
            Подача заявок открывается в августе–сентябре. Вне этого периода кнопка будет недоступна.
          </p>

          {isFormSeason && isFormReady ? (
            <a href={FORM_URL} target="_blank" rel="noreferrer">
              <Button size="lg" className={`rounded-3xl ${THEME.primary} ${THEME.primaryText} hover:brightness-95 transition-all`}>
                Открыть форму заявки
              </Button>
            </a>
          ) : (
            <Button size="lg" variant="secondary" disabled className="rounded-3xl" title="Форма откроется с 1 августа">
              Регистрация закрыта
            </Button>
          )}

          {!isFormReady && <p className="text-xs text-stone-500 mt-3">(Добавьте ссылку формы в <code>FORM_URL</code>)</p>}
        </div>
      </section>

      {/* Диагностика */}
      {/* <button onClick={() => setShowDiag((v) => !v)} className="fixed bottom-4 right-4 z-50 px-3 py-2 rounded-xl border bg-white/90 backdrop-blur shadow hover:shadow-md text-sm flex items-center gap-2">
        <Bug className="h-4 w-4" /> Проверка
      </button> */}

      {showDiag && (
        <div className="fixed bottom-16 right-4 z-50 w-[22rem] max-w-[95vw] rounded-2xl border bg-white shadow-lg">
          <div className="p-4 border-b font-semibold">Автотесты</div>
          <div className="p-4 space-y-2 max-h-80 overflow-auto">
            {tests.map((t, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                {t.pass ? <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /> : <XCircle className="h-4 w-4 text-red-600 mt-0.5" />}
                <div>
                  <div className="font-medium">{t.name}</div>
                  {t.details && <div className="text-stone-500">{t.details}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-10 bg-white">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            {LOGOS.rosmol ? (
              <img src={LOGOS.rosmol} alt="Росмолодёжь" className="h-10 w-auto" />
            ) : (
              <div className="px-4 py-2 rounded-xl border border-[#f7b308] text-sm text-stone-700">Создано с Росмолодёжь.Гранты</div>
            )}
          </div>
          <div className="text-sm text-stone-500">© {new Date().getFullYear()} «Восток & Ведение». Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}
