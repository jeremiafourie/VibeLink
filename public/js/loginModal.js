document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  const modal    = document.getElementById('login-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const overlay  = modal.querySelector('.modal-overlay');
  const tabs     = modal.querySelectorAll('.tab');
  const stepPhone= modal.querySelector('#step-phone');
  const stepOtp  = modal.querySelector('#step-otp');
  const phoneIn  = modal.querySelector('#login-phone');
  const sendBtn  = modal.querySelector('#send-otp-btn');
  const dispPhone= modal.querySelector('#display-phone');
  const otpIn    = modal.querySelector('#otp-code');
  const verifyBtn= modal.querySelector('#verify-otp-btn');
  const errMsg   = modal.querySelector('.error-message');
  const statMsg  = modal.querySelector('.status-message');

  // open/close
  loginBtn.addEventListener('click', () => {
    resetModal(); 
    modal.classList.remove('hidden');
  });
  [closeBtn, overlay].forEach(el =>
    el.addEventListener('click', () => modal.classList.add('hidden'))
  );

  // tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      console.log("supposed to change class")
    });
  });

  // STEP 1: send OTP
  sendBtn.addEventListener('click', async () => {
    errMsg.textContent = '';
    const phone    = phoneIn.value.trim();
    const userType = modal.querySelector('.tab.active').innerHTML.toLowerCase();

    if (!phone) {
      errMsg.textContent = 'Please enter your phone number.';
      return;
    }

    // 1) check user exists
    let res = await fetch('/auth/check-user', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ phone, userType })
    });
    if (!res.ok) {
      errMsg.textContent = 'No account found for that phone.';
      return;
    }

    // 2) request OTP
    res = await fetch('/auth/login/request', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ phone, userType })
    });
    if (!res.ok) {
      errMsg.textContent = 'Failed to send OTP. Try again later.';
      return;
    }

    // advance to OTP step
    dispPhone.textContent = phone;
    stepPhone.classList.add('hidden');
    stepOtp.classList.remove('hidden');
  });

  // STEP 2: verify OTP
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

      if (data.success) {
        return statMsg.textContent = data.message; // "Login successful"
      } else {
        return statMsg.textContent = data.message || 'Invalid OTP.';
      }
    } catch (err) {
      console.error(err);
      statMsg.textContent = 'Network error. Please try again.';
    }
  });

  function resetModal() {
    // reset to step 1 & clear messages
    stepOtp.classList.add('hidden');
    stepPhone.classList.remove('hidden');
    phoneIn.value = otpIn.value = '';
    errMsg.textContent = statMsg.textContent = '';
  }
});
