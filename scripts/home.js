// Tyson Shields Portfolio — Home Page Scripts (Radar Mini-game & Filters)
document.addEventListener('DOMContentLoaded', () => {
  // Live clock formatting with Intl.DateTimeFormat
  const clockEl = document.getElementById('dashboard-clock');
  if (clockEl) {
    const dtf = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const updateClock = () => {
      clockEl.textContent = `${dtf.format(new Date())} CST`;
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Project Filtering
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      projectCards.forEach((card) => {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });

  const initRadarGame = () => {
    const screen = document.getElementById('radar-screen');
    const layer = document.getElementById('radar-game-layer');
    const idleBanner = document.getElementById('radar-idle-banner');
    const startBtn = document.getElementById('radar-start-btn');
    const btnText = document.getElementById('radar-btn-text');
    const scoreEl = document.getElementById('radar-score');
    const highEl = document.getElementById('radar-high');
    const timerEl = document.getElementById('radar-timer');
    const comboEl = document.getElementById('radar-combo');
    const debrief = document.getElementById('radar-debrief');
    const debriefScore = document.getElementById('debrief-score');
    const debriefStat = document.getElementById('debrief-stat');
    const debriefRank = document.getElementById('debrief-rank');
    const retryBtn = document.getElementById('radar-retry-btn');
    const audioBtn = document.getElementById('radar-audio-btn');
    const audioIcon = document.getElementById('audio-icon');
    const radarSweep = document.getElementById('radar-sweep');
    const statusMsg = document.getElementById('radar-status-msg');

    if (!screen || !layer) return;

    let isPlaying = false;
    let score = 0;
    let highScore = parseInt(localStorage.getItem('ts-radar-high-score') || '0', 10);
    let timeLeft = 30;
    let combo = 1;
    let maxCombo = 1;
    let interceptsCount = 0;
    let comboTimer = null;
    let gameTimer = null;
    let spawnTimer = null;
    let audioCtx = null;
    let audioMuted = localStorage.getItem('ts-radar-audio-muted') === 'true';

    // Update initial audio button icon
    if (audioIcon) {
      audioIcon.textContent = audioMuted ? '🔇' : '🔊';
    }
    if (audioBtn) {
      audioBtn.setAttribute('aria-pressed', String(!audioMuted));
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audioMuted = !audioMuted;
        localStorage.setItem('ts-radar-audio-muted', String(audioMuted));
        if (audioIcon) audioIcon.textContent = audioMuted ? '🔇' : '🔊';
        audioBtn.setAttribute('aria-pressed', String(!audioMuted));
      });
    }

    if (highEl) highEl.textContent = String(highScore);

    // Dynamic target pool
    const activeTargets = new Map(); // id -> { id, el, x, y, type, points, timeout }
    let targetCounter = 0;

    // High-performance 0 KB Web Audio API Synthesizer
    const playAudio = (type, pitchMultiplier = 1) => {
      if (audioMuted) return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioCtx) {
          audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'hit') {
          const baseFreq = 480 * pitchMultiplier;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(baseFreq, now);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.08);
          gain.gain.setValueAtTime(0.14, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
        } else if (type === 'bonus') {
          // Triad power chord arpeggio
          const freqs = [523.25, 659.25, 783.99, 1046.5];
          freqs.forEach((f, idx) => {
            const subOsc = audioCtx.createOscillator();
            const subGain = audioCtx.createGain();
            subOsc.type = 'triangle';
            subOsc.frequency.setValueAtTime(f, now + idx * 0.045);
            subGain.gain.setValueAtTime(0.12, now + idx * 0.045);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.045 + 0.12);
            subOsc.connect(subGain);
            subGain.connect(audioCtx.destination);
            subOsc.start(now + idx * 0.045);
            subOsc.stop(now + idx * 0.045 + 0.14);
          });
        } else if (type === 'miss') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(240, now);
          osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
        } else if (type === 'laser') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
          osc.start(now);
          osc.stop(now + 0.07);
        } else if (type === 'start') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(280, now);
          osc.frequency.exponentialRampToValueAtTime(840, now + 0.18);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
        } else if (type === 'over') {
          const notes = [440, 370, 311, 220];
          notes.forEach((f, idx) => {
            const subOsc = audioCtx.createOscillator();
            const subGain = audioCtx.createGain();
            subOsc.type = 'sine';
            subOsc.frequency.setValueAtTime(f, now + idx * 0.07);
            subGain.gain.setValueAtTime(0.12, now + idx * 0.07);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.15);
            subOsc.connect(subGain);
            subGain.connect(audioCtx.destination);
            subOsc.start(now + idx * 0.07);
            subOsc.stop(now + idx * 0.07 + 0.16);
          });
        }
      } catch (e) {
        // Fallback gracefully if audio permissions are denied
      }
    };

    const normalAnomalies = [
      'SIG_01: ETL_CORRUPT',
      'PORT_SCAN: 8080',
      'MEMORY_LEAK',
      'SQL_INJECTION',
      '404_DRIFT',
      'RUNDOWN_DELAY',
      'API_TIMEOUT',
      'NULL_PTR_EXCP',
      'BUFFER_OVERFLOW',
    ];

    const rogueAnomalies = [
      'ROGUE_PACKET // RED',
      'ZERO_DAY // CRIT',
      'DDOS_BURST // 10G',
      'HOSTILE_PROBE',
    ];

    const bonusRelays = [
      '[POWER_QUERY_SYNC]',
      '[PYTHON_ETL_CORE]',
      '[PROXMOX_NODE]',
      '[LIVE_FEED_10/11]',
    ];

    // Visual ripple effect at coordinate
    const showHitEffect = (px, py, points, isBonus, isComboBonus) => {
      const ripple = document.createElement('div');
      ripple.className = 'radar-hit-ripple';
      ripple.style.left = `${px}px`;
      ripple.style.top = `${py}px`;
      if (isBonus) {
        ripple.style.borderColor = '#10b981';
        ripple.style.boxShadow = '0 0 16px rgba(16, 185, 129, 0.8)';
      }
      layer.appendChild(ripple);
      setTimeout(() => ripple.remove(), 480);

      const popup = document.createElement('div');
      popup.className = 'radar-score-popup';
      popup.style.left = `${px}px`;
      popup.style.top = `${py}px`;
      if (isBonus) {
        popup.style.color = '#10b981';
        popup.style.borderColor = '#10b981';
        popup.textContent = `+${points} CORE SYNC (+3s)!`;
      } else if (isComboBonus) {
        popup.textContent = `+${points} (${combo}x COMBO!)`;
      } else {
        popup.textContent = `+${points}`;
      }
      layer.appendChild(popup);
      setTimeout(() => popup.remove(), 720);
    };

    // Visual laser firing feedback at click coordinate
    const showLaserPing = (px, py, isHit) => {
      const ping = document.createElement('div');
      ping.className = isHit ? 'radar-laser-burst' : 'radar-miss-ping';
      ping.style.left = `${px}px`;
      ping.style.top = `${py}px`;
      layer.appendChild(ping);
      setTimeout(() => ping.remove(), 350);
    };

    const removeTarget = (id) => {
      const target = activeTargets.get(id);
      if (target) {
        clearTimeout(target.timeout);
        target.el.remove();
        activeTargets.delete(id);
      }
    };

    const spawnTarget = () => {
      if (!layer) return;
      const maxActive = isPlaying ? 4 : 2;
      if (activeTargets.size >= maxActive) return;

      // Polar percentage coordinates centered in radar circle (16% to 38% radius from center 50%, 50%)
      const angle = Math.random() * Math.PI * 2;
      const radiusPercent = 16 + Math.random() * 22;
      const tx = Math.round(50 + Math.cos(angle) * radiusPercent);
      const ty = Math.round(50 + Math.sin(angle) * radiusPercent);

      const roll = Math.random();
      let type = 'normal';
      let tagText = normalAnomalies[Math.floor(Math.random() * normalAnomalies.length)];
      let basePoints = 100;
      let duration = 3800;

      if (roll < 0.14) {
        type = 'bonus';
        tagText = bonusRelays[Math.floor(Math.random() * bonusRelays.length)];
        basePoints = 300;
        duration = 3400;
      } else if (roll < 0.36) {
        type = 'rogue';
        tagText = rogueAnomalies[Math.floor(Math.random() * rogueAnomalies.length)];
        basePoints = 175;
        duration = 3000;
      }

      const id = ++targetCounter;
      const targetEl = document.createElement('div');
      targetEl.className = `radar-target target-${type}`;
      targetEl.style.left = `${tx}%`;
      targetEl.style.top = `${ty}%`;
      targetEl.setAttribute('role', 'button');
      targetEl.setAttribute('tabindex', '0');
      targetEl.setAttribute('aria-label', `Target: ${tagText}`);
      targetEl.dataset.targetId = String(id);

      targetEl.innerHTML = `
        <span class="target-box"><span class="target-timer-ring"></span></span>
        <span class="target-tag">${tagText}</span>
      `;

      // Direct click listener on target element for guaranteed hits
      targetEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const tRect = targetEl.getBoundingClientRect();
        handleScreenClick(tRect.left + tRect.width / 2, tRect.top + tRect.height / 2, targetEl);
      });

      layer.appendChild(targetEl);

      const timeout = setTimeout(() => {
        if (activeTargets.has(id)) {
          targetEl.style.opacity = '0';
          setTimeout(() => {
            removeTarget(id);
            if (isPlaying) {
              combo = 1;
              if (comboEl) comboEl.textContent = '1x';
              setTimeout(spawnTarget, 300);
            }
          }, 180);
        }
      }, duration);

      activeTargets.set(id, {
        id,
        el: targetEl,
        tx,
        ty,
        type,
        points: basePoints,
        timeout
      });
    };

    // Core Intercept Mechanics (proximity detection + laser fire)
    const handleScreenClick = (clientX, clientY, clickedTargetEl) => {
      const rect = screen.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      // Resume AudioContext if suspended (required on Safari / iOS / Android on first user gesture)
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }

      // If game is not active, start it right now!
      if (!isPlaying) {
        startGame();
      }

      let closestTarget = null;
      let minDistance = 64; // Generous 64px proximity threshold for touch + desktop

      // Check direct target click first
      const directTarget = clickedTargetEl ? clickedTargetEl.closest('.radar-target') : null;
      if (directTarget && directTarget.dataset.targetId) {
        const targetId = Number(directTarget.dataset.targetId);
        if (activeTargets.has(targetId)) {
          closestTarget = activeTargets.get(targetId);
          minDistance = 0;
        }
      }

      // Proximity detection using getBoundingClientRect() - 100% screen and device independent
      if (!closestTarget) {
        activeTargets.forEach((target) => {
          const tRect = target.el.getBoundingClientRect();
          const targetCenterX = tRect.left + tRect.width / 2;
          const targetCenterY = tRect.top + tRect.height / 2;
          const dx = targetCenterX - clientX;
          const dy = targetCenterY - clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDistance) {
            minDistance = dist;
            closestTarget = target;
          }
        });
      }

      if (closestTarget) {
        // HIT!
        interceptsCount += 1;
        const isBonus = closestTarget.type === 'bonus';

        if (isBonus) {
          // Bonus time reward (+3s, max 45s)
          timeLeft = Math.min(timeLeft + 3, 45);
          if (timerEl) {
            timerEl.textContent = `${timeLeft}s`;
            timerEl.classList.add('timer-boost');
            setTimeout(() => timerEl.classList.remove('timer-boost'), 500);
          }
          playAudio('bonus');
        } else {
          // Combo progression
          combo = Math.min(combo + 1, 4);
          if (combo > maxCombo) maxCombo = combo;
          playAudio('hit', 1 + (combo - 1) * 0.22);
        }

        clearTimeout(comboTimer);
        comboTimer = setTimeout(() => {
          combo = 1;
          if (comboEl) comboEl.textContent = '1x';
        }, 2400);

        if (comboEl) {
          comboEl.textContent = combo > 1 ? `${combo}x` : '1x';
          comboEl.classList.toggle('combo-active', combo > 1);
        }

        const pointsEarned = closestTarget.points * (isBonus ? 1 : combo);
        score += pointsEarned;
        if (scoreEl) scoreEl.textContent = String(score);

        showLaserPing(clickX, clickY, true);

        // Get target coordinates relative to screen for hit ripple
        const tRect = closestTarget.el.getBoundingClientRect();
        const hitX = tRect.left + tRect.width / 2 - rect.left;
        const hitY = tRect.top + tRect.height / 2 - rect.top;
        showHitEffect(hitX, hitY, pointsEarned, isBonus, combo > 1);
        removeTarget(closestTarget.id);

        if (statusMsg) {
          statusMsg.textContent = isBonus
            ? `CORE SYNCHRONIZED · +${pointsEarned} PTS · +3s EXTENSION`
            : `TARGET ELIMINATED · +${pointsEarned} PTS · ${combo}x COMBO`;
        }

        // Fast respawn for fluid action
        setTimeout(spawnTarget, 220);
      } else {
        // MISS!
        playAudio('miss');
        showLaserPing(clickX, clickY, false);
        combo = 1;
        if (comboEl) {
          comboEl.textContent = '1x';
          comboEl.classList.remove('combo-active');
        }
      }
    };

    // Cross-device interaction handler (mouse click + mobile touch)
    let lastActionTime = 0;
    const onRadarInteraction = (e) => {
      // Don't intercept if clicking audio button or retry button
      if (e.target.closest('#radar-audio-btn') || e.target.closest('#radar-retry-btn')) {
        return;
      }

      const now = Date.now();
      // Debounce touch + click synthetic event pairing (150ms)
      if (now - lastActionTime < 150) return;
      lastActionTime = now;

      let clientX = e.clientX;
      let clientY = e.clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      }

      // If start button is clicked
      if (e.target.closest('#radar-start-btn')) {
        if (!isPlaying) {
          startGame();
          return;
        }
      }

      handleScreenClick(clientX, clientY, e.target);
    };

    screen.addEventListener('click', onRadarInteraction);
    screen.addEventListener('touchend', onRadarInteraction, { passive: true });

    // Keyboard controls (Spacebar or Enter to intercept nearest anomaly)
    screen.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!isPlaying) {
          startGame();
          return;
        }
        // Fire at closest target or screen center
        if (activeTargets.size > 0) {
          const firstTarget = activeTargets.values().next().value;
          if (firstTarget) {
            const tRect = firstTarget.el.getBoundingClientRect();
            handleScreenClick(tRect.left + tRect.width / 2, tRect.top + tRect.height / 2, firstTarget.el);
            return;
          }
        }
        const rect = screen.getBoundingClientRect();
        handleScreenClick(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });

    const startGame = () => {
      if (isPlaying) return;
      isPlaying = true;
      score = 0;
      timeLeft = 30;
      combo = 1;
      maxCombo = 1;
      interceptsCount = 0;

      if (scoreEl) scoreEl.textContent = '0';
      if (timerEl) timerEl.textContent = '30s';
      if (comboEl) {
        comboEl.textContent = '1x';
        comboEl.classList.remove('combo-active');
      }
      if (btnText) btnText.textContent = 'DEFENSE ACTIVE...';
      if (statusMsg) statusMsg.textContent = 'INTERCEPT INCOMING ANOMALIES // 30s SURVIVAL';
      if (debrief) debrief.hidden = true;
      if (idleBanner) idleBanner.classList.add('is-hidden');
      if (radarSweep) radarSweep.classList.add('is-playing');

      playAudio('start');

      // Clear existing targets and spawn initial wave
      activeTargets.forEach((t) => {
        clearTimeout(t.timeout);
        t.el.remove();
      });
      activeTargets.clear();

      spawnTarget();
      setTimeout(spawnTarget, 250);
      setTimeout(spawnTarget, 600);

      clearInterval(spawnTimer);
      spawnTimer = setInterval(() => {
        if (isPlaying && activeTargets.size < 4) {
          spawnTarget();
        }
      }, 850);

      clearInterval(gameTimer);
      gameTimer = setInterval(() => {
        timeLeft -= 1;
        if (timerEl) timerEl.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);
    };

    const endGame = () => {
      isPlaying = false;
      clearInterval(gameTimer);
      clearInterval(spawnTimer);
      clearTimeout(comboTimer);

      if (radarSweep) radarSweep.classList.remove('is-playing');
      if (timerEl) timerEl.textContent = '0s';
      if (btnText) btnText.textContent = 'INTERCEPT SIM [START]';
      if (idleBanner) idleBanner.classList.remove('is-hidden');

      playAudio('over');

      // Update High Score
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('ts-radar-high-score', String(highScore));
        if (highEl) highEl.textContent = String(highScore);
      }

      // Rank calculation
      let rank = 'TELEMETRY OPERATIVE // C-TIER';
      if (score >= 2600) rank = 'DEFENSE ARCHITECT // SSS-TIER';
      else if (score >= 1800) rank = 'CYBER COMMANDER // S-TIER';
      else if (score >= 1100) rank = 'SYSTEMS SPECIALIST // A-TIER';
      else if (score >= 600) rank = 'DATA ANALYST // B-TIER';

      if (debriefScore) debriefScore.textContent = `SCORE: ${score}`;
      if (debriefStat) debriefStat.textContent = `INTERCEPTS: ${interceptsCount} · MAX COMBO: ${maxCombo}x`;
      if (debriefRank) debriefRank.textContent = `RANK: ${rank}`;
      if (debrief) debrief.hidden = false;

      if (statusMsg) statusMsg.textContent = `MISSION COMPLETE · FINAL SCORE: ${score} · ${rank}`;

      // Reset to idle target after brief delay
      setTimeout(() => {
        activeTargets.forEach((t) => {
          clearTimeout(t.timeout);
          t.el.remove();
        });
        activeTargets.clear();
        spawnTarget();
      }, 1000);
    };

    startBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      startGame();
    });

    retryBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (debrief) debrief.hidden = true;
      startGame();
    });

    // Close debrief modal on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && debrief && !debrief.hidden) {
        debrief.hidden = true;
      }
    });

    // Spawn 1 initial idle target on page load
    spawnTarget();
  };


  initRadarGame();
});
