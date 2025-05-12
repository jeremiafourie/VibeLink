document.addEventListener('DOMContentLoaded', () => {
  // Header buttons
  const loginBtn   = document.getElementById('login-btn');
  const loginLi    = document.getElementById('login-li');
  const logoutBtn  = document.getElementById('logout-btn');
  const logoutLi   = document.getElementById('logout-li');

  // Modal elements
  const modal      = document.getElementById('login-modal');
  const closeBtn   = modal.querySelector('.modal-close');
  const overlay    = modal.querySelector('.modal-overlay');
  const headerTabs = modal.querySelector('.modal-header');
  const tabs       = modal.querySelectorAll('.tab');

  // Step elements
  const stepPhone  = modal.querySelector('#step-phone');
  const stepOtp    = modal.querySelector('#step-otp');
  const phoneIn    = modal.querySelector('#login-phone');
  const sendBtn    = modal.querySelector('#send-otp-btn');
  const dispPhone  = modal.querySelector('#display-phone');
  const otpIn      = modal.querySelector('#otp-code');
  const verifyBtn  = modal.querySelector('#verify-otp-btn');

  // Messages
  const errMsg     = modal.querySelector('.error-message');
  const statMsg    = modal.querySelector('.status-message');

  // Open the modal
  loginBtn.addEventListener('click', () => {
    resetModal();
    modal.classList.remove('hidden');
  });

  // Close the modal
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  overlay.addEventListener('click', () => modal.classList.add('hidden'));

  // Switch between Org/Admin tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // STEP 1: Send OTP
  sendBtn.addEventListener('click', async () => {
    errMsg.textContent = '';
    const phone    = phoneIn.value.trim();
    const userType = modal.querySelector('.tab.active').dataset.tab;

    if (!phone) {
      errMsg.textContent = 'Please enter your phone number.';
      return;
    }

    // 1) Check user exists
    let res = await fetch('/auth/check-user', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ phone, userType })
    });
    if (!res.ok) {
      errMsg.textContent = 'No account found for that phone.';
      return;
    }

    // 2) Request OTP
    res = await fetch('/auth/login/request', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ phone, userType })
    });
    if (!res.ok) {
      errMsg.textContent = 'Failed to send OTP. Try again later.';
      return;
    }

    // Advance to OTP step
    headerTabs.classList.add('hidden');
    dispPhone.textContent = phone;
    stepPhone.classList.add('hidden');
    stepOtp.classList.remove('hidden');
  });

  // STEP 2: Verify OTP
  verifyBtn.addEventListener('click', async () => {
    statMsg.textContent = '';
    const phone = dispPhone.textContent;
    const code  = otpIn.value.trim();

    if (!code || code.length !== 6) {
      statMsg.style.color = 'red';
      statMsg.textContent = 'Please enter the 6-digit code.';
      return;
    }

    try {
      const res  = await fetch('/auth/login/verify', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ phone, code })
      });
      const data = await res.json();

      if (!data.success) {
        statMsg.style.color = 'red';
        statMsg.textContent = data.message || 'Invalid OTP.';
        return;
      }

      // ——— SUCCESS ———
      statMsg.style.color = 'green';
      statMsg.textContent = data.message; // "Welcome, Name!"

      // Hide the "We've sent…" paragraph
      stepOtp.querySelector('p').classList.add('hidden');
      // Hide the "Enter code" label
      const otpLabel = stepOtp.querySelector('label[for="otp-code"]');
      if (otpLabel) otpLabel.classList.add('hidden');
      // Hide the input and button
      otpIn.classList.add('hidden');
      verifyBtn.classList.add('hidden');

      // Toggle header buttons & show authorized nav items
      loginLi.classList.add('hidden');
      logoutLi.classList.remove('hidden');
      document.querySelectorAll(`.nav-auth.${data.userType}`)
              .forEach(el => el.classList.remove('hidden'));

      // Auto-close modal after 5s
      setTimeout(() => modal.classList.add('hidden'), 5000);

    } catch (err) {
      console.error(err);
      statMsg.style.color = 'red';
      statMsg.textContent = 'Network error. Please try again.';
    }
  });

  // LOGOUT
  logoutBtn.addEventListener('click', async () => {
    try {
      const res  = await fetch('/auth/logout', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        logoutLi.classList.add('hidden');
        loginLi.classList.remove('hidden');
        document.querySelectorAll('.nav-auth')
                .forEach(el => el.classList.add('hidden'));
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (err) {
      console.error(err);
    }
  });

  // Reset modal to initial state
  function resetModal() {
    headerTabs.classList.remove('hidden');
    stepOtp.classList.add('hidden');
    stepPhone.classList.remove('hidden');
    phoneIn.value = '';
    otpIn.value   = '';
    errMsg.textContent  = '';
    statMsg.textContent = '';
    otpIn.classList.remove('hidden');
    verifyBtn.classList.remove('hidden');
    stepOtp.querySelector('p').classList.remove('hidden');
    const otpLabel = stepOtp.querySelector('label[for="otp-code"]');
    if (otpLabel) otpLabel.classList.remove('hidden');
  }
});
