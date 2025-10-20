let exerciseTimer;
let exerciseStartTime;
let currentExercise;
let currentDuration;

const timerModal = new bootstrap.Modal(document.getElementById('timerModal'));
const completionModal = new bootstrap.Modal(document.getElementById('completionModal'));

function startExercise(exerciseName, totalSeconds) {
  currentExercise = exerciseName;
  currentDuration = Math.floor(totalSeconds / 60);
  exerciseStartTime = Date.now();
  
  document.getElementById('exerciseTitle').textContent = exerciseName;
  document.getElementById('timerDisplay').textContent = formatTime(totalSeconds);
  
  timerModal.show();
  
  let remainingSeconds = totalSeconds;
  
  exerciseTimer = setInterval(() => {
    remainingSeconds--;
    document.getElementById('timerDisplay').textContent = formatTime(remainingSeconds);
    
    updateInstruction(exerciseName, remainingSeconds, totalSeconds);
    
    if (remainingSeconds <= 0) {
      stopExercise();
      timerModal.hide();
      showCompletionForm();
    }
  }, 1000);
}

function updateInstruction(exerciseName, remaining, total) {
  const instructionEl = document.getElementById('instructionText');
  
  if (exerciseName === '4-7-8') {
    const cycle = 19;
    const position = remaining % cycle;
    
    if (position >= 15) {
      instructionEl.textContent = 'Inhale through nose (4s)';
    } else if (position >= 8) {
      instructionEl.textContent = 'Hold your breath (7s)';
    } else {
      instructionEl.textContent = 'Exhale through mouth (8s)';
    }
  } else if (exerciseName === 'Box Breathing') {
    const cycle = 16;
    const position = remaining % cycle;
    
    if (position >= 12) {
      instructionEl.textContent = 'Breathe in (4s)';
    } else if (position >= 8) {
      instructionEl.textContent = 'Hold (4s)';
    } else if (position >= 4) {
      instructionEl.textContent = 'Breathe out (4s)';
    } else {
      instructionEl.textContent = 'Hold empty (4s)';
    }
  } else if (exerciseName === 'Deep Breathing') {
    const cycle = 10;
    const position = remaining % cycle;
    
    if (position >= 5) {
      instructionEl.textContent = 'Breathe in slowly (5s)';
    } else {
      instructionEl.textContent = 'Breathe out slowly (5s)';
    }
  }
}

function stopExercise() {
  clearInterval(exerciseTimer);
  exerciseTimer = null;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showCompletionForm() {
  document.getElementById('exerciseType').value = currentExercise;
  document.getElementById('duration').value = currentDuration;
  completionModal.show();
}

document.getElementById('sessionForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      completionModal.hide();
      showSuccessMessage('Session saved successfully!');
      e.target.reset();
    } else {
      showErrorMessage(result.error || 'Failed to save session');
    }
  } catch (error) {
    console.error('Error:', error);
    showErrorMessage('Network error. Please try again.');
  }
});

function showSuccessMessage(message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
  alertDiv.style.zIndex = '9999';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

function showErrorMessage(message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
  alertDiv.style.zIndex = '9999';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

document.getElementById('timerModal').addEventListener('hidden.bs.modal', () => {
  if (exerciseTimer) {
    stopExercise();
  }
});