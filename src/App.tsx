import React, { useState, useEffect } from 'react';
import khimImage from './assets/Khim.svg';
import asfImage from './assets/ASF.svg';
import resumeUrl from './assets/Modin_Resume.pdf?url';
import { motion } from 'motion/react';
import { Download, Shield, Heart, CheckCircle, User, ExternalLink } from 'lucide-react';

// --- Year Photo Imports (drop images into src/assets/<year>/ — they appear automatically) ---

const firstYearPhotos = Object.values(
  import.meta.glob<{ default: string }>('./assets/First_Year/*.{jpg,jpeg,png,webp,svg}', { eager: true })
).map(m => m.default);

const secondYearPhotos = Object.values(
  import.meta.glob<{ default: string }>('./assets/Second_Year/*.{jpg,jpeg,png,webp,svg}', { eager: true })
).map(m => m.default);

const thirdYearPhotos = Object.values(
  import.meta.glob<{ default: string }>('./assets/Third_Year/*.{jpg,jpeg,png,webp,svg}', { eager: true })
).map(m => m.default);

const fourthYearPhotos = Object.values(
  import.meta.glob<{ default: string }>('./assets/Fourth_Year/*.{jpg,jpeg,png,webp,svg}', { eager: true })
).map(m => m.default);

// --- Page Components ---

const Home = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 text-center bg-white"
  >
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="max-w-5xl w-full"
    >
      <h1 className="text-7xl md:text-9xl font-serif text-cedar leading-tight mb-8">
        The Wonderer's Journey
      </h1>
      <p className="font-mono text-base uppercase tracking-[0.3em] text-cedar/60 mb-12">
        A student of life &bull; A seeker of questions &bull; A pilgrim in formation
      </p>

      <div className="flex flex-col items-center gap-12">
        <div className="ladder-graphic transform scale-75 md:scale-100" />
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl italic mb-4">Current Station</h2>
          <p className="text-xl leading-relaxed opacity-80">
            "I stand at the first step of the ladder—the start of a lifelong race. My formation at Ateneo has built the self-confidence I need to begin the climb."
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 w-full"
      >
        <div className="bg-white border border-cedar/10 shadow-sm flex flex-col md:flex-row overflow-hidden">
          {/* Image */}
          <div className="md:w-2/5 w-full flex-shrink-0">
            <img
              src={khimImage}
              alt="Kristyle Marie Modin"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex-1 p-10 md:p-14 flex flex-col justify-center space-y-5 text-left">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-cedar/80">Hello.</p>
            <p className="font-serif text-2xl leading-snug text-cedar">
              I am <span className="font-bold">Kristyle Marie Modin</span> — I go by <span className="italic">Khim</span>.
            </p>
            <p className="text-lg leading-relaxed opacity-70 font-serif">
              I am a Computer Science student navigating a journey of logic, growth, and persistence. This portfolio maps my path through Ateneo de Davao — documenting the academic peaks, the personal hurdles I've overcome, and the self-confidence I have built along the way.
            </p>
            <p className="text-lg leading-relaxed opacity-70 font-serif">
              I believe in taking things one step at a time and building a career that is of use to others.
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-20 opacity-80"
      >
        <span className="font-mono text-sm uppercase tracking-widest italic text-cedar/80">Scroll to Explore</span>
      </motion.div>
    </motion.div>
  </motion.div>
);

const Identity = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="max-w-5xl mx-auto px-6 py-32"
  >
    <div className="grid md:grid-cols-2 gap-24 items-start">
      <div className="space-y-12">
        <h3 className="font-mono text-sm uppercase tracking-[0.3em] text-cedar/80">IDENTITY</h3>
        <section className="space-y-6">
          <h2 className="text-5xl font-serif">The Bedside Adventurer</h2>
          <p className="text-xl leading-relaxed opacity-90 font-serif italic">
            "I find my greatest adventures in books and imagination. This curiosity fuels my love for discovering new hobbies and tackling complex problems."
          </p>
        </section>
      </div>

      <div className="space-y-12">
        <section className="bg-white p-12 border border-cedar/10 shadow-sm relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <User size={80} strokeWidth={1} />
          </div>
          <h2 className="text-4xl font-serif mb-8">The Cemented Self</h2>
          <p className="text-lg leading-relaxed opacity-80">
            "My college years were more than academic; they were a period of inner growth. I have emerged with a cemented sense of self and the confidence to navigate the professional world."
          </p>
          <div className="mt-8 pt-8 border-t border-cedar/5 font-mono text-[10px] uppercase tracking-widest text-cedar/40">
            Status: Formed & Ready
          </div>
        </section>
      </div>
    </div>
  </motion.div>
);

// --- Timeline data ---
// 'section' entries = year milestone header (title + quote, no photo)
// 'photo'   entries = individual photo with its own caption

type SectionEntry = { type: 'section'; tag: string; title: string; quote: string };
type PhotoEntry   = { type: 'photo';   tag: string; src: string;  text: string; isLeft: boolean };
type TimelineEntry = SectionEntry | PhotoEntry;

const firstYearTexts = [
  'My first year at Ateneo de Davao University was a time of exploration and self-discovery. I felt alone and unsure, still in my shell, navigating a new environment and meeting people I never expected to befriend.',
  'I spent time in classrooms and quiet campus corners, observing and reflecting, slowly learning more about myself through shared stories and small interactions.',
  'Though naive about the challenges of college life, I began to develop Cura Personalis, caring for myself while opening my heart to new experiences.',
  'I am grateful for the first friends and professors who made me feel welcome and guided me through this initial journey.',
  'It was during these quiet moments of reflection that I began to embrace my nature as a wonderer, realizing that my constant questioning was not a sign of confusion, but the beginning of my intellectual adventure.',
  'I look back at this year as the moment I approached the starting line, finally placing my foot on the first rung of the ladder that would lead to my growth.',
];

const PLACEHOLDER = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

// Build entries — photo index tracked separately so section headers don't affect alternation
const timelineEntries: TimelineEntry[] = (() => {
  const entries: TimelineEntry[] = [];
  let photoIdx = 0;

  const addSection = (tag: string, title: string, quote: string) => {
    entries.push({ type: 'section', tag, title, quote });
  };
  const addPhotos = (photos: string[], tag: string, texts: string[]) => {
    photos.forEach((src, i) => {
      entries.push({ type: 'photo', tag, src, text: texts[i] ?? PLACEHOLDER, isLeft: photoIdx++ % 2 === 0 });
    });
  };

  addSection('First Year', 'Academic Peaks', 'Every course brought its own set of challenges. I tackled them not by rushing, but by taking one step at a time, ensuring I mastered each hurdle before moving to the next.');
  addPhotos(firstYearPhotos, 'First Year', firstYearTexts);

  addSection('Second Year', 'The Financial Valley', 'The path wasn\'t always smooth. Facing financial issues within my family was a significant \'valley\' in my map. It was a test of endurance, but I fought through it—and I am still fighting today.');
  addPhotos(secondYearPhotos, 'Second Year', [
    'In my second year, I began to find my place and build lasting connections. I started forming close friend groups, sharing both hardships and fun moments, and discovering the joy of learning together.',
    'These experiences motivated me to work harder and challenged me to support others, embracing the Ignatian value of being Persons for and with Others.',
    'I became more intentional about the company I kept and the relationships I nurtured, recognizing the importance of loyalty, trust, and shared growth.',
    'This year helped me appreciate the people around me and the role they play in shaping my college journey.',
    'However, these bonds were put to the ultimate test when my family\'s stability collapsed, forcing me to lean on the strength of these friendships as I navigated the grueling reality of being both a student and a provider.',
    'This period taught me that being a \'Person for and with Others\' is not just about shared joy, but about standing firm with those who help you carry the \'house\' on your back when your own foundations fail.',
  ]);

  addSection('Third Year', 'The Magi\'s Influence', 'Magis for me isn\'t a grand gesture; it\'s the grit to do my best in every challenging subject, even when the odds are against me.');
  addPhotos(thirdYearPhotos, 'Third Year', [
    'By my third year, I had adapted to college life and learned to stand on my own.',
    'Internship experiences, shifting friendships, and academic challenges pushed me to grow and reflect on my future.',
    'Some friends left school or changed paths, teaching me the value of resilience and acceptance.',
    'I started discerning my goals, thinking about life after college, and understanding that personal growth often comes through change and challenge.',
    'I am grateful for the friends who stayed and the mentors who guided me, helping me navigate this pivotal year with courage and determination.',
    'This determination was fueled by my understanding of Magis, which for me isn\'t a grand gesture, but the daily grit to do my best in every challenging subject and graveyard shift, even when the odds are heavily against me.',
  ]);

  addSection('Fourth Year', "The Wonderer's Synthesis", "Even in the deepest valleys, I remained a wonderer—questioning not why the path was hard, but how I could grow from the climb. This year cemented my self-worth, proving that I am capable of standing firm even when the ground feels shaky.");
  addPhotos(fourthYearPhotos, 'Fourth Year', [
    'My fourth year was marked by confidence, reflection, and preparation for the future.',
    'I felt freer, more self-assured, and grateful for the friendships and experiences that had shaped me.',
    'Completing major requirements and engaging in meaningful projects allowed me to see how much I had grown—academically, socially, and spiritually.',
    'I embraced the Ignatian value of Ad Majorem Dei Gloriam by offering my best work for a greater purpose and recognized the impact of enduring friendships and mentors.',
    'This final year solidified my identity, my aspirations, and my readiness to step into the next chapter of life beyond Ateneo.',
    'As I look toward the horizon, I find myself wondering what twists and turns the next path will take and where my curiosity will lead me next.',
    'Though the road ahead is unmapped, I carry the cemented self-confidence of a pilgrim who knows that even when the destination is unclear, I have the grit to push forward and make every step count.',
  ]);

  return entries;
})();

const ConversionStory = () => (
  <section className="bg-white border-t border-cedar/5 py-32">
    <div className="max-w-3xl mx-auto px-10">
      <div className="text-center mb-20">
        <h3 className="font-mono text-sm uppercase tracking-[0.3em] text-cedar/80 mb-6">The Full Narrative</h3>
        <h2 className="text-4xl md:text-5xl font-serif text-cedar mb-4">Finding My Interior Freedom</h2>
        <p className="font-serif italic text-cedar/60">A Conversion Story for the Seniors' Integration Program</p>
      </div>

      <div className="space-y-16 font-serif text-lg leading-[1.8] text-cedar/80">
        <div className="space-y-6">
          <h4 className="text-xl font-bold italic text-cedar border-b border-cedar/10 pb-2">I. The Cannonball Moment: When Security Shattered</h4>
          <p>During my second year in Ateneo, I experienced a moment that felt like a personal "cannonball," similar to the turning point in the life of St. Ignatius. Until that time, I had always believed that my family was stable. Both of my parents were working abroad as OFWs, and despite the distance, I believed they were still the secure foundation of our family.</p>
          <p>Slowly, however, that foundation began to collapse. Their relationship deteriorated and eventually led to separation. My father decided to return to the Philippines due to health concerns and because of a new partner, while my mother remained in Japan trying to continue working. The situation became even more difficult when my mother temporarily lost her job. Suddenly, the financial stability we once relied on disappeared.</p>
          <p>At that time, I had just finished my second year in Ateneo, and my younger sister was about to enter college. The uncertainty of our situation brought many questions into my mind: Will I still be able to enroll next semester? Can our family survive this situation?</p>
          <p>What shook me most was not only the financial instability, but the realization that the image I once had of my father had changed. For most of my life, I saw him as a protector, the person who provided stability and security for our family. But in that moment, the "filter" through which I saw him disappeared. I began to see him not as an untouchable figure, but simply as a human being capable of making mistakes that affected everyone around him.</p>
          <p>It felt as if a heavy mantle had suddenly been placed on my shoulders. I felt responsible not only for myself but also for the well-being of my family. There was a moment when I could have allowed the situation to discourage me and give up on my plans. Instead, I made a quiet but firm decision: I would fight for my future.</p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-bold italic text-cedar border-b border-cedar/10 pb-2">II. The Interior Struggle: Wrestling with Desolation</h4>
          <p>To support myself and help my family, I applied for a job at a call center. For six months, I balanced graveyard shifts with full-time studies. Those months became my own version of "Manresa," a period of intense interior struggle.</p>
          <p>Physically, the experience was exhausting. My sleep schedule was constantly disrupted, and most days I could only rest for two or three hours. There were moments when my body felt completely drained, and my mind was filled with doubt. I often asked myself whether I could continue living this way.</p>
          <p>Emotionally, I struggled with conflicting feelings. Part of me felt anger and disappointment toward my parents. I sometimes questioned why I had to carry the consequences of decisions that I did not make. There was also a quiet loneliness in being the one who had to endure these difficulties.</p>
          <p>These moments of exhaustion and frustration felt like desolation, a sense of heaviness that made everything seem more difficult. During late nights at work and early mornings in class, I often wrestled with the temptation to quit.</p>
          <p>Yet, in the midst of that struggle, there were also moments of consolation. Slowly, I began to realize that my work had meaning. I was not simply enduring hardship; I was helping sustain my education and support my family. Instead of feeling powerless, I started to recognize a new strength within myself.</p>
          <p>When I completed that semester and discovered that I had become a Dean's Lister, I experienced a deep sense of gratitude and affirmation. That achievement was not simply about academic recognition; it was a sign that my perseverance had meaning.</p>
          <p>Eventually, my mother found a new job in Japan with better pay, allowing me to stop working and focus on my studies again. Although my father eventually reflected on the consequences of his choices, our relationship had already changed. The respect I once had for him had been shaken, yet I still acknowledge him as my father. Learning to accept this complicated reality was also part of my growth.</p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-bold italic text-cedar border-b border-cedar/10 pb-2">III. A New Way of Seeing: Discovering Interior Freedom</h4>
          <p>Looking back on that period of my life, I realize it transformed how I see myself and the world.</p>
          <p>Before this experience, I saw myself primarily as a student who depended on my parents for stability. After going through this struggle, I discovered that I am capable of standing on my own. I learned that I have the resilience to endure difficult situations and continue moving forward.</p>
          <p>At the same time, I realized that strength does not mean carrying everything alone. True resilience also involves learning when to lean on others and when to accept help. When my mother was finally able to support our family again, I felt a sense of relief and freedom simply being able to focus on my studies once more.</p>
          <p>Although the experience was painful and exhausting, I do not regret it. It exposed me to the realities of responsibility and taught me lessons that I might not have learned otherwise. It helped me understand my own capabilities and recognize the depth of my determination.</p>
          <p>Most importantly, I discovered something about my identity: I am a fighter. Instead of allowing circumstances to define me, I learned to face them and grow through them. Rather than blaming my situation, I learned to ask myself how I could respond with courage and perseverance.</p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-bold italic text-cedar border-b border-cedar/10 pb-2">IV. Moving Forward: Living with Greater Purpose</h4>
          <p>As I approach graduation and prepare to enter the next stage of my life, this experience continues to shape my vision of the future.</p>
          <p>My goals have not changed; I still want to graduate and build a better life for myself and my family. However, the way I understand those goals has deepened. I now see my education not only as a personal achievement but also as a responsibility and a privilege.</p>
          <p>The struggles I experienced taught me the value of perseverance, humility, and gratitude. They also reminded me that growth often comes through unexpected challenges.</p>
          <p>Through this journey, I discovered a deeper sense of interior freedom. I am no longer defined by the security I once depended on. Instead, I am guided by the confidence that I can face difficulties and continue moving forward.</p>
          <p>Because of this, I now approach life with greater courage, trusting that even the most difficult moments can lead to transformation and growth.</p>
        </div>
      </div>
    </div>
  </section>
);

const PassionPlan = () => (
  <section className="bg-white border-t border-cedar/5 py-32">
    <div className="max-w-4xl mx-auto px-10">
      <div className="text-center mb-24">
        <h3 className="font-mono text-sm uppercase tracking-[0.3em] text-cedar/80 mb-6">The Builder's Blueprint</h3>
        <h2 className="text-4xl md:text-5xl font-serif text-cedar mb-4">A Passion Plan for Stability and Service</h2>
        <div className="w-24 h-px bg-cedar/20 mx-auto mt-8" />
      </div>

      <div className="space-y-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cedar/60">Introduction</h4>
          <p className="font-serif text-xl leading-relaxed italic text-cedar/80">
            "The Seniors' Integration Program has invited me to pause and reflect on the direction of my life, not simply in terms of career, but in terms of who I am becoming. In the Ignatian tradition, discernment asks deeper questions: What moves my heart? What values will guide my decisions? What kind of life am I being called to build?"
          </p>
          <p className="font-serif text-lg leading-relaxed text-cedar/70">
            Through reflection on my experiences, struggles, and hopes for the future, I realized that much of my life has been shaped by the search for stability. Moments of uncertainty taught me how fragile security can be, but they also revealed the strength that comes from perseverance and faith.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div className="sticky top-32">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cedar/60 mb-4">Section I</h4>
            <h3 className="text-2xl font-serif text-cedar">Personal Mission Statement</h3>
            <p className="text-sm font-serif italic text-cedar/60 mt-4">Becoming a Builder of Stability</p>
          </div>
          <div className="space-y-6 font-serif text-lg leading-relaxed text-cedar/80 bg-sand p-10 border border-cedar/5">
            <p>When I reflect on who I am becoming, one image consistently comes to mind: a builder.</p>
            <p>I see myself as someone who builds foundations, foundations of stability, responsibility, and opportunity. My life experiences have taught me that stability is not something guaranteed; it must be intentionally built through discipline, resilience, and wise choices. Because of this realization, I feel called to become a Builder of Stability.</p>
            <p>The driving force behind my aspirations is the desire to achieve financial independence and create a secure future for my family. I want to reach a point in life where the people I love do not have to live in uncertainty.</p>
            <p>However, the kind of life I wish to build is not defined only by professional success. It is guided by values that I consider non-negotiable: self-worth, financial integrity, and responsibility. Responsibility reminds me that every decision I make has consequences for the people who rely on me.</p>
            <p>Ultimately, my mission is to grow into a skilled professional who uses technology not only as a career but as a tool for building a meaningful life. I want to reach a position where I can extend help to others, not from a place of sacrifice that harms my own well-being, but from a place of strength.</p>
          </div>
        </div>

        <div className="bg-cedar/5 p-16 md:p-24 text-center border border-cedar/10">
          <div className="max-w-2xl mx-auto space-y-10">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cedar/60">Section II</h4>
            <h3 className="text-3xl font-serif text-cedar italic">Prayer for My Future Self</h3>
            <div className="space-y-6 font-serif text-lg italic text-cedar/80 text-left md:text-center leading-relaxed">
              <p>Lord,</p>
              <p>As I look ahead toward the life that awaits me, I entrust my journey into Your hands.</p>
              <p>Thank you for the experiences that shaped my character and strengthened my perseverance. Guide me as I step into the professional world. Grant me the wisdom to discern between choices that merely promise profit and those that reflect integrity and goodness.</p>
              <p>Help me remember that my work is not only about creating systems or writing code. It is also about shaping a life that reflects compassion, honesty, and service.</p>
              <p>Amen.</p>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          <div className="text-center">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cedar/60 mb-4">Section III</h4>
            <h3 className="text-3xl font-serif text-cedar">The 10–20 Year Passion Plan</h3>
            <p className="text-sm font-serif italic text-cedar/60 mt-2">From Growth to Legacy</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { phase: 'Phase 1', title: 'The Foundation (Years 1–5)', desc: 'Focus on growth, learning, and professional formation. As a Computer Science graduate, my goal is to enter the tech industry, refine my skills in full-stack dev, and establish financial stability.' },
              { phase: 'Phase 2', title: 'Structure of Stability (Years 5–10)', desc: 'Growing into a senior role or technical specialist. Collaborating with trusted friends to explore creating our own startup—a concrete project reflecting our shared vision.' },
              { phase: 'Phase 3', title: 'Legacy of Inspiration (Years 10–20)', desc: 'Evolution into mentorship and leadership. Supporting aspiring developers and students from challenging backgrounds, reminding them that struggles do not define limits.' },
            ].map((item) => (
              <div key={item.phase} className="border border-cedar/10 p-8 space-y-4 hover:border-cedar/30 transition-all bg-white shadow-sm">
                <span className="font-mono text-[10px] uppercase tracking-widest text-cedar/60 font-bold">{item.phase}</span>
                <h5 className="text-xl font-serif text-cedar italic">{item.title}</h5>
                <p className="text-sm font-serif leading-relaxed text-cedar/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-20 border-t border-cedar/10">
          <p className="max-w-2xl mx-auto font-serif text-xl italic text-cedar/80 leading-relaxed">
            "In the end, my dream is simple yet meaningful: to build a life strong enough to support my family, compassionate enough to help others, and purposeful enough to inspire those who walk a similar path."
          </p>
        </div>
      </div>
    </div>
  </section>
);

const JourneyMap = () => (
  <>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="max-w-4xl mx-auto px-6 py-32"
  >
    <div className="text-center mb-24">
      <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-cedar/40 mb-4">JOURNEY</h3>
      <h2 className="text-5xl font-serif">A Thread of Resilience</h2>
    </div>

    <div className="relative">
      {/* Thread Line */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-cedar/30 -translate-x-1/2" />

      <div className="space-y-24 relative">
        {timelineEntries.map((entry, i) => {

          // --- Section header (milestone title + quote, no photo) ---
          if (entry.type === 'section') {
            return (
              <div key={i} className="relative flex items-center md:flex-row flex-col md:text-right py-4">
                <div className="md:w-1/2 md:pr-16 w-full ml-12 md:ml-0">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-cedar/60 mb-2">{entry.tag}</h4>
                  <h3 className="text-2xl font-serif mb-3">{entry.title}</h3>
                  <p className="text-lg leading-relaxed opacity-70 font-serif italic">"{entry.quote}"</p>
                </div>
                <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full border-2 border-cedar bg-sand -translate-x-1/2 z-10" />
                <div className="md:w-1/2 hidden md:block" />
              </div>
            );
          }

          // --- Photo entry (individual caption + image) ---
          return (
            <div
              key={i}
              className={`flex items-center md:flex-row flex-col ${entry.isLeft ? 'md:text-right' : ''}`}
            >
              {entry.isLeft && (
                <div className="md:w-1/2 md:pr-16 w-full ml-12 md:ml-0 mb-4 md:mb-0">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-cedar/60 mb-2">{entry.tag}</h4>
                  <p className="text-lg leading-relaxed opacity-70 font-serif italic">{entry.text}</p>
                </div>
              )}

              <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full border-2 border-cedar bg-sand -translate-x-1/2 z-10" />

              {entry.isLeft ? (
                <div className="md:w-1/2 md:pl-8 hidden md:block">
                  <div className="relative w-full h-52 overflow-hidden group">
                    <img src={entry.src} alt={`${entry.tag} photo`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="md:w-1/2 md:pr-8 hidden md:block">
                    <div className="relative w-full h-52 overflow-hidden group">
                      <img src={entry.src} alt={`${entry.tag} photo`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                  </div>
                  <div className="md:w-1/2 md:pl-16 w-full ml-12 md:ml-0">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-cedar/60 mb-2">{entry.tag}</h4>
                    <p className="text-lg leading-relaxed opacity-70 font-serif italic">{entry.text}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </motion.div>
  <ConversionStory />
  </>
);

const ImpactGallery = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="max-w-6xl mx-auto px-6 py-32"
  >
    <div className="text-center mb-20 space-y-4">
       <h3 className="font-mono text-sm uppercase tracking-[0.3em] text-cedar/80">IMPACT</h3>
       <h2 className="text-5xl font-serif">Formation Artifacts</h2>
    </div>

    <div className="grid md:grid-cols-2 gap-px bg-cedar/10 border border-cedar/10 mb-32">
       {/* Featured Card */}
       <div className="bg-white p-12 md:p-20 space-y-8 h-full flex flex-col justify-center">
          <div className="space-y-4">
             <span className="font-mono text-[10px] uppercase tracking-widest text-cedar/40 block">Featured Case Study</span>
             <h3 className="text-4xl font-serif mb-6 leading-tight">The Arrupe Social Formation Project</h3>
             <p className="text-lg leading-relaxed opacity-70">
              I contributed to the installation of a community water pump in a rural setting and participated in community clean-up drives with my classmates. Whether it was engineering a solution for clean water or the simple act of clearing local streets, these moments served as a turning point in my formation."
             </p>
          </div>
          <div className="p-6 bg-sand border-l-2 border-cedar italic">
              These experiences taught me that technical skills and manual effort are most valuable when they lend a hand to those in need. I realized that my growth is not just for my own betterment, but for the service of the community.
          </div>
       </div>

       {/* ASF Image */}
       <div className="bg-white overflow-hidden h-full">
          <img
            src={asfImage}
            alt="Arrupe Social Formation"
            className="w-full h-full object-cover block scale-[1.4]"
          />
       </div>
    </div>

    {/* The Non-Negotiables */}
    <div className="space-y-12">
       <h3 className="text-3xl font-serif text-center mb-4 italic">The Non-Negotiables</h3>
       <p className="text-lg leading-relaxed opacity-70 font-serif text-center max-w-2xl mx-auto mb-16">
         Through these activities, I discovered the values I will carry into the workforce: Respect for every individual, Moral Integrity in my actions, Honesty in my work, and a grounded sense of Self-Worth.
       </p>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Respect', icon: Heart, desc: 'Acknowledging the dignity of every person.' },
            { label: 'Honesty', icon: CheckCircle, desc: 'Foundation of every interaction.' },
            { label: 'Moral Integrity', icon: Shield, desc: 'Guide for ethical decision-making.' },
            { label: 'Self-Worth', icon: User, desc: 'Effective contribution to a collective.' }
          ].map((item) => (
            <div key={item.label} className="bg-white p-10 border border-cedar/10 text-center hover:border-cedar/40 transition-colors group">
               <div className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                  <item.icon size={32} strokeWidth={1} className="mx-auto" />
               </div>
               <h4 className="font-serif text-xl mb-4">{item.label}</h4>
               <p className="font-mono text-[10px] uppercase tracking-widest text-cedar/60 leading-relaxed font-bold">
                  {item.desc}
               </p>
            </div>
          ))}
       </div>
    </div>
  </motion.div>
);

const Future = () => (
  <>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="max-w-6xl mx-auto py-32"
  >
    <div className="px-10">
      <h3 className="font-mono text-sm uppercase tracking-[0.3em] text-cedar/80 mb-8 text-center">FUTURE</h3>

      <div className="max-w-2xl mb-24 mx-auto text-center">
        <h4 className="font-serif text-3xl text-cedar mb-4 underline underline-offset-4 decoration-cedar/40">The Ateneo Way in Tech</h4>
        <p className="text-2xl leading-relaxed text-cedar/90 font-serif">
          "As I approach graduation, my goal is to deepen the Ateneo Way—using my technical skillset to solve real problems and uplift the community."
        </p>
      </div>

      <section className="mb-24">
        <div className="font-mono text-sm uppercase tracking-[0.2em] text-cedar/90 mb-8 text-center">Short-term Roadmap</div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'Build the Foundation', desc: 'Focus on gaining professional experience and strengthening my technical portfolio.' },
            { title: 'Career Construction', desc: 'Establishing myself in the industry as a reliable, value-driven professional.' },
          ].map((item) => (
            <div key={item.title} className="bg-white p-8 border border-cedar/10 hover:border-cedar/30 transition-all shadow-sm">
              <h4 className="font-serif text-xl text-cedar mb-3 italic">{item.title}</h4>
              <p className="text-sm font-serif text-cedar/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col items-center gap-6 mb-16">
        <a
          href={resumeUrl}
          download="Modin_Resume.pdf"
          className="bg-cedar text-white px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] font-bold hover:bg-cedar/90 transition-all flex items-center gap-3"
        >
          <Download size={16} /> Download My Resume
        </a>
        <a
          href="https://github.com/KristyleModin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cedar/60 hover:text-cedar transition-colors"
        >
          <ExternalLink size={14} /> View My GitHub
        </a>
      </div>
    </div>
  </motion.div>
  <PassionPlan />
  </>
);

// --- Layout Wrapper ---

const navItems = [
  { label: 'Home',     id: 'home'    },
  { label: 'Identity', id: 'about'   },
  { label: 'Journey',  id: 'journey' },
  { label: 'Impact',   id: 'impact'  },
  { label: 'Future',   id: 'future'  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState('home');

  // Highlight nav item for whichever section is most visible
  useEffect(() => {
    const observers = navItems.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-sand flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md h-20 border-b border-cedar/5">
        <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <button
            onClick={() => scrollTo('home')}
            className="font-serif text-lg font-bold tracking-tight text-cedar group flex items-center gap-2"
          >
            <span className="w-8 h-[2px] bg-cedar transform group-hover:scale-x-125 transition-transform origin-left" />
            Wonderer's Journey
          </button>
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all rounded-full ${active === item.id ? 'bg-cedar text-white font-bold' : 'text-cedar/90 hover:text-cedar'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Mobile indicator */}
          <div className="md:hidden">
            <div className="w-4 h-[2px] bg-cedar mb-1" />
            <div className="w-6 h-[2px] bg-cedar" />
          </div>
        </nav>
      </header>

      <main className="pt-20 flex-grow">
        {children}
      </main>

      <footer className="py-20 bg-white border-t border-cedar/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left space-y-2">
            <p className="font-serif text-lg text-cedar italic tracking-wide">The Wonderer's Journey &copy; 2026</p>
            <p className="font-serif text-base text-cedar/70 tracking-wide">Kristyle Marie Modin</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-cedar/40 italic">A pilgrimage in formation.</p>
          </div>
          <div className="text-center md:text-right space-y-4">
            <div className="flex items-center justify-center md:justify-end gap-2 text-cedar/40">
              <Shield size={12} />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold">Data Privacy Compliance</span>
            </div>
            <p className="max-w-[300px] font-serif text-[11px] text-cedar/50 leading-relaxed italic">
              All contents are generalized to protect individual identity and community privacy. No sensitive personal data is stored or displayed.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Single-page App ---

export default function App() {
  return (
    <Layout>
      <section id="home"><Home /></section>
      <section id="about"><Identity /></section>
      <section id="journey"><JourneyMap /></section>
      <section id="impact"><ImpactGallery /></section>
      <section id="future"><Future /></section>
    </Layout>
  );
}
