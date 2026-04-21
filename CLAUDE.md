# NUJU.APP — COMPLETE BUILD SPECIFICATION
# Copy this entire file as CLAUDE.md in your project root.
# Claude Code and other coding agents will use this as the complete source of truth.
# Last updated: March 2026

---

## 1. PROJECT OVERVIEW

**Nuju.app** — Mobile-first AI journaling web app with mascot companion "Ju" (kawaii lavender teardrop spirit).
- **Tagline:** "The 30-second AI journal that understands your life"
- **Name:** "Nuju" = "new you" (EN) + "nulis jurnal" (ID for "write journal"). Mascot "Ju" from "jurnal."
- **Target:** Gen Z & Millennials, B2C Global + Indonesia
- **Vibe:** Premium wellness. Think Calm meets Duolingo — warm, trustworthy, slightly playful.

---

## 2. TECH STACK

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS 3.4 + inline styles
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **AI:** Google Gemini 2.0 Flash-Lite (free 1500 req/day)
- **Payments:** Lemon Squeezy
- **Deploy:** Vercel (auto-deploy from GitHub)
- **Mobile:** Capacitor (PWA → Google Play)

---

## 3. DESIGN SYSTEM

### 3.1 Color Palette

```
Primary:        #7C6EDB (purple — brand)
Light BG:       #F5F3FF, #EDE9FE, #E8E4F8
Body BG:        #F8F6FF (light), #13111C (dark)
Text Dark:      #1A1A2E
Text Muted:     #777, #999
Selection:      #7C6EDB30

Mood Colors:
  Mood 1 Rough:  #E8878C (pink)
  Mood 2 Low:    #6C9BCF (blue)
  Mood 3 Okay:   #FFB347 (orange)
  Mood 4 Good:   #95E1D3 (green)
  Mood 5 Great:  #4ECDC4 (teal)

Persona Colors:
  Gentle Guide:  #B8C4F0
  Tough Coach:   #D4A0D0
  Wise Sage:     #E8D5A3
  Fun Friend:    #A8E6CF
```

### 3.2 Dark Mode Theme

```
Light → Dark mapping:
  Background:  #F5F3FF → #13111C / #1A1730 / #1E1B36
  Card BG:     rgba(255,255,255,0.5) → rgba(30,27,54,0.7)
  Text:        #1A1A2E → #E8E4F8
  Muted:       #777 → #9B93C0 / #7B6FC0 / #B0A8D8
  Border:      rgba(255,255,255,0.5) → rgba(124,110,219,0.15)
  Nav BG:      rgba(255,255,255,0.9) → rgba(19,17,28,0.95)
```

### 3.3 Typography

```
Body:      "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif  (400-800)
Headings:  "Lora", Georgia, serif  (400-700, warm trustworthy serif)
Journal:   "Newsreader", Georgia, serif  (400 + italic, for writing textarea)
```

Load via Google Fonts `<link>` in layout.tsx `<head>` — NEVER via @import in inline styles.

---

## 4. EXACT CSS (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Lora', 'Georgia', serif;
  --font-writing: 'Newsreader', 'Georgia', serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  color-scheme: light;
}

html { scroll-behavior: smooth; }
body { background: #F8F6FF; }
::selection { background: #7C6EDB30; }
input[type=range] { height: 4px; }
::-webkit-scrollbar { display: none; }

/* Landing page animations */
@keyframes juFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
@keyframes glowPulse { 0%,100% { opacity: 0.6; transform: translate(-50%,-50%) scale(1) } 50% { opacity: 1; transform: translate(-50%,-50%) scale(1.15) } }
@keyframes wave { 0%,100% { transform: rotate(-15deg) } 50% { transform: rotate(-30deg) translateY(-4px) } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
@keyframes slideUp { from { opacity: 0; transform: translateY(40px) } to { opacity: 1; transform: translateY(0) } }
@keyframes countUp { from { opacity: 0 } to { opacity: 1 } }

/* App animations */
@keyframes fadeUp { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
@keyframes pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.08) } }
@keyframes bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
@keyframes streakFire { 0%,100% { transform: scaleY(1) scaleX(1) } 25% { transform: scaleY(1.15) scaleX(0.92) } 50% { transform: scaleY(0.95) scaleX(1.05) } 75% { transform: scaleY(1.08) scaleX(0.97) } }
@keyframes celebratePop { 0% { transform: scale(0.3); opacity: 0 } 50% { transform: scale(1.15); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
@keyframes typingDots { 0%,80%,100% { opacity: 0.3 } 40% { opacity: 1 } }
@keyframes glassShine { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }

```

---

## 5. MASCOT JU — Image Generation Prompts

Generate each with **Grok Imagine** or **DALL-E**. Specify: "3D kawaii character, cute lavender/purple teardrop spirit mascot, Pixar-style 3D render, centered, PLAIN WHITE BACKGROUND, no text, no shadows"

### 5.1 Five Mood States (generate separately)

1. **Mood 1 (Rough):** "crying with tears streaming down, very sad droopy eyes, mouth frowning deeply, small tear drops"
2. **Mood 2 (Low):** "eyes closed peacefully, melancholic expression, slight peaceful sadness, calm but sad"
3. **Mood 3 (Okay):** "cute neutral smile, calm content expression, small gentle smile, relaxed"
4. **Mood 4 (Good):** "excited jumping, sparkle/star eyes, small sparkle effects around, happy energetic"
5. **Mood 5 (Great):** "laughing big with mouth wide open, celebratory, confetti around, extremely happy"

Also generate: "main" pose (friendly wave) and "icon" (just face, 256x256)

### 5.2 Four Coach Persona Skins (generate separately)

1. **Gentle Guide:** "lavender-blue colored, holding a white daisy flower, sparkle eyes, soft caring expression, gentle nurturing vibe"
2. **Tough Coach:** "dark purple colored, wearing red-white sporty headband, determined angry expression, hands on hips power stance, confident"
3. **Wise Sage:** "purple colored, wearing round gold glasses, holding small open book, eyes closed peacefully, gold sparkle effects around"
4. **Fun Friend:** "mint green colored, wearing rainbow striped party hat, one eye winking, tongue sticking out playfully, confetti and stars around, jumping"

**IMPORTANT:** After generating, remove white backgrounds (transparent PNG). Store as base64 in constants: JU_IMAGES and PERSONA_IMAGES.

### 5.3 Sticker Pack (8 poses — Phase 2)

Generate on ONE image or separately:
Hi! (wave) | Zen (meditating) | Dear Diary (holding book) | Love (hugging heart) | Zzz (sleeping) | Yay! (party) | Hmm? (thinking) | Good Job! (thumbs up)

Sticker → App State mapping:
- Hi! → HomeScreen first open / welcome back
- Zen → Mood 3 (Okay) selected
- Dear Diary → JournalScreen header while writing
- Love → Mood 4-5 (Good/Great) selected
- Zzz → Night time (after 9pm) HomeScreen
- Yay! → After saving entry
- Hmm? → Coach typing indicator
- Good Job! → Entry saved confirmation

---

## 6. CONSTANTS & DATA

### 6.1 Moods

```javascript
const MOODS = [
  { label: "Rough", color: "#E8878C", value: 1 },
  { label: "Low", color: "#6C9BCF", value: 2 },
  { label: "Okay", color: "#FFB347", value: 3 },
  { label: "Good", color: "#95E1D3", value: 4 },
  { label: "Great", color: "#4ECDC4", value: 5 },
];

```

**Display order: Rough → Great, LEFT to RIGHT (sad to happy)**

### 6.2 AI Personas

```javascript
const AI_PERSONAS = [
  { id: "gentle", name: "Gentle Guide", color: "#B8C4F0", desc: "Warm, understanding, nurturing" },
  { id: "tough", name: "Tough Coach", color: "#D4A0D0", desc: "Direct, motivating, no excuses" },
  { id: "wise", name: "Wise Sage", color: "#E8D5A3", desc: "Thoughtful, philosophical, deep" },
  { id: "fun", name: "Fun Friend", color: "#A8E6CF", desc: "Playful, uplifting, honest" },
];

```

### 6.3 Journal Prompts

```javascript
const PROMPTS = [
  "What made you smile today, even just a little?",
  "If your mood was a weather, what would it be right now?",
  "What's one thing you're proud of this week?",
  "Who made your day better today?",
  "What would you tell your past self from last month?",
  "What's weighing on your mind right now?",
  "Describe your perfect tomorrow in 3 sentences.",
  "What's a small win you haven't celebrated yet?",
];

```

### 6.4 Language Metadata

```javascript
const LANG_META = [
  { code: "en", label: "English", flag: "EN" },
  { code: "id", label: "Indonesia", flag: "ID" },
  { code: "es", label: "Español", flag: "ES" },
  { code: "pt", label: "Português", flag: "PT" },
  { code: "ja", label: "日本語", flag: "JA" },
  { code: "ko", label: "한국어", flag: "KO" },
  { code: "zh", label: "中文", flag: "ZH" },
  { code: "hi", label: "हिन्दी", flag: "HI" },
];

```

### 6.5 Coach Responses (mock for Phase 1, replace with Gemini in Phase 2)

```javascript
const coachResponses = {
    gentle: ["I hear you, and what you're feeling is completely valid. Let's explore that together.", "That takes courage to share. What do you think is at the heart of this feeling?", "You're doing beautifully just by being here. What would feel supportive right now?"],
    tough: ["Alright, let's cut through the noise. What's the ONE thing you can actually control here?", "I believe in you, but belief isn't enough — what's your next move?", "Stop waiting for motivation. Action creates motivation. What's your smallest next step?"],
    wise: ["Consider this: every challenge contains the seed of its own resolution.", "Marcus Aurelius wrote: 'The obstacle is the way.' What if this difficulty is exactly what you need?", "Sit with this question: in 5 years, will this matter? If yes, act. If no, release."],
    fun: ["Bro, you know what? You're overthinking this. Let's vibe it out!", "Plot twist: you're actually doing way better than you think. Evidence? You're HERE, working on yourself!", "Okay real talk — what would the most confident version of you do right now? Yeah, do THAT."],
  };
```

### 6.6 Coach Persona System Prompts (Phase 2 — for Gemini API)

```
Gentle Guide: "You are Ju as Gentle Guide. Warm, nurturing, validating. Use soft language. Acknowledge feelings first. Ask open-ended questions. Never judge. Keep responses 2-3 sentences."

Tough Coach: "You are Ju as Tough Coach. Direct, motivating, action-oriented. Cut through excuses lovingly. Challenge the user. Focus on what they can control. Push for next steps. 2-3 sentences."

Wise Sage: "You are Ju as Wise Sage. Philosophical, contemplative. Reference wisdom traditions (Stoicism, mindfulness). Ask deep questions. Help see the bigger picture. 2-3 sentences."

Fun Friend: "You are Ju as Fun Friend. Playful, energetic, honest. Casual language. Make user laugh but be real when needed. Celebrate small wins. 2-3 sentences."
```

---

## 7. FULL i18n — 8 LANGUAGES (~77 keys each)

```javascript
const LANG = {
  en: {
    greeting_morning: "Good morning", greeting_afternoon: "Good afternoon",
    greeting_evening: "Good evening", greeting_night: "Before you sleep...",
    greeting_late: "Can't sleep?", how_feeling: "How are you feeling?",
    write: "Write", talk: "Talk", todays_prompt: "Today's prompt",
    new_prompt: "New prompt", energy: "Energy level",
    drained: "Drained", energized: "Energized",
    home: "Home", insights_label: "Insights", coach_label: "Coach", pro_label: "Pro",
    mind_gallery: "Your Mind Gallery", weekly_mood: "This week's mood wave",
    month_glance: "Month at a glance", weekly_summary: "Ju's weekly summary",
    relationship_map: "Relationship Mood Map", unlock_pro: "Unlock with Pro",
    rel_desc: "See how the people in your life affect your mood",
    back: "Back", save: "Save", whats_on_mind: "What's on your mind?",
    ju_insight: "Ju's insight", done: "Done",
    ai_coach: "AI Coach", talk_to_ju: "Talk to Ju...",
    unlock_ju: "Unlock Ju's full power", monthly: "Monthly", annual: "Annual (save 33%)",
    current_plan: "Current plan", start_trial: "Start free trial",
    great: "Great", good: "Good", okay: "Okay", low: "Low", rough: "Rough",
    summary_has_entries: "This week you showed up for yourself. Your mood has been mostly positive with some natural dips. Keep journaling — every entry teaches me more about you.",
    summary_no_entries: "Start journaling and I'll share patterns I discover about your emotional world. Every entry helps me understand you better.",
    recording: "Recording...",
    onb_title_1: "Meet Ju", onb_desc_1: "Your AI journal companion who listens, understands, and grows with you.",
    onb_title_2: "30 seconds is all it takes", onb_desc_2: "Tap your mood, speak or write, and let AI reveal patterns you'd never notice.",
    onb_title_3: "Insights that matter", onb_desc_3: "Relationship maps, mood trends, and weekly reports — therapy-level clarity.",
    onb_title_4: "Pick your coach", onb_desc_4: "Gentle Guide, Tough Coach, Wise Sage, or Fun Friend. Ju adapts to your style.",
    onb_skip: "Skip", onb_next: "Next", onb_start: "Start journaling",
    settings: "Settings", dark_mode: "Dark mode", language: "Language",
    // Retention hooks
    signup_title: "Ju knows you now", signup_desc: "You've written {n} entries. Create an account to keep your journal safe forever.",
    signup_btn: "Save my journal", signup_later: "Maybe later",
    mood_trend: "30-Day Mood Trend", mood_avg: "Avg mood", mood_best: "Best day", mood_streak_label: "Current streak",
    entries_total: "Total entries", improvement: "vs last month",
    history_locked: "Older entries locked", history_unlock: "Upgrade to Plus to see all history",
    ju_remembers: "Ju remembers", ju_memory_desc: "Based on your past {n} entries, Ju noticed:",
    ju_pattern_1: "You tend to feel better on weekends",
    ju_pattern_2: "Writing in the evening improves your next morning mood",
    ju_pattern_3: "Your mood has been trending upward this month",
  },
  id: {
    greeting_morning: "Selamat pagi", greeting_afternoon: "Selamat siang",
    greeting_evening: "Selamat malam", greeting_night: "Sebelum tidur...",
    greeting_late: "Belum bisa tidur?", how_feeling: "Apa kabar hari ini?",
    write: "Tulis", talk: "Bicara", todays_prompt: "Prompt hari ini",
    new_prompt: "Ganti prompt", energy: "Level energi",
    drained: "Capek", energized: "Berenergi",
    home: "Beranda", insights_label: "Insight", coach_label: "Coach", pro_label: "Pro",
    mind_gallery: "Galeri Pikiranmu", weekly_mood: "Mood minggu ini",
    month_glance: "Sebulan sekilas", weekly_summary: "Ringkasan Ju",
    relationship_map: "Peta Mood Relasi", unlock_pro: "Buka dengan Pro",
    rel_desc: "Lihat bagaimana orang di hidupmu mempengaruhi mood-mu",
    back: "Kembali", save: "Simpan", whats_on_mind: "Apa yang ada di pikiranmu?",
    ju_insight: "Insight dari Ju", done: "Selesai",
    ai_coach: "AI Coach", talk_to_ju: "Ngobrol sama Ju...",
    unlock_ju: "Buka kekuatan penuh Ju", monthly: "Bulanan", annual: "Tahunan (hemat 33%)",
    current_plan: "Paket saat ini", start_trial: "Coba gratis",
    great: "Senang", good: "Baik", okay: "Biasa", low: "Murung", rough: "Berat",
    summary_has_entries: "Minggu ini kamu hadir buat dirimu sendiri. Mood-mu kebanyakan positif dengan beberapa penurunan alami. Terus menulis — setiap entri mengajarkan Ju lebih banyak tentangmu.",
    summary_no_entries: "Mulai menulis dan Ju akan berbagi pola yang ditemukan tentang dunia emosionalmu. Setiap entri membantu Ju memahami kamu lebih baik.",
    recording: "Merekam...",
    onb_title_1: "Kenalan sama Ju", onb_desc_1: "Teman jurnal AI yang mendengarkan, memahami, dan tumbuh bersamamu.",
    onb_title_2: "Cuma butuh 30 detik", onb_desc_2: "Tap mood-mu, bicara atau tulis, biarkan AI menemukan pola yang belum pernah kamu sadari.",
    onb_title_3: "Insight yang bermakna", onb_desc_3: "Peta relasi, tren mood, dan laporan mingguan — kejelasan setara terapi.",
    onb_title_4: "Pilih coach-mu", onb_desc_4: "Lembut, Tegas, Bijak, atau Seru. Ju menyesuaikan gayamu.",
    onb_skip: "Lewati", onb_next: "Lanjut", onb_start: "Mulai menulis",
    settings: "Pengaturan", dark_mode: "Mode gelap", language: "Bahasa",

    signup_title: "Ju kenal kamu sekarang", signup_desc: "Kamu sudah menulis {n} entri. Buat akun untuk menjaga jurnalmu selamanya.",
    signup_btn: "Simpan jurnal saya", signup_later: "Nanti aja",
    mood_trend: "Tren Mood 30 Hari", mood_avg: "Rata-rata", mood_best: "Hari terbaik", mood_streak_label: "Streak saat ini",
    entries_total: "Total entri", improvement: "vs bulan lalu",
    history_locked: "Entri lama terkunci", history_unlock: "Upgrade ke Plus untuk lihat semua",
    ju_remembers: "Ju ingat", ju_memory_desc: "Dari {n} entri sebelumnya, Ju menyadari:",
    ju_pattern_1: "Kamu cenderung merasa lebih baik di akhir pekan",
    ju_pattern_2: "Menulis di malam hari memperbaiki mood pagi berikutnya",
    ju_pattern_3: "Mood-mu sedang tren naik bulan ini",
  },
  es: {
    greeting_morning: "Buenos días", greeting_afternoon: "Buenas tardes",
    greeting_evening: "Buenas noches", greeting_night: "Antes de dormir...",
    greeting_late: "No puedes dormir?", how_feeling: "Cómo te sientes?",
    write: "Escribir", talk: "Hablar", todays_prompt: "Tema del día",
    new_prompt: "Nuevo tema", energy: "Nivel de energía",
    drained: "Agotado", energized: "Energizado",
    home: "Inicio", insights_label: "Datos", coach_label: "Coach", pro_label: "Pro",
    mind_gallery: "Tu galería mental", weekly_mood: "Ánimo de la semana",
    month_glance: "Vista del mes", weekly_summary: "Resumen de Ju",
    relationship_map: "Mapa de relaciones", unlock_pro: "Desbloquear con Pro",
    rel_desc: "Mira cómo las personas en tu vida afectan tu ánimo",
    back: "Atrás", save: "Guardar", whats_on_mind: "Qué tienes en mente?",
    ju_insight: "Reflexión de Ju", done: "Listo",
    ai_coach: "Coach IA", talk_to_ju: "Habla con Ju...",
    unlock_ju: "Desbloquea todo el poder de Ju", monthly: "Mensual", annual: "Anual (ahorra 33%)",
    current_plan: "Plan actual", start_trial: "Prueba gratis",
    great: "Genial", good: "Bien", okay: "Normal", low: "Bajo", rough: "Difícil",
    summary_has_entries: "Esta semana te presentaste para ti mismo. Tu ánimo ha sido mayormente positivo. Sigue escribiendo — cada entrada me enseña más sobre ti.",
    summary_no_entries: "Empieza a escribir y compartiré los patrones que descubra sobre tu mundo emocional.",
    recording: "Grabando...",
    onb_title_1: "Conoce a Ju", onb_desc_1: "Tu compañero de diario IA que escucha, entiende y crece contigo.",
    onb_title_2: "Solo 30 segundos", onb_desc_2: "Toca tu estado, habla o escribe, y deja que la IA revele patrones.",
    onb_title_3: "Datos que importan", onb_desc_3: "Mapas de relaciones, tendencias de ánimo e informes semanales.",
    onb_title_4: "Elige tu coach", onb_desc_4: "Gentil, Directo, Sabio o Divertido. Ju se adapta a tu estilo.",
    onb_skip: "Saltar", onb_next: "Siguiente", onb_start: "Empezar a escribir",
    settings: "Ajustes", dark_mode: "Modo oscuro", language: "Idioma",

    signup_title: "Ju knows you now", signup_desc: "You've written {n} entries. Create an account to keep your journal safe forever.",
    signup_btn: "Save my journal", signup_later: "Maybe later",
    mood_trend: "30-Day Mood Trend", mood_avg: "Avg mood", mood_best: "Best day", mood_streak_label: "Current streak",
    entries_total: "Total entries", improvement: "vs last month",
    history_locked: "Older entries locked", history_unlock: "Upgrade to Plus to see all history",
    ju_remembers: "Ju remembers", ju_memory_desc: "Based on your past {n} entries, Ju noticed:",
    ju_pattern_1: "You tend to feel better on weekends",
    ju_pattern_2: "Writing in the evening improves your next morning mood",
    ju_pattern_3: "Your mood has been trending upward this month",
  },
  pt: {
    greeting_morning: "Bom dia", greeting_afternoon: "Boa tarde",
    greeting_evening: "Boa noite", greeting_night: "Antes de dormir...",
    greeting_late: "Sem sono?", how_feeling: "Como você está?",
    write: "Escrever", talk: "Falar", todays_prompt: "Tema do dia",
    new_prompt: "Novo tema", energy: "Nível de energia",
    drained: "Esgotado", energized: "Energizado",
    home: "Início", insights_label: "Dados", coach_label: "Coach", pro_label: "Pro",
    mind_gallery: "Sua galeria mental", weekly_mood: "Humor da semana",
    month_glance: "Visão do mês", weekly_summary: "Resumo do Ju",
    relationship_map: "Mapa de relações", unlock_pro: "Liberar com Pro",
    rel_desc: "Veja como as pessoas na sua vida afetam seu humor",
    back: "Voltar", save: "Salvar", whats_on_mind: "O que está na sua mente?",
    ju_insight: "Reflexão do Ju", done: "Pronto",
    ai_coach: "Coach IA", talk_to_ju: "Fale com Ju...",
    unlock_ju: "Libere todo o poder do Ju", monthly: "Mensal", annual: "Anual (economia de 33%)",
    current_plan: "Plano atual", start_trial: "Teste grátis",
    great: "Ótimo", good: "Bom", okay: "Normal", low: "Baixo", rough: "Difícil",
    summary_has_entries: "Esta semana você se dedicou a si mesmo. Seu humor foi principalmente positivo. Continue escrevendo — cada entrada me ensina mais sobre você.",
    summary_no_entries: "Comece a escrever e compartilharei padrões que descobrir sobre seu mundo emocional.",
    recording: "Gravando...",
    onb_title_1: "Conheça Ju", onb_desc_1: "Seu companheiro de diário IA que ouve, entende e cresce com você.",
    onb_title_2: "Só 30 segundos", onb_desc_2: "Toque seu humor, fale ou escreva, e deixe a IA revelar padrões.",
    onb_title_3: "Dados que importam", onb_desc_3: "Mapas de relações, tendências de humor e relatórios semanais.",
    onb_title_4: "Escolha seu coach", onb_desc_4: "Gentil, Direto, Sábio ou Divertido. Ju se adapta ao seu estilo.",
    onb_skip: "Pular", onb_next: "Próximo", onb_start: "Começar a escrever",
    settings: "Configurações", dark_mode: "Modo escuro", language: "Idioma",

    signup_title: "Ju knows you now", signup_desc: "You've written {n} entries. Create an account to keep your journal safe forever.",
    signup_btn: "Save my journal", signup_later: "Maybe later",
    mood_trend: "30-Day Mood Trend", mood_avg: "Avg mood", mood_best: "Best day", mood_streak_label: "Current streak",
    entries_total: "Total entries", improvement: "vs last month",
    history_locked: "Older entries locked", history_unlock: "Upgrade to Plus to see all history",
    ju_remembers: "Ju remembers", ju_memory_desc: "Based on your past {n} entries, Ju noticed:",
    ju_pattern_1: "You tend to feel better on weekends",
    ju_pattern_2: "Writing in the evening improves your next morning mood",
    ju_pattern_3: "Your mood has been trending upward this month",
  },
  ja: {
    greeting_morning: "おはようございます", greeting_afternoon: "こんにちは",
    greeting_evening: "こんばんは", greeting_night: "おやすみ前に...",
    greeting_late: "眠れませんか？", how_feeling: "今日の気分は？",
    write: "書く", talk: "話す", todays_prompt: "今日のお題",
    new_prompt: "次のお題", energy: "エネルギー",
    drained: "疲れた", energized: "元気",
    home: "ホーム", insights_label: "分析", coach_label: "コーチ", pro_label: "Pro",
    mind_gallery: "こころのギャラリー", weekly_mood: "今週の気分",
    month_glance: "月間ビュー", weekly_summary: "Juの週間まとめ",
    relationship_map: "人間関係マップ", unlock_pro: "Proで解放",
    rel_desc: "周りの人があなたの気分にどう影響しているか見てみよう",
    back: "戻る", save: "保存", whats_on_mind: "今、何を考えていますか？",
    ju_insight: "Juの気づき", done: "完了",
    ai_coach: "AIコーチ", talk_to_ju: "Juと話す...",
    unlock_ju: "Juの全力を解放", monthly: "月額", annual: "年額（33%お得）",
    current_plan: "現在のプラン", start_trial: "無料で試す",
    great: "最高", good: "良い", okay: "普通", low: "落ち込み", rough: "つらい",
    summary_has_entries: "今週もよく頑張りました。気分は全体的にポジティブでした。書き続けてください — 一つ一つの記録があなたをもっと理解する助けになります。",
    summary_no_entries: "書き始めると、あなたの感情の世界のパターンを共有します。",
    recording: "録音中...",
    onb_title_1: "Juに会おう", onb_desc_1: "聞いて、理解して、一緒に成長するAIジャーナルの仲間。",
    onb_title_2: "たった30秒", onb_desc_2: "気分をタップ、話すか書くだけ。AIがパターンを見つけます。",
    onb_title_3: "大切な気づき", onb_desc_3: "人間関係マップ、気分の傾向、週間レポート。",
    onb_title_4: "コーチを選ぼう", onb_desc_4: "優しい、厳しい、賢い、楽しい。Juがあなたに合わせます。",
    onb_skip: "スキップ", onb_next: "次へ", onb_start: "書き始める",
    settings: "設定", dark_mode: "ダークモード", language: "言語",

    signup_title: "Ju knows you now", signup_desc: "You've written {n} entries. Create an account to keep your journal safe forever.",
    signup_btn: "Save my journal", signup_later: "Maybe later",
    mood_trend: "30-Day Mood Trend", mood_avg: "Avg mood", mood_best: "Best day", mood_streak_label: "Current streak",
    entries_total: "Total entries", improvement: "vs last month",
    history_locked: "Older entries locked", history_unlock: "Upgrade to Plus to see all history",
    ju_remembers: "Ju remembers", ju_memory_desc: "Based on your past {n} entries, Ju noticed:",
    ju_pattern_1: "You tend to feel better on weekends",
    ju_pattern_2: "Writing in the evening improves your next morning mood",
    ju_pattern_3: "Your mood has been trending upward this month",
  },
  ko: {
    greeting_morning: "좋은 아침이에요", greeting_afternoon: "좋은 오후예요",
    greeting_evening: "좋은 저녁이에요", greeting_night: "자기 전에...",
    greeting_late: "잠이 안 오나요?", how_feeling: "오늘 기분이 어때요?",
    write: "쓰기", talk: "말하기", todays_prompt: "오늘의 주제",
    new_prompt: "새 주제", energy: "에너지",
    drained: "지침", energized: "활력",
    home: "홈", insights_label: "인사이트", coach_label: "코치", pro_label: "Pro",
    mind_gallery: "마음 갤러리", weekly_mood: "이번 주 기분",
    month_glance: "월간 보기", weekly_summary: "Ju의 주간 요약",
    relationship_map: "관계 기분 맵", unlock_pro: "Pro로 잠금 해제",
    rel_desc: "주변 사람들이 당신의 기분에 어떤 영향을 주는지 확인하세요",
    back: "뒤로", save: "저장", whats_on_mind: "무슨 생각을 하고 있나요?",
    ju_insight: "Ju의 인사이트", done: "완료",
    ai_coach: "AI 코치", talk_to_ju: "Ju와 대화...",
    unlock_ju: "Ju의 잠재력 해제", monthly: "월간", annual: "연간 (33% 절약)",
    current_plan: "현재 플랜", start_trial: "무료 체험",
    great: "최고", good: "좋음", okay: "보통", low: "우울", rough: "힘듦",
    summary_has_entries: "이번 주 잘 해냈어요. 기분이 대체로 긍정적이었어요. 계속 써주세요 — 매 기록이 당신을 더 잘 이해하는 데 도움이 돼요.",
    summary_no_entries: "일기를 쓰기 시작하면 감정 세계의 패턴을 공유할게요.",
    recording: "녹음 중...",
    onb_title_1: "Ju를 만나세요", onb_desc_1: "듣고, 이해하고, 함께 성장하는 AI 일기 친구.",
    onb_title_2: "30초면 충분해요", onb_desc_2: "기분을 탭하고, 말하거나 쓰세요. AI가 패턴을 찾아줍니다.",
    onb_title_3: "의미 있는 인사이트", onb_desc_3: "관계 맵, 기분 트렌드, 주간 리포트.",
    onb_title_4: "코치를 선택하세요", onb_desc_4: "따뜻한, 강한, 지혜로운, 재미있는. Ju가 맞춰줍니다.",
    onb_skip: "건너뛰기", onb_next: "다음", onb_start: "일기 쓰기 시작",
    settings: "설정", dark_mode: "다크 모드", language: "언어",

    signup_title: "Ju knows you now", signup_desc: "You've written {n} entries. Create an account to keep your journal safe forever.",
    signup_btn: "Save my journal", signup_later: "Maybe later",
    mood_trend: "30-Day Mood Trend", mood_avg: "Avg mood", mood_best: "Best day", mood_streak_label: "Current streak",
    entries_total: "Total entries", improvement: "vs last month",
    history_locked: "Older entries locked", history_unlock: "Upgrade to Plus to see all history",
    ju_remembers: "Ju remembers", ju_memory_desc: "Based on your past {n} entries, Ju noticed:",
    ju_pattern_1: "You tend to feel better on weekends",
    ju_pattern_2: "Writing in the evening improves your next morning mood",
    ju_pattern_3: "Your mood has been trending upward this month",
  },
  zh: {
    greeting_morning: "早上好", greeting_afternoon: "下午好",
    greeting_evening: "晚上好", greeting_night: "睡前...",
    greeting_late: "睡不着？", how_feeling: "今天感觉怎么样？",
    write: "写", talk: "说", todays_prompt: "今日话题",
    new_prompt: "换一个", energy: "能量",
    drained: "疲惫", energized: "精力充沛",
    home: "首页", insights_label: "洞察", coach_label: "教练", pro_label: "Pro",
    mind_gallery: "心灵画廊", weekly_mood: "本周心情",
    month_glance: "月度概览", weekly_summary: "Ju的周总结",
    relationship_map: "关系情绪图", unlock_pro: "升级Pro解锁",
    rel_desc: "看看你身边的人如何影响你的情绪",
    back: "返回", save: "保存", whats_on_mind: "你在想什么？",
    ju_insight: "Ju的洞察", done: "完成",
    ai_coach: "AI教练", talk_to_ju: "和Ju聊天...",
    unlock_ju: "解锁Ju的全部能力", monthly: "月付", annual: "年付（省33%）",
    current_plan: "当前方案", start_trial: "免费试用",
    great: "很棒", good: "不错", okay: "一般", low: "低落", rough: "很难",
    summary_has_entries: "这周你为自己出现了。你的情绪总体积极。继续写吧——每一篇都帮助我更了解你。",
    summary_no_entries: "开始写作，我会分享我发现的关于你情感世界的模式。",
    recording: "录音中...",
    onb_title_1: "认识Ju", onb_desc_1: "你的AI日记伙伴，倾听、理解，与你一起成长。",
    onb_title_2: "只需30秒", onb_desc_2: "点选心情，说或写，让AI发现你从未注意到的模式。",
    onb_title_3: "有意义的洞察", onb_desc_3: "关系图、情绪趋势和周报——治疗级的清晰度。",
    onb_title_4: "选择教练", onb_desc_4: "温柔、严格、智慧或有趣。Ju适应你的风格。",
    onb_skip: "跳过", onb_next: "下一步", onb_start: "开始写作",
    settings: "设置", dark_mode: "深色模式", language: "语言",

    signup_title: "Ju knows you now", signup_desc: "You've written {n} entries. Create an account to keep your journal safe forever.",
    signup_btn: "Save my journal", signup_later: "Maybe later",
    mood_trend: "30-Day Mood Trend", mood_avg: "Avg mood", mood_best: "Best day", mood_streak_label: "Current streak",
    entries_total: "Total entries", improvement: "vs last month",
    history_locked: "Older entries locked", history_unlock: "Upgrade to Plus to see all history",
    ju_remembers: "Ju remembers", ju_memory_desc: "Based on your past {n} entries, Ju noticed:",
    ju_pattern_1: "You tend to feel better on weekends",
    ju_pattern_2: "Writing in the evening improves your next morning mood",
    ju_pattern_3: "Your mood has been trending upward this month",
  },
  hi: {
    greeting_morning: "सुप्रभात", greeting_afternoon: "नमस्ते",
    greeting_evening: "शुभ संध्या", greeting_night: "सोने से पहले...",
    greeting_late: "नींद नहीं आ रही?", how_feeling: "आज कैसा महसूस हो रहा है?",
    write: "लिखें", talk: "बोलें", todays_prompt: "आज का विषय",
    new_prompt: "नया विषय", energy: "ऊर्जा",
    drained: "थका हुआ", energized: "ऊर्जावान",
    home: "होम", insights_label: "इनसाइट", coach_label: "कोच", pro_label: "Pro",
    mind_gallery: "मन की गैलरी", weekly_mood: "इस हफ्ते का मूड",
    month_glance: "महीने की झलक", weekly_summary: "Ju का साप्ताहिक सारांश",
    relationship_map: "रिश्ते का मूड मैप", unlock_pro: "Pro से अनलॉक करें",
    rel_desc: "देखें कि आपके जीवन के लोग आपके मूड को कैसे प्रभावित करते हैं",
    back: "वापस", save: "सेव", whats_on_mind: "आपके मन में क्या है?",
    ju_insight: "Ju की सोच", done: "हो गया",
    ai_coach: "AI कोच", talk_to_ju: "Ju से बात करें...",
    unlock_ju: "Ju की पूरी शक्ति अनलॉक करें", monthly: "मासिक", annual: "वार्षिक (33% बचत)",
    current_plan: "वर्तमान प्लान", start_trial: "मुफ्त में आज़माएं",
    great: "बहुत अच्छा", good: "अच्छा", okay: "ठीक", low: "उदास", rough: "कठिन",
    summary_has_entries: "इस हफ्ते आपने खुद के लिए समय निकाला। आपका मूड ज्यादातर सकारात्मक रहा। लिखते रहें — हर एंट्री मुझे आपको बेहतर समझने में मदद करती है।",
    summary_no_entries: "लिखना शुरू करें और मैं आपकी भावनात्मक दुनिया के पैटर्न साझा करूंगा।",
    recording: "रिकॉर्ड हो रहा है...",
    onb_title_1: "Ju से मिलें", onb_desc_1: "आपका AI जर्नल साथी जो सुनता है, समझता है, और आपके साथ बढ़ता है।",
    onb_title_2: "सिर्फ 30 सेकंड", onb_desc_2: "अपना मूड चुनें, बोलें या लिखें, AI पैटर्न खोजेगा।",
    onb_title_3: "महत्वपूर्ण इनसाइट", onb_desc_3: "रिश्तों का मैप, मूड ट्रेंड, और साप्ताहिक रिपोर्ट।",
    onb_title_4: "अपना कोच चुनें", onb_desc_4: "कोमल, सख्त, बुद्धिमान, या मज़ेदार। Ju आपकी शैली में ढलता है।",
    onb_skip: "छोड़ें", onb_next: "अगला", onb_start: "लिखना शुरू करें",
    settings: "सेटिंग्स", dark_mode: "डार्क मोड", language: "भाषा",

    signup_title: "Ju knows you now", signup_desc: "You've written {n} entries. Create an account to keep your journal safe forever.",
    signup_btn: "Save my journal", signup_later: "Maybe later",
    mood_trend: "30-Day Mood Trend", mood_avg: "Avg mood", mood_best: "Best day", mood_streak_label: "Current streak",
    entries_total: "Total entries", improvement: "vs last month",
    history_locked: "Older entries locked", history_unlock: "Upgrade to Plus to see all history",
    ju_remembers: "Ju remembers", ju_memory_desc: "Based on your past {n} entries, Ju noticed:",
    ju_pattern_1: "You tend to feel better on weekends",
    ju_pattern_2: "Writing in the evening improves your next morning mood",
    ju_pattern_3: "Your mood has been trending upward this month",
  },
};

```

### Time-based Greeting Function

```javascript
const getGreeting = (t) => {
  const h = new Date().getHours();
  if (h < 6) return t.greeting_late;      // "Can't sleep?"
  if (h < 12) return t.greeting_morning;   // "Good morning"
  if (h < 17) return t.greeting_afternoon; // "Good afternoon"
  if (h < 21) return t.greeting_evening;   // "Good evening"
  return t.greeting_night;                  // "Before you sleep..."
};
```

---

## 8. SVG COMPONENTS

### 8.1 MoodIcon (emoji faces per mood)

```jsx
const MoodIcon = ({ value, size = 28, color }) => {
  const s = size;
  const icons = {
    5: <svg width={s} height={s} viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill={color} opacity="0.15"/><circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="11" cy="13" r="1.5" fill={color}/><circle cx="21" cy="13" r="1.5" fill={color}/><path d="M10 20Q16 26 22 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/><path d="M8 8L11 11M24 8L21 11M16 5V8" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/></svg>,
    4: <svg width={s} height={s} viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill={color} opacity="0.15"/><circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="11" cy="14" r="1.5" fill={color}/><circle cx="21" cy="14" r="1.5" fill={color}/><path d="M11 20Q16 24 21 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
    3: <svg width={s} height={s} viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill={color} opacity="0.15"/><circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="11" cy="14" r="1.5" fill={color}/><circle cx="21" cy="14" r="1.5" fill={color}/><line x1="11" y1="21" x2="21" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    2: <svg width={s} height={s} viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill={color} opacity="0.15"/><circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="11" cy="14" r="1.5" fill={color}/><circle cx="21" cy="14" r="1.5" fill={color}/><path d="M11 22Q16 18 21 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
    1: <svg width={s} height={s} viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill={color} opacity="0.15"/><circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="11" cy="14" r="1.5" fill={color}/><circle cx="21" cy="14" r="1.5" fill={color}/><path d="M10 23Q16 17 22 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/><path d="M23 12L24 15" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/></svg>,
  };
  return icons[value] || icons[3];
};

```

### 8.2 PersonaIcon (small icons for coach pills)

```jsx
const PersonaIcon = ({ id, size = 18 }) => {
  const icons = {
    gentle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 14 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14 12 21 12 21Z" stroke="#B8C4F0" strokeWidth="1.5" fill="#B8C4F020"/></svg>,
    tough: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="#D4A0D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#D4A0D020"/></svg>,
    wise: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M2 3H8C9.06 3 10.08 3.42 10.83 4.17C11.58 4.92 12 5.94 12 7V21C12 20.2 11.68 19.43 11.12 18.88C10.56 18.32 9.8 18 9 18H2V3Z" stroke="#E8D5A3" strokeWidth="1.5" fill="#E8D5A320"/><path d="M22 3H16C14.94 3 13.92 3.42 13.17 4.17C12.42 4.92 12 5.94 12 7V21C12 20.2 12.32 19.43 12.88 18.88C13.44 18.32 14.2 18 15 18H22V3Z" stroke="#E8D5A3" strokeWidth="1.5" fill="#E8D5A320"/></svg>,
    fun: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 2L14.4 8.2L21 9L16 13.6L17.6 20.2L12 17L6.4 20.2L8 13.6L3 9L9.6 8.2L12 2Z" stroke="#A8E6CF" strokeWidth="1.5" fill="#A8E6CF20"/></svg>,
  };
  return icons[id] || null;
};

```

---

## 9. SCREENS — DETAILED SPECS (7 total)

### 9.1 Onboarding (4 slides)
- Dot indicators at bottom, Skip + Next buttons
- Slide 1: "Meet Ju" — mascot floating, glow, color #7C6EDB
- Slide 2: "30 seconds is all it takes" — color #4ECDC4
- Slide 3: "Insights that matter" — color #FFB347
- Slide 4: "Pick your coach" — 4 persona preview, color #E8878C
- Final slide button: "Start journaling"
- ALWAYS light mode (no dark prop)
- Soft gradient bg per slide using slide color at low opacity

### 9.2 Home Screen
- **Header:** Time greeting (from getGreeting) + StreakBadge (🔥 X days, fire animation at ≥7) + Settings gear ⚙️ button
- **Mascot Ju:** Large centered (100px), changes expression based on last mood entry. Floating animation (juFloat 3s). Glow circle behind (glowPulse). Speech bubble with mood-specific message.
- **Mood Selector:** 5 buttons horizontal row (Rough→Great, left→right). Each: MoodIcon SVG + color bg + label from i18n. Selected: 2px border + scale(1.08) + celebratePop animation. Mood 5 triggers Confetti canvas.
- **Energy Slider:** range input 0-100, "Drained" to "Energized" labels
- **Today's Prompt:** Glassmorphic card, random prompt from PROMPTS + "New prompt" shuffle button
- **Quick Actions:** "Write" button → journal, "Talk" button → coach screen
- **Recent Entries:** Last 3 entries as mini cards: MoodIcon + text preview (50 chars) + relative date

### 9.3 Journal Screen
- **Header:** Back button + "New Entry" title + Save button (purple)
- **Mood display:** Selected MoodIcon + label
- **Textarea:** font-family: var(--font-writing), placeholder "What's on your mind?", min-height 200px, rounded corners
- **Prompt:** Shows current prompt above textarea
- **Save flow:** 1) Save to state/DB 2) Show "Ju's Insight" card (AI-generated or mock) 3) After 3rd entry EVER → SignupPrompt modal (1.5s delay)
- **Voice button:** Mic icon, placeholder "Recording..." state (Phase 3: real recording)

### 9.4 Insights Screen ("Your Mind Gallery")
- **MoodTrendChart:** SVG 30-day line chart, gradient fill (#7C6EDB), color-coded dots, stats row (Avg mood, Total entries, +12% improvement)
- **Weekly Mood Wave:** 7 animated bars (Mon-Sun), height = mood × 18px, gradient colors, staggered entrance animation (0.08s delay each)
- **Month Pixel Grid:** 30-cell grid (7 columns), colored by mood or gray if empty
- **AI Weekly Summary:** Ju icon + summary text in glassmorphic card
- **AiMemoryCard:** Appears after 3+ entries. "Ju remembers" + patterns. 3+ entries: 1 pattern. 7+: all 3.
- **HistoryLock:** Appears after 7+ entries. Lock icon + "Older entries locked" + "Upgrade to Plus" CTA
- **Relationship Map Teaser:** Dashed border, network graph icon, "Unlock with Pro"

### 9.5 Coach Screen
- **Header:** Back + "AI Coach" + persona selector (4 horizontal scrollable pills with PersonaIcon)
- **Empty state:** PERSONA-SPECIFIC Ju image (from PERSONA_IMAGES) centered + "{Persona name} is ready to chat" + persona description
- **Chat:** User = right-aligned purple bubble (#7C6EDB, white text). AI = left-aligned glassmorphic bubble (persona border color). Typing indicator: 3 animated dots.
- **AI responses:** Character-by-character typing effect (useTypingEffect hook, 22ms/char, blinking cursor)
- **Input:** Fixed bottom bar, text input + send button

### 9.6 Pricing Screen
- **Header:** "Unlock Ju's full power"
- **Toggle:** Monthly / Annual (save 33%)
- **3 cards:** Free ($0) / Plus ($4.99/mo or $3.33 annual) / Pro ($9.99/mo or $6.66 annual)
- Feature checkmarks per tier, current plan badge, "Start free trial" CTAs
- Free: 3 entries/week, basic mood, 7-day history
- Plus: Unlimited entries, full history, AI insights, mood trends
- Pro: Everything + AI Coach unlimited, relationship map, voice journaling

### 9.7 Settings Screen
- Back button + "Settings" title
- Dark mode toggle (switch)
- Language selector: 8 languages with flag codes
- Coach persona selector
- Account section (placeholder)

### Bottom Navigation (fixed)
5 tabs: Home (house SVG) | Write (pencil SVG) | Insights (bar chart SVG) | Coach (chat bubble SVG) | Pro (star SVG)
Active: scale(1.05), #7C6EDB color, bold. Inactive: 60% opacity, muted.
Haptic feedback (navigator.vibrate) on tap.

---

## 10. RETENTION SYSTEMS (4 critical hooks)

### 10.1 SignupPrompt
- Triggers after saving 3rd journal entry (1.5s delay)
- Modal: blur backdrop, Ju mascot, "Ju knows you now"
- Copy: "You've written {n} entries. Create an account to keep your journal safe forever."
- "Save my journal" (primary) + "Maybe later" (dismiss)
- Shows ONCE per session only

### 10.2 MoodTrendChart
- SVG line chart, 30-day, gradient fill under curve
- Color-coded dots per entry mood
- Stats: Avg mood, Total entries, % improvement
- More data = more valuable = switching cost

### 10.3 HistoryLock
- Appears when entries > 7 in Insights
- Lock icon + "Older entries locked" + "Upgrade to Plus"
- Data exists but gated → conversion trigger

### 10.4 AiMemoryCard ("Ju Remembers")
- Appears after 3+ entries
- Shows patterns: "Weekend mood better", "Evening writing helps", "Mood trending up"
- 3+ entries: 1 pattern. 7+: all 3
- Emotional lock-in → impossible to rebuild elsewhere

---

## 11. ANIMATIONS & MICRO-INTERACTIONS

All @keyframes defined in globals.css (see Section 4). Durations and usage:

1. **juFloat:** translateY(0→-8px→0), 3s infinite — Mascot everywhere
2. **glowPulse:** opacity+scale pulse, 3s infinite — Mascot glow circle
3. **wave:** rotate(-15→-30deg), 2s infinite — Landing mascot hand
4. **fadeIn:** opacity+translateY(20→0), once — Landing sections
5. **slideUp:** opacity+translateY(40→0), once — Landing hero
6. **fadeUp:** opacity+translateY(10→0), 0.4s — Screen transitions
7. **pulse:** scale(1→1.08→1), 0.8s — Blinking cursor, icons
8. **bounce:** translateY(0→-6px→0), infinite — Floating elements
9. **shimmer:** background-position slide — Skeleton loading
10. **streakFire:** scaleY/scaleX oscillation, 1.5s — Streak badge ≥7
11. **celebratePop:** scale(0.3→1.15→1), 0.4s — Mood selection
12. **typingDots:** opacity(0.3→1→0.3), 1.2s — Coach typing dots
13. **glassShine:** background-position slide — Card hover

Additional JS animations:
- **Confetti:** Canvas-based, 60 particles, 7 colors, gravity+spin, ~1.5s. Triggers on mood 5.
- **Haptic:** navigator.vibrate patterns: light=[10], medium=[20], success=[10,50,10,50,20], celebration=[15,40,15,40,30,60,40]
- **Typing Effect:** useTypingEffect hook, 22ms/char, returns {displayed, done}
- **AnimatedNumber:** Count-up from 0 to target, 800ms duration
- **RevealOnScroll:** IntersectionObserver, threshold 0.15, fade+slide up
- **Press Feedback:** onMouseDown/onTouchStart scale(0.95), release back to 1

---

## 12. FILE STRUCTURE & CONFIGS

### 12.1 Project Structure

```
nuju-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout + Google Fonts + metadata
│   │   ├── globals.css          # ALL keyframes + CSS vars + Tailwind
│   │   ├── page.tsx             # Imports landing.tsx
│   │   ├── landing.tsx          # Marketing landing page
│   │   ├── app/
│   │   │   └── page.tsx         # Main journal app (all 7 screens)
│   │   ├── api/
│   │   │   ├── waitlist/route.ts   # Email insert to Supabase
│   │   │   ├── ai/route.ts        # Gemini proxy (Phase 2)
│   │   │   └── webhook/route.ts   # Lemon Squeezy (Phase 3)
│   │   └── auth/
│   │       └── callback/route.ts  # OAuth callback (Phase 2)
│   └── lib/
│       └── supabase.ts          # Supabase client
├── public/
│   └── manifest.json            # PWA config
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── tsconfig.json
└── .env.local                   # Supabase + Gemini keys
```

### 12.2 layout.tsx

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nuju — AI Journal That Understands Your Life",
  description: "The 30-second AI journal companion. Track moods, discover patterns, talk to Ju.",
  keywords: "journal, AI, mood tracker, mental health, diary",
  openGraph: {
    title: "Nuju — AI Journal That Understands Your Life",
    description: "The 30-second AI journal companion.",
    url: "https://nuju.app",
    siteName: "Nuju",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#7C6EDB" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Newsreader:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

```

### 12.3 supabase.ts

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

```

### 12.4 waitlist API route

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { error } = await supabase
      .from("waitlist")
      .insert({ email, source: source || "landing" });

    if (error?.code === "23505") {
      return NextResponse.json({ message: "Already on waitlist!" }, { status: 200 });
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "You're on the list!" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

```

### 12.5 package.json dependencies

```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "@supabase/supabase-js": "^2.45.0",
  "@supabase/ssr": "^0.5.0"
}
```

### 12.6 tailwind.config.js

```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
};
```

### 12.7 manifest.json (PWA)

```json
{
  "name": "Nuju — AI Journal",
  "short_name": "Nuju",
  "description": "The 30-second AI journal that understands your life",
  "start_url": "/app",
  "display": "standalone",
  "background_color": "#F5F3FF",
  "theme_color": "#7C6EDB",
  "orientation": "portrait",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## 13. SUPABASE DATABASE SCHEMA

```sql
-- ============================================================
-- NUJU.APP — Supabase Database Schema v2.0
-- Run in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  language TEXT DEFAULT 'en',
  dark_mode BOOLEAN DEFAULT false,
  timezone TEXT DEFAULT 'UTC',
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free','plus','pro')),
  plan_expires_at TIMESTAMPTZ,
  lemon_customer_id TEXT,
  lemon_subscription_id TEXT,
  streak_current INTEGER DEFAULT 0,
  streak_longest INTEGER DEFAULT 0,
  streak_last_date DATE,
  total_entries INTEGER DEFAULT 0,
  coach_persona TEXT DEFAULT 'gentle',
  onboarded BOOLEAN DEFAULT false,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'Journaler'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. JOURNAL ENTRIES
CREATE TABLE public.entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL DEFAULT '',
  mood INTEGER NOT NULL CHECK (mood BETWEEN 1 AND 5),
  energy INTEGER CHECK (energy BETWEEN 0 AND 100),
  ai_summary TEXT,
  ai_mood_label TEXT,
  ai_themes TEXT[],
  ai_sentiment FLOAT,
  ai_people TEXT[],
  audio_url TEXT,
  prompt_text TEXT,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_entries_user_date ON public.entries(user_id, entry_date DESC);

-- 3. AI MEMORY (Ju's knowledge about user)
CREATE TABLE public.ai_memory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  memory_type TEXT NOT NULL CHECK (memory_type IN ('pattern','preference','life_event','relationship','goal','trigger')),
  content TEXT NOT NULL,
  confidence FLOAT DEFAULT 0.5,
  source_entry_ids UUID[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_memory_user ON public.ai_memory(user_id, memory_type);

-- 4. MOOD ANALYTICS (pre-computed daily)
CREATE TABLE public.mood_daily (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  avg_mood FLOAT,
  entry_count INTEGER DEFAULT 0,
  dominant_theme TEXT,
  PRIMARY KEY (user_id, date)
);

-- 5. RELATIONSHIPS (people mentioned)
CREATE TABLE public.relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  person_name TEXT NOT NULL,
  mention_count INTEGER DEFAULT 1,
  avg_sentiment FLOAT DEFAULT 0,
  themes TEXT[],
  last_mentioned_at TIMESTAMPTZ,
  UNIQUE(user_id, person_name)
);

-- 6. COACH MESSAGES
CREATE TABLE public.coach_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  persona TEXT DEFAULT 'gentle',
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_coach_user ON public.coach_messages(user_id, created_at DESC);

-- 7. WAITLIST
CREATE TABLE public.waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'landing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. STREAK FUNCTION
CREATE OR REPLACE FUNCTION public.update_streak(p_user_id UUID)
RETURNS VOID AS $$
DECLARE v_last DATE; v_cur INTEGER; v_long INTEGER;
BEGIN
  SELECT streak_last_date, streak_current, streak_longest
  INTO v_last, v_cur, v_long FROM public.profiles WHERE id = p_user_id;
  IF v_last = CURRENT_DATE THEN RETURN;
  ELSIF v_last = CURRENT_DATE - 1 THEN v_cur := v_cur + 1;
  ELSE v_cur := 1; END IF;
  IF v_cur > v_long THEN v_long := v_cur; END IF;
  UPDATE public.profiles SET streak_current=v_cur, streak_longest=v_long,
    streak_last_date=CURRENT_DATE, total_entries=total_entries+1,
    last_active_at=NOW(), updated_at=NOW() WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. ENTRY LIMIT CHECK (free = 3/week)
CREATE OR REPLACE FUNCTION public.check_entry_limit(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE v_plan TEXT; v_count INTEGER;
BEGIN
  SELECT plan INTO v_plan FROM public.profiles WHERE id = p_user_id;
  IF v_plan IN ('plus','pro') THEN RETURN true; END IF;
  SELECT COUNT(*) INTO v_count FROM public.entries
  WHERE user_id = p_user_id AND created_at >= date_trunc('week', NOW());
  RETURN v_count < 3;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_profile_select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "own_profile_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "own_entries_select" ON public.entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own_entries_insert" ON public.entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own_entries_update" ON public.entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own_entries_delete" ON public.entries FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "own_memory_select" ON public.ai_memory FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own_mood_select" ON public.mood_daily FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own_rel_select" ON public.relationships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own_coach_select" ON public.coach_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own_coach_insert" ON public.coach_messages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "waitlist_insert" ON public.waitlist FOR INSERT WITH CHECK (true);

-- ============================================================
-- DONE! 7 tables + 3 functions + full RLS
-- Copy-paste into Supabase SQL Editor and run.
-- ============================================================

```

### Supabase Project Info
- Project ID: sxgmlnlqmdjjfmcypivi
- Region: Southeast Asia (Singapore)
- URL: https://sxgmlnlqmdjjfmcypivi.supabase.co

### Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://sxgmlnlqmdjjfmcypivi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4Z21sbmxxbWRqamZtY3lwaXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTEyNDYsImV4cCI6MjA4OTU4NzI0Nn0.kUM2J00vmkRd55MmQw5AAadS8XGZKeLY0mgGg8aAVFg
GEMINI_API_KEY=your_gemini_key_here
LEMON_SQUEEZY_API_KEY=your_lemon_key_here
LEMON_SQUEEZY_WEBHOOK_SECRET=your_webhook_secret_here
```

---

## 14. LANDING PAGE SECTIONS (route: /)

1. **Navbar:** Sticky, blur on scroll. Ju icon + "Nuju" brand + nav links + "Get early access" CTA
2. **Hero:** "Your mind deserves a companion that listens" + email waitlist input + animated Ju (juFloat + glowPulse + wave)
3. **Social proof:** "Join X+ early users" counter + trust badges (3 badges)
4. **3-Step explainer:** "Tap your mood" → "Write or talk" → "Get insights" with animated icons
5. **Feature comparison:** Nuju vs Traditional journals vs Therapy apps (table)
6. **Testimonials:** 3 glassmorphic cards with star ratings and user quotes
7. **Pricing:** 3-tier cards matching app pricing
8. **Final CTA:** "Your mind deserves more than a blank page" + waitlist email
9. **Footer:** Links + copyright "© 2026 Nuju"

Waitlist form POSTs to /api/waitlist → Supabase insert.

---

## 15. PHASE 2 — MAKE IT FUNCTIONAL (Week 2)

### 15.1 Supabase Auth
- Enable in Dashboard: Email (magic link) + Google OAuth
- Redirect URL: https://nuju.app/auth/callback
- Auth callback route exchanges code for session
- Login page at /auth/login: "Continue with Google" + magic link
- handle_new_user() trigger auto-creates profile
- SignupPrompt modal should trigger login flow

### 15.2 Journal Save to DB
- On save: INSERT into entries (user_id, text, mood, energy, entry_date)
- Call update_streak(user_id) after save
- Call check_entry_limit(user_id) BEFORE save (free = 3/week)
- Load entries on mount: SELECT * FROM entries WHERE user_id ORDER BY entry_date DESC

### 15.3 Gemini AI Integration
- Model: Gemini 2.0 Flash-Lite (free 1500 req/day)
- Key: GEMINI_API_KEY (server-only, NOT NEXT_PUBLIC)
- Route: /api/ai/route.ts

```typescript
// src/app/api/ai/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { text, mood, memories, type, persona, history } = await req.json()
  
  let prompt = ''
  if (type === 'insight') {
    prompt = `You are Ju, a warm AI journal companion. The user wrote: "${text}" (mood: ${mood}/5). ${memories ? "You remember: " + memories : ""} Give a brief empathetic 2-3 sentence insight.`
  } else if (type === 'coach') {
    const personaPrompts = {
      gentle: "You are Ju as Gentle Guide. Warm, nurturing, validating.",
      tough: "You are Ju as Tough Coach. Direct, motivating, action-oriented.",
      wise: "You are Ju as Wise Sage. Philosophical, contemplative.",
      fun: "You are Ju as Fun Friend. Playful, energetic, honest.",
    }
    prompt = `${personaPrompts[persona]} Respond to: "${text}". Keep to 2-3 sentences.`
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 200, temperature: 0.7 }
      })
    }
  )
  const data = await res.json()
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
  return NextResponse.json({ result: reply })
}
```

### 15.4 AI Memory Pipeline
- After every 5 entries: extract patterns via Gemini → INSERT into ai_memory
- After each entry: extract people names → UPSERT into relationships
- Weekly: summarize last 7 entries → show in Insights

---

## 16. PHASE 3 — MONETIZE (Week 3-4)

### 16.1 Lemon Squeezy Payments
- Store "Nuju" with products: Plus Monthly $4.99, Plus Yearly $39.99, Pro Monthly $9.99, Pro Yearly $79.99
- Webhook at /api/webhook: verify HMAC signature → update profiles.plan
- Checkout: generate URL with user_id in custom_data → redirect

### 16.2 Google Play ($25)
- Capacitor: npm install @capacitor/core @capacitor/cli
- npx cap init "Nuju" "app.nuju.journal" → add android → sync
- Build APK in Android Studio → upload to Play Console

### 16.3 Voice Journaling (Pro)
- Browser SpeechRecognition API (free) or Whisper API ($0.006/min)
- Tap mic → record up to 3 min → transcribe → fill textarea

### 16.4 Relationship Mood Map (Pro)
- Gemini extracts people → relationships table
- D3.js or SVG network graph, color = sentiment

---

## 17. PHASE 4 — GROWTH (Month 2+)

- **Year in Review:** Auto-generated report after 30+ entries, shareable card
- **Time Capsule:** Entry locked until future date, countdown timer
- **Referral System:** Share link → both get 1 week Plus free
- **Export:** PDF book, JSON/CSV, Google Drive auto-backup

---

## 18. TECHNICAL GOTCHAS (from our build session)

1. **NO inline `<style>` tags** — all keyframes in globals.css. Inline styles cause Next.js SSR hydration mismatch.
2. **Font loading** via `<link>` in layout.tsx `<head>`, NEVER @import in style tags.
3. **CSS variables** with system font fallbacks (see globals.css).
4. **"use client"** directive required on ALL components using hooks.
5. **Mascot images** as base64 PNG in constants (self-contained, no external URLs).
6. **Remove ALL backgrounds** from mascot images before embedding.
7. **Mobile-first:** max-width 430px centered, 56px min tap targets.
8. **Mood order:** Rough(1) → Great(5), LEFT to RIGHT (sad → happy). Standard UX.
9. **SVG emoji mouths:** Smile = quadratic curve going DOWN (larger Y in middle). Frown = curve going UP.
10. **OnboardingScreen** has NO dark mode prop — hardcode light colors.
11. **Settings gear** goes INSIDE HomeScreen header, not in bottom nav.
12. **PageTransition** should use CSS fadeUp animation, not opacity:0 initial state (caused invisible content bug).
13. **Confetti** canvas should auto-remove after 1.5s timeout.
14. **Coach empty state** must show UNIQUE persona image (from PERSONA_IMAGES), not generic Ju.

---

## 19. COST BREAKDOWN

| Item | Cost | Phase |
|------|------|-------|
| Supabase (free tier) | $0 | 1 |
| Vercel (hobby) | $0 | 1 |
| Domain nuju.app | ~$12/yr | 1 |
| Gemini Flash-Lite | $0 (1500/day) | 2 |
| Lemon Squeezy | 5% + $0.50/txn | 3 |
| Google Play | $25 one-time | 3 |
| **TOTAL LAUNCH** | **$37** | |
| **Break-even** | **8 subs × $4.99 = $39.92/mo** | |

### Scaling Costs
| Users | Supabase | Vercel | Gemini | Total/mo |
|-------|----------|--------|--------|----------|
| 0-500 | $0 | $0 | $0 | $0 |
| 500-5K | $25 | $0 | $0 | $25 |
| 5K-50K | $25 | $20 | ~$50 | $95 |
| 50K+ | $100 | $20 | ~$200 | $320 |

---

## 20. CURRENT STATUS

### Phase 1 COMPLETED:
- ✅ All 7 screens with full UI
- ✅ Landing page + waitlist
- ✅ 5 mascot moods + 4 persona skins
- ✅ 4 retention systems
- ✅ 14 CSS animations
- ✅ 8 languages (77 keys each)
- ✅ Dark mode
- ✅ Supabase DB schema deployed
- ✅ Next.js project configured
- ✅ Deployed to Vercel

### Phase 2 TODO:
- ⬜ Supabase Auth (login/signup)
- ⬜ Journal save to DB
- ⬜ Gemini AI (replace mock responses)
- ⬜ Sticker pack 8 poses
- ⬜ Waitlist connect to landing

### Phase 3 TODO:
- ⬜ Lemon Squeezy payments
- ⬜ Google Play (Capacitor)
- ⬜ Voice journaling
- ⬜ Relationship mood map
