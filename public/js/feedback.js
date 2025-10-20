document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  if (!validateForm(data)) {
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
    return;
  }
  
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      window.location.href = '/feedback?success=true';
    } else {
      showError(result.error || 'Failed to send feedback');
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  } catch (error) {
    console.error('Error:', error);
    showError('Network error. Please try again.');
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
});

function validateForm(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!data.name || data.name.trim().length < 2) {
    showError('Please enter a valid name (at least 2 characters)');
    return false;
  }
  
  if (!emailRegex.test(data.email)) {
    showError('Please enter a valid email address');
    return false;
  }
  
  if (!data.message || data.message.trim().length < 10) {
    showError('Please enter a message (at least 10 characters)');
    return false;
  }
  
  return true;
}

function showError(message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-danger alert-dismissible fade show';
  alertDiv.innerHTML = `
    <i class="bi bi-exclamation-triangle"></i> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  const form = document.getElementById('feedbackForm');
  form.parentElement.insertBefore(alertDiv, form);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('is-invalid');
  });
});