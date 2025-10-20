async function deleteSession(sessionId) {
  if (!confirm('Are you sure you want to delete this session?')) {
    return;
  }
  
  try {
    const response = await fetch(`/api/sessions/${sessionId}`, {
      method: 'DELETE'
    });
    
    const result = await response.json();
    
    if (result.success) {
      const row = document.querySelector(`tr[data-session-id="${sessionId}"]`);
      if (row) {
        row.style.transition = 'opacity 0.3s ease';
        row.style.opacity = '0';
        setTimeout(() => {
          row.remove();
          checkEmptyState();
        }, 300);
      }
      
      showMessage('Session deleted successfully', 'success');
    } else {
      showMessage(result.error || 'Failed to delete session', 'danger');
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('Network error. Please try again.', 'danger');
  }
}

function checkEmptyState() {
  const tbody = document.querySelector('tbody');
  if (tbody && tbody.children.length === 0) {
    window.location.reload();
  }
}

function showMessage(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
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