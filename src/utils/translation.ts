import { Language, LanguageOption } from '../types';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English (US/UK)', voiceLang: 'en-US' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ (Ethiopian)', voiceLang: 'am-ET' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo', voiceLang: 'om-ET' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', voiceLang: 'ti-ET' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية (International)', voiceLang: 'ar-SA' },
  { code: 'fr', name: 'French', nativeName: 'Français', voiceLang: 'fr-FR' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (Mandarin)', voiceLang: 'zh-CN' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', voiceLang: 'es-ES' }
];

export const TRANSLATION_DICTIONARY: Record<Language, Record<string, string>> = {
  en: {
    appName: 'Zebene Asfye International Communication',
    tagline: 'Sovereign Biometric Communication, Video Rails & Multi-purpose Exchange',
    overview: 'Overview',
    videoVoice: 'Direct Video & Voice',
    information: 'Information Exchange',
    ideaGaming: 'Idea Gaming',
    trading: 'Commodity Trade',
    expenseEngine: 'Expense Engine',
    banking: 'Banking Rails',
    sopGuide: 'Zeben SOP Guide',
    govTaxes: 'Gov Taxes',
    ownerTreasury: 'Owner Treasury',
    ethicsLaws: 'Ethics & Laws',
    participantCode: 'Participant Code',
    biometricStatus: 'Right Thumb & Right Eye Verified',
    registerBiometrics: 'Register Thumb & Eye Print',
    hearInLanguage: 'Hear in your language',
    stopAudio: 'Stop Audio',
    directCall: 'Start Direct Call',
    activeParticipant: 'Active Participant',
    thumbprint: 'Right Thumbprint',
    eyeRetina: 'Right Eye Print (Iris)',
    verified: 'Verified & Encrypted'
  },
  am: {
    appName: 'ዘበነ አስፋየ ዓለም አቀፍ ተግባቦት',
    tagline: 'የቀኝ አውራ ጣት እና የቀኝ ዓይን አሻራ የተረጋገጠበት ዓለም አቀፍ የቪዲዮ እና የንግድ ተግባቦት',
    overview: 'አጠቃላይ እይታ',
    videoVoice: 'ቀጥታ ቪዲዮ እና ድምጽ',
    information: 'የመረጃ ልውውጥ እና ቁጥጥር',
    ideaGaming: 'የትውልድ ሃሳብ ጨዋታ',
    trading: 'የምርት ንግድ ልውውጥ',
    expenseEngine: 'ከወጪ ገቢ የማመንጫ ሞተር',
    banking: 'የባንክ ትስስር',
    sopGuide: 'የዘበነ መመሪያ ድረገጽ',
    govTaxes: 'የመንግስት እና የባንክ ግብር',
    ownerTreasury: 'የባለቤቱ የገቢ ግምጃ ቤት',
    ethicsLaws: 'ዓለም አቀፍ ሕጎች እና ስነ-ምግባር',
    participantCode: 'የተሳታፊ መለያ ቁጥር',
    biometricStatus: 'የቀኝ እጅ አውራ ጣት እና የቀኝ ዓይን አሻራ ተረጋግጧል',
    registerBiometrics: 'የጣት እና የዓይን አሻራ መመዝገቢያ',
    hearInLanguage: 'በመረጡት ቋንቋ ያዳምጡ',
    stopAudio: 'ድምፅ አቁም',
    directCall: 'ቀጥታ ግንኙነት ጀምር',
    activeParticipant: 'ንቁ ተሳታፊ',
    thumbprint: 'የቀኝ እጅ አውራ ጣት አሻራ',
    eyeRetina: 'የቀኝ ዓይን አሻራ',
    verified: 'የተረጋገጠ እና የተመሰጠረ'
  },
  om: {
    appName: 'Zebene Asfye Quunnamtii Idil-addunyaa',
    tagline: 'Mallattoo Quba Mirgaa fi Ija Mirgaatiin Kan Mirkanaa’e',
    overview: 'Waligala',
    videoVoice: 'Viidiyoo fi Sagalee Kallattii',
    information: 'Waljijjiirraa Odeeffannoo',
    ideaGaming: 'Taphawwan Yaada Dhalootaa',
    trading: 'Daldala Oomishaa',
    expenseEngine: 'Baasii Irraa Galii Uumuu',
    banking: 'Walitti Hidhamiinsa Baankii',
    sopGuide: 'Qajeelfama Zeben',
    govTaxes: 'Gibira Mootummaa fi Baankii',
    ownerTreasury: 'Kuusaa Galii Abbaa Qabeenyaa',
    ethicsLaws: 'Seerota Idil-addunyaa',
    participantCode: 'Koodii Hirmaattuu',
    biometricStatus: 'Quba Mirgaa fi Ijji Mirgaa Mirkanaa\'eera',
    registerBiometrics: 'Mallattoo Qubaa fi Ijaa Galmeessi',
    hearInLanguage: 'Afaan keessaniin dhaggeeffadhaa',
    stopAudio: 'Sagalee Dhaabi',
    directCall: 'Quunnamtii Kallattii Eegali',
    activeParticipant: 'Hirmaattuu Yeroo Ammaa',
    thumbprint: 'Mallattoo Quba Mirgaa',
    eyeRetina: 'Mallattoo Ija Mirgaa',
    verified: 'Mirkanaa\'aa'
  },
  ti: {
    appName: 'ዘበነ ኣስፋየ ዓለም-ለኸ ርክብ',
    tagline: 'ብናይ የማናይ ኢድ ዓባይ ዓባይ ዓባይ ዓባይ ዓባይን ዓይንን ዝተረጋገጸ ርክብ',
    overview: 'ሓፈሻዊ ትሕዝቶ',
    videoVoice: 'ቀጥታዊ ቪድዮን ድምጽን',
    information: 'ምልውዋጥ ሓበሬታ',
    ideaGaming: 'ናይ ወለዶ ሓሳባት ጸወታ',
    trading: 'ንግዲ ፍርያት',
    expenseEngine: 'ካብ ወጻኢታት ኣታዊ መመንጨዊ',
    banking: 'ርክብ ባንክታት',
    sopGuide: 'መርበብ መምርሒ ዘበነ',
    govTaxes: 'ግብሪ መንግስትን ባንክን',
    ownerTreasury: 'ግምጃ ቤት ኣታዊ ዋና',
    ethicsLaws: 'ዓለም-ለኸ ሕግታትን ስነ-ምግባርን',
    participantCode: 'መፍለዪ ኮድ ተሳታፋይ',
    biometricStatus: 'ናይ የማን ዓባይ ዓባይ ዓባይ ዓባይ ዓባይን ዓይንን ተረጋጊጹ',
    registerBiometrics: 'ምዝገባ ኣሻራ ጣትን ዓይንን',
    hearInLanguage: 'ብቛንቋኹም ስምዑ',
    stopAudio: 'ድምጺ ኣቋርጽ',
    directCall: 'ቀጥታዊ ርክብ ጀምር',
    activeParticipant: 'ንጡፍ ተሳታፋይ',
    thumbprint: 'ኣሻራ የማናይ ዓባይ ዓባይ ዓባይ',
    eyeRetina: 'ኣሻራ የማናይ ዓይኒ',
    verified: 'ዝተረጋገጸ'
  },
  ar: {
    appName: 'اتصالات زبيني أسفاي الدولية',
    tagline: 'منصة الاتصال والتبادل الدولية المعتمدة ببصمة الإبهام الأيمن وبصمة العين اليمنى',
    overview: 'نظرة عامة',
    videoVoice: 'اتصال فيديو وصوت مباشر',
    information: 'تبادل المعلومات والتحكم بها',
    ideaGaming: 'ألعاب أفكار الأجيال',
    trading: 'تجارة السلع الأساسية',
    expenseEngine: 'توليد الدخل من النفقات',
    banking: 'الربط المصرفي',
    sopGuide: 'دليل إجراءات زبيني',
    govTaxes: 'الضرائب الحكومية والمصرفية',
    ownerTreasury: 'خزينة عوائد مالك المنصة',
    ethicsLaws: 'القوانين والأخلاقيات الدولية',
    participantCode: 'رمز المشارك الفريد',
    biometricStatus: 'تم التحقق من بصمة الإبهام الأيمن وبصمة العين اليمنى',
    registerBiometrics: 'تسجيل بصمة الإبهام وبصمة العين',
    hearInLanguage: 'استمع باللغة التي تفهمها',
    stopAudio: 'إيقاف الصوت',
    directCall: 'بدء اتصال مباشر',
    activeParticipant: 'مشارك نشط',
    thumbprint: 'بصمة الإبهام الأيمن',
    eyeRetina: 'بصمة قزحية العين اليمنى',
    verified: 'معتمد ومشفّر'
  },
  fr: {
    appName: 'Zebene Asfye Communication Internationale',
    tagline: 'Communication biométrique par empreinte du pouce droit et de l\'œil droit',
    overview: 'Aperçu',
    videoVoice: 'Vidéo & Voix Directe',
    information: 'Échange d\'Informations',
    ideaGaming: 'Jeux d\'Idées Citoyennes',
    trading: 'Commerce de Produits',
    expenseEngine: 'Génération de Revenus sur Dépenses',
    banking: 'Passerelles Bancaires',
    sopGuide: 'Manuel des Procédures Zeben',
    govTaxes: 'Taxes Gouvernementales',
    ownerTreasury: 'Trésorerie Propriétaire',
    ethicsLaws: 'Lois & Éthique Internationales',
    participantCode: 'Code Participant',
    biometricStatus: 'Pouce Droit et Œil Droit Vérifiés',
    registerBiometrics: 'Enregistrer Pouce & Œil Droit',
    hearInLanguage: 'Écoutez dans votre langue',
    stopAudio: 'Arrêter l\'Audio',
    directCall: 'Lancer Connexion Directe',
    activeParticipant: 'Participant Actif',
    thumbprint: 'Empreinte Pouce Droit',
    eyeRetina: 'Empreinte Œil Droit (Iris)',
    verified: 'Vérifié & Chiffré'
  },
  zh: {
    appName: '泽贝内·阿斯菲国际通讯平台',
    tagline: '以右手拇指指纹与右眼虹膜生物认证驱动的国际视讯与多用途交易系统',
    overview: '系统总览',
    videoVoice: '实时音视频直连',
    information: '信息交换与管控',
    ideaGaming: '世代创想有奖游戏',
    trading: '国际要宗商品交易',
    expenseEngine: '支出收益转化引擎',
    banking: '银行清算网络',
    sopGuide: '泽贝内标准操作指南',
    govTaxes: '政府与银行税金结算',
    ownerTreasury: '所有者收益与金库治理',
    ethicsLaws: '国际伦理与金融法规',
    participantCode: '参与者唯一编号',
    biometricStatus: '右手拇指与右眼印记已核验',
    registerBiometrics: '登记右手拇指与右眼生物特征',
    hearInLanguage: '用您的母语收听播报',
    stopAudio: '停止语音播报',
    directCall: '发起直连通话',
    activeParticipant: '已认证参与者',
    thumbprint: '右手拇指印记',
    eyeRetina: '右眼虹膜印记',
    verified: '已认证并加密'
  },
  es: {
    appName: 'Comunicación Internacional Zebene Asfye',
    tagline: 'Plataforma biométrica con huella de pulgar y ojo derecho, video y comercio global',
    overview: 'Resumen',
    videoVoice: 'Video y Voz Directos',
    information: 'Intercambio de Información',
    ideaGaming: 'Juegos de Ideas Globales',
    trading: 'Comercio de Productos',
    expenseEngine: 'Ingresos desde Gastos',
    banking: 'Conexión Bancaria',
    sopGuide: 'Guía de Procedimientos Zeben',
    govTaxes: 'Impuestos Estatales',
    ownerTreasury: 'Tesorería del Propietario',
    ethicsLaws: 'Leyes Éticas Internacionales',
    participantCode: 'Código de Participante',
    biometricStatus: 'Pulgar y Ojo Derecho Verificados',
    registerBiometrics: 'Registrar Pulgar y Ojo Derecho',
    hearInLanguage: 'Escuche en su idioma',
    stopAudio: 'Detener Audio',
    directCall: 'Iniciar Llamada Directa',
    activeParticipant: 'Participante Activo',
    thumbprint: 'Huella Pulgar Derecho',
    eyeRetina: 'Huella Ocular Derecha',
    verified: 'Verificado y Cifrado'
  }
};

/**
 * Text-to-Speech synthesizer reading text aloud in selected language
 */
export const playSpeech = (
  text: string,
  lang: Language,
  onStart?: () => void,
  onEnd?: () => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const langOption = LANGUAGE_OPTIONS.find(l => l.code === lang) || LANGUAGE_OPTIONS[0];
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langOption.voiceLang;
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  // Attempt to select native matching voice
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(langOption.voiceLang.substring(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
