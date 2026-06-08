import "./AboutModal.css";

export default function AboutModal({ onClose }) {
  return (
    <div className="about-overlay" onClick={onClose}>
      <div className="about-modal" onClick={e => e.stopPropagation()}>
        <button className="about-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="about-logo">
          <svg className="about-cloud-svg" viewBox="0 0 260 165" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <path id="aboutCloud" d="M50 115C30 115 15 100 15 82C15 66 27 53 43 51C45 30 63 14 85 14C102 14 117 24 124 39C129 36 135 34 141 34C159 34 174 49 174 67C188 69 199 81 199 95C199 106 191 115 180 115Z"/>
            </defs>
            <use href="#aboutCloud" x="20" y="5" fill="#185FA5"/>
            <use href="#aboutCloud" x="40" y="25" fill="#ffffff" stroke="#2980D9" strokeWidth="5"/>
          </svg>
          <div className="about-brand-text">
            <span className="about-brand">Kloud<span className="about-ace">Ace</span></span>
          </div>
        </div>

        <h2 className="about-title">Your study arsenal, upgraded</h2>
        <p className="about-mission">
          KloudAce isn't here to replace your video courses, official docs, or practice exams — it's here to work alongside them. We built KloudAce to be the active-recall layer in your study routine: the tool you reach for to reinforce what you're learning, surface the gaps, and make terminology genuinely stick before exam day.
        </p>

        <div className="about-pillars">
          <div className="about-pillar">
            <span className="about-pillar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
              </svg>
            </span>
            <div>
              <h3 className="about-pillar-title">Science-backed learning</h3>
              <p className="about-pillar-desc">Every card is scheduled by the SM-2 spaced repetition algorithm — the same method behind the most effective language and medical learning tools. You review what you're about to forget, not what you already know.</p>
            </div>
          </div>

          <div className="about-pillar">
            <span className="about-pillar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h10M7 11h6"/>
              </svg>
            </span>
            <div>
              <h3 className="about-pillar-title">Exam-realistic practice</h3>
              <p className="about-pillar-desc">Real exams test scenario thinking, not memory. KloudAce includes portal simulations, Terraform labs, drag-and-drop hotspots, multi-select questions, and timed mock exams — so nothing on exam day catches you off guard.</p>
            </div>
          </div>

          <div className="about-pillar">
            <span className="about-pillar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </span>
            <div>
              <h3 className="about-pillar-title">Learning that sticks</h3>
              <p className="about-pillar-desc">Games like Connections, Crossword, Wordle, and Word Search aren't filler — they create low-pressure recall practice that reinforces terminology in a completely different context, which deepens long-term retention.</p>
            </div>
          </div>

          <div className="about-pillar">
            <span className="about-pillar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            <div>
              <h3 className="about-pillar-title">Built for everyone</h3>
              <p className="about-pillar-desc">Whether you're a student sitting your first cloud exam, a working professional maintaining your certifications, or an architect exploring a new specialisation — KloudAce adapts to where you are and what you need.</p>
            </div>
          </div>
        </div>

        <div className="about-roadmap">
          <h3 className="about-roadmap-title">Where we're headed</h3>
          <p className="about-roadmap-body">
            KloudAce launched with Microsoft Azure. AWS and Google Cloud are in development. The goal is a single platform where any cloud professional can study for any major certification — with the same quality of question, the same depth of lab experience, and the same science-backed approach to retention.
          </p>
        </div>

        <button className="about-cta" onClick={onClose}>Start studying →</button>
      </div>
    </div>
  );
}
