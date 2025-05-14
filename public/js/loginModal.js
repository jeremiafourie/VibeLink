// loginModal.js
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const loginBtn   = document.getElementById('login-btn');
  const logoutBtn  = document.getElementById('logout-btn');
  const modal      = document.getElementById('login-modal');
  const closeBtn   = modal.querySelector('.modal-close');
  const overlay    = modal.querySelector('.modal-overlay');

  const stepPhone  = modal.querySelector('#step-phone');
  const stepOtp    = modal.querySelector('#step-otp');

  const phoneIn    = modal.querySelector('#login-phone');
  const sendBtn    = modal.querySelector('#send-otp-btn');
  const dispPhone  = modal.querySelector('#display-phone');
  const otpIn      = modal.querySelector('#otp-code');
  const verifyBtn  = modal.querySelector('#verify-otp-btn');

  const errMsg     = modal.querySelector('.error-message');
  const statMsg    = modal.querySelector('.status-message');

  // Update nav/UI based on login state
  function updateAuthUI(user) {
    document.getElementById('login-li').classList.toggle('hidden', !!user);
    document.getElementById('logout-li').classList.toggle('hidden', !user);
    document.querySelectorAll('.nav-auth.admin').forEach(el =>
      el.classList.toggle('hidden', !(user && user.userType==='admin'))
    );
    const contactNav = document.getElementById('contact-nav');
    if (user && user.userType==='admin') contactNav.classList.add('hidden');
    else contactNav.classList.remove('hidden');
    document.querySelectorAll('.auth-only').forEach(el => {
      if (el.classList.contains('modal')) return;
      const showFor = el.dataset.userType;
      
      if (user) {
        el.classList.toggle('hidden', false);
      } else {
        el.classList.toggle('hidden', true);
      }
      
    });
  }

  // Auto-format phone as 000 000 0000
  phoneIn.addEventListener('input', e => {
    let val = e.target.value.replace(/\D/g, '').slice(0,10);
    if (val.length > 6) val = val.slice(0,3) + ' ' + val.slice(3,6) + ' ' + val.slice(6);
    else if (val.length > 3) val = val.slice(0,3) + ' ' + val.slice(3);
    e.target.value = val;
  });

  // Open/close modal
  loginBtn.addEventListener('click', () => { resetModal(); modal.classList.remove('hidden'); });
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  overlay.addEventListener('click', () => modal.classList.add('hidden'));

  // STEP 1: Send OTP
  sendBtn.addEventListener('click', async () => {
    errMsg.textContent = '';
    const phoneInput = phoneIn.value.trim();
    if (!phoneInput) {
      errMsg.textContent = 'Please enter your phone number.';
      return;
    }
    const pattern = /^\d{3} \d{3} \d{4}$/;
    if (!pattern.test(phoneInput)) {
      errMsg.textContent = 'Phone number must be in format 000 000 0000.';
      return;
    }
    const phone = phoneInput.replaceAll(' ', '');
    // Check user & request OTP
    let res = await fetch('/auth/check-user', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ phone })
    });
    if (!res.ok) { errMsg.textContent = 'No account found for that phone.'; return; }
    res = await fetch('/auth/login/request', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ phone })
    });
    if (!res.ok) { errMsg.textContent = 'Failed to send OTP. Try again later.'; return; }
    dispPhone.textContent = phone;
    stepPhone.classList.add('hidden');
    stepOtp.classList.remove('hidden');
  });

  // STEP 2: Verify OTP & show success
  verifyBtn.addEventListener('click', async () => {
    statMsg.style.color = '';
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
        method: 'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ phone, code })
      });
      const data = await res.json();
      if (!data.success) {
        statMsg.style.color = 'red';
        statMsg.textContent = data.message || 'Invalid OTP.';
        return;
      }
      // Hide inputs & Lottie
      stepOtp.querySelector('p').classList.add('hidden');
      stepOtp.querySelector('label[for="otp-code"]').classList.add('hidden');
      otpIn.classList.add('hidden');
      verifyBtn.classList.add('hidden');
      statMsg.classList.add('hidden');
      document.getElementById('lottie-container').classList.add('hidden');

      // Animate logo + welcome text
      const successDiv = stepOtp.querySelector('#success-message');
      const logo  = successDiv.querySelector('.login-logo');
      const msgEl = successDiv.querySelector('#welcome-message');

      logo.classList.add('visible');
      msgEl.textContent = `Welcome, ${data.name}!`;
      msgEl.classList.add('visible');
      successDiv.classList.remove('hidden');

      updateAuthUI(data.user || data);
      setTimeout(() => modal.classList.add('hidden'), 1700);

    } catch (err) {
      console.error(err);
      statMsg.style.color = 'red';
      statMsg.textContent = 'Network error. Please try again.';
    }
  });

  // Logout
  logoutBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/auth/logout', { method:'POST' });
      const data = await res.json();
      if (data.success) updateAuthUI(null);
    } catch (e) { console.error(e); }
  });

  // Reset to Step 1
  function resetModal() {
    stepOtp.classList.add('hidden');
    stepPhone.classList.remove('hidden');
    phoneIn.value = '';
    otpIn.value   = '';
    errMsg.textContent  = '';
    statMsg.textContent = '';
    otpIn.classList.remove('hidden');
    verifyBtn.classList.remove('hidden');
    stepOtp.querySelector('p').classList.remove('hidden');
    stepOtp.querySelector('label[for="otp-code"]').classList.remove('hidden');
    stepOtp.querySelector('#success-message').classList.add('hidden');
    document.getElementById('lottie-container').classList.remove('hidden');
  }

  // On load, check auth status
  fetch('/auth/status')
    .then(r => r.json())
    .then(data => updateAuthUI(data.success ? data.user : null))
    .catch(console.error);
});
