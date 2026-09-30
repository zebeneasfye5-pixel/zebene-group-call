import { Language, LanguageOption } from '../types';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English (Global)', flag: '🌐', voiceLang: 'en-US' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ (ኢትዮጵያ)', flag: '🇪🇹', voiceLang: 'am-ET' },
  { code: 'om', name: 'Afaan Oromoo', nativeName: 'Afaan Oromoo', flag: '🇪🇹', voiceLang: 'en-US' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ (ኤርትራ/ኢትዮጵያ)', flag: '🇪🇹', voiceLang: 'am-ET' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية (الشرق الأوسط)', flag: '🇸🇦', voiceLang: 'ar-SA' },
  { code: 'fr', name: 'French', nativeName: 'Français (Afrique/Europe)', flag: '🇫🇷', voiceLang: 'fr-FR' },
  { code: 'es', name: 'Spanish', nativeName: 'Español (LatAm/España)', flag: '🇪🇸', voiceLang: 'es-ES' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (普通话)', flag: '🇨🇳', voiceLang: 'zh-CN' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili (Afrika Mashariki)', flag: '🇰🇪', voiceLang: 'sw-KE' },
  { code: 'de', name: 'German', nativeName: 'Deutsch (Europa)', flag: '🇩🇪', voiceLang: 'de-DE' }
];

export const TRANSLATION_DICTIONARY: Record<Language, {
  welcome: string;
  goldenChair: string;
  fourDigitKey: string;
  tasksAndWorkforce: string;
  tradeExchange: string;
  bankAidDonation: string;
  liveChat: string;
  listenToVoice: string;
  masterKeyDesc: string;
  trustworthyNotice: string;
}> = {
  en: {
    welcome: 'Welcome to Zebene International Communication. Verified global exchange, live golden chair studio, and humanitarian aid.',
    goldenChair: 'The Golden Chair VIP Studio: Sit in the dignified member seat for high-definition live video & studio microphone communication.',
    fourDigitKey: 'Your 4-Digit Passcode: Keep this unique number safe. It grants complete biometric-cleared access to all platform systems.',
    tasksAndWorkforce: 'Workforce & Tasks: Earn honest income by completing certified tasks and expanding productive global cooperation.',
    tradeExchange: 'Commodity Trading: Authentic, fair-value exchange of specialty coffee, solar gear, and artisan goods with realistic 15% VAT filing.',
    bankAidDonation: 'Bank Aid & Donations: Transparent humanitarian funds connected directly to commercial banks for vulnerable communities.',
    liveChat: 'Live Global Chat: Real-time discussion between verified delegates across all nations with instant multi-language translation.',
    listenToVoice: 'Listen in your native language',
    masterKeyDesc: 'Founder Authority Key (1224) allows system auditing, member analytics, and country demographics review.',
    trustworthyNotice: 'Verified Sovereign Integrity: Real figures, non-exaggerated balances, and transparent civic governance.'
  },
  am: {
    welcome: 'እንኳን ወደ ዘበነ አስፋዬ አለም አቀፍ ኮሚዩኒኬሽን በደህና መጡ። የተረጋገጠ ዓለም አቀፍ ልውውጥ፣ የወርቅ ወንበር ስቱዲዮ እና የሰብአዊ ድጋፍ።',
    goldenChair: 'የወርቅ ወንበር ቪአይፒ ስቱዲዮ፡- ለጥራት ያለው የቀጥታ ቪዲዮ እና ከፍተኛ ጥራት ማይክሮፎን ክብር ባለው የወርቅ ወንበር ላይ ይቀመጡ።',
    fourDigitKey: 'የእርስዎ 4-አሃዝ የሚስጥር ቁጥር፡- ይህን ቁጥር በጥንቃቄ ይያዙ። ድረ-ገጹን ለመክፈት እና ሁሉንም ስርዓቶች ለመቆጣጠር ይጠቅማል።',
    tasksAndWorkforce: 'የስራ ሃይል እና ተግባራት፡- የተረጋገጡ ስራዎችን በማከናወን እና የስራ ሃይልዎን በማሳደግ ተገቢ ገቢ ያግኙ።',
    tradeExchange: 'የምርት ግብይት፡- የኢትዮጵያ ቡና፣ የፀሐይ ኃይል እና የእጅ ጥበብ እቃዎች በታማኝነት እና ምክንያታዊ የ15% ታክስ ክፍያ።',
    bankAidDonation: 'የባንክ ዕርዳታ እና ልገሳ፡- ችግረኞችን ለመርዳት በቀጥታ ከባንክ ጋር የተገናኘ አስተማማኝ የእርዳታ ማሰባሰቢያ ስርዓት።',
    liveChat: 'የቀጥታ ውይይት፡- በዓለም ዙሪያ ካሉ የተረጋገጡ አባላት ጋር በቀጥታ ይወያዩ እና መረጃ ይለዋወጡ።',
    listenToVoice: 'በራስዎ ቋንቋ በድምጽ ያዳምጡ',
    masterKeyDesc: 'የድረ-ገጽ ገንቢው ዋና ቁልፍ (1224) አጠቃላይ ስርዓቱን እና የአባላት አገራዊ ስታቲስቲክስን ለመቆጣጠር ያስችላል።',
    trustworthyNotice: 'እውነተኛ እና አስተማማኝ፡ ምክንያታዊ ያልተጋነኑ ቁጥሮች እና ግልፅ የአሰራር ህግጋት።'
  },
  om: {
    welcome: 'Baga gara Walqunnamtii Idil-addunyaa Zabanatti nagaan dhuftan. Jijjiirraa qabatamaa, istudiyoo teessoo warqee fi gargaarsa namoomaa.',
    goldenChair: 'Istudiyoo Teessoo Warqee VIP: Viidiyoo qulqullina olaanaa fi maaykiroofoonii olaanaaf teessoo kabajamaa warqee irratti taa\'aa.',
    fourDigitKey: 'Koodii Lakkoofsa 4: Lakkoofsa iccitii kana of eeggannoodhaan qabaadha. Marsariiticha banuuf isin gargaara.',
    tasksAndWorkforce: 'Hojii fi Humnas Hojii: Hojiiwwan adda addaa raawwachuudhaan galii qabatamaa argadhaa.',
    tradeExchange: 'Daldala Oomishaa: Daldala buna qulqullina olaanaa fi anniisaa aduu gibira 15% dhugaa wajjin.',
    bankAidDonation: 'Gargaarsa Baankii: Namoota rakkataniif baankii wajjin kallattiin walqabatee gargaarsa walitti qabuu.',
    liveChat: 'Haasaa Kallattii: Hirmaattota idil-addunyaa wajjin afaan ofiitiin kallattiin walqunnamaa.',
    listenToVoice: 'Afaan keessaniin sagaleen dhaggeeffadhaa',
    masterKeyDesc: 'Furtuu iccitii ijaaraa (1224) sirna hunda to\'achuuf fayyada.',
    trustworthyNotice: 'Dhugaa fi Amanamaa: Lakkoofsota hin garmalene fi iftoomina qabu.'
  },
  ti: {
    welcome: 'እንቋዕ ናብ ዘበነ ዓለም ለኸ ርክብ ብደሓን መጻእኩም። ዝተረጋገጸ ዓለማዊ ምልውዋጥን ስቱድዮ ወርቂ ኮፍ መበሊን።',
    goldenChair: 'ስቱድዮ ወርቂ ኮፍ መበሊ፡ ንጥዑም ቀጥታዊ ቪድዮን ማይክሮፎንን ኣብቲ ክቡር ኮፍ መበሊ ተቐመጡ።',
    fourDigitKey: 'ናይ 4-ኣሃዝ ምስጢራዊ ኮድኩም፡ ነዚ ቚጽሪ ብጥንቃቐ ሓዝዎ፣ መርበብ ሓበሬታ ንምኽፋት የገልግል።',
    tasksAndWorkforce: 'ስራሕን ሓይሊ ሰብን፡ ስራሓት ብምፍጻም ቅኑዕ ኣታዊ ምርካብ።',
    tradeExchange: 'ንግዲ ፍርያት፡ ዝተመርጸ ቡን ኢትዮጵያን ካልኦት ንብረታትን ብፍትሓዊ ግብሪ።',
    bankAidDonation: 'ናይ ባንኪ ሓገዝን ምውፋይን፡ ንዝተሸገሩ ወገናት ብቐጥታ ምስ ባንክታት ዝተኣሳሰረ ሓገዝ።',
    liveChat: 'ቀጥታዊ ምይይጥ፡ ምስ ዓለም ለኸ ኣባላት ብቐጥታ ተዘራረቡ።',
    listenToVoice: 'ብቛንቋኹም ብድምጺ ስምዑ',
    masterKeyDesc: 'መፍትሕ መሃዚ (1224) ምሉእ ስርዓትን ኣባላትን ንምቁጽጻር።',
    trustworthyNotice: 'እሙንን ሓቀኛን፡ ዘይተጋነነ ቁጽርታትን ግሉጽነትን ዘለዎ።'
  },
  ar: {
    welcome: 'مرحبًا بكم في منصة زبيني الدولية للاتصالات. تبادل عالمي موثوق، واستوديو الكرسي الذهبي، والمساعدات الإنسانية.',
    goldenChair: 'استوديو الكرسي الذهبي لكبار الشخصيات: اجلس على الكرسي المرموق للبث المباشر عالي الدقة والميكروفون الصوتي.',
    fourDigitKey: 'رمز المرور المكون من 4 أرقام: احتفظ بهذا الرقم بأمان لفتح النظام بالكامل بعد التحقق البيومتري.',
    tasksAndWorkforce: 'القوى العاملة والمهام: احصل على دخل حقيقي من خلال إنجاز المهام المعتمدة وتوسيع العمل.',
    tradeExchange: 'تجارة السلع: تجارة القهوة المختصة والطاقة الشمسية بضريبة قيمة مضافة واقعية بنسبة 15%.',
    bankAidDonation: 'المساعدات المصرفية والتبرعات: نظام متصل مباشرة بالبنوك لجمع المساعدات للمحتاجين بشفافية.',
    liveChat: 'دردشة مباشرة: تواصل في الوقت الفعلي مع وفود معتمدة من جميع أنحاء العالم مع ترجمة فورية.',
    listenToVoice: 'استمع بصوت واضح بلغتك الأم',
    masterKeyDesc: 'مفتاح المطور السري (1224) للتحكم في المنظمة وإحصائيات الدول.',
    trustworthyNotice: 'نزاهة وثقة: أرقام واقعية وغير مبالغ فيها مع حوكمة واضحة.'
  },
  fr: {
    welcome: 'Bienvenue sur Zebene International Communication. Échange mondial vérifié, studio Chaire Dorée et aide humanitaire.',
    goldenChair: 'Studio Fauteuil Doré VIP : Prenez place dans le fauteuil prestigieux pour un flux vidéo HD et micro studio.',
    fourDigitKey: 'Votre code secret à 4 chiffres : Conservez ce code unique pour déverrouiller l’accès complet.',
    tasksAndWorkforce: 'Main-d\'œuvre et tâches : Gagnez un revenu décent en effectuant des tâches certifiées.',
    tradeExchange: 'Commerce de produits : Échange de café éthiopien et énergie solaire avec une TVA réaliste de 15%.',
    bankAidDonation: 'Aide bancaire & Dons : Plateforme humanitaire directement liée aux banques pour les personnes vulnérables.',
    liveChat: 'Chat en direct : Échangez instantanément avec des membres du monde entier avec traduction.',
    listenToVoice: 'Écoutez dans votre langue maternelle',
    masterKeyDesc: 'Clé secrète du bâtisseur (1224) pour auditer le système et voir les pays inscrits.',
    trustworthyNotice: 'Fiabilité et authenticité : Montants raisonnables et conformité totale.'
  },
  es: {
    welcome: 'Bienvenido a Zebene International Communication. Intercambio global verificado, estudio Silla Dorada y ayuda humanitaria.',
    goldenChair: 'Estudio Silla Dorada VIP: Siéntese en el prestigioso asiento para transmisión en vivo y micrófono de estudio.',
    fourDigitKey: 'Su código de 4 dígitos: Guarde este número único para acceder tras la verificación biométrica.',
    tasksAndWorkforce: 'Fuerza laboral y tareas: Genere ingresos realizando tareas verificadas.',
    tradeExchange: 'Comercio de productos: Café de especialidad y paneles solares con IVA realista del 15%.',
    bankAidDonation: 'Ayuda bancaria y donaciones: Fondos humanitarios conectados a bancos comerciales para los necesitados.',
    liveChat: 'Chat en vivo: Comunicación instantánea entre delegados con traducción multilingüe.',
    listenToVoice: 'Escuche en su propio idioma nativo',
    masterKeyDesc: 'Clave maestra del creador (1224) para controlar el sistema y estadísticas por país.',
    trustworthyNotice: 'Transparente y confiable: Cifras sensatas y sin exageraciones.'
  },
  zh: {
    welcome: '欢迎来到 Zebene 国际交流平台。经过认证的全球信息交换、黄金座椅直播演播室与人道主义援助。',
    goldenChair: '黄金座椅贵宾演播室：就座于尊贵的黄金座椅，享受高清实时音视频与专业演播室麦克风。',
    fourDigitKey: '您的4位数专属密码：妥善保管该数字密码，输入后即可解锁全站系统。',
    tasksAndWorkforce: '劳动力与任务赚钱：通过完成各项认证任务赚取真实合理的报酬。',
    tradeExchange: '国际商品贸易：埃塞俄比亚精品咖啡、太阳能设备交易，附带合理透明的15%增值税。',
    bankAidDonation: '银行直连人道捐助：直接连接商业银行，为需要帮助的人群汇集援助。',
    liveChat: '全球实时互动：与世界各地的认证成员实时交流并享受自动语言翻译。',
    listenToVoice: '用您的母语收听语音播报',
    masterKeyDesc: '网站创始人控制密钥（1224），可全面掌控系统并查看各国注册人数。',
    trustworthyNotice: '真实可信：数据客观合理，绝无虚高夸大。'
  },
  sw: {
    welcome: 'Karibu Zebene International Communication. Mfumo wa kimataifa wa mawasiliano, studio ya Kiti cha Dhahabu na misaada.',
    goldenChair: 'Studio ya Kiti cha Dhahabu VIP: Keti kwenye kiti cha heshima kwa ajili ya video safi na maikrofoni ya kisasa.',
    fourDigitKey: 'Nambari yako ya siri ya tarakimu 4: Hifadhi nambari hii ili kufungua mfumo mzima.',
    tasksAndWorkforce: 'Kazi na Mapato: Pata kipato halali kwa kukamilisha kazi zilizothibitishwa.',
    tradeExchange: 'Biashara ya Bidhaa: Kahawa ya ubora wa juu na nishati ya jua na kodi halali ya 15%.',
    bankAidDonation: 'Misaada na Benki: Unganishwa na benki kutoa na kukusanya misaada kwa wanaohitaji.',
    liveChat: 'Gumzo la Moja kwa Moja: Ongea na wajumbe duniani kote kwa lugha yako.',
    listenToVoice: 'Sikiliza kwa sauti katika lugha yako',
    masterKeyDesc: 'Nambari ya siri ya mjenzi (1224) ya kudhibiti mfumo na kuona wanachama wa nchi zote.',
    trustworthyNotice: 'Ya Kuaminika: Nambari sahihi na zisizotiwa chumvi.'
  },
  de: {
    welcome: 'Willkommen bei Zebene International Communication. Verifizierter globaler Austausch, Goldener Stuhl-Studio und humanitäre Hilfe.',
    goldenChair: 'Goldener Stuhl VIP-Studio: Nehmen Sie auf dem Ehrensitz Platz für HD-Live-Video und Studio-Mikrofon.',
    fourDigitKey: 'Ihr 4-stelliger Geheimcode: Bewahren Sie diese Nummer auf, um nach dem Scan das Portal zu öffnen.',
    tasksAndWorkforce: 'Arbeitskraft & Aufgaben: Verdienen Sie echtes Einkommen durch die Erledigung geprüfter Aufgaben.',
    tradeExchange: 'Warenhandel: Spezialitätenkaffee und Solartechnik mit realistischer 15% Mehrwertsteuer.',
    bankAidDonation: 'Bankhilfe & Spenden: Direkt mit Banken vernetzte Hilfsgüter für Bedürftige.',
    liveChat: 'Live-Chat: Echtzeitgespräche mit weltweiten Delegierten mit Sprachübersetzung.',
    listenToVoice: 'Hören Sie in Ihrer Muttersprache',
    masterKeyDesc: 'Erstellerschlüssel (1224) zur Steuerung des Gesamtsystems und Länderstatistiken.',
    trustworthyNotice: 'Glaubwürdig und transparent: Keine übertriebenen Fake-Beträge.'
  }
};

export const playSpeech = (text: string, langCode: Language) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const langConfig = LANGUAGE_OPTIONS.find(l => l.code === langCode);
  
  if (langConfig) {
    utterance.lang = langConfig.voiceLang;
  } else {
    utterance.lang = 'en-US';
  }

  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
