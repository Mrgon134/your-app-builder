/**
 * Static page definitions and renderers for quizzes, psychology tests,
 * somatic tools, and interactive wellness features.
 *
 * Used by scripts/prerender.mjs to generate static HTML files in dist/
 * so Googlebot and search engines receive full content instead of a SPA shell.
 */

export function getQuizAndToolPages({
  BASE_URL,
  OG_IMAGE,
  OG_IMAGE_ALT,
  escapeHtml,
  escapeAttribute,
  renderPageShell,
  renderSection,
  renderLinkCardGrid,
  renderFaq,
  renderCta,
  renderList,
  renderOrdered,
}) {
  const quizHubFaqs = [
    {
      question: "Are these psychology tests scientifically validated?",
      answer:
        "Yes. Our assessments are adapted from recognized clinical and psychological research instruments, including the DASS-21 (Lovibond & Lovibond), ASRS-v1.1 (WHO/Kessler), ECR-R (Fraley et al.), HSP Scale (Dr. Elaine Aron), and TAS-20 (Bagby et al.). They are designed for educational awareness, emotional self-reflection, and personal growth.",
    },
    {
      question: "Is my quiz result private?",
      answer:
        "100% private. All calculations run client-side in your browser. We do not store, track, sell, or attach your answers to personal advertising profiles.",
    },
    {
      question: "Do these tests replace professional therapy or clinical diagnosis?",
      answer:
        "No. Screening tools help identify emotional patterns, burnout levels, and stress markers, but they are not formal diagnostic instruments. If you are experiencing severe distress, please consult a licensed psychologist or medical doctor.",
    },
    {
      question: "How can I process my quiz results in Nuju?",
      answer:
        "At the end of each test, you will receive personalized CBT reflection prompts and tailored somatic recovery exercises that you can copy directly into your Nuju journal.",
    },
  ];

  const quizHubFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: quizHubFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const quizHubCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Psychology Tests & Mental Health Screeners | Nuju Quiz Hub",
    description:
      "Interactive, evidence-based psychology tests and somatic regulation tools to decode burnout, emotional fatigue, ADHD traits, attachment styles, and nervous system states.",
    url: `${BASE_URL}/quiz`,
    isPartOf: {
      "@type": "WebSite",
      name: "Nuju",
      url: BASE_URL,
    },
  };

  // 1. Quiz Hub Main Page
  const quizHubPage = {
    route: "/quiz",
    title: "Free Psychology Tests & Mental Health Screeners",
    description:
      "Take 1-minute interactive psychology tests: Check your emotional battery, DASS-21 mental health score, ADHD traits, burnout levels, and attachment style. 100% free, private, and CBT-based.",
    canonical: `${BASE_URL}/quiz`,
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Psychology Tests", url: `${BASE_URL}/quiz` },
    ],
    schemas: [quizHubCollectionSchema, quizHubFaqSchema],
    bodyHtml: renderPageShell({
      eyebrow: "Psychology & Self-Discovery Hub",
      title: "Free Psychology Tests, Mental Health Screeners & Self-Discovery Tools",
      description:
        "Discover the roots of late-night overthinking, emotional burnout, relationship dynamics, and nervous system stress through evidence-based interactive assessments. 100% private, anonymous, and free.",
      meta: "21 Clinical & Psychological Tests · 13 Somatic Tools · Instant CBT Insights",
      sections: [
        renderSection(
          "Clinical & Emotional Wellness Screeners",
          renderLinkCardGrid([
            {
              badge: "Gold Standard · 21 Items",
              title: "DASS-21 Mental Health Screener",
              description: "Assess depression, anxiety, and stress levels with scientifically validated scoring.",
              href: "/quiz/mental-health-test",
            },
            {
              badge: "WHO ASRS-v1.1",
              title: "Adult ADHD & Focus Screener",
              description: "Detect executive dysfunction, attention regulation, and dopamine-seeking patterns.",
              href: "/quiz/adhd-screener",
            },
            {
              badge: "Exhaustion & Recovery",
              title: "Occupational Burnout Screener",
              description: "Distinguish between temporary physical fatigue and deep chronic nervous system burnout.",
              href: "/quiz/burnout",
            },
            {
              badge: "Hidden Tension",
              title: "High-Functioning Anxiety Test",
              description: "Uncover perfectionism, anticipatory dread, and covert anxiety masked by high achievement.",
              href: "/quiz/high-functioning-anxiety",
            },
            {
              badge: "Polyvagal Theory",
              title: "Nervous System & Polyvagal Test",
              description: "Map whether your autonomic nervous system is in Ventral Vagal, Sympathetic, or Dorsal Vagal Freeze.",
              href: "/quiz/nervous-system",
            },
            {
              badge: "Neurodivergence",
              title: "Rejection Sensitive Dysphoria (RSD)",
              description: "Measure intense emotional pain triggered by perceived rejection, criticism, or failure.",
              href: "/quiz/rsd",
            },
          ]),
        ),
        renderSection(
          "Relationship & Identity Assessments",
          renderLinkCardGrid([
            {
              badge: "ECR-R Framework",
              title: "Adult Attachment Style Test",
              description: "Explore Secure, Anxious-Preoccupied, Dismissive-Avoidant, or Fearful-Avoidant attachment patterns.",
              href: "/quiz/attachment-style",
            },
            {
              badge: "Trauma & Healing",
              title: "Inner Child Wound Assessment",
              description: "Uncover core developmental wounds: Abandonment, Rejection, Guilt, Trust, or Neglect.",
              href: "/quiz/inner-child",
            },
            {
              badge: "Boundary Health",
              title: "People-Pleasing & Boundary Test",
              description: "Identify fawning trauma responses, boundary erosion, and chronic fear of saying no.",
              href: "/quiz/people-pleasing",
            },
            {
              badge: "Chapman Framework",
              title: "5 Love Languages Assessment",
              description: "Discover how you naturally give and receive emotional security and intimacy.",
              href: "/quiz/love-languages",
            },
            {
              badge: "Sensory Processing",
              title: "Highly Sensitive Person (HSP) Test",
              description: "Evaluate depth of processing, sensory sensitivity, and environmental empathy overload.",
              href: "/quiz/hsp",
            },
            {
              badge: "Jungian Psychology",
              title: "Shadow Work & Projection Test",
              description: "Explore repressed behavioral traits, unexpressed emotions, and unconscious self-sabotage.",
              href: "/quiz/shadow-work",
            },
          ]),
        ),
        renderSection(
          "Interactive Somatic Tools & Nervous System Pacers",
          renderLinkCardGrid([
            {
              badge: "Stanford Huberman Lab",
              title: "Cyclic Physiological Sigh Lab",
              description: "The fastest real-time autonomic down-regulation tool: dual inhale + long sigh.",
              href: "/tools/physiological-sigh",
            },
            {
              badge: "EMDR Science",
              title: "Bilateral Stimulation Pacer",
              description: "Alternating visual and audio cues to desensitize emotional distress and panic spikes.",
              href: "/tools/bilateral",
            },
            {
              badge: "Emergency Grounding",
              title: "5-4-3-2-1 Sensory Grounding Tool",
              description: "Rapidly interrupt dissociation, panic attacks, and severe overthinking spirals.",
              href: "/tools/grounding",
            },
            {
              badge: "Dr. Andrew Weil",
              title: "4-7-8 Deep Sleep Pacer",
              description: "Acoustic and rhythmic parasympathetic breathing exercise to induce restorative sleep.",
              href: "/tools/sleep",
            },
            {
              badge: "Navy SEAL Protocol",
              title: "Box Breathing Pacer",
              description: "Equal 4-second breath cycles for acute focus, stress reduction, and mental clarity.",
              href: "/tools/box-breathing",
            },
            {
              badge: "Audio Therapy",
              title: "Sound Sanctuary Soundscapes",
              description: "Generative pink noise, thunderstorm, rainfall, and binaural audio for deep focus and journaling.",
              href: "/tools/soundscapes",
            },
          ]),
        ),
        renderSection("Frequently Asked Questions", renderFaq(quizHubFaqs)),
      ],
      cta: renderCta({
        title: "Take Your Reflection Further with Nuju",
        body: "Turn psychological insights into lasting emotional clarity. Journal in 30 seconds, track your daily baseline, and let Ju help you process racing thoughts.",
        href: "/onboarding?source=prerender_quiz_hub",
        label: "Start Journaling with Ju",
      }),
    }),
  };

  // 2. Individual Specialized Tests & Tools definitions
  const items = [
    {
      route: "/quiz/mental-health-test",
      aliases: ["/quiz/mental-health", "/quiz/dass-21", "/mental-health-test"],
      title: "DASS-21 Clinical Mental Health Screener (Free, Anonymous)",
      description:
        "Scientifically validated 21-item assessment measuring depression, anxiety, and stress levels with instant CBT insights and recovery guidance.",
      category: "Clinical Assessment",
      duration: "2 mins",
      itemsCount: 21,
      framework: "Lovibond & Lovibond (1995) DASS-21",
      overview:
        "The Depression Anxiety Stress Scales (DASS-21) is a globally recognized psychological screening instrument. It measures the severity of core emotional symptoms over the past 7 days across three distinct emotional domains: dysphoria/hopelessness (Depression), autonomic arousal/fear (Anxiety), and chronic tension/irritability (Stress).",
      keyPoints: [
        "21 scientifically calibrated Likert-scale questions",
        "Categorized scores across Depression, Anxiety, and Stress (Normal to Extremely Severe)",
        "Evidence-based cognitive behavioral therapy (CBT) reflection prompts",
        "Immediate somatic recovery recommendations for autonomic regulation",
      ],
      faqs: [
        {
          question: "How does DASS-21 calculate scores?",
          answer:
            "Each question is scored from 0 to 3. The sum of items in each 7-question scale is multiplied by 2 to align with the full DASS-42 normative dataset, categorized into Normal, Mild, Moderate, Severe, and Extremely Severe ranges.",
        },
        {
          question: "Is DASS-21 an official psychiatric diagnosis?",
          answer:
            "No. It is a psychological screening instrument designed to quantify emotional states. Clinical diagnosis requires a comprehensive evaluation by a licensed mental health professional.",
        },
      ],
    },
    {
      route: "/quiz/attachment-style",
      aliases: ["/attachment-style-test"],
      title: "Adult Attachment Style Test: Secure, Anxious, Avoidant, Disorganized",
      description:
        "Discover your relational attachment style based on Bartholomew & Horowitz and ECR-R frameworks. Understand your intimacy triggers and relationship patterns.",
      category: "Relational Psychology",
      duration: "2 mins",
      itemsCount: 16,
      framework: "Experiences in Close Relationships-Revised (ECR-R)",
      overview:
        "Adult attachment theory explains how early relational bonding shapes our current expectations, fears, and behaviors in romantic and intimate relationships. This screener measures your position across two core psychological axes: Attachment Anxiety (fear of abandonment/rejection) and Attachment Avoidance (fear of intimacy/vulnerability).",
      keyPoints: [
        "Identifies Secure, Anxious-Preoccupied, Dismissive-Avoidant, or Fearful-Avoidant patterns",
        "Explains deactivating strategies and protest behaviors triggered during relationship conflict",
        "Actionable prompts to build 'earned secure attachment' through somatic self-soothing",
      ],
      faqs: [
        {
          question: "Can my attachment style change over time?",
          answer:
            "Yes. Attachment styles are adaptable relational adaptations, not fixed personality traits. Through consistent self-awareness, emotional validation, and secure relationships, individuals can develop 'earned security'.",
        },
      ],
    },
    {
      route: "/quiz/adhd-screener",
      aliases: ["/quiz/adhd-test", "/adhd-test"],
      title: "Adult ADHD Screener: Interactive Focus & Executive Function Test",
      description:
        "Screen for adult Attention-Deficit/Hyperactivity traits based on the WHO Adult ADHD Self-Report Scale (ASRS-v1.1). Fast, private, and insightful.",
      category: "Neurodivergence & Focus",
      duration: "90 secs",
      itemsCount: 12,
      framework: "WHO ASRS-v1.1 Screener",
      overview:
        "Adult Attention-Deficit/Hyperactivity Disorder frequently goes unrecognized, masking as chronic procrastination, emotional dysregulation, task paralysis, and burnout. This assessment screens for hallmark executive dysfunction signs, working memory gaps, and attentional inconsistency.",
      keyPoints: [
        "Screens inattentive, hyperactive-impulsive, and combined ADHD tendencies",
        "Identifies dopamine-seeking behaviors and late-stage procrastination cycles",
        "Offers neuro-inclusive focus hacks, body doubling concepts, and energy pacing tips",
      ],
      faqs: [
        {
          question: "What is the difference between ADHD and normal distraction?",
          answer:
            "ADHD is characterized by pervasive, chronic executive dysfunction and dopamine dysregulation that significantly impairs multiple areas of daily life (work, finances, relationships) despite high effort and intellect.",
        },
      ],
    },
    {
      route: "/quiz/inner-child",
      aliases: ["/quiz/luka-inner-child"],
      title: "Inner Child Wound Test: Identify Core Developmental Pain Points",
      description:
        "Identify your primary childhood emotional wound: Abandonment, Rejection, Guilt, Trust, or Neglect. Discover somatic healing and re-parenting prompts.",
      category: "Developmental Psychology",
      duration: "2 mins",
      itemsCount: 15,
      framework: "Carl Jung & John Bradshaw Inner Child Frameworks",
      overview:
        "Unresolved childhood experiences often manifest in adulthood as irrational triggers, hyper-independence, chronic people-pleasing, or sudden emotional shutdowns. This assessment helps pinpoint the subconscious childhood wound currently driving your protective coping mechanisms.",
      keyPoints: [
        "Uncovers core emotional wounds: Abandonment, Betrayal, Invisibility, Perfectionism",
        "Provides gentle re-parenting scripts and emotional safety affirmations",
        "Guided journaling questions to nurture self-compassion and emotional resilience",
      ],
      faqs: [
        {
          question: "What does 're-parenting' mean?",
          answer:
            "Re-parenting is the therapeutic practice of giving yourself the emotional validation, safety, boundary setting, and unconditional care that you may have missed during early developmental years.",
        },
      ],
    },
    {
      route: "/quiz/burnout",
      aliases: ["/quiz/burnout-test"],
      title: "Occupational Burnout Screener: Exhaustion, Cynicism & Inefficacy Test",
      description:
        "Measure clinical burnout severity across emotional exhaustion, depersonalization/cynicism, and reduced personal accomplishment. Free & private.",
      category: "Workplace Vitality",
      duration: "2 mins",
      itemsCount: 15,
      framework: "Maslach Burnout Inventory (MBI) Adaptation",
      overview:
        "Burnout is not simple fatigue that resolves after a weekend off. It is an occupational and nervous system crisis characterized by emotional exhaustion, mental detachment from daily responsibilities, and feelings of inadequacy.",
      keyPoints: [
        "Measures physical energy depletion and emotional exhaustion",
        "Identifies cynical detachment and compassion fatigue markers",
        "Concrete workplace boundary scripts and vagal nerve recovery protocols",
      ],
      faqs: [
        {
          question: "How does burnout differ from depression?",
          answer:
            "While symptoms overlap, burnout is primarily context-driven and related to chronic unmanaged environmental stress (such as workplace demands), whereas depression is pervasive across all areas of life.",
        },
      ],
    },
    {
      route: "/quiz/love-languages",
      aliases: ["/quiz/love-language"],
      title: "5 Love Languages Test: Words, Quality Time, Gifts, Acts, Touch",
      description:
        "Evaluate how you perceive and express love in romantic relationships. Learn your primary emotional dialects for deeper relational harmony.",
      category: "Relational Psychology",
      duration: "2 mins",
      itemsCount: 15,
      framework: "Dr. Gary Chapman 5 Love Languages Model",
      overview:
        "Miscommunication in romantic relationships often occurs when partners speak different emotional dialects. This screener measures your preference across Words of Affirmation, Quality Time, Receiving Gifts, Acts of Service, and Physical Touch.",
      keyPoints: [
        "Ranks your primary and secondary love language preferences",
        "Highlights common misinterpretations between differing relationship styles",
        "Actionable tips for communicating emotional needs without triggering defensiveness",
      ],
      faqs: [
        {
          question: "Can love languages evolve over a lifetime?",
          answer:
            "Yes. Major life transitions (such as parenting, high-stress careers, or health challenges) often shift what makes a person feel most emotionally supported and cherished.",
        },
      ],
    },
    {
      route: "/quiz/people-pleasing",
      aliases: ["/quiz/boundaries"],
      title: "People-Pleasing & Boundary Test: Assess Fawn Trauma Responses",
      description:
        "Do you struggle to say no? Measure boundary erosion, conflict avoidance, and fawning behaviors driven by the subconscious need for external validation.",
      category: "Boundary Psychology",
      duration: "2 mins",
      itemsCount: 14,
      framework: "Pete Walker Fawn Response & Bowen Family Systems",
      overview:
        "Chronic people-pleasing is often a protective 'fawn' stress response developed in environments where conflict was dangerous or affection was conditional. This assessment helps you uncover where boundary erosion is draining your vitality.",
      keyPoints: [
        "Measures guilt around boundary setting and asserting personal needs",
        "Identifies unconscious resentment caused by chronic self-abandonment",
        "Provides somatic boundary scripts and assertiveness training prompts",
      ],
      faqs: [
        {
          question: "Why do I feel guilty whenever I set a boundary?",
          answer:
            "When boundaries were historically punished or rejected in childhood, saying 'no' triggers autonomic danger signals. Somatic regulation allows you to tolerate boundary guilt without capitulating.",
        },
      ],
    },
    {
      route: "/quiz/hsp",
      aliases: ["/quiz/highly-sensitive-person"],
      title: "Highly Sensitive Person (HSP) Test: Sensory Processing Sensitivity",
      description:
        "Measure sensory processing sensitivity based on Dr. Elaine Aron's HSP Scale. Understand deep empathy, sensory overload, and rich emotional processing.",
      category: "Sensory Psychology",
      duration: "2 mins",
      itemsCount: 15,
      framework: "Dr. Elaine Aron Sensory Processing Sensitivity (SPS)",
      overview:
        "Approximately 15-20% of the population possesses Sensory Processing Sensitivity (SPS). HSPs process sensory data more deeply, have heightened mirror neuron activity, and are prone to rapid nervous system overstimulation.",
      keyPoints: [
        "Evaluates Ease of Excitation (EOE) and Low Sensory Threshold (LST)",
        "Measures aesthetic sensitivity and emotional empathy resonance",
        "Sanctuary pacing guidelines to prevent sensory depletion and burnout",
      ],
      faqs: [
        {
          question: "Is being an HSP a medical disorder?",
          answer:
            "No. High Sensitivity is an innate evolutionary neurobiological trait found in over 100 species, offering evolutionary advantages in vigilance, deep processing, and empathy.",
        },
      ],
    },
    {
      route: "/quiz/shadow-work",
      aliases: ["/quiz/shadow-test"],
      title: "Jungian Shadow Work Test: Uncover Repressed Personality Traits",
      description:
        "Identify suppressed emotional aspects, unconscious projections, and hidden triggers based on Carl Jung's psychological shadow archetype framework.",
      category: "Analytical Psychology",
      duration: "2 mins",
      itemsCount: 14,
      framework: "Carl Jung Analytical Psychology Shadow Archetype",
      overview:
        "The 'Shadow' represents the parts of our personality that were rejected, shamed, or denied during early socialization. What we cannot own in ourselves, we inevitably project onto others with intense emotional judgment.",
      keyPoints: [
        "Detects emotional projection markers and disproportionate social judgments",
        "Uncovers repressed qualities like anger, ambition, playfulness, or vulnerability",
        "Structured journaling exercises to integrate shadow traits into authentic wholeness",
      ],
      faqs: [
        {
          question: "Is the shadow inherently evil or dark?",
          answer:
            "No. Jung noted that the shadow is roughly 90% pure gold: creativity, spontaneous vitality, strong boundaries, and passion are often buried alongside repressed pain.",
        },
      ],
    },
    {
      route: "/quiz/dopamine-detox",
      aliases: ["/quiz/screen-addiction"],
      title: "Dopamine Detox & Digital Addiction Screener: Assess Overstimulation",
      description:
        "Measure screen addiction, doomscrolling habits, and dopamine baseline deficit based on Dr. Anna Lembke's addiction neurobiology research.",
      category: "Digital Wellness",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Anna Lembke Dopamine Balance & Brain Reward Circuitry",
      overview:
        "Constant digital notifications, short-form video loops, and instant gratification alter the brain's pleasure-pain balance, leading to a chronic dopamine deficit state characterized by apathy, brain fog, and restlessness.",
      keyPoints: [
        "Measures compulsive phone-checking and tolerance to digital stimulation",
        "Identifies hedonic baseline erosion and post-scroll emotional crashes",
        "Actionable 24-hour dopamine reset protocols and low-friction friction hacks",
      ],
      faqs: [
        {
          question: "What is a dopamine baseline deficit?",
          answer:
            "When overstimulated by hyper-rewarding digital cues, the brain down-regulates dopamine receptors, leaving you feeling numb, restless, or bored during normal offline activities.",
        },
      ],
    },
    {
      route: "/quiz/nervous-system",
      aliases: ["/quiz/polyvagal"],
      title: "Polyvagal Nervous System State Test: Ventral, Sympathetic, or Freeze",
      description:
        "Map your autonomic nervous system state based on Dr. Stephen Porges' Polyvagal Theory. Are you in safe connection, fight-or-flight, or dorsal vagal shutdown?",
      category: "Somatic Psychology",
      duration: "2 mins",
      itemsCount: 14,
      framework: "Dr. Stephen Porges Polyvagal Theory & Deb Dana Nervous System Ladder",
      overview:
        "Your autonomic nervous system is constantly scanning the environment for cues of safety or danger through neuroception. This assessment pinpoints your predominant autonomic baseline.",
      keyPoints: [
        "Maps your current state: Ventral Vagal (Safe), Sympathetic (Mobilized), or Dorsal Vagal (Freeze)",
        "Explains physical correlates like shallow breathing, muscle armor, or emotional numbness",
        "Tailored somatic regulation exercises to gently climb the Polyvagal ladder",
      ],
      faqs: [
        {
          question: "What is 'Dorsal Vagal Shutdown'?",
          answer:
            "It is the body's emergency brake when stress feels unsurvivable: blood pressure drops, dissociation increases, and you feel heavy, fatigued, or emotionally numb.",
        },
      ],
    },
    {
      route: "/quiz/rsd",
      aliases: ["/quiz/rsd-screener"],
      title: "Rejection Sensitive Dysphoria (RSD) Screener: Emotional Pain Test",
      description:
        "Screen for extreme emotional vulnerability to perceived criticism, disapproval, or failure. Common in ADHD and neurodivergent nervous systems.",
      category: "Neurodivergence & Emotion",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. William Dodson RSD Clinical Framework",
      overview:
        "Rejection Sensitive Dysphoria (RSD) is an extreme emotional response to the perception—real or imagined—of being criticized, rejected, or falling short of expectations, causing visceral, physical distress.",
      keyPoints: [
        "Differentiates RSD pain from standard social anxiety or low self-esteem",
        "Identifies protective behaviors: intense achievement vs. social withdrawal",
        "CBT reframing exercises and somatic soothing techniques to ride out emotional waves",
      ],
      faqs: [
        {
          question: "Why does RSD feel like physical pain?",
          answer:
            "Neuroimaging shows that social rejection activates the exact same anterior cingulate cortex circuitry as acute physical injury.",
        },
      ],
    },
    {
      route: "/quiz/cognitive-distortions",
      aliases: ["/quiz/overthinking"],
      title: "Cognitive Distortions & Overthinking Test: 10 Thought Trap Patterns",
      description:
        "Identify which cognitive distortions dominate your internal dialogue: Catastrophizing, All-or-Nothing, Mind Reading, or Emotional Reasoning.",
      category: "CBT Cognitive Traps",
      duration: "2 mins",
      itemsCount: 15,
      framework: "Dr. Aaron Beck & Dr. David Burns Cognitive Distortion Model",
      overview:
        "Cognitive distortions are habitual, inaccurate ways of thinking that reinforce negative emotions and catastrophic expectations. Uncovering your top thought traps is the foundation of cognitive behavioral therapy.",
      keyPoints: [
        "Identifies your dominant distortions: All-or-Nothing, Catastrophizing, Personalization, etc.",
        "Teaches the CBT 'Thought Record' method to evaluate empirical evidence",
        "Concrete journaling prompts to dispute catastrophic assumptions in real-time",
      ],
      faqs: [
        {
          question: "What is 'Catastrophizing'?",
          answer:
            "Catastrophizing is assuming the worst possible outcome will inevitably happen, while discounting your internal resilience and coping resources.",
        },
      ],
    },
    {
      route: "/quiz/dissociation",
      aliases: ["/quiz/dissociative-experiences"],
      title: "Dissociation & Depersonalization-Derealization (DP/DR) Screener",
      description:
        "Screen for feelings of detachment from your body, environment, or emotions based on DES-II framework. Check if you are feeling disconnected from reality.",
      category: "Trauma & Dissociation",
      duration: "2 mins",
      itemsCount: 14,
      framework: "Dissociative Experiences Scale (DES-II) Adaptation",
      overview:
        "Dissociation is an adaptive defense mechanism where the nervous system disconnects from conscious awareness during severe overwhelm. Symptoms include feeling like an observer of your life (depersonalization) or feeling like the world is artificial (derealization).",
      keyPoints: [
        "Screens depersonalization, derealization, and emotional numbing markers",
        "Provides grounding 5-4-3-2-1 somatic techniques to anchor back into the physical body",
        "Identifies autonomic triggers that cause mental foggy detachment",
      ],
      faqs: [
        {
          question: "Is dissociation dangerous?",
          answer:
            "Dissociation is a common, non-lethal protective response to chronic stress or trauma. However, chronic dissociation warrants support from a trauma-informed clinician.",
        },
      ],
    },
    {
      route: "/quiz/imposter-syndrome",
      aliases: ["/quiz/imposter-test"],
      title: "Imposter Syndrome Test: Clance Imposter Phenomenon Scale",
      description:
        "Do you feel like a fraud waiting to be exposed? Measure chronic fear of failure, attribution of success to luck, and perfectionistic burnout.",
      category: "Career & Mindset",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Pauline Clance Imposter Phenomenon Scale (CIPS)",
      overview:
        "Imposter Syndrome is the persistent internal belief that you are not competent, intelligent, or deserving of your accomplishments, accompanied by the chronic fear of being unmasked as a fraud.",
      keyPoints: [
        "Identifies the Imposter Cycle: over-preparation vs. procrastination",
        "Explores internal discounting of success and attribution to pure chance or luck",
        "Mindset reframes to separate feeling inadequate from objective competence",
      ],
      faqs: [
        {
          question: "Who experiences Imposter Syndrome most?",
          answer:
            "High achievers, underrepresented individuals, and perfectionists experience the highest rates of imposter feelings, especially in competitive professional environments.",
        },
      ],
    },
    {
      route: "/quiz/emotional-agility",
      aliases: ["/quiz/agility"],
      title: "Emotional Agility & Resilience Test: Unhook from Negative Thoughts",
      description:
        "Measure how flexibly you navigate difficult emotions based on Dr. Susan David's Harvard research. Are you bottling, brooding, or showing up?",
      category: "Emotion Science",
      duration: "2 mins",
      itemsCount: 14,
      framework: "Dr. Susan David Harvard Emotional Agility Model",
      overview:
        "Emotional agility is the ability to navigate life's emotional twists and turns with self-compassion, curiosity, and alignment with your core values—rather than bottling feelings or brooding in rumination.",
      keyPoints: [
        "Distinguishes healthy emotional agility from 'Bottling' (repression) or 'Brooding' (ruminating)",
        "Teaches affect labeling to reduce amygdala hyperactivity in under 60 seconds",
        "Integrates difficult emotions as valuable signposts pointing toward what truly matters",
      ],
      faqs: [
        {
          question: "What does 'Unhooking' mean?",
          answer:
            "Unhooking is creating space between an emotional impulse and your response: recognizing 'I am having the thought that I will fail' instead of 'I am a failure'.",
        },
      ],
    },
    {
      route: "/quiz/high-functioning-anxiety",
      aliases: ["/quiz/hfa"],
      title: "High-Functioning Anxiety Test: The Hidden Cost of Secret Perfectionism",
      description:
        "On the outside, you have it all together. On the inside, you are fighting constant worry, fear of failure, and people-pleasing fatigue. Free assessment.",
      category: "Anxiety & Perfectionism",
      duration: "2 mins",
      itemsCount: 14,
      framework: "Clinical High-Functioning Anxiety Profile",
      overview:
        "High-functioning anxiety is not a formal diagnosis, but a lived experience where anxiety fuels obsessive competence, perfectionism, and over-scheduling—while leaving the individual emotionally drained behind closed doors.",
      keyPoints: [
        "Identifies covert symptoms: inability to relax, catastrophic scenario planning, mental over-rehearsal",
        "Explores the fear of slowing down and the belief that anxiety is the only reason for success",
        "Gentle daily down-regulation routines to cultivate inner safety without sacrificing performance",
      ],
      faqs: [
        {
          question: "Why do high-functioning anxious people avoid seeking help?",
          answer:
            "Because society rewards their productivity, achievement, and dependability, reinforcing the delusion that their internal suffering is necessary for success.",
        },
      ],
    },
    {
      route: "/quiz/parentification",
      aliases: ["/quiz/eldest-daughter"],
      title: "Parentification & Eldest Daughter Syndrome Test: Childhood Role Reversal",
      description:
        "Did you become the adult in your family too early? Measure emotional parentification, hyper-responsibility, and chronic difficulty letting others help.",
      category: "Family Systems",
      duration: "2 mins",
      itemsCount: 14,
      framework: "Minuchin Structural Family Therapy & Hooper Parentification Inventory",
      overview:
        "Parentification occurs when a child is forced to take on adult emotional or instrumental responsibilities. In adulthood, this manifests as extreme hyper-independence, guilt when relaxing, and feeling responsible for everyone's happiness.",
      keyPoints: [
        "Measures emotional parentification (mediating parent conflicts) vs. instrumental parentification",
        "Unpacks the 'Eldest Daughter Syndrome' burden of chronic managerial vigilance",
        "Guided therapeutic prompts to lay down burdens that were never yours to carry",
      ],
      faqs: [
        {
          question: "What is hyper-independence?",
          answer:
            "Hyper-independence is a trauma defense where an individual refuses all help from others because relying on adults in childhood led to disappointment, neglect, or pain.",
        },
      ],
    },
    {
      route: "/quiz/alexithymia",
      aliases: ["/quiz/tas-20"],
      title: "Alexithymia (TAS-20) Test: Assess Emotional Blindness & Numbness",
      description:
        "Do you have trouble naming or feeling emotions? Screen for emotional blindness and somatic confusion using the Toronto Alexithymia Scale (TAS-20).",
      category: "Affective Neuroscience",
      duration: "2 mins",
      itemsCount: 15,
      framework: "Toronto Alexithymia Scale (TAS-20) Adaptation",
      overview:
        "Alexithymia translates literally from Greek as 'no words for emotions'. Individuals with alexithymia struggle to identify, describe, and distinguish internal emotional feelings from bodily sensations.",
      keyPoints: [
        "Assesses Difficulty Identifying Feelings (DIF) and Difficulty Describing Feelings (DDF)",
        "Explores Externally-Oriented Thinking (EOT) where emotional depth feels foreign",
        "Somatic awareness prompts and emotion wheels to gradually rebuild interoceptive vocabulary",
      ],
      faqs: [
        {
          question: "Can someone overcome alexithymia?",
          answer:
            "Yes. Neuroplasticity allows individuals to develop interoceptive awareness and emotional vocabulary through somatic tracking, journaling, and guided therapy.",
        },
      ],
    },
    {
      route: "/quiz/limerence",
      aliases: ["/quiz/obsessive-love"],
      title: "Limerence vs Love Test: Free 12-Item Romantic Obsession Screener",
      description:
        "Are you in genuine love or trapped in a dopamine-fueled limerent obsession? Free 12-item screener based on Dr. Dorothy Tennov's psychological research.",
      category: "Relational Obsession",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Dorothy Tennov Limerence Concept & Intermittent Reinforcement",
      overview:
        "Limerence is an involuntary state of intense romantic infatuation characterized by intrusive obsessive thinking about a 'Limerent Object' (LO), acute longing for reciprocation, and mood dependency on micro-cues of attention.",
      keyPoints: [
        "Distinguishes genuine secure attachment from dopamine-spiked limerent obsession",
        "Identifies the role of intermittent reinforcement and emotional unavailability",
        "Recovery steps: breaking the dopamine loop and reclaiming emotional sovereignty",
      ],
      faqs: [
        {
          question: "What causes limerence?",
          answer:
            "Limerence is typically sparked by intermittent reinforcement—uncertainty and mixed signals—combined with unmet childhood attachment needs and a craving for dopamine escape.",
        },
      ],
    },
    {
      route: "/quiz/sensory-overload",
      aliases: ["/quiz/empathy-burnout", "/quiz/sensory-burnout"],
      title: "Sensory Overload & Empathy Burnout Test: Sensory Threshold Screener",
      description:
        "Are bright lights, chaotic noise, and others' emotional distress pushing you into nervous system shutdown? Screen for sensory overwhelm and empathy exhaustion.",
      category: "Sensory & Empathy",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Sensory Processing Sensitivity & Compassion Fatigue Clinical Models",
      overview:
        "When the brain absorbs more environmental and emotional stimuli than its sensory gating mechanisms can filter, the nervous system enters acute overload, triggering irritability, withdrawal, and cognitive fatigue.",
      keyPoints: [
        "Measures sensory threshold overload across audio, visual, and energetic inputs",
        "Assesses empathy burnout caused by unshielded emotional sponging",
        "Sensory diet recommendations: dark room decompressions, acoustic relief, and somatic resets",
      ],
      faqs: [
        {
          question: "What is an immediate fix for sensory overload?",
          answer:
            "Remove external stimuli immediately: put on noise-canceling headphones or earplugs, dim the lights, and perform 3 cyclic physiological sighs to down-regulate the amygdala.",
        },
      ],
    },
    {
      route: "/quiz/perfectionism",
      aliases: ["/quiz/fear-of-failure", "/quiz/maladaptive-perfectionism"],
      title: "Clinical Perfectionism & Fear of Failure Test: Frost & Hewitt MPS Screener",
      description:
        "Do you possess healthy high standards or paralyzing maladaptive perfectionism? Free 12-item clinical screener based on Frost and Hewitt Multidimensional Perfectionism Scales.",
      category: "Cognitive Patterns",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Frost Multidimensional Perfectionism Scale (FMPS) & Hewitt-Flett MPS",
      overview:
        "Clinical perfectionism is not a pursuit of excellence, but a fear-driven cognitive shield. When self-worth is conditionally tied to error-free output, individuals experience task paralysis, moving goalposts, and acute distress over harmless mistakes.",
      keyPoints: [
        "Distinguishes adaptive striving from maladaptive mistake-rumination freeze",
        "Evaluates fear of judgment and socially prescribed perfectionism",
        "Provides actionable CBT reframes, the 80% rule, and somatic exposure drills",
      ],
      faqs: [
        {
          question: "What is the difference between healthy striving and perfectionism?",
          answer:
            "Healthy strivers focus on the process, enjoy growth, and bounce back from errors. Maladaptive perfectionists focus exclusively on avoiding mistakes, tying any flaw directly to personal worth.",
        },
      ],
    },
    {
      route: "/quiz/social-battery",
      aliases: ["/quiz/introvert-hangover", "/quiz/social-exhaustion"],
      title: "Social Battery & Introvert Hangover Test: Free 10-Item Screener",
      description:
        "Is your social battery running on empty? Measure your social masking fatigue, sensory depletion, and recovery deficit. Get custom recharge protocols.",
      category: "Social Vitality",
      duration: "60 secs",
      itemsCount: 10,
      framework: "Sensory Depletion & Social Energy Index",
      overview:
        "An 'introvert hangover' occurs when the brain exhausts its reserves of social neurotransmitters after sustained masking, loud ambient noise, and people-pleasing. Solitude is essential neurological recovery.",
      keyPoints: [
        "Measures social masking load and emotional labor strain",
        "Quantifies auditory and environmental overstimulation thresholds",
        "Prescribes exact solitude duration and low-stimulation recharge routines",
      ],
      faqs: [
        {
          question: "How long does an introvert hangover last?",
          answer:
            "Depending on depletion depth, recovery takes between 3 hours to 2 full days of low-stimulation solitary rest with minimal speech and screen glare.",
        },
      ],
    },
    {
      route: "/quiz/gaslighting",
      aliases: ["/quiz/emotional-manipulation"],
      title: "Gaslighting & Emotional Manipulation Radar: Free 12-Item Diagnostic",
      description:
        "Are you second-guessing your memories and sanity? Free 12-item clinical screener based on the Stern Manipulation Scale. Identify covert narcissistic tactics and verify your reality.",
      category: "Relational Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Stern Manipulation Index & Cognitive Invalidation Scale",
      overview:
        "Gaslighting is a form of insidious psychological abuse where one partner or authority figure systematically undermines the victim's perception of reality, memory, or sanity. Over time, the victim develops chronic self-doubt, hyper-vigilance, and an involuntary apology reflex.",
      keyPoints: [
        "Identifies reality distortion, chronic second-guessing, and perception invalidation",
        "Assesses hyper-vigilance and walking on eggshells around unpredictable mood shifts",
        "Evaluates the compulsive apology reflex and erosion of personal agency",
        "Provides grounding anchoring drills, documentation protocols, and boundary scripts",
      ],
      faqs: [
        {
          question: "What are the common signs of being gaslit?",
          answer:
            "Frequently apologizing without knowing what you did wrong, constantly second-guessing your memory, withholding your true opinions to avoid explosions, and feeling like you are 'too sensitive' or 'crazy'.",
        },
        {
          question: "How do you break free from gaslighting?",
          answer:
            "Keep private, timestamped reality logs (like in Nuju's encrypted journal), seek external reality checks from trusted neutral friends, and refuse to debate your emotional reactions.",
        },
      ],
    },
    {
      route: "/quiz/cortisol-stress",
      aliases: ["/quiz/chronic-stress-body"],
      title: "Cortisol & Somatic Stress Body Screener: Free Nervous System Diagnostic",
      description:
        "Is chronic stress trapped in your body? Screen circadian disruptions, 3 AM waking, muscular armor, and neuroendocrine overdrive with our free 12-item somatic assessment.",
      category: "Somatic Physiology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "HPA-Axis Autonomic Dysregulation & Somatic Armor Inventory",
      overview:
        "When the hypothalamic-pituitary-adrenal (HPA) axis remains chronically activated, elevated cortisol and adrenaline physically manifest in the body. Symptoms range from 3 AM insomnia bursts and morning brain fog to jaw tension, chronic fatigue, and afternoon blood sugar crashes.",
      keyPoints: [
        "Evaluates circadian cortisol rhythm shifts (wired at night, exhausted in morning)",
        "Measures somatic muscular armor: jaw clenching, trap tightness, and shallow chest breathing",
        "Identifies neuroendocrine overdrive and adrenal fatigue crashes",
        "Delivers somatic down-regulation exercises: vagus nerve resets and physiological sigh protocols",
      ],
      faqs: [
        {
          question: "What does high cortisol feel like physically?",
          answer:
            "Feeling 'tired but wired' at bedtime, waking up abruptly around 3 to 4 AM with racing thoughts, experiencing afternoon energy crashes, and feeling physical tension in the jaw and neck.",
        },
        {
          question: "How long does it take to reset dysregulated cortisol levels?",
          answer:
            "With consistent morning sunlight exposure, early evening screen wind-downs, somatic breathwork, and emotional journaling, autonomic balance improves within 2 to 4 weeks.",
        },
      ],
    },
    {
      route: "/quiz/emotional-availability",
      aliases: ["/quiz/vulnerability-test"],
      title: "Emotional Availability & Vulnerability Test: Free 12-Item Diagnostic",
      description:
        "Are you emotionally available or defensively walled off? Free 12-item clinical screener based on the Gottman Intimacy Scale and Emotionally Focused Therapy (EFT).",
      category: "Relational Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Gottman Sound Relationship House & Johnson Emotionally Focused Therapy (EFT)",
      overview:
        "Emotional availability refers to the psychological capacity to experience, articulate, and connect with feelings of vulnerability and mutual interdependence without fleeing or erecting defensive walls.",
      keyPoints: [
        "Identifies vulnerability tolerance and fear of being emotionally seen",
        "Measures conflict shutdown, silent treatment, and defensive stonewalling",
        "Assesses autonomy panic, fear of engulfment, and counter-dependent lone fortress traits",
        "Provides relational repair protocols, boundary scripts, and intimacy expansion exercises",
      ],
      faqs: [
        {
          question: "What does it mean to be emotionally unavailable?",
          answer:
            "It means having an unconscious protective barrier against deep intimacy, characterized by withdrawing during conflict, avoiding talks about future commitment, or intellectualizing feelings.",
        },
        {
          question: "Can someone become emotionally available?",
          answer:
            "Yes. Emotional availability is an adaptive relational pattern shaped by attachment conditioning. Through nervous system regulation, honest journaling, and gradual vulnerability exposure, people can develop earned security.",
        },
      ],
    },
    {
      route: "/quiz/revenge-bedtime-procrastination",
      aliases: ["/quiz/sleep-procrastination"],
      title: "Revenge Bedtime Procrastination Test: Free 12-Item Sleep Dread Screener",
      description:
        "Why do you sacrifice sleep to scroll on your phone? Measure your daytime autonomy deficit, midnight dopamine trance, and morning regret with our free 12-item screener.",
      category: "Circadian Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Kroese Bedtime Procrastination Scale (BPS) & Daytime Autonomy Deficit Model",
      overview:
        "Revenge bedtime procrastination occurs when people delay sleep without external obligations, using midnight hours to reclaim personal freedom that was suppressed by daytime demands, bosses, or family duties.",
      keyPoints: [
        "Measures daytime autonomy deficit and the psychological urge to 'steal' midnight hours",
        "Identifies compulsive dopamine seeking through screens, social media feeds, and sugar",
        "Quantifies morning regret, brain fog, and chronic circadian sleep debt",
        "Delivers behavioral friction protocols, sleep sanctuary resets, and audio wind-down tools",
      ],
      faqs: [
        {
          question: "Why is it called 'revenge' bedtime procrastination?",
          answer:
            "Originating from the Chinese term 'bàofùxìng áoyè', it describes a subconscious act of revenge against demanding daytime schedules by staying up late to feel in control of one's life.",
        },
        {
          question: "How do you stop revenge bedtime procrastination?",
          answer:
            "By incorporating 15-minute guilt-free autonomy breaks during the workday, moving chargers away from the bedside, and switching from blue-light screens to ambient audio soundscapes at night.",
        },
      ],
    },
    {
      route: "/quiz/chronic-guilt",
      aliases: ["/quiz/guilt-self-sabotage", "/tes-rasa-bersalah"],
      title: "Chronic Guilt & Self-Sabotage Test: Free Clinical Subconscious Remorse Screener",
      description:
        "Do you feel constantly guilty for existing, relaxing, or other people's bad moods? Free 12-item clinical screener based on the Kugel-Jones Guilt Inventory (GIC).",
      category: "Super-Ego & Remorse",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Kugel-Jones Guilt Inventory (GIC) & Freud Super-Ego Penance Dynamics",
      overview:
        "Chronic neurotic guilt is the toxic internalization of omnipotent responsibility, where an individual feels fundamentally at fault for others' emotions and subconsciously punishes themselves through self-sabotage, joy deprivation, and compulsive apology reflexes.",
      keyPoints: [
        "Distinguishes healthy reparative remorse from toxic, chronic, unearned guilt",
        "Measures omnipotent responsibility and the urge to fix everyone's emotional states",
        "Assesses subconscious self-sabotage, imposter penance, and happiness deprivation",
        "Delivers boundary reinforcement exercises and self-compassion mantras",
      ],
      faqs: [
        {
          question: "What is omnipotent responsibility?",
          answer:
            "Omnipotent responsibility is the cognitive distortion where you believe you have total control over—and therefore total responsibility for—the happiness, comfort, and emotional stability of everyone around you.",
        },
        {
          question: "How does chronic guilt cause self-sabotage?",
          answer:
            "When the harsh super-ego deems you undeserving of peace or success, it triggers subconscious behaviors—procrastination, conflicts, neglecting health—to inflict penance and relieve internal tension.",
        },
      ],
    },
    {
      route: "/quiz/hyper-independence",
      aliases: ["/quiz/trauma-independence", "/tes-kemandirian-ekstrem"],
      title: "Hyper-Independence Test: Free Trauma-Fawn & Armor Diagnostic",
      description:
        "Do you refuse to ask for help even when burning out? Free 12-item clinical screener to see if extreme self-reliance is an emotional trauma defense mechanism.",
      category: "Attachment & Autonomy",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Attachment Theory Counter-Dependence & Structural Dissociation Model",
      overview:
        "Hyper-independence is an adaptive defense mechanism often born from childhood parentification, neglect, or relational betrayal. When asking for help was historically met with rejection or danger, the nervous system concludes that total self-reliance is the only guarantee of safety.",
      keyPoints: [
        "Evaluates solitary armor and automatic refusal to delegate or accept support",
        "Identifies vulnerability phobia and the dread of being emotionally indebted to others",
        "Measures anticipatory threat detection and assuming others will inevitably drop the ball",
        "Provides progressive micro-trust challenges and nervous system co-regulation practices",
      ],
      faqs: [
        {
          question: "Is hyper-independence a trauma response?",
          answer:
            "Yes. While modern culture praises relentless independence, clinical psychology recognizes extreme counter-dependence as a trauma-induced protective armor against vulnerability and betrayal.",
        },
        {
          question: "How do you heal from hyper-independence?",
          answer:
            "By practicing progressive micro-delegation: asking for small, low-stakes assistance, learning to receive compliments, and processing somatic feelings of panic that arise during interdependence.",
        },
      ],
    },
    {
      route: "/quiz/emotional-enmeshment",
      aliases: ["/quiz/family-boundaries", "/tes-enmeshment-keluarga"],
      title: "Emotional Enmeshment & Family Boundaries Test: Free 12-Item Diagnostic",
      description:
        "Do you feel guilty having your own life, opinions, or boundaries? Free 12-item clinical screener based on Minuchin Family Systems and Barber Psychological Control models.",
      category: "Family Systems",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Salvador Minuchin Structural Family Systems & Barber Intrusive Control Scale",
      overview:
        "Emotional enmeshment is a dysfunctional family pattern where personal boundaries are permeable and unclear. Individual autonomy is viewed as disloyalty, and children are parentified into emotional caretakers or mediators for their parents.",
      keyPoints: [
        "Measures psychological intrusiveness and lack of emotional privacy",
        "Identifies identity subjugation and living according to the family script",
        "Assesses visceral boundary guilt and separation anxiety",
        "Provides individuation roadmaps, financial boundary scripts, and somatic decoupling protocols",
      ],
      faqs: [
        {
          question: "What is family enmeshment?",
          answer:
            "Enmeshment describes family relationships where personal boundaries are diffused, emotional states are contagious, and individual autonomy is punished with guilt, silent treatment, or accusations of betrayal.",
        },
        {
          question: "Can you love your family while having strict boundaries?",
          answer:
            "Yes. In healthy family systems, boundaries protect love from turning into resentment. Loving someone does not require sacrificing your mental sanity or financial stability.",
        },
      ],
    },
    {
      route: "/quiz/fear-of-being-perceived",
      aliases: ["/quiz/spotlight-effect", "/tes-takut-dilihat"],
      title: "Fear of Being Perceived Test: Free Spotlight & Concealment Diagnostic",
      description:
        "Do you dread being looked at, noticed in public, or speaking in meetings? Free 12-item clinical screener based on Gilovich's Spotlight Effect and Social Evaluative Threat models.",
      category: "Social Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Gilovich Spotlight Effect & Social Evaluative Threat (SET) Model",
      overview:
        "The fear of being perceived (scopophobia and chronic social concealment) is an acute defense mechanism where occupying physical space or being observed triggers dorsal vagal shutdown, severe self-consciousness, and post-exposure shame spirals.",
      keyPoints: [
        "Evaluates visibility dread and panic when looked at or noticed in public",
        "Assesses covert concealment, wardrobe camouflage, and hiding talents",
        "Measures post-exposure rumination and agonizing vulnerability hangovers",
        "Delivers progressive micro-visibility exposures and somatic grounding drills",
      ],
      faqs: [
        {
          question: "What is the fear of being perceived?",
          answer:
            "It is the acute psychological and physical discomfort caused by being observed by others, rooted in the hyper-vigilant assumption that one is being scrutinized, judged, and found inadequate.",
        },
        {
          question: "How do you overcome the Spotlight Effect?",
          answer:
            "By recognizing that other people are predominantly consumed by their own internal worries, practicing small low-stakes exposures (like asking a question or wearing color), and soothing the nervous system with somatic breathwork.",
        },
      ],
    },
    {
      route: "/quiz/decision-fatigue",
      aliases: ["/quiz/brain-fog", "/tes-kelelahan-keputusan"],
      title: "Decision Fatigue Test: Free Cognitive Load & Brain Fog Screener",
      description:
        "Paralyzed by simple choices or mentally exhausted by midday? Free 12-item clinical screener based on Baumeister's Ego Depletion and Sweller's Cognitive Load Theory.",
      category: "Cognitive Architecture",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Roy Baumeister Ego Depletion & John Sweller Cognitive Load Theory (CLT)",
      overview:
        "Decision fatigue occurs when the prefrontal cortex exhausts its finite store of executive energy from relentless choices, leading to trivial choice paralysis, impulse surrender, and pervasive brain fog.",
      keyPoints: [
        "Assesses choice paralysis and agonizing over inconsequential daily selections",
        "Measures cognitive saturation, working memory bottlenecks, and prefrontal fog",
        "Evaluates willpower depletion and evening dopamine or sugar impulse surrender",
        "Delivers cognitive offloading protocols, default choices, and midday neural resets",
      ],
      faqs: [
        {
          question: "What is decision fatigue?",
          answer:
            "Decision fatigue is the psychological deterioration in the quality of decisions made by an individual after a long session of decision-making, leading to procrastination or reckless impulsivity.",
        },
        {
          question: "How can you prevent decision fatigue?",
          answer:
            "By establishing automated morning routines, limiting wardrobe and menu choices, batching critical decisions into early hours, and scheduling screen-free mental recovery pauses.",
        },
      ],
    },
    {
      route: "/quiz/fomo",
      aliases: ["/quiz/social-comparison", "/tes-fomo-dan-perbandingan"],
      title: "FOMO & Digital Dopamine Test: Free Social Comparison Screener",
      description:
        "Constantly checking feeds, comparing milestones, or terrified of missing out? Free 12-item clinical screener based on Przybylski's FOMO scale and Festinger's Social Comparison Theory.",
      category: "Digital Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Andrew Przybylski FOMO Scale & Leon Festinger Social Comparison Theory",
      overview:
        "FOMO (Fear of Missing Out) is a pervasive apprehension that others might be having rewarding experiences from which one is absent, driving compulsive screen monitoring, phantom vibrations, and status comparison anxiety.",
      keyPoints: [
        "Measures social comparison anxiety and benchmark panic against peer milestones",
        "Evaluates compulsive feed monitoring, notification reflex, and phantom vibrations",
        "Assesses presence deficit, second-screening habits, and inability to savor the present",
        "Delivers JOMO (Joy of Missing Out) cultivation drills and digital sovereignty protocols",
      ],
      faqs: [
        {
          question: "What causes FOMO?",
          answer:
            "FOMO is fueled by variable dopamine reward loops engineered into social media platforms combined with upward social comparison bias, where we compare our unedited life to others' filtered top 1% moments.",
        },
        {
          question: "What is JOMO and how do you achieve it?",
          answer:
            "JOMO is the Joy of Missing Out—the peaceful realization that you do not need to attend every gathering, buy every trend, or read every headline. It is cultivated through intentional digital boundaries and grounding in physical reality.",
        },
      ],
    },
    {
      route: "/quiz/attachment-compatibility",
      aliases: ["/quiz/relationship-attachment", "/tes-kompatibilitas-attachment"],
      title: "Attachment Compatibility Test: Free Relationship Dynamics & Push-Pull Screener",
      description:
        "Trapped in an anxious-avoidant push-pull cycle or craving security? Free 12-item clinical screener based on Amir Levine's Attached and Sue Johnson's Emotionally Focused Therapy (EFT).",
      category: "Relationship Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Amir Levine (Attached) & Sue Johnson Emotionally Focused Therapy (EFT)",
      overview:
        "Attachment compatibility screener evaluates relational push-pull patterns, hyperactivating protest behaviors, and avoidant deactivating strategies. It illuminates why anxious and avoidant partners become magnetically entangled in exhausting dances of pursuit and withdrawal.",
      keyPoints: [
        "Measures anxious pursuit, urgency spirals, and catastrophic abandonment fear",
        "Evaluates avoidant deactivation, emotional shutdown, and hyper-independence defenses",
        "Assesses protest behaviors such as stonewalling, guilt tripping, and retaliatory silence",
        "Provides de-escalation communication scripts and earned security cultivation protocols",
      ],
      faqs: [
        {
          question: "Can an anxious and avoidant couple build a secure relationship?",
          answer:
            "Yes, through 'earned security.' When both partners recognize the attachment dance without blaming, learn each other's nervous system triggers, and practice de-escalation scripts, they can transform the trap into mutual safety.",
        },
        {
          question: "What is a deactivating strategy in avoidant attachment?",
          answer:
            "A deactivating strategy is an unconscious behavioral or cognitive maneuver (such as fault-finding, pulling away during intimacy, or emotional shutdown) used to suppress attachment needs and maintain psychological distance.",
        },
      ],
    },
    {
      route: "/quiz/existential-dread",
      aliases: ["/quiz/quarter-life-crisis", "/tes-krisis-eksistensial"],
      title: "Existential Dread Test: Free Quarter-Life Crisis & Purpose Screener",
      description:
        "Paralyzed by cosmic nihilism, time slipping away, or lack of agency? Free 12-item clinical screener based on Viktor Frankl's Logotherapy and Irvin Yalom's Existential Psychotherapy.",
      category: "Existential Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Viktor Frankl Logotherapy & Irvin Yalom Existential Psychotherapy",
      overview:
        "Existential dread screener diagnoses cosmic nihilism, temporal finitude anxiety, and quarter-life purpose paralysis. It helps users unpack the gap between routine obligations and deep human meaning, transforming dread into tragic optimism and grounded personal agency.",
      keyPoints: [
        "Measures meaning vacuum, cosmic absurdity, and questioning the point of effort",
        "Assesses temporal anxiety, ticking-clock dread, and panic over aging or missed potential",
        "Evaluates agency deficit, autopilot living, and feeling like an external spectator to your life",
        "Delivers Logotherapy values alignment, micro-meaning rituals, and daily stoic anchors",
      ],
      faqs: [
        {
          question: "Is existential dread normal in your 20s and 30s?",
          answer:
            "Yes. A quarter-life existential crisis is extremely common as individuals transition from structured academic paths to ambiguous adult realities, confronting mortality, career meaning, and freedom of choice.",
        },
        {
          question: "What is Viktor Frankl's concept of 'Tragic Optimism'?",
          answer:
            "Tragic optimism is the capacity to remain optimistic and find meaning despite the 'tragic triad' of human existence: pain, guilt, and death. Meaning is not found in avoiding suffering, but in how we choose to respond to it.",
        },
      ],
    },
    {
      route: "/quiz/emotional-numbness",
      aliases: ["/quiz/dissociative-blunting", "/tes-kebas-emosional"],
      title: "Emotional Numbness Test: Free Dissociative Blunting & Polyvagal Freeze Screener",
      description:
        "Feeling hollow, detached like a spectator behind glass, or unable to cry? Free 12-item clinical screener based on Stephen Porges' Polyvagal Theory and Ruth Lanius' trauma research.",
      category: "Trauma & Somatic Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Stephen Porges Polyvagal Theory & Ruth Lanius Dissociative Subtype Model",
      overview:
        "Emotional numbness is a protective neurobiological shutdown where the dorsal vagal complex suppresses affective awareness to prevent pain overwhelm. While functional during acute trauma, chronic blunting causes anhedonia, alienation from memories, and leaden physical lethargy.",
      keyPoints: [
        "Measures affective flatness, social acting, and hyper-intellectualized detachment",
        "Assesses dorsal vagal shutdown, leaden limbs, and compulsive digital pacification",
        "Evaluates anhedonia, emotional memory disconnect, and internal self-abandonment",
        "Delivers gentle somatic thawing rituals, micro-dosing safety, and vagal re-engagement drills",
      ],
      faqs: [
        {
          question: "Why do I feel completely numb instead of sad?",
          answer:
            "When emotional pain exceeds your nervous system's capacity to process it safely, the brain releases endogenous opioids that shut down affective signaling. Numbness is not coldness; it is an emergency circuit breaker.",
        },
        {
          question: "How do you gently thaw from emotional numbness?",
          answer:
            "Start with sensory grounding rather than forced emotional catharsis: warm water, soft fabrics, heavy blankets, gentle humming, and safe, unjudged journaling.",
        },
      ],
    },
    {
      route: "/quiz/toxic-independence",
      aliases: ["/quiz/counter-dependency", "/tes-kemandirian-toksik"],
      title: "Toxic Independence Test: Free Counter-Dependency & Vulnerability Screener",
      description:
        "Refuse to ask for help, push through illness, or carry everyone else's burden? Free 12-item clinical screener based on Gabor Maté's When the Body Says No and Brené Brown's Daring Greatly.",
      category: "Attachment & Somatic Health",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Gabor Maté (When the Body Says No) & Brené Brown (Daring Greatly)",
      overview:
        "Toxic independence (counter-dependency) is a trauma defense where needing others is perceived as fatal vulnerability. It drives individuals to refuse assistance, ignore bodily illness, and carry massive loads until their physical bodies collapse from autoimmune or inflammatory mutiny.",
      keyPoints: [
        "Measures care rejection, help phobia, and visceral panic when receiving assistance",
        "Assesses somatic suppression, pushing past pain, and inability to rest without guilt",
        "Evaluates the martyr complex, secret resentment, and terror of relational reliance",
        "Provides micro-delegation exercises, body boundary reclamation, and interdependence scripts",
      ],
      faqs: [
        {
          question: "What is the difference between healthy self-reliance and toxic independence?",
          answer:
            "Healthy self-reliance is a conscious choice that coexists with the ability to ask for and receive help. Toxic independence is an involuntary, panic-driven compulsion where needing someone feels like a catastrophic surrender.",
        },
        {
          question: "Can toxic independence cause physical illness?",
          answer:
            "Yes. As documented by Dr. Gabor Maté, chronic self-suppression, inability to say 'No', and suppressing physical fatigue flood the body with chronic stress hormones, heavily correlating with autoimmune flare-ups, migraines, and cardiovascular strain.",
        },
      ],
    },
    {
      route: "/quiz/compassion-fatigue",
      aliases: ["/quiz/empathy-burnout", "/tes-kelelahan-empati"],
      title: "Compassion Fatigue Test: Free Empathic Burnout & Emotional Exhaustion Screener",
      description:
        "Drained by listening to others, emotionally blunted, or cynical towards loved ones? Free 12-item clinical screener based on Charles Figley's Compassion Fatigue Model and Christina Maslach's Burnout Inventory.",
      category: "Burnout & Empathic Health",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Charles Figley (Compassion Fatigue Model) & Christina Maslach (Burnout Inventory)",
      overview:
        "Compassion fatigue is the profound physical, emotional, and spiritual exhaustion that occurs when an individual absorbs the suffering and trauma of others without adequate emotional buffering. It leads to empathic depletion, protective cynicism, and vicarious trauma.",
      keyPoints: [
        "Measures empathic depletion, sensory saturation, and inability to resonate with others' feelings",
        "Assesses protective cynicism, irritable numbness, and emotional callousness as survival defenses",
        "Evaluates vicarious trauma, absorbed distress, and secondhand emotional burden",
        "Provides somatic recovery exercises, emotional boundaries, and caring detachment protocols",
      ],
      faqs: [
        {
          question: "What is the difference between burnout and compassion fatigue?",
          answer:
            "Burnout is typically a gradual reaction to workplace workload and systemic stress. Compassion fatigue specifically arises from empathic engagement with others' suffering, often accompanied by secondary traumatic stress symptoms.",
        },
        {
          question: "Can non-healthcare workers get compassion fatigue?",
          answer:
            "Yes. Parents, teachers, managers, supportive friends, and highly sensitive individuals (HSPs) frequently suffer from compassion fatigue from continually absorbing emotional weight.",
        },
      ],
    },
    {
      route: "/quiz/intimacy-avoidance",
      aliases: ["/quiz/intimacy-anorexia", "/tes-penghindaran-keintiman"],
      title: "Intimacy Avoidance Test: Free Intimacy Anorexia & Emotional Guarding Screener",
      description:
        "Do you pull away when someone gets close, hide behind busyness, or find flaws in partners? Free 12-item clinical screener based on Doug Weiss's Intimacy Anorexia model and Harville Hendrix's Imago Therapy.",
      category: "Attachment & Relational Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Doug Weiss (Intimacy Anorexia) & Dr. Harville Hendrix (Imago Therapy)",
      overview:
        "Intimacy avoidance (or intimacy anorexia) is the active withholding of emotional, physical, and spiritual intimacy from a partner or close companion. It functions as an unacknowledged armor against vulnerability, abandonment, or engulfment.",
      keyPoints: [
        "Measures affection withholding, avoiding eye contact, and emotional distancing when connection deepens",
        "Assesses busyness evasion, task saturation, and workaholism deployed to avoid one-on-one intimacy",
        "Evaluates silent blame, flaw-finding defense mechanisms, and pre-emptive relational detachment",
        "Provides micro-vulnerability exercises, nervous system safety anchors, and relational repair steps",
      ],
      faqs: [
        {
          question: "What is intimacy anorexia?",
          answer:
            "Intimacy anorexia, a concept developed by psychologist Dr. Doug Weiss, is the compulsive withholding of emotional, relational, and physical connection to avoid being hurt or engulfed.",
        },
        {
          question: "How does busyness act as an intimacy barrier?",
          answer:
            "By continually overloading schedules with meetings, chores, and digital stimulation, individuals create a plausible excuse to avoid quiet, vulnerable, and deep emotional conversations.",
        },
      ],
    },
    {
      route: "/quiz/fawn-response",
      aliases: ["/quiz/people-pleasing-fawn", "/tes-fawn-response"],
      title: "Fawn Response Test: Free People-Pleaser & Trauma Appeasement Screener",
      description:
        "Smile when you're angry, apologize for existing, or erase your needs to keep the peace? Free 12-item clinical screener based on Pete Walker's Complex PTSD Fawn Model and Harriet Braiker's Disease to Please.",
      category: "Trauma & Relational Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Pete Walker (Complex PTSD Fawn Model) & Dr. Harriet Braiker (Disease to Please)",
      overview:
        "The Fawn response is a trauma defense where individuals appease, placate, and merge with others' desires to avoid conflict, retaliation, or abandonment. It drives compulsive agreeableness, identity surrender, and toxic post-fawn resentment.",
      keyPoints: [
        "Measures compulsive appeasement, conflict phobia, and visceral panic when someone is irritated",
        "Assesses identity erasure, inability to state preferences, and fear of saying 'No'",
        "Evaluates post-fawn secret rage, passive-aggressive withdrawal, and martyrdom cycles",
        "Provides somatic anger discharge drills, 24-hour pause protocols, and sovereign boundary scripts",
      ],
      faqs: [
        {
          question: "What is the fawn trauma response?",
          answer:
            "Coined by trauma therapist Pete Walker, fawning is the fourth trauma response alongside fight, flight, and freeze. Fawners seek safety by becoming helpful, agreeable, and compliant to aggressors or demanding partners.",
        },
        {
          question: "Is people-pleasing always a trauma response?",
          answer:
            "Kindness is healthy when it is voluntary. When people-pleasing is driven by acute panic, physical chest tightness, and total inability to say 'No', it is a trauma-conditioned fawn reflex.",
        },
      ],
    },
    {
      route: "/quiz/financial-anxiety",
      aliases: ["/quiz/scarcity-mindset", "/tes-scarcity-mindset"],
      title: "Financial Anxiety Test: Free Scarcity Mindset & Money Trauma Screener",
      description:
        "Panic when checking your bank account, terrified of destitution despite savings, or drowning in guilt over basic purchases? Free 12-item clinical screener based on Mullainathan & Shafir's Scarcity Bandwidth Tax and Brad Klontz's Money Scripts.",
      category: "Cognitive Bandwidth & Stress",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Sendhil Mullainathan & Eldar Shafir (Scarcity Bandwidth) & Dr. Brad Klontz (Money Scripts)",
      overview:
        "Financial anxiety and scarcity mindset tax cognitive bandwidth, creating tunneling where the brain obsesses over imagined financial ruin regardless of objective wealth. It leads to compulsive hoarding, spending guilt, and compensatory binging.",
      keyPoints: [
        "Measures cognitive bandwidth tax, money rumination, and decision fatigue around pricing",
        "Assesses catastrophic destitution phobia, phantom poverty dread, and fear of homelessness",
        "Evaluates deprivation guilt, hoarding broken items, and impulsive revenge-spending cycles",
        "Provides somatic grounding anchors, dedicated weekly financial windows, and abundance protocols",
      ],
      faqs: [
        {
          question: "What is the cognitive bandwidth tax of scarcity?",
          answer:
            "Harvard and Princeton research demonstrates that worrying about financial scarcity consumes working memory and executive control, lowering effective fluid intelligence by up to 13 IQ points during financial triggers.",
        },
        {
          question: "Why do I feel poor even when I have savings?",
          answer:
            "Childhood experiences of financial precarity or parental arguments condition the nervous system to treat spending as a threat to physical survival, leaving deep 'phantom poverty' somatic memories.",
        },
      ],
    },
    {
      route: "/quiz/rsd-rejection-sensitivity",
      aliases: ["/quiz/rejection-sensitive-dysphoria", "/tes-sensitivitas-penolakan"],
      title: "Rejection Sensitive Dysphoria (RSD) Test: Free ADHD & Sensitivity Screener",
      description:
        "Does perceived criticism feel like an unbearable physical punch to the chest? Free 12-item clinical screener based on Dr. William Dodson's RSD Framework and Elaine Aron's Sensory Processing Sensitivity.",
      category: "Neurodivergence & Emotional Intensity",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. William Dodson (RSD in ADHD) & Dr. Elaine Aron (Sensory Processing Sensitivity)",
      overview:
        "Rejection Sensitive Dysphoria (RSD) is an extreme emotional sensitivity and pain triggered by perceived rejection, teasing, or criticism. Common in ADHD and neurodivergent individuals, it leads to visceral dysphoric collapse and pre-emptive defensive armoring.",
      keyPoints: [
        "Measures anticipatory rejection vigilance, tone scanning, and pre-rehearsal anxiety",
        "Assesses visceral dysphoria, physical chest/gut constriction, and sudden crying spells",
        "Evaluates defensive armoring, pre-emptive cutoffs, and shame-rage episodes",
        "Provides neurodivergent cold splash protocols, 24-hour reality checks, and sensory de-escalation steps",
      ],
      faqs: [
        {
          question: "What is Rejection Sensitive Dysphoria (RSD)?",
          answer:
            "RSD is an intense, overwhelming neurological vulnerability to the perception of being rejected, criticized, or having failed, frequently co-occurring with ADHD and autism.",
        },
        {
          question: "Can RSD be treated?",
          answer:
            "Yes. Understanding that RSD is a neurological pain response rather than a moral failure, combined with sensory regulation protocols, ACT therapy, and medical consultation (such as alpha-2 agonists), provides significant relief.",
        },
      ],
    },
    {
      route: "/quiz/dopamine-burnout",
      aliases: ["/quiz/digital-overstimulation", "/tes-kejenuhan-dopamin"],
      title: "Dopamine Burnout Test: Free Digital Overstimulation & Screen Addiction Screener",
      description:
        "Real life feels painfully boring, trapped in mindless feed-scrolling, or irritable when offline? Free 12-item clinical screener based on Dr. Anna Lembke's Dopamine Nation and Dr. Andrew Huberman's Dopamine Dynamics.",
      category: "Neurochemistry & Digital Wellbeing",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Anna Lembke (Stanford Dopamine Nation) & Dr. Andrew Huberman (Dopamine Baseline Dynamics)",
      overview:
        "Dopamine burnout occurs when chronic hyper-stimulation from short-form feeds, notifications, and gaming downregulates D2 dopamine receptors. This creates real-world anhedonia, motivation flatline, and acute withdrawal agitation when offline.",
      keyPoints: [
        "Measures anhedonia flatline and loss of drive for non-digital effort",
        "Assesses compulsive device tunnelling, phantom vibrations, and time blindness",
        "Evaluates restless withdrawal agitation, irritability offline, and revenge bedtime scrolling",
        "Provides 30-day dopamine reset protocols, grayscale display tricks, and cold shower upregulation drills",
      ],
      faqs: [
        {
          question: "What causes dopamine burnout?",
          answer:
            "Continuous exposure to instant, effortless digital dopamine spikes forces the brain to downregulate D2 receptors to protect against overstimulation, leaving the individual in a chronic deficit state.",
        },
        {
          question: "How do you reset dopamine receptors?",
          answer:
            "Stanford research indicates that a 2 to 4-week reduction in high-dopamine digital consumption, combined with cold water therapy, morning sunlight, and delayed gratification, restores receptor density.",
        },
      ],
    },
    {
      route: "/quiz/splitting-polarization",
      aliases: ["/quiz/black-and-white-thinking", "/tes-splitting-polarisasi"],
      title: "Splitting & Black-and-White Polarization Test: Free Psychological Screener",
      description:
        "Do you swing between intense worship and sudden disgust? Free 12-item clinical screener measuring splitting, all-or-nothing cognitive distortions, and borderline defense mechanisms based on Otto Kernberg and Marsha Linehan.",
      category: "Ego Defense & Emotional Regulation",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Otto Kernberg (Object Relations Splitting) & Marsha Linehan (DBT Dialectics)",
      overview:
        "Splitting is a primitive ego defense mechanism where people, relationships, or oneself are perceived in rigid binaries—all-good or all-bad. This clinical screener measures idealization/devaluation cycles, emotional whiplash, and intolerance of ambivalence.",
      keyPoints: [
        "Measures idealization and devaluation whiplash in intimate relationships",
        "Assesses all-or-nothing cognitive distortions and catastrophizing flips",
        "Evaluates intolerance of emotional ambiguity and grey-area anxiety",
        "Provides DBT 'Both/And' dialectical exercises, whole-object integration drills, and relational grounding",
      ],
      faqs: [
        {
          question: "What is splitting in psychology?",
          answer:
            "Splitting is an unconscious defense mechanism where an individual cannot integrate the positive and negative qualities of self or others into a cohesive, realistic whole.",
        },
        {
          question: "How does DBT help with splitting?",
          answer:
            "Dialectical Behavior Therapy (DBT) teaches radical acceptance and dialectical thinking—the practice of holding two seemingly opposing truths at the same time without collapsing into panic.",
        },
      ],
    },
    {
      route: "/quiz/toxic-shame",
      aliases: ["/quiz/internalized-shame", "/tes-toxic-shame"],
      title: "Toxic Shame & Defectiveness Test: Free Internalized Shame Screener",
      description:
        "Guilt says 'I made a mistake.' Toxic shame says 'I am a mistake.' Free 12-item clinical assessment based on John Bradshaw's Healing the Shame That Binds You and Dr. Brené Brown's Shame Resilience Theory.",
      category: "Trauma & Identity Architecture",
      duration: "90 secs",
      itemsCount: 12,
      framework: "John Bradshaw (Healing the Shame That Binds You) & Dr. Brené Brown (Shame Resilience)",
      overview:
        "Toxic shame is not an emotion; it is an internalized identity where the self feels fundamentally flawed, unworthy, and contaminated. This screener measures core defectiveness conviction, persecutory self-contempt, and somatic shame collapse.",
      keyPoints: [
        "Measures core defectiveness conviction and fear of being fundamentally unlovable",
        "Assesses internal persecutory self-contempt and brutal self-criticism",
        "Evaluates somatic shame collapse, gaze aversion, and hiding reflexes",
        "Provides Kristin Neff self-compassion mantras, inner child soothing, and exposure to safe vulnerability",
      ],
      faqs: [
        {
          question: "What is the difference between healthy guilt and toxic shame?",
          answer:
            "Healthy guilt evaluates behavior ('I did something bad') and promotes repair. Toxic shame evaluates identity ('I am fundamentally bad') and prompts social withdrawal, hiding, and despair.",
        },
        {
          question: "Can toxic shame be healed?",
          answer:
            "Yes. Shame thrives in secrecy, silence, and judgment. Speaking shame aloud in safe environments, practicing somatic self-compassion, and reparenting inner critic dialogues breaks chronic shame loops.",
        },
      ],
    },
    {
      route: "/quiz/betrayal-trauma",
      aliases: ["/quiz/betrayal-blindness", "/tes-trauma-pengkhianatan"],
      title: "Betrayal Trauma & Betrayal Blindness Test: Free Clinical Infidelity Screener",
      description:
        "Did you overlook obvious signs of deceit to keep your relationship intact? Free 12-item clinical screener based on Dr. Jennifer Freyd's Betrayal Trauma theory measuring blindness, hypervigilance, and gut disruption.",
      category: "Trauma & Attachment Neurobiology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Jennifer Freyd (Betrayal Trauma & Betrayal Blindness)",
      overview:
        "Betrayal trauma occurs when people or institutions we depend on for survival violate our core trust. This screener measures betrayal blindness (unconscious denial), hypervigilant scanning, and somatic enteric gut-brain shock.",
      keyPoints: [
        "Measures betrayal blindness, gaslighting doubt, and self-blame for 'ignoring red flags'",
        "Assesses relational hypervigilance, text scanning, and persistent suspicion",
        "Evaluates interoceptive gut shocks, nausea, and autonomic sleep disruptions",
        "Provides grounding protocols, reality-anchoring documentation, and self-compassion tools",
      ],
      faqs: [
        {
          question: "What is betrayal blindness?",
          answer:
            "Betrayal blindness is an unconscious survival mechanism where a dependent person remains unaware of betrayal or abuse to preserve essential attachment and safety.",
        },
        {
          question: "How does betrayal trauma affect the body?",
          answer:
            "Severe deception triggers the dorsal vagal complex, leading to acute digestive shutdown (hypochlorhydria, nausea, IBS), sudden tachycardia, and severe hyper-arousal.",
        },
      ],
    },
    {
      route: "/quiz/pda-demand-avoidance",
      aliases: ["/quiz/pathological-demand-avoidance", "/tes-pda-alergi-perintah"],
      title: "Pathological Demand Avoidance (PDA) Test: Free Autonomy & Demand Resistance Screener",
      description:
        "Does being told what to do trigger intense rage, panic, or catatonic task freeze? Free 12-item neurodivergent screener measuring Pathological Demand Avoidance and Pervasive Drive for Autonomy in ADHD and Autism.",
      category: "Neurodivergence & Executive Function",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Elizabeth Newson & Modern Pervasive Drive for Autonomy (PDA) Models",
      overview:
        "Pathological Demand Avoidance (PDA) is a neurodivergent profile where direct demands, expectations, and even personal self-care goals trigger an involuntary fight-or-flight panic response to protect personal autonomy.",
      keyPoints: [
        "Measures autonomy threat panic when receiving direct instructions or scheduled deadlines",
        "Assesses internal demand paralysis—avoiding activities you love once they feel like obligations",
        "Evaluates social masking, deflection through humor, and sudden physical symptoms",
        "Provides low-demand lifestyle design, declarative language frameworks, and autonomy restoration",
      ],
      faqs: [
        {
          question: "What is Pathological Demand Avoidance (PDA)?",
          answer:
            "PDA is a profile within the neurodiversity spectrum where the brain's threat circuitry interprets demands and loss of autonomy as imminent danger, causing compulsive avoidance.",
        },
        {
          question: "What is declarative language for PDA?",
          answer:
            "Declarative language replaces imperative commands ('Put your shoes on') with neutral, factual statements ('The shoes are next to the door'), removing the perceived coercion.",
        },
      ],
    },
    {
      route: "/quiz/functional-freeze",
      aliases: ["/quiz/somatic-freeze", "/tes-functional-freeze"],
      title: "Functional Freeze Test: Free Polyvagal & Somatic Shutdown Screener",
      description:
        "Are you productive at work but internally numb, detached, and exhausted? Free 12-item clinical screener measuring dorsal vagal freeze, somatic armoring, and executive inertia.",
      category: "Polyvagal Neurobiology & Somatics",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Stephen Porges (Polyvagal Theory) & Peter Levine (Somatic Experiencing)",
      overview:
        "Functional freeze occurs when the nervous system co-activates sympathetic mobilization (to get work done) and dorsal vagal shutdown (numbing emotions and visceral vitality), leaving the individual feeling like a ghost drifting through their own life.",
      keyPoints: [
        "Measures dorsal vagal shutdown and chronic emotional disconnection",
        "Assesses somatic armoring, unconscious clenched jaw, and held breath",
        "Evaluates interoceptive dissociation and lack of visceral sensation",
        "Provides somatic orientation, vocal vagus toning drills, and restorative rest plans",
      ],
      faqs: [
        {
          question: "What is a functional freeze response?",
          answer:
            "Functional freeze is a state where an individual remains outwardly productive and capable of completing tasks, while their nervous system is locked in an ancient dorsal vagal immobility response characterized by deep numbness and inertia.",
        },
        {
          question: "How do you break out of a functional freeze state?",
          answer:
            "Cognitive talk therapy is often insufficient. Somatic bottom-up interventions—such as gentle vocal toning, sensory orientation (naming colors), physiological sighing, and somatic rocking—send physical cues of safety directly to the brainstem.",
        },
      ],
    },
    {
      route: "/quiz/somatic-armoring",
      aliases: ["/quiz/body-armoring", "/tes-body-armoring"],
      title: "Somatic Armoring Test: Free Body Armor & Muscular Tension Diagnostic",
      description:
        "Does your body carry chronic clenched jaws, locked diaphragms, or rigid hips? Free 12-item clinical assessment measuring Wilhelm Reich's muscular segments and somatic trauma holding patterns.",
      category: "Somatic Psychology & Bodywork",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Wilhelm Reich (Character Armor & Segments) & Dr. Bessel van der Kolk",
      overview:
        "Body armoring is chronic muscular spasms and tension patterns developed to bind anxiety, suppress rage or tears, and ward off perceived trauma. This diagnostic maps tension across cervical, thoracic, and pelvic segments.",
      keyPoints: [
        "Measures cervical & oral segment armoring (jaw clenching, lump in throat, neck guarding)",
        "Assesses thoracic & diaphragmatic constriction (held breath, shallow chest breathing)",
        "Evaluates pelvic & psoas locking (lower back stiffness, inability to surrender into mattress)",
        "Provides targeted myofascial release, low-frequency vocal humming, and psoas de-escalation protocols",
      ],
      faqs: [
        {
          question: "What is body armoring in psychology?",
          answer:
            "Body armoring refers to chronic muscular rigidity that functions as a physical defense against the breakthrough of painful suppressed emotions and anxiety.",
        },
        {
          question: "Can somatic armoring cause physical health issues?",
          answer:
            "Yes. Long-term muscular armoring can lead to tension headaches, temporomandibular joint (TMJ) dysfunction, chronic digestive disorders (IBS), shallow breathing, and adrenal fatigue.",
        },
      ],
    },

    // 3. Somatic & Regulation Tools
    {
      route: "/tools/physiological-sigh",
      aliases: ["/tools/cyclic-sighing", "/cyclic-sighing", "/physiological-sigh"],
      title: "Stanford Physiological Sigh Lab: Free Real-Time Vagal Down-Regulation",
      description:
        "The fastest scientifically-proven breathwork technique to reduce autonomic arousal in real-time. Double-inhale and extended exhale based on Stanford Huberman Lab.",
      category: "Autonomic Breathwork",
      duration: "Interactive Tool",
      itemsCount: 1,
      framework: "Dr. Andrew Huberman & Dr. David Spiegel Stanford Research",
      overview:
        "The physiological sigh is a naturally occurring breathing pattern (two inhales through the nose followed by an extended sigh out through the mouth) that re-inflates collapsed pulmonary alveoli and stimulates the vagus nerve to rapidly slow heart rate.",
      keyPoints: [
        "Interactive audio-visual pacer for dual inhale (deep + top-off) and long release",
        "Lowers autonomic arousal, salivary cortisol, and resting heart rate in under 2 minutes",
        "Use immediately during panic onset, workplace frustration, or bedtime racing thoughts",
      ],
      faqs: [
        {
          question: "Why two inhales instead of one?",
          answer:
            "The second quick 'top-off' inhale pops open collapsed air sacs (alveoli) in the lungs, drastically increasing surface area to expel accumulated carbon dioxide.",
        },
      ],
    },
    {
      route: "/tools/bilateral",
      aliases: ["/tools/emdr", "/emdr"],
      title: "Bilateral Stimulation & EMDR Pacer: Free Visual & Audio Desensitization",
      description:
        "Interactive bilateral alternating visual pacer and auditory tones to reduce emotional charge and calm trauma spikes based on EMDR protocols.",
      category: "Trauma Desensitization",
      duration: "Interactive Tool",
      itemsCount: 1,
      framework: "Dr. Francine Shapiro Eye Movement Desensitization and Reprocessing (EMDR)",
      overview:
        "Bilateral stimulation engages alternating left-right hemispheres of the brain via rhythmic visual tracking or sound cues. This working memory taxation allows the amygdala to process distress without triggering fight-or-flight paralysis.",
      keyPoints: [
        "Smooth rhythmic horizontal ball pacer with customizable speed and contrast",
        "Pure Web Audio panning tones for simultaneous auditory bilateral engagement",
        "Use while holding a stressful memory or feeling of acute panic to reduce emotional charge",
      ],
      faqs: [
        {
          question: "Is this identical to a full EMDR therapy session?",
          answer:
            "No. This interactive pacer provides self-soothing bilateral stimulation. Full EMDR for complex PTSD should be conducted with a certified EMDR clinician.",
        },
      ],
    },
    {
      route: "/tools/grounding",
      aliases: ["/tools/54321", "/grounding"],
      title: "5-4-3-2-1 Sensory Grounding Tool: Rapid Panic & Anxiety Reset",
      description:
        "Interactive step-by-step 5-4-3-2-1 grounding exercise to interrupt panic attacks, severe overthinking spirals, and acute dissociation. Free and private.",
      category: "Somatic Grounding",
      duration: "Interactive Tool",
      itemsCount: 5,
      framework: "Clinical Somatic Grounding & Interoceptive Re-orientation",
      overview:
        "The 5-4-3-2-1 grounding technique forces the brain to disengage from catastrophic internal thoughts by systematically activating the 5 external sensory organs (sight, touch, hearing, smell, taste).",
      keyPoints: [
        "Step 5: See 5 things in your immediate space",
        "Step 4: Feel 4 physical textures or contact points",
        "Step 3: Listen for 3 distinct ambient sounds",
        "Step 2: Acknowledge 2 scents or air sensations",
        "Step 1: Notice 1 taste or swallow consciously",
      ],
      faqs: [
        {
          question: "Why is sensory grounding so effective during panic?",
          answer:
            "Panic is an internal loop of imagined catastrophe. Demanding detailed sensory observations redirects cerebral blood flow back to the sensory cortex and prefrontal cortex.",
        },
      ],
    },
    {
      route: "/tools/sleep",
      aliases: ["/tools/478", "/sleep"],
      title: "4-7-8 Deep Sleep Pacer: Interactive Parasympathetic Breath Guide",
      description:
        "Dr. Andrew Weil's natural nervous system tranquilizer. Inhale for 4, hold for 7, exhale for 8 to quiet 3 AM racing thoughts and fall asleep naturally.",
      category: "Sleep & Relaxation",
      duration: "Interactive Tool",
      itemsCount: 1,
      framework: "Dr. Andrew Weil 4-7-8 Pranayama Relaxation Model",
      overview:
        "The 4-7-8 rhythm alters blood chemistry by boosting carbon dioxide retention during the hold and enforcing a prolonged exhale that activates the vagal brake, steadily lowering cardiac output before sleep.",
      keyPoints: [
        "Gentle visual expansion and contracting pacer designed for dark bedrooms",
        "Calms racing thoughts and cognitive arousal without medication",
        "Optimal when practiced for 4 to 8 cycles before lights out",
      ],
      faqs: [
        {
          question: "What if holding my breath for 7 seconds feels uncomfortable?",
          answer:
            "You can speed up the counting tempo as long as you preserve the exact 4:7:8 mathematical ratio between the three phases.",
        },
      ],
    },
    {
      route: "/tools/box-breathing",
      aliases: ["/tools/square-breathing", "/box-breathing"],
      title: "Box Breathing Pacer: Navy SEAL 4x4 Stress Regulation Tool",
      description:
        "Equal 4-second breath cycles: Inhale 4, Hold 4, Exhale 4, Hold 4. Clear adrenaline and steady your heart rate under high-stress conditions.",
      category: "Autonomic Pacing",
      duration: "Interactive Tool",
      itemsCount: 1,
      framework: "Navy SEAL Tactical Box Breathing Protocol",
      overview:
        "Used by elite military units, surgeons, and first responders, square box breathing balances oxygen and carbon dioxide levels while training the nervous system to remain composed under acute cognitive load.",
      keyPoints: [
        "4-second visual square pacer with soothing cues",
        "Steadies autonomic adrenaline surges before public speaking, exams, or confrontations",
        "Builds respiratory endurance and carbon dioxide tolerance",
      ],
      faqs: [
        {
          question: "When should I use box breathing vs physiological sigh?",
          answer:
            "Use the physiological sigh for instant acute emergency calming (10-30 seconds). Use box breathing for sustained focus and steady composure (2-5 minutes).",
        },
      ],
    },
    {
      route: "/tools/nsdr",
      aliases: ["/tools/yoga-nidra", "/nsdr"],
      title: "Non-Sleep Deep Rest (NSDR) & Yoga Nidra: Cortisol Reset Audio",
      description:
        "Enter a state of conscious sleep to replenish dopamine, restore mental energy, and accelerate physical recovery in 10-20 minutes without sleeping.",
      category: "Neuro-Restoration",
      duration: "10-20 mins",
      itemsCount: 1,
      framework: "Stanford Huberman Lab NSDR & Classical Yoga Nidra",
      overview:
        "Non-Sleep Deep Rest (NSDR) is a structured protocol that guides the brain into alpha and theta brainwave states. Studies demonstrate that a 20-minute NSDR session can restore cognitive dopamine reserves comparable to multiple hours of lost sleep.",
      keyPoints: [
        "Interactive guided audio frequencies and somatic body scan visualizations",
        "Proven to improve memory consolidation, motor learning, and stress resilience",
        "Ideal for afternoon energy crashes and post-burnout recuperation",
      ],
      faqs: [
        {
          question: "Does NSDR replace normal nighttime sleep?",
          answer:
            "No, but it dramatically offsets the cognitive penalties of sleep debt and provides profound autonomic decompression.",
        },
      ],
    },
    {
      route: "/tools/soundscapes",
      aliases: ["/soundscapes", "/focus-sounds"],
      title: "Sound Sanctuary: Focus Audio, Pink Noise & Binaural Soundscapes",
      description:
        "Curated ambient soundscapes for private reflection, deep work, and anxiety relief: Cozy Rain, Forest Stream, Tibetan Singing Bowls, and Binaural Beats.",
      category: "Acoustic Wellness",
      duration: "Interactive Tool",
      itemsCount: 8,
      framework: "Acoustic Neuromodulation & Environmental Masking",
      overview:
        "Soundscapes provide steady auditory stimulation that masks jarring background noises and calms the default mode network (DMN), enabling deeper focus and uninhibited emotional journaling.",
      keyPoints: [
        "Pure Web Audio soundscapes: Thunderstorm, Coffee Shop, Pink Noise, Solfeggio 528Hz",
        "Plays seamlessly while journaling or writing reflections in Nuju",
        "100% offline-ready PWA audio generation",
      ],
      faqs: [
        {
          question: "What is pink noise?",
          answer:
            "Pink noise has equal energy per octave, mimicking natural acoustic phenomena like rainfall or rustling leaves, which neuroscientists found promotes deeper slow-wave sleep and calm focus.",
        },
      ],
    },
    {
      route: "/tools/panic-sos",
      aliases: ["/emergency", "/sos", "/anti-panic"],
      title: "Panic Attack SOS & Crisis Calming Tool: 60-Second De-escalation",
      description:
        "In the middle of a panic attack or extreme anxiety spike? Step-by-step emergency grounding, paced breathing, and reassuring psychological first aid.",
      category: "Emergency First Aid",
      duration: "Interactive Tool",
      itemsCount: 1,
      framework: "Psychological First Aid (PFA) & Interoceptive Calming",
      overview:
        "When an acute panic attack hits, racing thoughts convince you that you are having a medical emergency. This SOS tool provides instant, steady, compassionate guidance to anchor you back to reality.",
      keyPoints: [
        "Immediate reminder: 'You are safe. Your body is experiencing an adrenaline surge. It will pass.'",
        "Automated physiological sigh breath pacer and 5-4-3-2-1 anchor buttons",
        "One-touch crisis hotline directory for immediate professional assistance",
      ],
      faqs: [
        {
          question: "How long does an average panic attack adrenaline peak last?",
          answer:
            "Biologically, an adrenaline rush peaks within 3 to 5 minutes and subsides within 10 to 20 minutes as the liver and kidneys metabolize circulating epinephrine.",
        },
      ],
    },
    {
      route: "/tools/solfeggio",
      aliases: ["/tools/brainwaves", "/solfeggio"],
      title: "Solfeggio Harmonics & Binaural Frequencies: 528Hz, 432Hz, 396Hz",
      description:
        "Experience pure acoustic frequency synthesis: 528Hz miracle tone, 432Hz natural frequency, and theta brainwave generators for meditation and reflection.",
      category: "Acoustic Harmonics",
      duration: "Interactive Tool",
      itemsCount: 6,
      framework: "Sacred Solfeggio Scale & Binaural Auditory Entrainment",
      overview:
        "Pure harmonic frequencies and binaural entrainment support meditative focus and parasympathetic relaxation by encouraging synchronization across cortical hemispheres.",
      keyPoints: [
        "528 Hz: Transformation and emotional harmony",
        "432 Hz: Grounding and natural relaxation",
        "396 Hz: Liberation from fear and guilt loops",
      ],
      faqs: [
        {
          question: "Do I need headphones for binaural beats?",
          answer:
            "Yes. Binaural beats require stereo headphones so each ear receives a slightly different frequency, allowing the brainstem to perceive the restorative beat differential.",
        },
      ],
    },
    {
      route: "/tools/vocal-toning",
      aliases: ["/tools/vagal-humming", "/vocal-toning"],
      title: "Vocal Toning & Vagal Humming Lab: Polyvagal Sound Stimulation",
      description:
        "Stimulate your vagus nerve through mechanical pharyngeal vibration and extended exhalation humming. Proven to elevate Heart Rate Variability (HRV).",
      category: "Vagal Stimulation",
      duration: "Interactive Tool",
      itemsCount: 1,
      framework: "Polyvagal Phonation Research & Vagus Nerve Anatomy",
      overview:
        "The vagus nerve passes directly adjacent to the vocal cords and pharynx. Low-frequency humming and vocal toning mechanically stimulate vagal fibers, triggering an immediate parasympathetic response.",
      keyPoints: [
        "Interactive humming audio frequency pitch guide",
        "Boosts nitric oxide production in nasal passages by up to 15-fold",
        "Rapidly clears lump-in-the-throat emotional constriction",
      ],
      faqs: [
        {
          question: "How does humming calm the nervous system?",
          answer:
            "Vibrations stimulate the auricular and recurrent laryngeal branches of the vagus nerve while enforcing prolonged exhalation, naturally slowing heart rate.",
        },
      ],
    },
    {
      route: "/tools/breathwork",
      aliases: ["/breathe"],
      title: "Breathwork Lab: All-in-One Guided Breathing Exercises & Timers",
      description:
        "Interactive breathwork studio featuring 4-7-8 Sleep, Box Breathing, Physiological Sigh, Coherence 5.5, and Energizing rhythms.",
      category: "Breath Studio",
      duration: "Interactive Studio",
      itemsCount: 5,
      framework: "Clinical Respiration & Heart Rate Variability (HRV) Pacing",
      overview:
        "The Breathwork Lab brings together clinically verified breathing patterns in one smooth, customizable studio with haptic cues, ambient sound, and soothing visuals.",
      keyPoints: [
        "Switch effortlessly between Sleep, Focus, Emergency Calm, and Coherent modes",
        "Synchronize heart and brain through resonant 5.5-second breathing rhythms",
        "Full screen ambient experience optimized for mobile and desktop",
      ],
      faqs: [
        {
          question: "What is 'Coherent Breathing'?",
          answer:
            "Breathing at roughly 5.5 breaths per minute (5.5 seconds in, 5.5 seconds out) optimizes Heart Rate Variability (HRV) and synchronizes cardiac and respiratory rhythms.",
        },
      ],
    },

    // 4. Generic Quizzes from quizzes.ts
    {
      route: "/quiz/baterai-emosi",
      title: "Emotional Battery Level Test: How Depleted Are You Really?",
      description:
        "Check your current mental energy level in 45 seconds. Find out if you are at 80% vitality or operating in critical power-save mode.",
      category: "Energy Vitality",
      duration: "45 secs",
      itemsCount: 5,
      framework: "Cognitive Energy Depletion & Allostatic Load Model",
      overview:
        "Your mental and emotional energy functions like a smartphone battery. When demands exceed recharge time, you enter power-save mode: irritation increases, motivation plummets, and small decisions feel monumental.",
      keyPoints: [
        "Instant battery percentage estimate (100%, 75%, 45%, 15%)",
        "Actionable triage: what to cancel, what to delegate, and what will recharge you today",
        "Clear guidance on recognizing the signs of emotional burnout before you crash",
      ],
      faqs: [
        {
          question: "Why does my emotional battery drain even on days I do nothing?",
          answer:
            "Internal friction—such as chronic overthinking, perfectionist self-criticism, and unexpressed emotional tension—consumes glucose and cognitive energy just as heavily as external labor.",
        },
      ],
    },
    {
      route: "/quiz/tipe-overthinking",
      title: "Overthinking Archetype Test: What Kind of Overthinker Are You?",
      description:
        "Discover your 3 AM thinking pattern: The Catastrophizer, The Social Replayer, The Perfectionist Planner, or The Existential Wanderer.",
      category: "Mindset & Sleep",
      duration: "1 min",
      itemsCount: 5,
      framework: "Cognitive Rumination & Default Mode Network (DMN) Science",
      overview:
        "Not all rumination is the same. Understanding whether you overthink about future danger, past social interactions, or existential regret allows you to apply the exact CBT antidote that works for your mental habit.",
      keyPoints: [
        "Reveals your primary overthinking profile with mascot insights",
        "Specific evening brain-dump journaling prompts tailored to your thought style",
        "Breaks down the neurological reason the brain spins catastrophically at night",
      ],
      faqs: [
        {
          question: "Why does overthinking always spike late at night?",
          answer:
            "When sensory inputs decrease in darkness, executive control in the prefrontal cortex declines while the emotional amygdala and default mode network remain hyperactive.",
        },
      ],
    },
    {
      route: "/quiz/burnout-screener",
      title: "Workplace Burnout Risk Screener: Fast Self-Check",
      description:
        "Is your job draining your soul? 1-minute quick screener to assess workplace cynicism, chronic exhaustion, and boundary fatigue.",
      category: "Career & Wellbeing",
      duration: "1 min",
      itemsCount: 5,
      framework: "Maslach Burnout Inventory (MBI) Core Dimensions",
      overview:
        "A quick, high-precision checkpoint for busy professionals to determine whether current work strain is healthy stretch or dangerous chronic depletion.",
      keyPoints: [
        "Categorizes your burnout risk into Safe, Warning Zone, or Red Alert",
        "Provides email boundary templates to halt late-night work intrusion",
        "Identifies systemic work triggers vs personal perfectionism",
      ],
      faqs: [
        {
          question: "Can a vacation fix severe burnout?",
          answer:
            "Rarely. Vacation offers temporary relief, but without changing workload expectations and nervous system boundaries, exhaustion returns within 48 hours.",
        },
      ],
    },
    {
      route: "/quiz/gaya-regulasi-emosi",
      title: "Emotional Regulation Style Test: Bottler, Exploder, or Alchemist?",
      description:
        "How do you process overwhelming feelings? Uncover your unconscious coping mechanisms when sadness, anger, or fear strike.",
      category: "Emotion Science",
      duration: "1 min",
      itemsCount: 5,
      framework: "Gross Process Model of Emotion Regulation",
      overview:
        "James Gross's classic emotion regulation model demonstrates that suppressing feelings takes immense physiological effort. Discover your automatic coping style and learn healthier affective alchemy.",
      keyPoints: [
        "Assesses cognitive reappraisal vs expressive suppression",
        "Identifies whether you bottle, vent impulsively, or avoid feeling",
        "Micro-practices to express anger, grief, and fear safely",
      ],
      faqs: [
        {
          question: "What is emotional alchemy?",
          answer:
            "Emotional alchemy is the art of feeling an emotion fully in the body without shame, listening to its informational message, and channeling its energy into constructive action.",
        },
      ],
    },
    {
      route: "/quiz/high-functioning-anxiety-us",
      title: "American Workplace High-Functioning Anxiety Screener",
      description:
        "Screen for US corporate burnout, golden-handcuff stress, and achievement-driven anxiety masked as dedication.",
      category: "Career Stress",
      duration: "1 min",
      itemsCount: 5,
      framework: "Corporate Wellness & HFA Assessment",
      overview:
        "Tailored for high-performing professionals in corporate, tech, and finance sectors where constant availability and hustle culture mask deep internal panic.",
      keyPoints: [
        "Uncovers fears of falling behind in competitive corporate environments",
        "Actionable work-life deconstruction protocols",
        "Private and completely anonymous",
      ],
      faqs: [
        {
          question: "Is this test private from employers?",
          answer: "Yes. Nuju runs completely client-side. No corporate tracking or data sharing ever occurs.",
        },
      ],
    },
    {
      route: "/quiz/feierabend-burnout-de",
      title: "Feierabend & Work-Life Separation Screener (DACH)",
      description:
        "Kannst du nach Feierabend wirklich abschalten? Teste deine gedankliche Erholung und Burnout-Gefahr.",
      category: "Mental Health (DACH)",
      duration: "1 Min",
      itemsCount: 5,
      framework: "Psychological Detachment (Sonnentag Model)",
      overview:
        "Psychologische Abgrenzung nach der Arbeit ist der wichtigste Schutzfaktor gegen chronischen Stress. Dieser Test analysiert deine Fähigkeit, in den echten Feierabend einzutauchen.",
      keyPoints: [
        "Misst gedankliche Distanzierung und Erholungseffekte",
        "Konkrete Rituale für den Übergang vom Arbeitstag zur Entspannung",
      ],
      faqs: [
        {
          question: "Was bedeutet Feierabend-Burnout?",
          answer: "Wenn die Gedanken auch nach Dienstschluss unablässig um berufliche Probleme kreisen und echte Regeneration unmöglich machen.",
        },
      ],
    },
    {
      route: "/quiz/winter-blues-nordic-no",
      title: "Nordic Winter Blues & SAD Assessment",
      description:
        "Mørketid og energi: Sjekk om vintertrøttheten din er normal sesongvariasjon eller sesongavhengig depresjon (SAD).",
      category: "Nordic Wellness",
      duration: "1 min",
      itemsCount: 5,
      framework: "Seasonal Affective Disorder (SAD) Screening",
      overview:
        "Mørketid og mangel på sollys påvirker døgnrytme og serotoninnivåer. Denne testen gir innsikt i energimønstre gjennom nordiske vintermåneder.",
      keyPoints: [
        "Måler døgnrytmepåvirkning og melatoninubalanse",
        "Tips om lysterapi, morgenrutiner og skånsom refleksjon",
      ],
      faqs: [
        {
          question: "Hva hjelper mest mot vinterdepresjon?",
          answer: "Regelmessig eksponering for dagslys tidlig på formiddagen, fysisk aktivitet og varme sosiale rutiner.",
        },
      ],
    },
    {
      route: "/quiz/dutch-niksen-burnout-nl",
      title: "Dutch Niksen & Burnout Herstel Check",
      description:
        "Kun jij nog écht nietsdoen? Meet je ontspanningsvaardigheden en de invloed van de Nederlandse prestatiemaatschappij.",
      category: "Dutch Wellbeing",
      duration: "1 min",
      itemsCount: 5,
      framework: "Niksen (Art of Doing Nothing) & Burnout Preventie",
      overview:
        "Niksen—bewust nietsdoen zonder doel—is een krachtige buffer tegen overprikkeling. Deze test meet je weerstand tegen constante productiviteitsdrang.",
      keyPoints: [
        "Inzicht in schuldgevoelens rondom vrije tijd",
        "Eenvoudige oefeningen om niksen weer toe te laten in het dagelijks leven",
      ],
      faqs: [
        {
          question: "Wat is niksen precies?",
          answer: "Gewoon zitten, uit het raam staren of naar muziek luisteren zonder nuttig doel of productieve verwachting.",
        },
      ],
    },
    {
      route: "/quiz/honne-tatemae-jp",
      title: "本音と建前ストレス診断 (Honne vs Tatemae Test)",
      description:
        "周りに合わせすぎて心が疲れていませんか？あなたの感情の我慢度と心のエネルギーを1分でチェック。",
      category: "メンタルヘルス",
      duration: "1分",
      itemsCount: 5,
      framework: "Honne-Tatemae Dualism & Emotional Fatigue",
      overview:
        "社会的な調和を守るための『建前』と、内なる本音のギャップが広がりすぎると、深刻なバーンアウトや孤立感を招きます。今のあなたの心の安全度を測定します。",
      keyPoints: [
        "周囲への気遣い疲れと感情抑制レベルを可視化",
        "誰にも見られないプライベートジャーナルでの本音解放法",
      ],
      faqs: [
        {
          question: "本音を吐き出す場所がないときは？",
          answer: "Nujuのような完全暗号化されたプライベートAI日記に、飾らない生の感情を書き出すことで心を守ることができます。",
        },
      ],
    },
    {
      route: "/quiz/nunchi-hwabyung-kr",
      title: "눈치 피로도 & 화병 자가진단 (Nunchi Stress Check)",
      description:
        "주변 시선과 눈치로 지친 내 마음: 억압된 분노와 번아웃 지수를 1분 만에 진단해보세요.",
      category: "마음건강",
      duration: "1분",
      itemsCount: 5,
      framework: "Hwabyung & Hypervigilant Social Fatigue Model",
      overview:
        "과도한 눈치와 사회적 기대는 감정의 억압(화병)으로 이어지기 쉽습니다. 나의 감정적 스트레스가 위험 수위인지 점검하고 회복의 첫걸음을 떼어보세요.",
      keyPoints: [
        "타인의 시선에 대한 과도한 경계심 측정",
        "감정 억압을 완화하는 안전한 야간 저널링 가이드",
      ],
      faqs: [
        {
          question: "눈치 피로도를 줄이려면?",
          answer: "모든 사람의 기분을 내가 통제할 수 없음을 인정하고, 하루 5분은 온전히 나만의 감정에 집중하는 시간을 가지세요.",
        },
      ],
    },

    {
      route: "/quiz/functional-freeze",
      aliases: ["/quiz/somatic-freeze", "/tes-functional-freeze"],
      title: "Functional Freeze & Polyvagal Somatic State Screener",
      description:
        "Assess your dorsal vagal freeze state, high-functioning shutdown, somatic armoring, and emotional blunting. 100% free and evidence-based.",
      category: "Nervous System & Trauma",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Stephen Porges Polyvagal Theory & Somatic Dissociation Model",
      overview:
        "Functional freeze is an autonomic state where an individual remains outwardly high-performing and responsive to professional duties, while inwardly experiencing severe emotional paralysis, hollow detachment, and motor armoring.",
      keyPoints: [
        "Evaluates 3 core subscales: Dorsal Vagal Shutdown, Somatic Armoring, and Interoceptive Dissociation",
        "Breaks down how high-functioning freeze masks deep nervous system fatigue",
        "Prescribes neurosomatic mobilization protocols and voice journaling practices to restore ventral vagal tone",
      ],
      faqs: [
        {
          question: "How is functional freeze different from ordinary laziness?",
          answer:
            "Laziness is a conscious choice to conserve energy. Functional freeze is a biological neuroception of threat where the dorsal vagal brake locks motor initiation despite a desperate cognitive desire to act.",
        },
      ],
    },
    {
      route: "/quiz/somatic-armoring",
      aliases: ["/quiz/body-armoring", "/tes-body-armoring"],
      title: "Somatic Armoring & Muscular Tension Diagnostic",
      description:
        "Discover where chronic stress and trauma holding patterns lock in your body. 12-item clinical self-check across cervical, thoracic, and pelvic segments.",
      category: "Somatic Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Wilhelm Reich Somatic Armoring & Fascial Trauma Science",
      overview:
        "Muscular armoring is emotional defense frozen into chronic physical posture. Unprocessed grief, suppressed anger, and chronic threat freeze in specific bodily segments, restricting diaphragmatic breath and cellular vitality.",
      keyPoints: [
        "Diagnoses tension patterns across Cervical/Oral, Thoracic/Diaphragmatic, and Pelvic/Psoas segments",
        "Explains the neurobiological link between held breath and autonomic hyperarousal",
        "Actionable Reichian de-armoring and somatic unwinding protocols",
      ],
      faqs: [
        {
          question: "Can massage therapy permanently release somatic armoring?",
          answer:
            "Massage provides temporary relief, but lasting de-armoring requires neurological safety signaling and emotional vocalization so the brain stops ordering muscular rigidity.",
        },
      ],
    },
    {
      route: "/quiz/dpdr",
      aliases: ["/quiz/depersonalization-derealization", "/tes-dpdr"],
      title: "Depersonalization & Derealization (DPDR) Screener",
      description:
        "Measure feelings of out-of-body detachment, dreamlike environmental unreality, and sensory fog. Free clinical self-assessment based on the Cambridge Depersonalization Scale.",
      category: "Perception & Dissociation",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Cambridge Depersonalization Scale (CDS) & Sensory Integration Metric",
      overview:
        "Depersonalization and Derealization (DPDR) represent an emergency biological circuit-breaker where the brain dampens emotional transmission and perceptual vivacity to shield the conscious mind from severe sensory or emotional overwhelm.",
      keyPoints: [
        "Measures Depersonalization (bodily detachment), Derealization (glass wall/fog), and Cognitive Lag",
        "Normalizes DPDR as an overprotective protective buffer, eliminating fear of psychosis or insanity",
        "Step-by-step 5-4-3-2-1 sensory anchoring and tactile somatic grounding protocols",
      ],
      faqs: [
        {
          question: "Am I going crazy or losing my mind during a DPDR episode?",
          answer:
            "No. The very fact that you recognize things feel unreal proves intact reality testing. Psychosis lacks this awareness. DPDR is an anxiety-driven sensory defense, not insanity.",
        },
      ],
    },
    {
      route: "/quiz/filial-guilt",
      aliases: ["/quiz/asian-family-enmeshment", "/tes-filial-guilt"],
      title: "Filial Piety Guilt & Asian Family Enmeshment Screener",
      description:
        "Measure chronic sacrifice debt, difficulty saying 'no' to parents, and Bowenian boundary differentiation. 12-item clinical self-assessment.",
      category: "Family Systems & Boundaries",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Bowen Family Systems Theory & Filial Piety Guilt Metric",
      overview:
        "In collectivist and immigrant families, filial devotion frequently becomes entangled with emotional parentification and unpayable sacrifice debt. Learn how to love your parents without sacrificing your mental autonomy.",
      keyPoints: [
        "Evaluates Chronic Debt Guilt, Boundary Collapse, and Individuation Lock",
        "Identifies emotional parentification where children are forced into marital counselor or savior roles",
        "Provides non-reactive boundary scripts and 24-hour response guidelines for family demands",
      ],
      faqs: [
        {
          question: "Does setting boundaries with parents make me an ungrateful or bad child?",
          answer:
            "No. Boundaries clarify where you end and others begin. Healthy boundaries protect relationships from simmering resentment and preserve genuine affection over obligatory martyrdom.",
        },
      ],
    },
    {
      route: "/quiz/cat-q",
      aliases: ["/quiz/autism-masking", "/tes-cat-q"],
      title: "CAT-Q Autistic & ADHD Social Camouflaging Screener",
      description:
        "Assess social masking, compensation strategies, and assimilation effort in neurodivergent adults. 12-item clinical self-test based on Hull et al.'s CAT-Q.",
      category: "Neurodivergence & Camouflage",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Camouflaging Autistic Traits Questionnaire (CAT-Q, Hull et al.)",
      overview:
        "Autistic camouflaging is the conscious or subconscious suppression of natural neurodivergent traits and explicit imitation of neurotypical behaviors to blend in, avoid social ostracization, and survive neurotypical environments.",
      keyPoints: [
        "Evaluates Compensation (pre-scripting, copying social rules), Masking (repressing stims, forcing eye contact), and Assimilation (hypervigilant social chameleonism)",
        "Identifies the root of adult neurodivergent burnout and autistic exhaustion",
        "Actionable accommodations and self-compassion boundary scripts to unmask safely",
      ],
      faqs: [
        {
          question: "What is the difference between normal social adaptation and autistic masking?",
          answer:
            "While most people adjust their persona at work or parties, autistic camouflaging requires intense cognitive computation—forcing eye contact, monitoring facial muscles, calculating conversation pauses—which drains executive function and triggers severe nervous system collapse.",
        },
      ],
    },
    {
      route: "/quiz/pure-o",
      aliases: ["/quiz/intrusive-thoughts", "/tes-pure-o"],
      title: "Pure O & Unwanted Intrusive Thoughts Screener",
      description:
        "Measure taboo intrusive thoughts, mental checking compulsions, and thought-action fusion. 12-item clinical self-test for Pure Obsessional OCD patterns.",
      category: "OCD & Intrusive Cognition",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Yale-Brown Obsessive Compulsive Scale (Y-BOCS) & Thought-Action Fusion Metric",
      overview:
        "Pure Obsessional OCD ('Pure O') is a form of OCD where compulsive rituals occur invisibly in the mind—such as mental reviewing, reassurance-seeking, thought neutralizing, and compulsive rumination—triggered by ego-dystonic intrusive thoughts.",
      keyPoints: [
        "Measures Taboo/Harm Intrusions, Hidden Mental Compulsions, and Thought-Action Fusion",
        "Educates on the ego-dystonic nature of taboo thoughts (thoughts you fear most are opposite to your core character)",
        "Evidence-based Exposure and Response Prevention (ERP) and Acceptance & Commitment Therapy (ACT) reframes",
      ],
      faqs: [
        {
          question: "Does having a violent, taboo, or disturbing intrusive thought mean I secretly want to act on it?",
          answer:
            "No. In clinical psychology, intrusive thoughts are known as ego-dystonic: your extreme terror and guilt prove they directly contradict your genuine moral values. OCD latches onto whatever you cherish most.",
        },
      ],
    },
    {
      route: "/quiz/repressed-anger",
      aliases: ["/quiz/somatic-rage", "/tes-amarah-terpendam"],
      title: "Repressed Anger & Somatic Rage Screener",
      description:
        "Assess held-in fury, jaw clenching, people-pleaser resentment, and retroflected guilt. 12-item clinical self-assessment based on Wilhelm Reich and Dr. Gabor Maté models.",
      category: "Somatic Psychology & Boundaries",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Wilhelm Reich Somatic Armoring & Gabor Maté Anger Retroflection Model",
      overview:
        "When boundary-protecting anger is punished or shamed in childhood, the nervous system inverts the fight impulse into chronic fascial clenching (bruxism, neck tension, headaches) or depressive exhaustion and people-pleasing resentment.",
      keyPoints: [
        "Evaluates Somatic Rage (jaw clenching, chest heat), Fawn Resentment (compulsive compliance followed by bitterness), and Anger Inversion (turning boundary violations into self-blame)",
        "Differentiates destructive rage from healthy protective anger (the immune system of the psyche)",
        "Somatic motor discharge exercises and non-violent boundary assertion protocols",
      ],
      faqs: [
        {
          question: "Why does swallowing my anger cause physical jaw pain and headaches?",
          answer:
            "When the motor impulse to protest or shout is inhibited, the brain contracts the masseter muscles, cervical spine, and trapezius to suppress vocalization. Over time, this chronic fascial clamping manifests as bruxism, tension migraines, and chronic exhaustion.",
        },
      ],
    },
    {
      route: "/quiz/emotional-flashback",
      aliases: ["/quiz/cptsd-triggers", "/tes-emotional-flashback"],
      title: "Emotional Flashback & C-PTSD Somatic Trigger Screener",
      description:
        "Assess sudden waves of timeless dread, toxic shame attacks, and child survival regression in Complex PTSD. 12-item clinical self-assessment based on Pete Walker's C-PTSD framework.",
      category: "Complex Trauma & C-PTSD",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Pete Walker Complex PTSD Model & Implicit Memory Integration",
      overview:
        "An emotional flashback is a sudden, intense regression into the terrifying feeling states of childhood abandonment, abuse, or neglect—occurring entirely without visual memory pictures. Sufferers experience overwhelming dread, helplessness, and brutal inner critic attacks.",
      keyPoints: [
        "Measures Amygdala Hijack (timeless dread, visceral panic), Toxic Shame & Inner Critic (savage self-contempt), and Truncated Defense (fawn/freeze collapse, urge to disappear)",
        "Normalizes intense emotional storms as implicit memories of childhood overwhelm, not personal defects",
        "Pete Walker's 13-step emergency flashback management and somatic inner-child reparenting protocols",
      ],
      faqs: [
        {
          question: "How can I tell if I am having an emotional flashback versus an anxiety attack?",
          answer:
            "In an anxiety attack, fear is usually focused on future catastrophic events ('What if I fail?'). In an emotional flashback, you feel an overwhelming sense of being small, powerless, fundamentally defective, or humiliated, as if you are a terrified child trapped in a dangerous past environment.",
        },
      ],
    },
    {
      route: "/quiz/maladaptive-daydreaming",
      aliases: ["/quiz/immersive-daydreaming", "/tes-maladaptive-daydreaming"],
      title: "Maladaptive Daydreaming Screener (MDS-16 Scale)",
      description:
        "Assess compulsive fantasy immersion, kinesthetic pacing, music triggers, and real-life vocational impairment. 12-item clinical self-assessment based on Prof. Eli Somer's model.",
      category: "Dissociation & Daydreaming",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Prof. Eli Somer MDS-16 & Default Mode Network (DMN) Model",
      overview:
        "Maladaptive daydreaming is an extensive, compulsive fantasy activity that replaces human interaction and impairs academic, vocational, and interpersonal functioning, often sustained by repetitive motor rituals like pacing and looped music.",
      keyPoints: [
        "Evaluates Kinesthetic Movement & Pacing, Paracosm Depth & Immersion, and Vocational Distress & Impairment",
        "Differentiates healthy immersive creativity from compulsive behavioral dissociation",
        "Sensory embodiment protocols, audio journaling triggers, and Default Mode Network grounding drills",
      ],
      faqs: [
        {
          question: "Why do I need to walk or pace while daydreaming?",
          answer:
            "Repetitive motor movements like pacing, rocking, or hand gestures engage the cerebellum and motor cortex, allowing the Default Mode Network to sustain vivid internal simulations without cognitive interference from the external environment.",
        },
        {
          question: "Can voice journaling help with maladaptive daydreaming?",
          answer:
            "Yes. Speaking out loud into an audio journal like Nuju activates Broca's area and sensory-motor speech networks, which immediately pulls the mind out of silent daydreaming loops and re-anchors attention to real-world sensory coordinates.",
        },
      ],
    },
    {
      route: "/quiz/trauma-bond",
      aliases: ["/quiz/trauma-bonding", "/tes-trauma-bonding"],
      title: "Trauma Bonding & Intermittent Reinforcement Screener",
      description:
        "Assess narcissistic abuse hooks, biochemical addiction, cognitive dissonance, and somatic withdrawal panic. 12-item clinical self-assessment based on Dr. Patrick Carnes' Betrayal Bond model.",
      category: "Trauma & Relationships",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Patrick Carnes Betrayal Bond & B.F. Skinner Intermittent Reinforcement Model",
      overview:
        "A trauma bond is a powerful neurochemical attachment forged through unpredictable cycles of abuse, betrayal, devaluation, and intermittent reconciliations. Sufferers experience extreme somatic withdrawal, terror of abandonment, and identity erosion.",
      keyPoints: [
        "Measures Intermittent Addiction & Chemical Craving, Cognitive Dissonance & Partner Defense, and Identity Erosion & Learned Helplessness",
        "Demystifies why leaving a toxic partner feels like acute narcotic drug withdrawal",
        "Zero-contact containment, somatic nervous system stabilization, and unedited reality-logging protocols",
      ],
      faqs: [
        {
          question: "Why does it feel impossible to leave a partner who hurts me?",
          answer:
            "Intermittent reinforcement—where kindness and abuse are distributed unpredictably—hijacks the brain's dopamine reward circuitry. The sudden relief of reconciliation after cold detachment triggers massive neurochemical highs that mimic physical substance addiction.",
        },
        {
          question: "What are the physical symptoms of breaking a trauma bond?",
          answer:
            "During the first 30 days of No Contact, individuals often experience biological withdrawal: insomnia, shaking, nausea, panic spikes, crying jags, and compulsive urges to check communication channels.",
        },
      ],
    },

    {
      route: "/quiz/echoism",
      aliases: ["/quiz/fear-of-taking-up-space", "/tes-echoism"],
      title: "Echoism & Fear of Taking Up Space Screener (Dr. Craig Malkin Harvard Model)",
      description:
        "Do you dread taking up space, hate receiving compliments, and feel guilty having personal needs? Measure echoistic self-erasure and narcissistic partner attraction.",
      category: "Narcissism & Boundary Work",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Craig Malkin Harvard Medical School Echoism Spectrum Model",
      overview:
        "Echoism describes the polar psychological opposite of narcissism. Named after the mythical nymph Echo who lost her voice, echoists suffer from an intense dread of seeming narcissistic or demanding, surviving by erasing their own desires, avoiding attention, and reflecting others.",
      keyPoints: [
        "Evaluates Self-Erasure & Needs Guilt, Praise Aversion & Spotlight Dread, and Narcissistic Partner Attraction",
        "Explores childhood origins: growing up with narcissistic, volatile, or emotionally fragile parents",
        "Practical somatic boundary assertion protocols and private voice journaling exercises",
      ],
      faqs: [
        {
          question: "How does Echoism differ from healthy humility?",
          answer:
            "Healthy humility is comfortable with quiet accomplishment without arrogance. Echoism is a fear-driven compulsion to remain invisible, believing that having basic needs makes you a toxic burden.",
        },
        {
          question: "Why do echoists attract narcissists?",
          answer:
            "Narcissists demand all the admiration and space, while echoists crave total invisibility. The echoist feels safe from criticism by surrendering their needs, while the narcissist thrives having a compliant partner.",
        },
      ],
    },

    {
      route: "/quiz/window-of-tolerance",
      aliases: ["/quiz/nervous-system-capacity", "/tes-window-of-tolerance"],
      title: "Window of Tolerance & Nervous System Capacity Screener (Dr. Dan Siegel Polyvagal Model)",
      description:
        "Assess whether your nervous system operates in a resilient wide zone or gets easily thrown into fight-or-flight panic (hyperarousal) or dorsal freeze collapse (hypoarousal).",
      category: "Somatic & Nervous System",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Dan Siegel Autonomic Arousal Model & Dr. Stephen Porges Polyvagal Theory",
      overview:
        "The Window of Tolerance describes the optimal zone of autonomic nervous system arousal where you can process emotions, navigate daily stressors, and think clearly. When trauma or chronic burnout constricts this window, minor triggers catapult the body into hyperaroused panic or drop it into hypoaroused numbness and freeze.",
      keyPoints: [
        "Measures Sympathetic Hyperarousal (Fight/Flight/Panic), Dorsal Hypoarousal (Freeze/Shutdown/Numbness), and Micro-Window Fragility",
        "Explains the neurobiology of the myelinated vagal brake, heart rate variability, and insular awareness",
        "Step-by-step somatic pendulation, low-frequency vocal toning, and physiological sigh de-escalation drills",
      ],
      faqs: [
        {
          question: "What does it feel like to be outside your Window of Tolerance?",
          answer:
            "Above the window (hyperarousal), you feel wired, angry, racing thoughts, and sensory overload. Below the window (hypoarousal), you experience mental fog, emotional numbness, physical exhaustion, and couch-lock paralysis.",
        },
        {
          question: "Can you widen your Window of Tolerance permanently?",
          answer:
            "Yes. Consistent somatic practices (such as vocal vagus stimulation, physiological sighs, and daily unpressured voice journaling in Nuju) rewire neuroception and widen autonomic capacity over time.",
        },
      ],
    },

    {
      route: "/quiz/rocd",
      aliases: ["/quiz/relationship-ocd", "/tes-rocd"],
      title: "Relationship OCD (ROCD) Screener: Partner Flaws & Rightness Obsession (Guy Doron Model)",
      description:
        "Assess whether obsessive relationship doubts, compulsive flaw cataloging, and perpetual reassurance seeking are signs of Relationship OCD (ROCD) using clinical criteria.",
      category: "Relationship Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Prof. Guy Doron Relationship-Centered OCD Model (ROCI & PROCSI)",
      overview:
        "Relationship Obsessive-Compulsive Disorder (ROCD) involves distressing, intrusive doubts regarding one's feelings for a partner, the partner's perceived flaws (physical appearance, morality, intelligence), or whether the relationship is 'the right one'. Sufferers engage in exhausting mental compulsions, checking feelings, comparing partners to exes or strangers, and seeking urgent reassurance.",
      keyPoints: [
        "Evaluates 3 core subscales: Feelings & Rightness Doubts, Partner Flaw Scrutiny, and Compulsive Checking & Reassurance",
        "Distinguishes clinical ROCD compulsions from genuine, healthy relationship incompatibility",
        "Evidence-based ERP (Exposure and Response Prevention) reframes and somatic de-escalation tools",
      ],
      faqs: [
        {
          question: "How do I know if it's ROCD or genuine incompatibility?",
          answer:
            "Genuine incompatibility usually brings sadness, resignation, or values misalignment without repetitive obsessive anxiety loops. ROCD feels like an urgent mental emergency with compulsive checking, panic spikes, and temporary relief after reassurance.",
        },
        {
          question: "Can ROCD ruin a healthy, loving relationship?",
          answer:
            "Yes, if left unchecked, the compulsive scrutiny and emotional detachment can exhaust both partners. However, with ERP therapy, cognitive reframes, and safe somatic venting in Nuju, couples successfully overcome ROCD.",
        },
      ],
    },

    {
      route: "/quiz/stonewalling",
      aliases: ["/quiz/silent-treatment", "/tes-stonewalling"],
      title: "Gottman Stonewalling & Silent Treatment Trauma Screener (John Gottman Model)",
      description:
        "Identify whether emotional shutdown during conflict is autonomic nervous system flooding (>100 bpm) or manipulative silent treatment, and measure its relational impact.",
      category: "Relationship Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. John Gottman Four Horsemen Relational Model & Autonomic Flooding Theory",
      overview:
        "Stonewalling is one of the Gottman Four Horsemen of relationship breakdown, occurring when a partner completely withdraws, becomes unresponsive, and refuses to engage. In 85% of cases, stonewalling is driven by Diffuse Physiological Arousal (DPA) where heart rate exceeds 100 bpm and cognitive processing shuts down. Conversely, punitive silent treatment is weaponized ostracism designed to punish or control.",
      keyPoints: [
        "Measures Autonomic Flooding (DPA tachycardia, fight-or-flight saturation), Shutdown & Emotional Withdrawal, and Punitive Cold Silence",
        "Differentiates protective nervous system collapse from abusive silent treatment and narcissistic manipulation",
        "Actionable Gottman 20-minute physiological timeout protocol and low-arousal repair attempts",
      ],
      faqs: [
        {
          question: "What is the difference between stonewalling and taking a healthy space break?",
          answer:
            "A healthy break states: 'I feel overwhelmed right now, let's take 20 minutes to calm down and return.' Stonewalling shuts down without warning, walks out, avoids eye contact, or gives the silent treatment for days without repair.",
        },
        {
          question: "Why does stonewalling feel so painful to the partner?",
          answer:
            "Being stonewalled activates the dorsal anterior cingulate cortex—the same brain region that registers physical pain. It triggers primal abandonment panic and dysregulates the attachment system.",
        },
      ],
    },

    {
      route: "/quiz/autistic-burnout",
      aliases: ["/quiz/neurodivergent-burnout", "/tes-autistic-burnout"],
      title: "Autistic Burnout & Masking Exhaustion Screener (AASPIRE ABM Model)",
      description:
        "Assess whether profound chronic fatigue, loss of speech/executive function, and heightened sensory overload are signs of autistic burnout using clinical AASPIRE research.",
      category: "Neurodivergence & Sensory",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Dora Raymaker & Christina Nicolaidis AASPIRE Autistic Burnout Measure",
      overview:
        "Autistic Burnout is a debilitating condition resulting from chronic life stress and a mismatch of expectations and abilities without adequate supports. Characterized by pervasive physical and cognitive exhaustion, loss of functional skills (including situational mutism and executive dysfunction), and reduced sensory tolerance.",
      keyPoints: [
        "Evaluates 3 primary dimensions: Pervasive Chronic Exhaustion, Skill Regression & Mutism, and Sensory Intolerance",
        "Differentiates neurodivergent burnout from clinical depression (loss of capacity vs loss of interest)",
        "Evidence-based radical rest, unmasking permissions, and zero-demand sensory recovery protocols",
      ],
      faqs: [
        {
          question: "How does autistic burnout differ from occupational burnout or depression?",
          answer:
            "Occupational burnout resolves with workplace changes, and depression often responds to behavioral activation and social connection. Autistic burnout involves neurological skill regression (loss of speech, hygiene, cooking) and worsens dramatically when forced to socialize.",
        },
        {
          question: "Can lost skills be recovered after autistic burnout?",
          answer:
            "Yes, but recovery requires prolonged radical rest, sensory deprivation, dropping non-essential masking demands, and using assistive communication tools like private voice journaling in Nuju.",
        },
      ],
    },

    {
      route: "/quiz/anxious-avoidant-trap",
      aliases: ["/quiz/anxious-avoidant-dance", "/tes-anxious-avoidant"],
      title: "Anxious-Avoidant Trap & Pursue-Withdraw Cycle Screener (EFT Model)",
      description:
        "Identify whether relational whiplash, panic-driven protest behaviors, and cold emotional withdrawal are signs of the anxious-avoidant attachment trap.",
      category: "Relationship Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Sue Johnson (Emotionally Focused Therapy - EFT) & Dr. Amir Levine Attached Model",
      overview:
        "The Anxious-Avoidant Trap is an escalating pursue-withdraw relational loop where one partner craves closeness and pursues with protest behaviors (texts, panic, anger), while the other feels suffocated and withdraws into stonewalling. This polarization causes severe nervous system dysregulation and trauma bonding.",
      keyPoints: [
        "Measures 3 subscales: Anxious Pursuit & Protest Behaviors, Avoidant Distancing & Deactivation, and Push-Pull Trauma Whiplash",
        "Explains the neurochemistry of intermittent reinforcement and post-conflict dopamine spikes",
        "Actionable EFT cycle-de-escalation scripts, timed pauses, and somatic vocal discharge exercises",
      ],
      faqs: [
        {
          question: "Can an anxious-avoidant relationship become secure and healthy?",
          answer:
            "Yes. When both partners identify the pursue-withdraw dynamic as the shared enemy, agree on structured timeouts with explicit return promises, and practice self-soothing, the relationship can evolve into earned security.",
        },
        {
          question: "Why do anxious and avoidant individuals magnetically attract each other?",
          answer:
            "The avoidant partner's initial independence feels like safe stability to the anxious person, while the anxious partner's warmth feels vibrant to the avoidant person. Paradoxically, the familiar childhood trauma scripts of both partners confirm each other's deepest fears.",
        },
      ],
    },

    {
      route: "/quiz/moral-injury",
      aliases: ["/quiz/institutional-betrayal", "/tes-moral-injury"],
      title: "Moral Injury & Institutional Betrayal Screener (Dr. Brett Litz Model)",
      description:
        "Assess whether institutional betrayal, transgression guilt, and moral distress from compromised values are causing profound psychological and existential agony.",
      category: "Trauma & Moral Injury",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Brett Litz & Dr. Jonathan Shay Moral Injury and Ethical Betrayal Architecture",
      overview:
        "Moral injury is the profound psychological, biological, and spiritual distress that results from witnessing, participating in, or failing to prevent actions that transgress deeply held moral values, especially when perpetrated by trusted authorities or systems. Unlike fear-based PTSD, moral injury centers on guilt, shame, and righteous indignation.",
      keyPoints: [
        "Measures 3 distinct subscales: Institutional Betrayal & Broken Leadership, Transgression Guilt & Moral Compromise, and Existential Alienation",
        "Clinically distinguishes moral injury from occupational burnout and terror-based PTSD",
        "Actionable moral repair protocols, moral decontamination, and confidential audio sanctuary processing",
      ],
      faqs: [
        {
          question: "Can moral injury occur outside of military combat?",
          answer:
            "Absolutely. Moral injury is extraordinarily common in healthcare (profit-driven staffing cuts), corporate life (fraud, whistleblower retaliation), public service, and toxic religious or familial systems.",
        },
        {
          question: "How does moral injury differ from PTSD?",
          answer:
            "PTSD is driven by mortal fear and autonomic hypervigilance (amygdala), whereas moral injury is driven by moral grief, shame, disgust, and the loss of trust in human integrity (anterior insula and cingulate cortex).",
        },
      ],
    },

    {
      route: "/quiz/weaponized-incompetence",
      aliases: ["/quiz/mental-load", "/tes-weaponized-incompetence"],
      title: "Weaponized Incompetence & Mental Load Screener (Fair Play Model)",
      description:
        "Assess whether strategic helplessness, feigned ineptitude, and domestic cognitive overload are draining your energy and eroding relational intimacy.",
      category: "Relationship Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Eve Rodsky (Fair Play) & Dr. Arlie Hochschild Domestic Labor Architecture",
      overview:
        "Weaponized Incompetence (strategic helplessness) is a covert dynamic where one partner intentionally botches domestic tasks, asks endless trivial questions, or feigns cluelessness until their partner takes over. This dumps the invisible cognitive 'mental load' onto one person, creating a toxic parent-child dynamic that kills sexual intimacy.",
      keyPoints: [
        "Measures 3 critical dimensions: Strategic Helplessness & Botched Chores, Mental Load Disparity & Household Management, and Parent-Child Dynamic & Sexual Erosion",
        "Clarifies the difference between physical task execution and invisible cognitive planning (CPE)",
        "Evidence-based boundary frameworks, zero-rescue rules, and radical labor rebalancing protocols",
      ],
      faqs: [
        {
          question: "Why does weaponized incompetence destroy romantic desire?",
          answer:
            "Eroticism and sexual attraction require respect between two independent adults. When one partner is forced to manage, monitor, and clean up after the other like an adolescent, desire is extinguished by chronic resentment.",
        },
        {
          question: "How can couples break the cycle of strategic helplessness?",
          answer:
            "By implementing Full Ownership (Conception, Planning, and Execution) under the Fair Play model, eliminating half-tasks, and establishing a strict zero-rescue boundary where partners experience the natural consequences of neglected duties.",
        },
      ],
    },

    {
      route: "/quiz/dating-fatigue",
      aliases: ["/quiz/dating-app-burnout", "/tes-dating-fatigue"],
      title: "Dating Fatigue & Paradox of Choice Screener (Dr. Barry Schwartz Model)",
      description:
        "Assess whether dating app burnout, ghosting weariness, and the illusion of infinite choice are causing romantic numbness and analysis paralysis.",
      category: "Relationship Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Barry Schwartz (Paradox of Choice) & Dr. Eli Finkel Modern Dating Architecture",
      overview:
        "Dating Fatigue is the psychological and neurochemical exhaustion resulting from digital dating app commodification, variable-ratio dopamine loops, and the illusion of endless choice. Individuals experience swipe apathy, checklist perfectionism, and romantic numbing as defense mechanisms against chronic rejection and superficiality.",
      keyPoints: [
        "Measures 3 distinct subscales: Swipe Apathy & Algorithmic Burnout, Paradox of Choice & Checklist Paralysis, and Rejection Desensitization",
        "Differentiates natural singlehood from dopamine receptor burnout and relational cynicism",
        "Actionable 30-day app detox protocols, slow dating boundaries, and private audio decontamination",
      ],
      faqs: [
        {
          question: "Why do dating apps make people feel so lonely and depleted?",
          answer:
            "Dating apps operate on variable-ratio reward schedules that flood the brain with dopamine anticipation while reducing real human connection to two-dimensional resume metrics, triggering profound commodification and emotional anhedonia.",
        },
        {
          question: "Can romantic curiosity and excitement be recovered after dating app burnout?",
          answer:
            "Yes. A 30-day digital detox, shifting to in-person serendipity, and establishing slow dating rules (maximum 10 profiles a day) allows dopamine pathways and emotional vulnerability to heal.",
        },
      ],
    },

    {
      route: "/quiz/toxic-positivity",
      aliases: ["/quiz/emotional-invalidation", "/tes-toxic-positivity"],
      title: "Toxic Positivity & Emotional Invalidation Screener (Dr. Susan David Model)",
      description:
        "Assess whether compulsive optimism, 'Good Vibes Only' dogmatism, and spiritual bypassing are silencing your authentic feelings and causing somatic distress.",
      category: "Mental Health & Culture",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Susan David (Emotional Agility) & Whitney Goodman Emotional Validation Architecture",
      overview:
        "Toxic Positivity is the compulsive imposition of positive thinking as the only acceptable response to pain, grief, or injustice. When painful emotions are dismissed with platitudes like 'Everything happens for a reason,' individuals internalize shame, experience somatic symptoms (bruxism, gut inflammation), and fall into deep emotional isolation.",
      keyPoints: [
        "Measures 3 critical dimensions: Suppression Shaming & Forced Smiles, Spiritual Bypassing & Clichés, and Emotional Isolation & Tension",
        "Explains the biological danger of suppressing negative affect (the rebound effect and autonomic arousal)",
        "Evidence-based emotional agility frameworks, authentic emotional permission, and zero-censorship voice journaling",
      ],
      faqs: [
        {
          question: "What is the difference between healthy optimism and toxic positivity?",
          answer:
            "Healthy optimism acknowledges reality, validates grief and anger, and looks for realistic hope. Toxic positivity denies, shames, and suppresses painful feelings, demanding forced happiness regardless of circumstances.",
        },
        {
          question: "How does spiritual bypassing harm mental health?",
          answer:
            "Spiritual bypassing uses concepts like karma, manifestation, and detachment to avoid confronting real trauma and boundaries. It blames victims for their own suffering by claiming they attracted tragedy through 'negative energy.'",
        },
      ],
    },

    {
      route: "/quiz/comparison-trap",
      aliases: ["/quiz/social-media-envy", "/tes-comparison-trap"],
      title: "Comparison Trap & Social Media Envy Screener (Festinger & Ethan Kross Model)",
      description:
        "Assess whether upward social comparison on Instagram and LinkedIn is triggering chronic feelings of inadequacy, passive envy, and digital identity erosion.",
      category: "Social Psychology & Culture",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Leon Festinger (Social Comparison Theory) & Dr. Ethan Kross Social Comparison Architecture",
      overview:
        "The Comparison Trap occurs when individuals compulsively evaluate their messy, unvarnished reality against curated highlight reels of peers. Under the algorithmic magnification of social media, upward comparison activates the dorsal anterior cingulate cortex (dACC), converting benign inspiration into toxic envy, imposter anxiety, and chronic feelings of lagging behind.",
      keyPoints: [
        "Evaluates 3 core subscales: Upward Comparison & Chronic Lag, Foster Envy & Resentment, and Algorithmic Identity Erosion",
        "Breaks down the neurochemistry of digital envy and the dorsal anterior cingulate cortex pain pathway",
        "Practical 4-step digital detox protocol, feed curation hygiene, and zero-knowledge encrypted audio journaling",
      ],
      faqs: [
        {
          question: "Why does social media make me feel so behind in life?",
          answer:
            "Human brains evolved in small tribes of 50-150 people where comparison helped maintain cooperation. Algorithms force you to compare against the top 2% highlights of billions of global outliers, triggering artificial social rejection signals.",
        },
        {
          question: "What is the difference between benign envy and malicious envy?",
          answer:
            "Benign envy focuses on learning from someone's path and sparks motivation. Malicious envy focuses on the person's right to have success, provoking bitterness, secret schadenfreude, and depressive paralysis.",
        },
      ],
    },

    {
      route: "/quiz/spiritual-narcissism",
      aliases: ["/quiz/spiritual-superiority", "/tes-spiritual-narcissism"],
      title: "Spiritual Narcissism & Superiority Screener (Dr. Craig Malkin & Kaufman Model)",
      description:
        "Evaluate whether mindfulness, esoteric doctrines, or 'high vibration' lifestyles have been co-opted by the ego to achieve moral elitism and weaponized gaslighting.",
      category: "Spiritual Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Craig Malkin & Scott Barry Kaufman Spiritual Superiority Architecture",
      overview:
        "Spiritual Narcissism describes the hijacking of spiritual or wellness practices by the ego to secure supreme self-importance and moral superiority. Rather than dissolving the ego in humility, spiritual narcissists use concepts like karma, vibration, and detachment to judge 'lower-frequency' peers, escape interpersonal accountability, and evade vulnerable human relationships.",
      keyPoints: [
        "Measures 3 dimensions: Holier-Than-Thou Elitism & High-Vibration Arrogance, Enlightened Gaslighting & Karma Invalidation, and Performance Asceticism & Guru Persona",
        "Examines dopamine reward loops in the ventral striatum fueled by spiritual self-righteousness",
        "Concrete shadow integration practices, de-bypassing communication protocols, and anonymous emotional expression",
      ],
      faqs: [
        {
          question: "What is spiritual narcissism?",
          answer:
            "It is the tendency to use spiritual concepts, meditation, and esoteric beliefs to inflate self-esteem, feel more 'evolved' than others, and avoid accountability for ordinary human flaws.",
        },
        {
          question: "How do spiritual narcissists gaslight people?",
          answer:
            "They use doctrines like the law of attraction ('you attracted this pain'), cosmic karma, or forced forgiveness to blame victims of abuse and silence legitimate anger.",
        },
      ],
    },

    {
      route: "/quiz/hypervigilance",
      aliases: ["/quiz/threat-scanning", "/tes-hipervigilansi"],
      title: "Hypervigilance & Chronic Threat Scanning Screener (Polyvagal & Somatic Model)",
      description:
        "Is your nervous system locked in fight-or-flight even when safe? Free 12-item clinical screener assessing acoustic hyper-attunement, somatic bracing, and neuroception threat bias.",
      category: "Trauma & Somatics",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Stephen Porges (Polyvagal Neuroception) & Dr. Peter Levine (Somatic Experiencing)",
      overview:
        "Hypervigilance is a trauma-induced state of chronic autonomic arousal where neuroception continually misreads neutral sensory stimuli as imminent danger. This screener measures environmental threat scanning, interpersonal micro-attunement, and autonomic somatic exhaustion.",
      keyPoints: [
        "Measures 3 clinical subscales: Environmental Threat Scanning, Interpersonal Micro-Attunement, and Autonomic Exhaustion & Somatic Bracing",
        "Evaluates the stapedius acoustic reflex, seating posture safety biases, and jumpy startle responses",
        "Provides Dr. Peter Levine somatic orienting drills, 4-7-8 vagal brake breathing, and zero-knowledge audio journaling decompression",
      ],
      faqs: [
        {
          question: "What is hypervigilance?",
          answer:
            "Hypervigilance is an autonomic state of perpetual alertness and sensory scanning caused by trauma, where the brain and body remain primed for threat even in safe environments.",
        },
        {
          question: "How do you calm a hypervigilant nervous system?",
          answer:
            "Somatic orienting (slowly rotating the neck to visually register physical exits and safety), prolonged exhalations to stimulate the vagus nerve, and verbalizing sensory tension in a secure private journal help reset neuroception.",
        },
      ],
    },

    {
      route: "/quiz/childhood-emotional-neglect",
      aliases: ["/quiz/cen-screener", "/tes-emotional-neglect"],
      title: "Childhood Emotional Neglect (CEN) Screener (Dr. Jonice Webb Model)",
      description:
        "Do you feel emotionally empty, numb, or defective despite a 'good' childhood? Free 12-item clinical screener measuring emotional invisibility, alexithymia, and fatal-flaw shame.",
      category: "Developmental Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Jonice Webb (Running on Empty CEN Model) & Dr. Allan Schore (Attachment Neurobiology)",
      overview:
        "Childhood Emotional Neglect (CEN) is the invisible trauma of omission—a parent's failure to notice, mirror, and validate their child's emotional world. This clinical screener measures emotional invisibility, alexithymic disconnection, and core defective-self shame.",
      keyPoints: [
        "Measures 3 dimensions: Emotional Invisibility in Family of Origin, Alexithymic Disconnection & Numbness, and Fatal-Flaw Syndrome & Defective Self-Shame",
        "Explains the neurobiology of right-hemisphere emotional mirroring deficits",
        "Includes concrete emotional reparenting protocols, somatic sensation naming, and private voice journaling",
      ],
      faqs: [
        {
          question: "What is Childhood Emotional Neglect (CEN)?",
          answer:
            "CEN is an act of omission where parents fail to emotionally respond to, validate, or comfort their child, leaving the adult feeling chronically empty, numb, and hyper-independent.",
        },
        {
          question: "Why do I feel empty if my parents never abused me?",
          answer:
            "Because emotional neglect is invisible. You cannot remember what did not happen. The lack of emotional mirroring creates a void that adults often mistake for a personal character flaw.",
        },
      ],
    },

    {
      route: "/quiz/existential-depression",
      aliases: ["/quiz/dabrowski-overexcitability", "/tes-depresi-eksistensial"],
      title: "Existential Depression & Dabrowski Over-excitability Screener (Positive Disintegration Model)",
      description:
        "Do societal norms feel arbitrary, hollow, or absurd? Free 12-item clinical screener measuring cosmic loneliness, moral intensity, and positive disintegration crisis based on Kazimierz Dąbrowski and Dr. James T. Webb.",
      category: "Existential Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Kazimierz Dąbrowski (Theory of Positive Disintegration) & Dr. James T. Webb (Existential Depression in Gifted Adults)",
      overview:
        "Existential Depression occurs when deep cognitive capacity and acute emotional overexcitability collide with the arbitrary, unexamined scripts of conventional society. This screener measures cosmic alienation, intense overexcitabilities, and the positive disintegration of the conformist self.",
      keyPoints: [
        "Measures 3 clinical subscales: Existential Alienation & Cosmic Dread, Neuro-Emotional Over-Excitability & Moral Intensity, and Positive Disintegration & Autonomous Values Crisis",
        "Assesses hypocrisy intolerance, cosmic loneliness, and the breakdown of superficial personas",
        "Includes radical somatic grounding drills, sovereign values definition, and private voice journaling",
      ],
      faqs: [
        {
          question: "What is existential depression?",
          answer:
            "Existential depression is a profound crisis of meaning, cosmic loneliness, and moral anguish experienced by deep thinkers and gifted individuals when confronting mortality, absurdity, and societal hypocrisy.",
        },
        {
          question: "What is Positive Disintegration according to Dąbrowski?",
          answer:
            "It is the necessary breakdown of a conformist, socially conditioned personality (Level I) to clear the foundation for an authentic, self-chosen hierarchy of values (Level IV/V).",
        },
      ],
    },

    {
      route: "/quiz/ambiguous-loss",
      aliases: ["/quiz/frozen-grief", "/tes-ambiguous-loss"],
      title: "Ambiguous Loss & Frozen Grief Screener (Dr. Pauline Boss Model)",
      description:
        "Grieving someone physically present but emotionally unreachable, or trapped in limbo after ghosting or estrangement? Free 12-item clinical screener based on Dr. Pauline Boss's Ambiguous Loss architecture.",
      category: "Grief & Attachment",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Pauline Boss (Ambiguous Loss Model & Disenfranchised Grief Architecture)",
      overview:
        "Ambiguous Loss is the most agonizing form of bereavement because the lack of an official funeral, clean goodbye, or definitive ending freezes the human mourning cycle. This screener measures psychological absence/presence paradoxes, frozen grief paralysis, and boundary ambiguity fatigue.",
      keyPoints: [
        "Measures 3 clinical dimensions: Psychological Absence & Physical Presence Paradox, Frozen Grief & Closure Paralysis, and Boundary Ambiguity & Relational Fatigue",
        "Evaluates role confusion, chronic hope-grief pendulum swings, and unvalidated disenfranchised mourning",
        "Provides dialectical 'both/and' acceptance protocols, private symbolic closure rituals, and encrypted voice mourning",
      ],
      faqs: [
        {
          question: "What is ambiguous loss?",
          answer:
            "Ambiguous loss is an unresolved loss without verifiable closure—either a person is physically absent but psychologically present (ghosting, missing persons), or physically present but psychologically absent (dementia, addiction, emotional estrangement).",
        },
        {
          question: "How do you heal from ambiguous loss without closure?",
          answer:
            "By abandoning the search for binary certainty and adopting dialectical 'Both/And' thinking ('They are gone from my daily life, AND they remain part of my story'), creating private rituals, and releasing the need for an explanation.",
        },
      ],
    },

    {
      route: "/quiz/chronic-resentment",
      aliases: ["/quiz/grudge-holding", "/tes-resentment"],
      title: "Chronic Resentment & Grudge Holding Screener (Stanford Forgiveness Project Model)",
      description:
        "Do old betrayals replay as imaginary arguments years later? Free 12-item clinical screener measuring grievance rumination, somatic bitterness, and defensive hostility based on Dr. Fred Luskin and Dr. Robert Enright.",
      category: "Emotional Regulation & Neuroscience",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Fred Luskin (Stanford Forgiveness Projects) & Dr. Robert Enright (International Forgiveness Institute)",
      overview:
        "Chronic Resentment is the somatic and psychological toll of nursing unclosed grievances. When the brain re-litigates old betrayals, sympathetic arousal stays elevated, flooding the vascular and immune systems with emergency cortisol. This screener benchmarks injustice rumination, somatic bitterness, and defense hardening.",
      keyPoints: [
        "Measures 3 clinical dimensions: Injustice Rumination & Replay Loops, Somatic Bitterness & Physiological Poisoning, and Hostility & Defensive Hardening",
        "Assesses imaginary arguments, physical tension upon remembering betrayers, and cynicism",
        "Includes grievance decoupling drills, tenant eviction protocols, and zero-knowledge voice catharsis",
      ],
      faqs: [
        {
          question: "What is chronic resentment in clinical psychology?",
          answer:
            "Chronic resentment is persistent emotional bitterness and cognitive rumination triggered by perceived mistreatment or betrayal, keeping the autonomic nervous system in prolonged stress.",
        },
        {
          question: "Does forgiving mean reconciling with the person who hurt me?",
          answer:
            "No. Forgiveness is an internal decoupling process that removes venom from your vascular and neurological systems. Reconciliation is a separate interpersonal decision requiring mutual trust and safety.",
        },
      ],
    },

    {
      route: "/quiz/pathological-altruism",
      aliases: ["/quiz/savior-complex", "/tes-altruisme-patologis"],
      title: "Pathological Altruism & Savior Complex Screener (Dr. Barbara Oakley Model)",
      description:
        "Does saying 'no' trigger agonizing guilt, or do you compulsively rescue wounded partners at the expense of your own life? Free 12-item clinical screener based on Dr. Barbara Oakley and Dr. Rachel Naomi Remen.",
      category: "Attachment & Boundary Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Barbara Oakley (Pathological Altruism) & Dr. Rachel Naomi Remen (Helping vs. Serving Architecture)",
      overview:
        "Pathological Altruism occurs when the drive to help or fix others results in net harm to the recipient, the helper, or innocent bystanders. This screener measures destructive rescuing compulsions, enabler boundary erosion, and martyrdom depletion.",
      keyPoints: [
        "Measures 3 clinical dimensions: Destructive Rescuing Compulsion, Enabler Boundary Erosion, and Martyrdom & Depletion Burnout",
        "Evaluates guilt intolerance when setting limits, shielding others from natural consequences, and caregiver exhaustion",
        "Provides guilt-tolerance protocols, Karpman Drama Triangle decoupling, and sovereign voice boundary check-ins",
      ],
      faqs: [
        {
          question: "What is pathological altruism?",
          answer:
            "Pathological altruism is helping behavior with good intentions that ultimately produces harm—often by enabling addiction, preventing natural accountability, or destroying the helper's financial and emotional stability.",
        },
        {
          question: "How does the savior complex harm relationships?",
          answer:
            "By infantilizing the partner, assuming moral superiority, and creating a toxic cycle where the rescuer eventually burns out and turns into a resentful persecutor.",
        },
      ],
    },

    {
      route: "/quiz/moral-scrupulosity",
      aliases: ["/quiz/am-i-a-bad-person", "/tes-skrupulositas"],
      title: "Moral Scrupulosity & Pure OCD Screener (Dr. Ian Osborn & Dr. Jonathan Grayson Model)",
      description:
        "Do you obsess over whether you are secretly a bad, selfish, or corrupt person? Free 12-item clinical screener measuring moral purity hypervigilance, guilt magnification, and ethical decision paralysis.",
      category: "Clinical Psychology & OCD",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Ian Osborn (Moral Scrupulosity) & Dr. Jonathan Grayson (ERP & Pure-O OCD Architecture)",
      overview:
        "Moral Scrupulosity is an obsessive-compulsive condition where the brain's error-detection circuitry fires relentless false alarms of catastrophic moral failure. This screener measures Thought-Action Fusion, compulsive confession urges, and ethical perfectionism.",
      keyPoints: [
        "Measures 3 clinical dimensions: Moral Purity Hypervigilance, Guilt Magnification & Confession Urges, and Ethical Perfectionism & Paralysis",
        "Assesses intrusive thought catastrophic labeling, constant need for reassurance, and decision paralysis",
        "Provides Exposure and Response Prevention (ERP) protocols, uncertainty tolerance training, and private audio catharsis",
      ],
      faqs: [
        {
          question: "What is moral scrupulosity OCD?",
          answer:
            "Moral scrupulosity is a subtype of OCD characterized by persistent, agonizing doubts about one's moral goodness, hypervigilance over intrusive thoughts, and compulsive apologizing or confession.",
        },
        {
          question: "Does having an intrusive thought mean I am a bad person?",
          answer:
            "No. Intrusive thoughts are involuntary neurological noise generated by the brain's default mode network. They reflect what you value, not what you desire or who you are.",
        },
      ],
    },

    {
      route: "/quiz/abandonment-schema",
      aliases: ["/quiz/fear-of-abandonment", "/tes-skema-pengabaian"],
      title: "Abandonment Schema & Relational Panic Screener (Dr. Jeffrey Young Schema Therapy Model)",
      description:
        "Does a delayed text or emotional distance ignite primal panic in your chest? Free 12-item clinical screener assessing anticipatory desertion terror, protest clinging, and relational fragility convictions.",
      category: "Attachment & Schema Therapy",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Jeffrey Young (Schema Therapy Early Maladaptive Schemas: Abandonment / Instability)",
      overview:
        "The Abandonment Schema is an early emotional wound where the nervous system interprets normal relational space as an imminent survival threat. This screener benchmarks anticipatory terror, protest behaviors, and the core conviction of relationship fragility.",
      keyPoints: [
        "Measures 3 clinical dimensions: Anticipatory Desertion Terror, Clinging, Testing & Protest, and Relational Fragility Conviction",
        "Assesses panic over delayed replies, loyalty testing, pre-emptive breakups, and emotional vacuum states",
        "Includes limited reparenting drills, distress tolerance protocols, and private voice lifeline journaling",
      ],
      faqs: [
        {
          question: "What is the Abandonment Schema in Schema Therapy?",
          answer:
            "It is a core emotional vulnerability rooted in early childhood instability, where a person perpetually expects significant others to leave, withdraw, or emotionally disappear.",
        },
        {
          question: "What are protest behaviors in an abandonment schema?",
          answer:
            "Protest behaviors are frantic actions—such as spamming texts, picking fights to test loyalty, or withdrawing pre-emptively—intended to force re-connection or avoid being rejected first.",
        },
      ],
    },

    {
      route: "/quiz/thanatophobia",
      aliases: ["/quiz/death-anxiety", "/tes-thanatophobia"],
      title: "Thanatophobia & Existential Death Anxiety Screener (Dr. Irvin D. Yalom & TMT Model)",
      description:
        "Do thoughts of mortality, non-existence, or eternity trigger nocturnal dread and heart palpitations? Free 12-item clinical screener measuring existential annihilation dread, symbolic immortality strivings, and mortality salience paralysis.",
      category: "Existential Psychology & Anxiety",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Irvin D. Yalom (Existential Psychotherapy) & Terror Management Theory (Solomon, Greenberg, Pyszczynski)",
      overview:
        "Thanatophobia is the profound fear of death, dying, and personal annihilation. While daylight distractions mask existential terror, the quiet of night dismantles psychological defenses. This screener benchmarks annihilation vertigo, somatic vigilance, and immortality strivings.",
      keyPoints: [
        "Measures 3 clinical dimensions: Existential Annihilation Dread, Symbolic Immortality Striving, and Mortality Salience Paralysis",
        "Assesses sleep-onset panic spikes, pulse-checking somatic vigilance, and fear of non-existence",
        "Includes Dr. Yalom's awakening principles, Epictetus cognitive anchors, and nocturnal audio journal grounding",
      ],
      faqs: [
        {
          question: "What causes death anxiety before falling asleep?",
          answer:
            "During the day, sensory input and tasks suppress existential dread. At bedtime, quiet darkness dismantles conscious distractions, allowing the brain's baseline fear of finitude and non-existence to reach awareness and trigger panic sensations.",
        },
        {
          question: "Is thanatophobia curable?",
          answer:
            "Yes. Through existential psychotherapy and Terror Management cognitive grounding, individuals learn to shift from morbid avoidance into the Yalom Awakening state, where mortality salience fuels deep daily presence and purpose.",
        },
      ],
    },

    {
      route: "/quiz/executive-dysfunction",
      aliases: ["/quiz/task-paralysis", "/tes-disfungsi-eksekutif"],
      title: "Executive Dysfunction & Task Paralysis Screener (Dr. Russell Barkley ADHD Model)",
      description:
        "Staring at your screen screaming internally to start while physically frozen? Free 12-item clinical screener measuring prefrontal activation barriers, working memory object impermanence, and time blindness.",
      category: "ADHD & Prefrontal Executive Function",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Russell Barkley (ADHD Executive Function Model) & Dr. Thomas E. Brown (Executive Function Impairment)",
      overview:
        "Executive dysfunction is a neurochemical initiation breakdown in the prefrontal cortex, not a moral failure or laziness. This screener measures task activation barriers, working memory object impermanence, and urgency-dependent time blindness.",
      keyPoints: [
        "Measures 3 clinical dimensions: Task Initiation Activation Barrier, Working Memory Object Impermanence, and Time Blindness & Urgency Dependence",
        "Assesses intention-to-action gaps, Wall of Awful paralysis, and waiting-mode freeze",
        "Provides 2-minute micro-activation ramps, externalized visual cues, and zero-resistance voice brain-dump techniques",
      ],
      faqs: [
        {
          question: "How is executive dysfunction different from laziness?",
          answer:
            "Laziness is a conscious, guilt-free choice to avoid effort. Executive dysfunction is an agonizing state where a person desperately wants to initiate a task and suffers immense internal distress, but lacks the prefrontal dopamine ignition to cross the motor barrier.",
        },
        {
          question: "What is the 'Wall of Awful' in ADHD?",
          answer:
            "The Wall of Awful is an emotional barrier built from past failures, shame, and fear of judgment. Approaching a simple task requires climbing over this accumulated mountain of negative affect, triggering cognitive paralysis.",
        },
      ],
    },

    {
      route: "/quiz/body-dysmorphia",
      aliases: ["/quiz/bdd-test", "/tes-body-dysmorphia"],
      title: "Body Dysmorphic Disorder (BDD) & Mirror Checking Screener (Dr. Katharine Phillips Model)",
      description:
        "Do perceived physical flaws, compulsive mirror rituals, or dread of photographs consume hours of your day? Free 12-item clinical screener measuring flaw magnification, mirror checking loops, and social camouflaging.",
      category: "Body Image & Somatic Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Katharine Phillips (The Broken Mirror) & Dr. Thomas F. Cash (Cash Body-Self Relations Model)",
      overview:
        "Body Dysmorphic Disorder (BDD) is a severe neurobiological visual processing impairment where the visual cortex over-focuses on granular flaws while losing holistic perspective. This screener benchmarks flaw magnification, compulsive mirror rituals, and social camouflaging.",
      keyPoints: [
        "Measures 3 clinical dimensions: Perceived Flaw Magnification, Compulsive Mirror Checking/Avoidance, and Social Camouflaging",
        "Assesses perceptual zooming, photo dread, and catastrophic appearance shame",
        "Includes the 2-foot mirror rule, timeboxed mirror hygiene, and audio-based somatic neutrality grounding",
      ],
      faqs: [
        {
          question: "Can cosmetic surgery cure Body Dysmorphic Disorder?",
          answer:
            "Clinical research indicates that over 98% of people with BDD experience no lasting psychological improvement from cosmetic procedures. Because the distortion resides in frontostriatal brain circuits and visual filtering, the obsession almost immediately migrates to another body feature.",
        },
        {
          question: "What is the difference between normal insecurity and BDD?",
          answer:
            "Normal insecurity is occasional dissatisfaction that does not substantially impair daily functioning. BDD involves obsessive daily rumination (over 1 hour daily), compulsive checking rituals, severe emotional distress, and social avoidance or agoraphobia.",
        },
      ],
    },

    {
      route: "/quiz/health-anxiety",
      aliases: ["/quiz/cyberchondria-test", "/tes-health-anxiety"],
      title: "Health Anxiety & Cyberchondria Screener (Dr. Paul Salkovskis SHAI Model)",
      description:
        "Does an unfamiliar bodily twitch or heart flutter trigger catastrophic illness panic and symptom googling spirals? Free 12-item clinical screener measuring somatic catastrophizing, cyberchondria reassurance loops, and body checking.",
      category: "Anxiety & Interoceptive Neuroscience",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Paul Salkovskis (Short Health Anxiety Inventory - SHAI) & Dr. Gordon J. G. Asmundson",
      overview:
        "Health anxiety is driven by the catastrophic misinterpretation of normal somatic sensations, amplified by algorithmic symptom googling (cyberchondria) and compulsive reassurance seeking. This screener benchmarks interoceptive alarm, reassurance addiction, and body checking.",
      keyPoints: [
        "Measures 3 clinical dimensions: Somatic Catastrophizing, Cyberchondria Googling Loops, and Body Checking Hypervigilance",
        "Differentiates organic biological noise from catastrophic cognitive misinterpretations",
        "Provides the 72-hour googling moratorium, interoceptive habituation exercises, and safe audio decompression",
      ],
      faqs: [
        {
          question: "Why does googling symptoms make health anxiety worse?",
          answer:
            "Search algorithms monetize fear and maximize engagement by displaying rare, fatal edge-cases. Reading worst-case diagnoses floods the limbic system with adrenaline, which causes physiological palpitations and dizziness that are then misinterpreted as proof of illness.",
        },
        {
          question: "Why does doctor reassurance only relieve health anxiety temporarily?",
          answer:
            "Reassurance acts like a short-lived psychological sedative: it temporarily soothes the amygdala, but reinforces the core cognitive error that normal bodily sensations are dangerous and require external medical validation to survive.",
        },
      ],
    },

    {
      route: "/quiz/sensorimotor-ocd",
      aliases: ["/quiz/somatic-hyperawareness", "/tes-sensorimotor-ocd"],
      title: "Sensorimotor OCD & Somatic Hyperawareness Screener (Dr. David Veale Model)",
      description:
        "Does conscious attention lock onto manual breathing, swallowing, or blinking with panic of losing biological autopilot? Free 12-item clinical screener measuring somatic fixation, loss of autopilot dread, and compulsive distraction strain.",
      category: "Neurodivergence & OCD",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. David Veale & Dr. Steven Phillipson (Inhibitory Learning & Somatic ERP)",
      overview:
        "Sensorimotor OCD involves obsessive conscious hyperawareness of automatic biological functions—most commonly breathing, swallowing, blinking, or bodily sensations—paired with catastrophic fear of permanent loss of biological autopilot. This screener measures interoceptive lock-in and exhaustion.",
      keyPoints: [
        "Measures 3 clinical dimensions: Somatic Fixation Lock-In, Loss of Autopilot Dread, and Compulsive Distraction Strain",
        "Distinguishes benign body awareness from clinical sensorimotor obsessional lock-in",
        "Includes ERP exposure hierarchy guidelines, inhibitory learning drills, and vocal decompression",
      ],
      faqs: [
        {
          question: "Can focusing on breathing actually cause me to forget how to breathe automatically?",
          answer:
            "No. Breathing is controlled by the medulla oblongata and pons in the brainstem, an ancient, non-conscious survival circuit. Even when conscious attention interferes temporarily, autonomic control automatically reasserts itself when you fall asleep or engage in external activities.",
        },
        {
          question: "Why does trying to distract myself from breathing make the obsession worse?",
          answer:
            "Frantic attempts to avoid thinking about breathing trigger the ironic process theory (white bear effect): your brain must continually scan to check if you are still noticing the breath, thereby reinforcing the neural spotlight on the lungs.",
        },
      ],
    },

    {
      route: "/quiz/vulnerability-hangover",
      aliases: ["/quiz/post-social-shame", "/tes-vulnerability-hangover"],
      title: "Vulnerability Hangover & Post-Social Shame Screener (Dr. Brené Brown Model)",
      description:
        "Does sharing deep emotions or crying in front of others trigger a morning-after sick stomach, forensic conversation replays, and urges to delete messages or isolate? Free 12-item screener measuring emotional exposure dread.",
      category: "Emotional Regulation & Relationships",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Brené Brown (Shame Resilience Theory) & Dr. Thomas Gilovich (Spotlight Effect)",
      overview:
        "A vulnerability hangover is the visceral, gut-wrenching feeling of exposure that occurs after dropping emotional armor and sharing authentic, unguarded feelings. This screener measures forensic conversation replays, exposure nausea, and retraction/ghosting impulses.",
      keyPoints: [
        "Measures 3 exposure dimensions: Post-Social Forensic Replay, Exposure Nausea & Self-Blame, and Retraction & Isolation Urge",
        "De-centers the Spotlight Effect to overcome catastrophic social exposure assumptions",
        "Provides the 24-hour moratorium on apologies and polyvagal somatic self-soothing tools",
      ],
      faqs: [
        {
          question: "Why do I feel physically sick the morning after opening up to someone?",
          answer:
            "Removing emotional armor triggers a threat response in the amygdala once the initial social warmth fades. The nervous system interprets vulnerability as physical exposure, causing somatic symptoms like stomach knots, nausea, and adrenaline rushes.",
        },
        {
          question: "How do other people usually perceive my vulnerability?",
          answer:
            "Social psychology research demonstrates the 'beautiful mess effect': while we judge our own vulnerability as weak, messy, and pathetic, observers consistently view our disclosures as brave, magnetic, trustworthy, and deeply relatable.",
        },
      ],
    },

    {
      route: "/quiz/anhedonia",
      aliases: ["/quiz/loss-of-pleasure", "/tes-anhedonia"],
      title: "Anhedonia & Reward Deficiency Screener (Dr. R. Philip Snaith SHAPS Model)",
      description:
        "Has food, music, hobbies, and social interaction turned completely grey and joyless? Free 12-item clinical screener measuring consummatory sensory pleasure, anticipatory dopamine drive, and social hedonic detachment.",
      category: "Neuroscience & Mood Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. R. Philip Snaith (Snaith-Hamilton Pleasure Scale - SHAPS) & Dr. Kenneth Blum",
      overview:
        "Anhedonia is the neurobiological dampening of the brain's mesocorticolimbic reward system, characterized by the absence of positive affect. This screener measures in-the-moment sensory savoring deficits, lost future anticipation, and relational emotional flatlining.",
      keyPoints: [
        "Measures 3 clinical dimensions: Consummatory Sensory Savoring, Anticipatory Dopamine Drive, and Social Hedonic Resonance",
        "Distinguishes negative depressive affect from the neurobiological absence of positive affect",
        "Includes behavioral activation schedules, micro-sensory restoration drills, and vocal decompression",
      ],
      faqs: [
        {
          question: "What is the difference between sadness and anhedonia?",
          answer:
            "Sadness is an active, painful emotional state characterized by grief, tears, or hurt. Anhedonia is an emotional flatline where you feel empty or neutral, completely unable to feel joy, excitement, or satisfaction even in ideal circumstances.",
        },
        {
          question: "Can anhedonia improve after chronic burnout?",
          answer:
            "Yes. When caused by chronic stress or dopamine receptor downregulation, dopamine D2 receptor density can recover with restorative sleep, behavioral activation, reduced digital overstimulation, and somatic nervous system regulation.",
        },
      ],
    },

    {
      route: "/quiz/misophonia",
      aliases: ["/quiz/sound-rage", "/tes-misophonia"],
      title: "Misophonia & Sound Sensitivity Screener (Amsterdam Misophonia Scale A-MISO-S)",
      description:
        "Do chewing, crunching, breathing, or tapping sounds trigger instantaneous visceral fury and flight-or-flight panic? Free 12-item clinical screener measuring orofacial reactivity, autonomic rage surges, and avoidance strain.",
      category: "Auditory Neuroscience & Sensory Processing",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Damiaan Denys (Amsterdam Misophonia Scale - A-MISO-S) & Dr. Sukhbinder Kumar (Newcastle fMRI)",
      overview:
        "Misophonia is a sensory processing disorder where specific human orofacial and kinetic sounds trigger hyper-connectivity between the auditory cortex and the anterior insular fight-or-flight hub. This screener benchmarks trigger severity, physiological panic, and relationship impact.",
      keyPoints: [
        "Measures 3 acoustic dimensions: Orofacial Sound Trigger Reactivity, Autonomic Fight-or-Flight Surge, and Anticipatory Avoidance Strain",
        "Differentiates sound volume pain (hyperacusis) from neurological insular sound rage (misophonia)",
        "Provides acoustic filtering guidance, household sanctuary communication agreements, and somatic vagus grounding",
      ],
      faqs: [
        {
          question: "Why do chewing sounds bother me so much more when family members make them?",
          answer:
            "The brain's emotional architecture treats intimate relationships and the home as a primary sanctuary of safety. When intrusive trigger sounds occur within that sanctuary, the nervous system registers it as a deep personal boundary violation.",
        },
        {
          question: "Is misophonia just an annoyance or an ear problem?",
          answer:
            "Neither. Audiograms show hearing is normal. fMRI neuroimaging reveals that in misophonia, the anterior insular cortex misinterprets specific everyday sounds as urgent survival threats, causing an involuntary visceral adrenaline spike.",
        },
      ],
    },

    {
      route: "/quiz/agoraphobia",
      aliases: ["/quiz/panic-avoidance", "/tes-agorafobia"],
      title: "Agoraphobia & Panic Escape Dread Screener (Dr. Borwin Bandelow PAS Model)",
      description:
        "Assess whether public transit, open spaces, supermarkets, traffic gridlocks, or leaving home trigger overwhelming panic and avoidance using the clinical Panic and Agoraphobia Scale (PAS) framework.",
      category: "Neuroscience & Anxiety Disorders",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Borwin Bandelow (Panic and Agoraphobia Scale - PAS) & Dr. David H. Barlow (Interoceptive Conditioning)",
      overview:
        "Agoraphobia is not a fear of physical geography or buildings, but an interoceptive terror of having panic sensations in places from which rapid escape or immediate rescue would be difficult or humiliating. This screener measures entrapment dread, bodily hypervigilance, and comfort zone shrinkage.",
      keyPoints: [
        "Measures 3 clinical dimensions: Spatial Escape & Entrapment Dread, Fear of Fear (Interoception), and Safety Tether Constriction",
        "Based on Dr. Borwin Bandelow's Panic and Agoraphobia Scale (PAS) and Barlow's cognitive model",
        "Includes gradual in vivo exposure hierarchies, interoceptive desensitization drills, and vocal decompression",
      ],
      faqs: [
        {
          question: "Is agoraphobia just a fear of open fields or big skies?",
          answer:
            "No. In clinical psychiatry, agoraphobia is defined by fear of situations where escape might be difficult or embarrassing in the event of panic symptoms—such as public transit, traffic jams, grocery stores, airplanes, or being far from home.",
        },
        {
          question: "Can agoraphobia be treated without medicine?",
          answer:
            "Yes. Cognitive Behavioral Therapy (CBT), interoceptive exposure (learning to tolerate bodily panic cues), and gradual in vivo exposure have among the highest long-term recovery rates in clinical psychology.",
        },
      ],
    },

    {
      route: "/quiz/covert-narcissism",
      aliases: ["/quiz/vulnerable-narcissism", "/tes-narsisisme-terselubung"],
      title: "Covert Narcissism & Vulnerable Self-Absorption Screener (Cheek HSNS Model)",
      description:
        "Assess hypersensitive narcissism, covert superiority fantasies, silent resentment, and weaponized victimhood using the clinical Hypersensitive Narcissism Scale (HSNS) by Dr. Jonathan Cheek and Dr. Frank Hendin.",
      category: "Personality Psychology & Relational Dynamics",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Jonathan M. Cheek & Dr. Frank G. Hendin (Hypersensitive Narcissism Scale - HSNS)",
      overview:
        "Unlike grandiose narcissists who crave the spotlight, covert (vulnerable) narcissists are often introverted and reserved, but simmer with defensive hypersensitivity, silent entitlement, and deep-seated grievance that an unappreciative world ignores their unique genius. This screener measures vulnerable ego fragility.",
      keyPoints: [
        "Measures 3 clinical dimensions: Defensive Hypersensitivity, Covert Entitlement & Grievance, and Martyrdom (Weaponized Victimhood)",
        "Based on the clinical Hypersensitive Narcissism Scale (HSNS) developed at Wellesley College",
        "Provides radical self-honesty prompts, humility cultivation practices, and healthy empathy integration",
      ],
      faqs: [
        {
          question: "How is covert narcissism different from ordinary introversion or shyness?",
          answer:
            "Shy individuals do not harbor hidden fantasies of superiority or bitter resentment toward others' success. Covert narcissists experience quiet entitlement—believing they deserve special admiration and feeling deeply aggrieved when they don't receive it.",
        },
        {
          question: "Can a vulnerable narcissist change?",
          answer:
            "Yes. With authentic self-awareness, mentalization-based therapy, and willingness to tolerate 'ordinariness' without shame, individuals can dismantle their grievance armor and build genuine relational connections.",
        },
      ],
    },

    {
      route: "/quiz/aphantasia",
      aliases: ["/quiz/minds-eye", "/tes-afantasia"],
      title: "Aphantasia & Mind's Eye Blindness Screener: Free VVIQ 12-Item Test (Card #100 Milestone)",
      description:
        "Can you see an apple in your mind? Measure your mental imagery vividness, total aphantasia (blind mind's eye), or hyperphantasia cinema using the clinical VVIQ model by Dr. David Marks and Prof. Adam Zeman.",
      category: "Neuroscience & Visual Imagery",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Prof. Adam Zeman & Dr. David Marks (Vividness of Visual Imagery Questionnaire - VVIQ)",
      overview:
        "Aphantasia is the natural cognitive variation where an individual cannot voluntarily generate mental visual imagery. Rather than seeing pictures, aphantasics think through abstract concepts, spatial logic, and semantic knowledge.",
      keyPoints: [
        "Card #100 historic milestone assessment on Nuju",
        "Measures 3 clinical subscales: Visual Scene Vividness, Facial & Object Precision, and Multisensory Inner Simulation",
        "Based on the validated VVIQ model researched by Prof. Adam Zeman at the University of Exeter",
        "Provides cognitive strengths mapping, externalized memory strategies, and high-res share card",
      ],
      faqs: [
        {
          question: "Is aphantasia considered a disability?",
          answer:
            "No. Prof. Adam Zeman and cognitive scientists classify aphantasia as a healthy, natural spectrum of cognitive diversity. Aphantasics frequently excel in programming, abstract logic, mathematics, and high-speed problem solving.",
        },
        {
          question: "Can people with aphantasia dream visually?",
          answer:
            "Yes. Many individuals with aphantasia report visual dreams because involuntary REM dreaming activates different neural pathways than conscious, top-down voluntary mental imagery.",
        },
      ],
    },

    {
      route: "/quiz/retrospective-jealousy",
      aliases: ["/quiz/partner-past", "/tes-cemburu-masa-lalu"],
      title: "Retrospective Jealousy & Romantic Past Screener: Free RJ-OCD Diagnostic",
      description:
        "Are you tormented by involuntary mental movies of your partner's romantic or sexual past? Free 12-item clinical screener based on Dr. Robert L. Leahy's cognitive model and Zachary Stockill's retroactive jealousy framework.",
      category: "Relational Psychology & ROCD",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Robert L. Leahy (The Jealousy Cure) & Zachary Stockill RJ Cognitive Model",
      overview:
        "Retrospective jealousy (retroactive jealousy) is a form of Relationship OCD where an individual obsesses over their partner's past relationships. Characterized by graphic mental movies, forensic interrogations, and moral contamination panic, it threatens otherwise healthy connections.",
      keyPoints: [
        "Measures 3 subscales: Intrusive Mental Movies, Compulsive Investigative Checking, and Moral Contamination Fear",
        "Identifies the reassurance addiction trap and provides immediate behavioral ceasefire strategies",
        "Delivers Exposure and Response Prevention (ERP) protocols for intrusive imagery of exes",
      ],
      faqs: [
        {
          question: "Why does my partner's past bother me if I love them?",
          answer:
            "Retroactive jealousy is not caused by your partner's past; it is an anxiety disorder driven by certainty addiction, low self-worth, and fear of being inferior to prior lovers.",
        },
        {
          question: "How do I stop interrogating my partner about their exes?",
          answer:
            "Implement a 30-day absolute reassurance freeze. Recognize that asking questions feeds the OCD cycle. When triggers spike, vent into Nuju's voice sanctuary instead of confronting your partner.",
        },
      ],
    },

    {
      route: "/quiz/somniphobia",
      aliases: ["/quiz/sleep-dread", "/tes-takut-tidur", "/tes-somnifobia"],
      title: "Somniphobia & Sleep Dread Screener: Free Bedtime Panic 12-Item Test",
      description:
        "Do you dread going to sleep at night? Measure your bedtime anticipatory anxiety, panic jolts when dozing off, and insomnia performance fear based on the Morin & Espie cognitive model.",
      category: "Sleep Medicine & Clinical Anxiety",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Charles Morin & Dr. Colin Espie (DBAS & Cognitive Insomnia Model)",
      overview:
        "Somniphobia is an acute phobic dread of falling asleep. Driven by autonomic hyperarousal and fear of losing conscious control, it triggers bedtime adrenaline surges, clock-checking panics, and hypnic jerks.",
      keyPoints: [
        "Measures 3 clinical subscales: Bedtime Anticipatory Panic, Loss of Control Dread, and Insomnia Performance Anxiety",
        "Breaks down the paradoxical sleep effort cycle and conditioned bed-threat associations",
        "Delivers evidence-based CBT-I stimulus control and physiological sighing protocols",
        "Includes high-res 1080x1350 canvas share card and private night journaling companion",
      ],
      faqs: [
        {
          question: "Why do I panic right as I start falling asleep?",
          answer:
            "Hypnic jerks and surges of wakefulness occur when a hypervigilant nervous system misinterprets the natural slowing of your heart rate as a life-threatening danger, triggering a protective adrenaline spike.",
        },
        {
          question: "How do I stop dreading bedtime?",
          answer:
            "Apply the 20-minute stimulus control rule: never stay in bed battling panic. Turn your clock away, and practice paradoxical intention by simply aiming to rest comfortably with eyes closed.",
        },
      ],
    },

    {
      route: "/quiz/family-scapegoat",
      aliases: ["/quiz/scapegoat-syndrome", "/quiz/scapegoat-child", "/tes-kambing-hitam-keluarga"],
      title: "Family Scapegoat Syndrome Screener: Free Black Sheep & Systemic Blame Diagnostic",
      description:
        "Were you assigned the scapegoat role in your family? Free 12-item clinical screener based on Rebecca Mandeville's Family Scapegoat Abuse (FSA) model and Murray Bowen's family systems theory.",
      category: "Family Systems & Trauma Recovery",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Rebecca Mandeville (Family Scapegoat Abuse FSA) & Dr. Murray Bowen Family Systems",
      overview:
        "Family Scapegoat Syndrome occurs when a dysfunctional family projects its unacknowledged shame, marital conflict, or emotional chaos onto one designated child. Often chosen for their empathy and honesty, the scapegoat is systematically blamed, gaslighted, and ostracized.",
      keyPoints: [
        "Measures 3 subscales: Systemic Blame Projection, Smear Campaign Gaslighting, and Internalized Defective Identity",
        "Identifies narcissistic family roles (Golden Child vs. Scapegoat vs. Enablers)",
        "Provides trauma-informed gray-rock strategies, boundary setting, and toxic shame deconstruction",
        "Includes high-res 1080x1350 story card and private validation sanctuary",
      ],
      faqs: [
        {
          question: "Why does the family always blame the scapegoat?",
          answer:
            "Assigning blame to one person allows the dysfunctional family system to maintain the illusion of harmony and avoid facing parental emotional immaturity or marital failures.",
        },
        {
          question: "Can I heal without an apology from my family?",
          answer:
            "Yes. Healing begins by grieving the emotionally safe family you never had, establishing strict low-contact or no-contact boundaries, and building a chosen family that respects your authenticity.",
        },
      ],
    },

    {
      route: "/quiz/rumination",
      aliases: ["/quiz/overthinking-loop", "/tes-ruminasi", "/tes-overthinking-berulang"],
      title: "Depressive Rumination & Brooding Loop Screener: Free 12-Item RRS Test",
      description:
        "Are you trapped in obsessive overthinking and self-critical brooding? Measure mental replay, depressive brooding, and abstract why-spirals based on Nolen-Hoeksema's RRS model.",
      category: "Cognitive Psychology & Mood Disorders",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Susan Nolen-Hoeksema (Ruminative Responses Scale RRS & Response Styles Theory)",
      overview:
        "Depressive rumination is the repetitive, passive fixation on symptoms of distress and their possible causes without engaging in constructive problem solving. Driven by maladaptive brooding and DMN hyperactivity, it transforms transient sadness into chronic depressive loops.",
      keyPoints: [
        "Measures 3 clinical subscales: Brooding & Self-Criticism, Depressive Symptom Replay, and Abstract Analytical Paralysis",
        "Differentiates adaptive reflective pondering from destructive self-blaming brooding (Treynor et al., 2003)",
        "Provides Watkins' concrete-level processing exercises and behavioral activation protocols",
        "Includes high-res 1080x1350 canvas story card and private voice unload companion",
      ],
      faqs: [
        {
          question: "Why does overthinking make my sadness worse?",
          answer:
            "Brooding monopolizes working memory and biases your brain toward recalling negative memories. Because abstract 'Why' questions lack practical answers, the brain loops endlessly in distress.",
        },
        {
          question: "How do I break a depressive rumination loop?",
          answer:
            "Apply the 5-minute rule: if thinking hasn't led to a physical action in 5 minutes, stand up immediately. Shift from 'Why did this happen?' to 'What is one concrete physical step I can take right now?'.",
        },
      ],
    },

    {
      route: "/quiz/parasocial-relationship",
      aliases: ["/quiz/parasocial-attachment", "/tes-hubungan-parasosial"],
      title: "Parasocial Attachment & Digital Intimacy Screener: Free 12-Item PSI Test",
      description:
        "Do you feel an intimate connection with a streamer, VTuber, or creator that replaces offline companionship? Free 12-item screener based on the Horton & Wohl Parasocial Interaction model.",
      category: "Media Psychology & Digital Attachment",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Donald Horton & R. Richard Wohl (1956) & Rubin-Perse PSI Scale",
      overview:
        "Parasocial interaction is the psychological illusion of a reciprocal face-to-face relationship with a media personality or streamer. In live streaming, camera gazes and chat recognition activate biological attachment circuitry, often substituting for offline intimacy.",
      keyPoints: [
        "Measures 3 subscales: Perceived Two-Way Illusion, Emotional Dependency & Consolation, and Reality & Social Substitution",
        "Unpacks the illusion of pseudo-reciprocity in live streaming, Superchats, and VIP subscriptions",
        "Provides digital boundaries, reality grounding, and reciprocal human reconnection protocols",
        "Includes high-res 1080x1350 story card and private reflection journal",
      ],
      faqs: [
        {
          question: "Is having a parasocial relationship with a streamer bad?",
          answer:
            "Casual entertainment and fondness are normal. However, when a creator's stream replaces real-world friends, drains your savings on superchats, or causes panic during hiatuses, it has crossed into unhealthy dependency.",
        },
        {
          question: "How do I overcome extreme streamer attachment?",
          answer:
            "Practice a 7-day complete media fast from the creator, stop spending money on donations, and reinvest that time and energy into reciprocal, face-to-face offline communities.",
        },
      ],
    },

    {
      route: "/quiz/bfrb",
      aliases: ["/quiz/skin-picking-hair-pulling", "/tes-kebiasaan-kulit-rambut", "/tes-bfrb"],
      title: "Body-Focused Repetitive Behaviors Screener: Free 12-Item MGH-SPS / HRT Test",
      description:
        "Do you compulsively pick your skin, pull hair, or bite nails? Measure your BFRB sensory urges, trance rituals, and tissue damage based on the MGH & HRT models.",
      category: "OCD-Spectrum & Behavioral Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Nancy Keuthen (MGH-SPS / MGH-HPS) & Azrin Habit Reversal Training",
      overview:
        "Body-Focused Repetitive Behaviors (BFRBs) are chronic neurobiological sensorimotor habits where individuals compulsively pick their skin, pull hair, or bite nails to regulate autonomic arousal, stress, or sensory underload.",
      keyPoints: [
        "Measures 3 clinical subscales: Sensory Urge & Tactile Tension, Automatic vs. Focused Compulsion, and Shame, Tissue Damage & Concealment",
        "Distinguishes automatic sedentary picking from focused mirror inspection sessions",
        "Provides evidence-based Habit Reversal Training (HRT) competing responses and stimulus control",
        "Includes high-res 1080x1350 canvas story card and private sensory grounding companion",
      ],
      faqs: [
        {
          question: "Why can't I just stop picking or pulling using willpower?",
          answer:
            "BFRBs are automated neurological motor habits, not failures of character. The premonitory sensory urge bypasses rational executive control, requiring physical barriers and competing muscle responses.",
        },
        {
          question: "What is the best therapy for BFRBs?",
          answer:
            "Habit Reversal Training (HRT) combined with Mansueto's ComB model and stimulus control (removing magnifying mirrors, wearing barrier gloves or gel nails) has the highest clinical efficacy.",
        },
      ],
    },

    {
      route: "/quiz/orthorexia",
      aliases: ["/quiz/clean-eating-obsession", "/tes-ortoreksia"],
      title: "Orthorexia Nervosa & Clean Eating Obsession Screener: Free 12-Item ORTO-15 Test",
      description:
        "Has healthy eating turned into a rigid obsession? Measure dietary moralization, ingredient anxiety, and social isolation based on the Bratman ORTO-15 model.",
      category: "Eating Disorders & Nutritional Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Steven Bratman (1997) & ORTO-15 Orthorexia Nervosa Model",
      overview:
        "Orthorexia Nervosa is the pathological obsession with biologically 'pure', 'clean', or righteous eating. It transforms nourishment into a moral battlefield, resulting in severe dietary restriction, anxiety over unapproved ingredients, and social alienation.",
      keyPoints: [
        "Measures 3 clinical subscales: Dietary Moralization & Guilt, Obsessive Ingredient Vigilance, and Nutritional Social Isolation",
        "Unpacks the food purity paradox where extreme wellness pursuit causes functional malnutrition",
        "Delivers CBT-E food neutrality reframes, graded fear food exposure, and social commensality recovery",
        "Includes high-res 1080x1350 story card and private food peace journaling tool",
      ],
      faqs: [
        {
          question: "How is orthorexia different from healthy eating?",
          answer:
            "Healthy eating improves your life, energy, and joy. Orthorexia destroys your mental peace, causes panic over cooking oils, leads to nutrient deficiencies, and isolates you from social gatherings.",
        },
        {
          question: "How do I start recovering from clean eating obsession?",
          answer:
            "Practice food neutrality by uncoupling morality from ingredients, challenge detox myths, and systematically reintroduce one 'imperfect' food with loved ones each week.",
        },
      ],
    },

    {
      route: "/quiz/night-eating",
      aliases: ["/quiz/nes", "/tes-kebiasaan-makan-malam", "/tes-night-eating-syndrome"],
      title: "Night Eating Syndrome (NES) Screener: Free 12-Item Stunkard NEQ Test",
      description:
        "Do you skip breakfast, crave carbohydrates late at night, or wake up at 2 AM unable to sleep without eating? Screen circadian delay based on the Stunkard NEQ model.",
      category: "Circadian Health & Sleep Psychology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Albert Stunkard (1955) & Dr. Kelly Allison NEQ Model",
      overview:
        "Night Eating Syndrome (NES) is a circadian eating and sleep disorder characterized by morning anorexia, evening hyperphagia (consuming >25% of calories after dinner), and waking from sleep with an urgent compulsion to eat carbohydrates to fall back asleep.",
      keyPoints: [
        "Measures 3 clinical subscales: Circadian Delay & Morning Anorexia, Nocturnal Awakenings & Ingestion Urge, and Evening Dysphoria & Sleep Fragmentation",
        "Explains the uncoupling between the master brain clock (SCN) and peripheral metabolic liver clocks",
        "Provides evidence-based chronotherapy routines, morning bright light exposure, and bedside somatic anchors",
        "Includes high-res 1080x1350 story card and private bedside voice journaling space",
      ],
      faqs: [
        {
          question: "Is Night Eating Syndrome caused by lack of willpower?",
          answer:
            "No. NES is a neuroendocrine circadian rhythm disorder. Blunted nocturnal leptin elevation and delayed melatonin release create intense physiological hunger signals and sleep fragmentation.",
        },
        {
          question: "How is Night Eating Syndrome treated?",
          answer:
            "Treatment focuses on chronobiological realignment: morning high-lux light therapy, eating protein before 11 AM to reset liver clocks, stimulus control in the bedroom, and addressing evening anxiety.",
        },
      ],
    },

    {
      route: "/quiz/pmdd",
      aliases: ["/quiz/premenstrual-dysphoric-disorder", "/tes-pmdd", "/tes-gejala-haid-ekstrem"],
      title: "Premenstrual Dysphoric Disorder (PMDD) Screener: Free 12-Item Steiner DRSP Test",
      description:
        "Do you experience uncontrollable rage, crushing despair, or severe brain fog 7-10 days before your period that vanishes when bleeding starts? Screen luteal neurosteroid vulnerability.",
      category: "Women's Health & Reproductive Neurobiology",
      duration: "90 secs",
      itemsCount: 12,
      framework: "Dr. Meir Steiner & Dr. Teri Pearlstein DRSP & DSM-5 Model",
      overview:
        "Premenstrual Dysphoric Disorder (PMDD) is a severe, disabling neuroendocrine psychiatric condition affecting 5-8% of menstruating individuals. It is characterized by acute cellular hypersensitivity of brain GABA-A receptors to normal late-luteal neurosteroid (allopregnanolone) fluctuations.",
      keyPoints: [
        "Measures 3 clinical subscales: Luteal Affective Lability & Rage, Interpersonal Friction & Rejection Pain, and Somatic Exhaustion & Rapid Flow Remission",
        "Validates the pathognomonic diagnostic marker: total symptom disappearance within 24-48 hours of menstrual flow onset",
        "Explains NIH genetic findings on altered ESC/E(Z) cellular sensitivity vs. typical hormone blood tests",
        "Provides cycle boundary rules, evidence-based intermittent SSRI guidance, and safe emotional venting protocols",
      ],
      faqs: [
        {
          question: "What is the difference between PMS and PMDD?",
          answer:
            "While PMS causes mild physical tension and irritability, PMDD causes severe psychiatric disruption: explosive rage, suicidal despair, panic attacks, and relational crises that vanish once menstruation begins.",
        },
        {
          question: "Why are my hormone blood tests normal if I have PMDD?",
          answer:
            "PMDD is not an absolute hormone deficiency. Circulating estrogen and progesterone are normal; the disorder is caused by abnormal cellular neurosensitivity in brain GABA receptors responding to normal progesterone metabolite drops.",
        },
      ],
    },

    // 5. Ebook Sales Pages
    {
      route: "/ebook",
      aliases: ["/buku"],
      title: "Mastering Overthinking & Emotional Clarity: The Nuju Practical Ebook",
      description:
        "Break free from late-night racing thoughts, quiet internal criticism, and build emotional resilience with CBT frameworks and somatic tools.",
      category: "Self-Guided Book",
      duration: "Full Book",
      itemsCount: 1,
      framework: "Nuju Emotional Architecture & Cognitive Science",
      overview:
        "A practical, no-fluff guide for chronic overthinkers. Learn the exact science of why the mind spins at 3 AM and acquire 20+ battle-tested prompts, reframes, and somatic exercises to reclaim your peace of mind.",
      keyPoints: [
        "Complete 8-chapter guide to emotional pattern deconstruction",
        "Interactive downloadable reflection workbooks and prompt matrices",
        "Lifetime access across web, mobile reader, and PDF formats",
      ],
      faqs: [
        {
          question: "Is this book suitable for beginners?",
          answer:
            "Yes. It assumes no background in psychology and offers concrete, bite-sized daily tools that take under 5 minutes to implement.",
        },
      ],
    },
  ];

  // Helper to build full page objects for each item and its aliases
  const generatedPages = [];

  for (const item of items) {
    const isTool = item.route.startsWith("/tools/") || ["/breathe", "/emdr", "/grounding", "/sleep", "/nsdr", "/solfeggio", "/box-breathing", "/vocal-toning", "/physiological-sigh"].includes(item.route);
    const isEbook = item.route === "/ebook" || item.route === "/buku";

    const schemaType = isTool ? "WebApplication" : isEbook ? "Book" : "Quiz";

    const mainSchema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      name: item.title,
      description: item.description,
      about: { "@type": "Thing", name: item.category },
      provider: {
        "@type": "Organization",
        name: "Nuju",
        url: BASE_URL,
      },
    };

    const faqSchema =
      item.faqs && item.faqs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: item.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }
        : null;

    const bodyHtml = renderPageShell({
      eyebrow: `${item.category} · ${item.duration}`,
      title: item.title,
      description: item.description,
      meta: `Framework: ${item.framework} · 100% Private & Free`,
      sections: [
        renderSection(
          "Scientific Overview",
          `
            <p>${escapeHtml(item.overview)}</p>
          `,
        ),
        renderSection(
          "What This Assessment Evaluates",
          renderList(item.keyPoints),
        ),
        renderSection(
          "How to Take This Test",
          renderOrdered([
            "Answer honestly based on your experience over the past 7 days.",
            "There are no right or wrong answers; trust your initial emotional reaction.",
            "Receive your personalized score breakdown, mascot insight, and custom journaling prompts immediately.",
          ]),
        ),
        item.faqs && item.faqs.length > 0
          ? renderSection("Frequently Asked Questions", renderFaq(item.faqs))
          : "",
        renderSection(
          "Medical Disclaimer",
          `
            <div class="nuju-callout">
              <strong>Medical Disclaimer:</strong> This instrument is designed for personal self-awareness, emotional tracking, and educational purposes. It is not a clinical diagnosis, psychological treatment, or a substitute for licensed psychiatric care.
            </div>
          `,
        ),
      ].filter(Boolean),
      cta: renderCta({
        title: isTool ? "Launch Interactive Tool" : isEbook ? "Explore the Ebook" : "Start the Assessment",
        body: "Takes just a minute. Free, anonymous, and no account required to see your initial results.",
        href: `${item.route}?start=true`,
        label: isTool ? "Open Tool Now" : isEbook ? "Read Book Sample" : "Start Test Now",
      }),
    });

    // Primary route
    const routesToRegister = [item.route, ...(item.aliases ?? [])];

    for (const r of routesToRegister) {
      generatedPages.push({
        route: r,
        title: item.title,
        description: item.description,
        canonical: `${BASE_URL}${item.route}`,
        breadcrumbs: [
          { name: "Home", url: `${BASE_URL}/` },
          { name: isTool ? "Tools" : isEbook ? "Ebook" : "Psychology Tests", url: isTool ? `${BASE_URL}/tools/breathwork` : isEbook ? `${BASE_URL}/ebook` : `${BASE_URL}/quiz` },
          { name: item.title.split(":")[0].trim(), url: `${BASE_URL}${r}` },
        ],
        schemas: [mainSchema, faqSchema].filter(Boolean),
        bodyHtml,
      });
    }
  }

  return [quizHubPage, ...generatedPages];
}
