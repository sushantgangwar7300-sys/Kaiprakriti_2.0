import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

export interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    blog: string;
    contact: string;
    admin: string;
    letsTalk: string;
    scheduleConsult: string;
    subtitle: string;
    langSelect: string;
  };
  hero: {
    badge: string;
    titlePrimary: string;
    titleSecondary: string;
    description: string;
    ctaConsult: string;
    ctaRoles: string;
    stat1Val: string;
    stat1Label: string;
    stat2Val: string;
    stat2Label: string;
    stat3Val: string;
    stat3Label: string;
  };
  roles: {
    badge: string;
    title: string;
    description: string;
    role1Badge: string;
    role1Sub: string;
    role1Title: string;
    role1Desc: string;
    role1Point1: string;
    role1Point2: string;
    role1Point3: string;
    role2Badge: string;
    role2Sub: string;
    role2Title: string;
    role2Desc: string;
    role2Point1: string;
    role2Point2: string;
    role2Point3: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    valuesTitle: string;
    firewallTitle: string;
    statsYears: string;
    statsYearsLabel: string;
    statsAudits: string;
    statsAuditsLabel: string;
    statsPillars: string;
    statsPillarsLabel: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    all: string;
    direct: string;
    facilitated: string;
    searchPlaceholder: string;
    deliverables: string[];
    requestProposal: string;
    deliverablesLabel: string;
    independentNoteLabel: string;
    close: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    directInfoTitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formCompany: string;
    formService: string;
    formCompanyType: string;
    formMessage: string;
    formSubmit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    practiceAreas: string;
    directContacts: string;
    firewallTitle: string;
    firewallText: string;
    rights: string;
  };
  common: {
    readMore: string;
    learnMore: string;
    explore: string;
    back: string;
  };
}

export const translationData: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About Us',
      blog: 'Insights & Blog',
      contact: 'Contact',
      admin: 'Admin',
      letsTalk: "Let's Talk",
      scheduleConsult: 'Schedule Strategic Consultation',
      subtitle: 'Sustainability & ESG Advisory',
      langSelect: 'Language',
    },
    hero: {
      badge: 'Empirical Sustainability & ESG Advisory',
      titlePrimary: 'Precise Carbon Accounting & BRSR Compliance.',
      titleSecondary: 'Zero Greenwashing. Guaranteed Independent Verification.',
      description: 'Kai Prakriti equips Indian enterprises with quantitative Scope 1, 2, and 3 carbon accounting, statutory SEBI BRSR Core filings, and EU CBAM readiness—strictly separated from audit assurance fees.',
      ctaConsult: 'Schedule Strategic Consultation',
      ctaRoles: 'Explore Verification Roles',
      stat1Val: '100%',
      stat1Label: 'Audit Defense Dossiers',
      stat2Val: 'Zero',
      stat2Label: 'Self-Audit Conflicts',
      stat3Val: 'AA1000',
      stat3Label: '& ISO 14064-3 Ready',
    },
    roles: {
      badge: 'The Two-Role Framework',
      title: 'We calculate it. Someone independent verifies it.',
      description: 'We never audit our own numbers. To protect your business from greenwashing accusations and regulatory scrutiny, our advisory work is strictly divided into two distinct roles.',
      role1Badge: 'Role 1: Direct Work',
      role1Sub: 'Billed by Kai Prakriti',
      role1Title: 'We perform the engineering and quantitative accounting.',
      role1Desc: 'Our environmental engineers gather primary activity records, utility invoices, freight logs, and fuel receipts to calculate mathematically verified carbon baselines.',
      role1Point1: 'Primary data collection from shop floors and utility meters',
      role1Point2: 'Transparent emission factors traceable to CEA and IPCC databases',
      role1Point3: 'Preparation of full audit defense dossiers for external verifiers',
      role2Badge: 'Role 2: Facilitated Verification',
      role2Sub: 'Accredited Third Party',
      role2Title: 'An accredited third party audits our work.',
      role2Desc: 'When statutory rules demand independent assurance, we coordinate with accredited verifiers (BEE ACVA, DAkkS, RvA). We never issue certification opinions on our own calculations.',
      role2Point1: '100% written disclosure of any introductory arrangement',
      role2Point2: 'Pre-vetted audit teams holding active statutory accreditations',
      role2Point3: 'Guaranteed compliance with AA1000 and ISO 14064-3 independence',
    },
    about: {
      badge: 'About Kai Prakriti',
      title: 'Sovereign science, empirical data, and uncompromised ethics.',
      subtitle: 'Founded to eliminate greenwashing and self-audit conflicts of interest in corporate sustainability, Kai Prakriti delivers quantitative precision designed to withstand statutory audits.',
      valuesTitle: 'Our Institutional Philosophy',
      firewallTitle: 'Two-Line Independence Firewall',
      statsYears: '100%',
      statsYearsLabel: 'Mathematical Traceability',
      statsAudits: 'Zero',
      statsAuditsLabel: 'Self-Certification Conflicts',
      statsPillars: 'Statutory',
      statsPillarsLabel: 'SEBI & EU CBAM Aligned',
    },
    services: {
      badge: 'Complete Services Directory',
      title: 'Quantitative sustainability advisory built for statutory scrutiny.',
      subtitle: 'Every service is engineered with complete mathematical transparency and audit-ready defense dossiers.',
      all: 'All Services',
      direct: 'Direct Advisory',
      facilitated: 'Facilitated Verification',
      searchPlaceholder: 'Search services, standards (BRSR, CBAM, GHG Protocol)...',
      deliverables: [],
      requestProposal: 'Request Proposal',
      deliverablesLabel: 'Core Deliverables:',
      independentNoteLabel: 'Independence Note:',
      close: 'Close',
    },
    contact: {
      badge: 'Direct Senior Contact',
      title: 'Initiate Your Sustainability Transformation',
      subtitle: 'Speak directly with our senior carbon accounting practitioners and compliance directors. We guarantee prompt response within 24 business hours.',
      directInfoTitle: 'Direct Institutional Office',
      formName: 'Your Full Name',
      formEmail: 'Corporate Email Address',
      formPhone: 'Phone Number (Optional)',
      formCompany: 'Enterprise / Organization',
      formService: 'Required Advisory Domain',
      formCompanyType: 'Enterprise Category',
      formMessage: 'Project Context or Statutory Deadlines',
      formSubmit: 'Submit Strategic Inquiry',
      submitting: 'Transmitting Securely...',
      successTitle: 'Thank you',
      successMessage: 'Your inquiry has been successfully transmitted directly to our advisory practice. A senior partner will contact you within 24 hours.',
      sendAnother: 'Send Another Inquiry',
    },
    footer: {
      tagline: 'Empirical carbon accounting, SEBI BRSR Core compliance, and EU CBAM advisory with zero self-audit conflicts of interest.',
      quickLinks: 'Navigation',
      practiceAreas: 'Practice Areas',
      directContacts: 'Direct Contact',
      firewallTitle: 'Ethical Independence Firewall:',
      firewallText: 'Kai Prakriti operates strictly as a quantitative sustainability advisory. When statutory compliance mandates independent third-party reasonable assurance under AA1000, ISO 14064-3, or SEBI circulars, audits are conducted by separate accredited bodies.',
      rights: 'All rights reserved. Sovereign Carbon Accounting.',
    },
    common: {
      readMore: 'Read Article',
      learnMore: 'Learn More',
      explore: 'Explore',
      back: 'Back',
    },
  },
  hi: {
    nav: {
      home: 'मुख्य पृष्ठ',
      services: 'सेवाएं',
      about: 'हमारे बारे में',
      blog: 'ब्लॉग व अंतर्दृष्टि',
      contact: 'संपर्क',
      admin: 'प्रशासन',
      letsTalk: 'बातचीत करें',
      scheduleConsult: 'रणनीतिक परामर्श तय करें',
      subtitle: 'स्थिरता एवं ईएसजी परामर्श',
      langSelect: 'भाषा',
    },
    hero: {
      badge: 'अनुभवजन्य स्थिरता एवं ईएसजी परामर्श',
      titlePrimary: 'सटीक कार्बन लेखांकन एवं बीआरएसआर अनुपालन।',
      titleSecondary: 'शून्य ग्रीनवॉशिंग। गारंटीकृत स्वतंत्र सत्यापन।',
      description: 'काई प्रकृति भारतीय उद्यमों को सटीक स्कोप 1, 2 और 3 कार्बन लेखांकन, वैधानिक सेबी बीआरएसआर कोर फाइलिंग और यूरोपीय संघ सीबीएएम अनुपालन प्रदान करता है—ऑडिट शुल्क से पूरी तरह पृथक।',
      ctaConsult: 'रणनीतिक परामर्श तय करें',
      ctaRoles: 'सत्यापन भूमिकाएं देखें',
      stat1Val: '100%',
      stat1Label: 'ऑडिट सुरक्षा दस्तावेज',
      stat2Val: 'शून्य',
      stat2Label: 'स्वयं-ऑडिट विरोधाभास',
      stat3Val: 'AA1000',
      stat3Label: '& ISO 14064-3 अनुकूल',
    },
    roles: {
      badge: 'दोहरी भूमिका रूपरेखा',
      title: 'हम गणना करते हैं। कोई स्वतंत्र पक्ष सत्यापन करता है।',
      description: 'हम कभी भी अपने आंकड़ों का स्वयं ऑडिट नहीं करते। आपके व्यवसाय को ग्रीनवॉशिंग के आरोपों और विनियामक जांच से बचाने के लिए हमारा कार्य दो स्पष्ट भूमिकाओं में विभाजित है।',
      role1Badge: 'भूमिका 1: प्रत्यक्ष कार्य',
      role1Sub: 'काई प्रकृति द्वारा बिल किया गया',
      role1Title: 'हम इंजीनियरिंग और मात्रात्मक लेखांकन करते हैं।',
      role1Desc: 'हमारे पर्यावरण इंजीनियर प्राथमिक गतिविधि रिकॉर्ड, बिजली बिल, माल ढुलाई लॉग और ईंधन रसीदों से गणितीय रूप से सत्यापित कार्बन आधार रेखा तैयार करते हैं।',
      role1Point1: 'कारखाने और मीटरों से प्राथमिक डेटा का प्रत्यक्ष संकलन',
      role1Point2: 'सीईए और आईपीसीसी डेटाबेस से जुड़े पारदर्शी उत्सर्जन कारक',
      role1Point3: 'बाहरी सत्यापनकर्ताओं के लिए पूर्ण ऑडिट रक्षा डोजियर की तैयारी',
      role2Badge: 'भूमिका 2: सुविधा प्राप्त सत्यापन',
      role2Sub: 'मान्यता प्राप्त तृतीय पक्ष',
      role2Title: 'एक मान्यता प्राप्त तृतीय पक्ष हमारे कार्य का ऑडिट करता है।',
      role2Desc: 'जब वैधानिक नियम स्वतंत्र आश्वासन की मांग करते हैं, तो हम मान्यता प्राप्त सत्यापनकर्ताओं (BEE ACVA, DAkkS, RvA) के साथ समन्वय करते हैं। हम स्वयं के आंकड़ों पर कभी प्रमाणन राय जारी नहीं करते।',
      role2Point1: 'किसी भी प्रारंभिक व्यवस्था का 100% लिखित प्रकटीकरण',
      role2Point2: 'सक्रिय वैधानिक मान्यता प्राप्त पूर्व-जांच की गई ऑडिट टीमें',
      role2Point3: 'AA1000 और ISO 14064-3 स्वतंत्रता के साथ गारंटीकृत अनुपालन',
    },
    about: {
      badge: 'काई प्रकृति के बारे में',
      title: 'सार्वभौमिक विज्ञान, अनुभवजन्य डेटा और अटूट नैतिकता।',
      subtitle: 'कॉर्पोरेट स्थिरता में ग्रीनवॉशिंग और स्वयं-ऑडिट के विरोधाभास को समाप्त करने के लिए स्थापित, काई प्रकृति वैधानिक ऑडिट का सामना करने वाली सटीकता प्रदान करती है।',
      valuesTitle: 'हमारा संस्थागत दर्शन',
      firewallTitle: 'दोहरी स्वतंत्रता सुरक्षा दीवार',
      statsYears: '100%',
      statsYearsLabel: 'गणितीय प्रमाणिकता',
      statsAudits: 'शून्य',
      statsAuditsLabel: 'स्वयं-प्रमाणन विरोधाभास',
      statsPillars: 'वैधानिक',
      statsPillarsLabel: 'सेबी एवं ईयू सीबीएएम समर्थित',
    },
    services: {
      badge: 'संपूर्ण सेवा निर्देशिका',
      title: 'वैधानिक जांच के लिए निर्मित मात्रात्मक स्थिरता परामर्श।',
      subtitle: 'प्रत्येक सेवा संपूर्ण गणितीय पारदर्शिता और ऑडिट-तैयार सुरक्षा डोजियर के साथ तैयार की जाती है।',
      all: 'सभी सेवाएं',
      direct: 'प्रत्यक्ष परामर्श',
      facilitated: 'सत्यापन सुविधा',
      searchPlaceholder: 'सेवाएं, मानक (BRSR, CBAM, GHG Protocol) खोजें...',
      deliverables: [],
      requestProposal: 'प्रस्ताव का अनुरोध करें',
      deliverablesLabel: 'मुख्य परिणाम:',
      independentNoteLabel: 'स्वतंत्रता टिप्पणी:',
      close: 'बंद करें',
    },
    contact: {
      badge: 'सीधा वरिष्ठ संपर्क',
      title: 'अपनी स्थिरता यात्रा प्रारंभ करें',
      subtitle: 'हमारे वरिष्ठ कार्बन लेखांकन विशेषज्ञों और अनुपालन निदेशकों से सीधे संपर्क करें। हम 24 व्यावसायिक घंटों के भीतर जवाब देने की गारंटी देते हैं।',
      directInfoTitle: 'प्रत्यक्ष संस्थागत कार्यालय',
      formName: 'आपका पूरा नाम',
      formEmail: 'कार्यालय का ईमेल पता',
      formPhone: 'फ़ोन नंबर (वैकल्पिक)',
      formCompany: 'उद्यम / संगठन का नाम',
      formService: 'आवश्यक परामर्श क्षेत्र',
      formCompanyType: 'उद्यम श्रेणी',
      formMessage: 'परियोजना संदर्भ या वैधानिक समय सीमा',
      formSubmit: 'रणनीतिक पूछताछ भेजें',
      submitting: 'सुरक्षित रूप से भेजा जा रहा है...',
      successTitle: 'धन्यवाद',
      successMessage: 'आपकी पूछताछ हमारे परामर्श अभ्यास तक सुरक्षित रूप से पहुंच गई है। एक वरिष्ठ भागीदार 24 घंटों के भीतर आपसे संपर्क करेगा।',
      sendAnother: 'दूसरी पूछताछ भेजें',
    },
    footer: {
      tagline: 'अनुभवजन्य कार्बन लेखांकन, सेबी बीआरएसआर कोर अनुपालन और बिना किसी विरोधाभास के ईयू सीबीएएम परामर्श।',
      quickLinks: 'नेविगेशन',
      practiceAreas: 'परामर्श क्षेत्र',
      directContacts: 'सीधा संपर्क',
      firewallTitle: 'नैतिक स्वतंत्रता सुरक्षा दीवार:',
      firewallText: 'काई प्रकृति कड़ाई से मात्रात्मक स्थिरता सलाहकार के रूप में कार्य करती है। जब वैधानिक अनुपालन के तहत स्वतंत्र सत्यापन आवश्यक होता है (AA1000, ISO 14064-3 या सेबी परिपत्रों के तहत), तो ऑडिट अलग मान्यता प्राप्त निकायों द्वारा किया जाता है।',
      rights: 'सर्वाधिकार सुरक्षित। सॉवरेन कार्बन अकाउंटिंग।',
    },
    common: {
      readMore: 'लेख पढ़ें',
      learnMore: 'और जानें',
      explore: 'देखें',
      back: 'वापस',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'kai_prakriti_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'en' || saved === 'hi') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t: translationData[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
