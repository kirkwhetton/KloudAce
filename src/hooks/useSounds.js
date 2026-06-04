let ctx = null;

function getCtx() {
  if (!ctx || ctx.state === "closed") {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function play(notes, enabled) {
  if (!enabled) return;
  try {
    const c = getCtx();
    notes.forEach(([freq, startOffset, dur, vol = 0.22]) => {
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, c.currentTime + startOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + startOffset + dur);
      osc.start(c.currentTime + startOffset);
      osc.stop(c.currentTime + startOffset + dur + 0.05);
    });
  } catch { /* audio not supported */ }
}

export function useSounds(enabled) {
  return {
    correct:   () => play([[523, 0, 0.08], [659, 0.1, 0.14]], enabled),
    incorrect: () => play([[311, 0, 0.08], [233, 0.1, 0.16]], enabled),
  };
}
