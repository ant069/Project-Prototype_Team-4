let timerInterval = null;
let currentExercise = null;
let startTime = null;
let remaining = 0;

function startExercise(exerciseName, seconds) {
  // Inicializa estado
  clearInterval(timerInterval);
  currentExercise = exerciseName;
  startTime = Date.now();
  remaining = seconds;

  // Actualiza UI
  const titleEl = document.getElementById('exerciseTitle');
  const timerEl = document.getElementById('timerDisplay');
  const instrEl = document.getElementById('instructionText');
  titleEl.textContent = exerciseName;
  timerEl.textContent = formatTime(remaining);
  instrEl.textContent = getInstruction(exerciseName, seconds);

  // Abre modal y arranca timer
  const timerModal = new bootstrap.Modal(document.getElementById('timerModal'));
  timerModal.show();

  function tick() {
    remaining -= 1;
    timerEl.textContent = formatTime(Math.max(remaining, 0));

    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerModal.hide();
      const minutes = Math.max(1, Math.round((Date.now() - startTime) / 60000));
      showCompletionModal(currentExercise, minutes);
    }
  }

  tick();
  timerInterval = setInterval(tick, 1000);
}

function stopExercise() {
  clearInterval(timerInterval);
  const tm = bootstrap.Modal.getInstance(document.getElementById('timerModal'));
  if (tm) tm.hide();

  // Si hubo progreso, ofrecer guardar
  if (currentExercise && startTime) {
    const minutes = Math.max(1, Math.round((Date.now() - startTime) / 60000));
    showCompletionModal(currentExercise, minutes);
  }

  // Reset
  remaining = 0;
}

function showCompletionModal(exerciseName, durationMinutes) {
  document.getElementById('exerciseType').value = exerciseName;
  document.getElementById('duration').value = durationMinutes;

  const cm = new bootstrap.Modal(document.getElementById('completionModal'));
  cm.show();
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function getInstruction(name, seconds) {
  if (name.includes('4-7-8')) return 'Inhale 4s • Hold 7s • Exhale 8s';
  if (name.includes('Box')) return 'Inhale 4s • Hold 4s • Exhale 4s • Hold 4s';
  if (name.includes('Deep')) return 'Inhale 5s • Exhale 5s';
  return 'Focus on your breath...';
}

// Guardar sesión al enviar el formulario del modal
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sessionForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      exerciseType: form.exerciseType.value,
      duration: parseInt(form.duration.value, 10),
      mood: form.mood.value,
      notes: form.notes.value || ''
    };

    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const payload = await res.json().catch(() => ({}));

      if (res.ok) {
        bootstrap.Modal.getInstance(document.getElementById('completionModal')).hide();
        alert('Session saved! Check your tracker.');
        form.reset();
        // Reset estado
        currentExercise = null;
        startTime = null;
        remaining = 0;
      } else {
        alert('Failed to save session: ' + (payload.error || res.statusText));
      }
    } catch (err) {
      console.error('Error saving session:', err);
      alert('Error saving session. Please try again.');
    }
  });
});