// public/js/users.js

document.addEventListener('DOMContentLoaded', () => {
  // –– Tab & Search Setup ––
  const tabs        = document.querySelectorAll('.users-tabs .tab');
  const searchInput = document.getElementById('user-search');
  const container   = document.getElementById('users-container');
  let currentFilter = 'all';
  let currentSearch = '';

  function renderList() {
    container.querySelectorAll('.user-record').forEach(rec => {
      const type = rec.dataset.userType;
      let show = (currentFilter === 'all' || currentFilter === type);
      if (show && currentSearch) {
        show = rec.innerText.toLowerCase().includes(currentSearch);
      }
      rec.classList.toggle('hidden', !show);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderList();
    });
  });

  searchInput.addEventListener('input', e => {
    currentSearch = e.target.value.trim().toLowerCase();
    renderList();
  });

  renderList();

  // –– Modal & CRUD Setup ––
  const newUserBtn            = document.getElementById('new-user-btn');
  const userModal             = document.getElementById('user-modal');
  const deleteUserModal       = document.getElementById('delete-user-modal');
  const modalCloseButtons     = document.querySelectorAll('.modal-close');
  const modalOverlays         = document.querySelectorAll('.modal-overlay');
  const form                  = document.getElementById('user-form');
  const idIn                  = document.getElementById('user-id');
  const nameIn                = document.getElementById('user-name');
  const emailIn               = document.getElementById('user-email');
  const phoneIn               = document.getElementById('user-phone');
  const typeIn                = document.getElementById('user-type');
  const submitBtn             = document.getElementById('user-submit-btn');
  const confirmDeleteBtn      = document.getElementById('confirm-delete-user-btn');
  const cancelDeleteBtn       = document.getElementById('cancel-delete-user-btn');

  let currentUserId = null;
  let isEdit        = false;

  function openModal(m)  { m.classList.remove('hidden'); }
  function closeModal(m) { m.classList.add('hidden'); }

  modalCloseButtons.forEach(b => b.addEventListener('click', () => {
    closeModal(userModal); closeModal(deleteUserModal);
  }));
  modalOverlays.forEach(o => o.addEventListener('click', () => {
    closeModal(userModal); closeModal(deleteUserModal);
  }));

  // New User
  newUserBtn.addEventListener('click', () => {
    isEdit = false;
    currentUserId = null;
    idIn.value = '';
    form.reset();
    document.getElementById('user-modal-title').textContent = 'New User';
    submitBtn.textContent = 'Create';
    openModal(userModal);
  });

  // Per-record Update / Delete
  container.querySelectorAll('.user-record').forEach(rec => {
    const id = rec.dataset.id;

    // Update
    rec.querySelector('.update-user-btn')?.addEventListener('click', () => {
      isEdit = true;
      currentUserId = id;
      idIn.value = id;
      document.getElementById('user-modal-title').textContent = 'Update User';
      submitBtn.textContent = 'Update';
      nameIn.value = rec.dataset.name;
      emailIn.value = rec.dataset.email;
      phoneIn.value = rec.dataset.phone;
      typeIn.value = rec.dataset.userType;
      openModal(userModal);
    });

    // Delete
    rec.querySelector('.delete-user-btn')?.addEventListener('click', () => {
      currentUserId = id;
      openModal(deleteUserModal);
    });
  });

  // Submit (Create or Update)
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      name:     nameIn.value,
      email:    emailIn.value,
      phone:    phoneIn.value,
      userType: typeIn.value
    };
    try {
      const url    = isEdit
        ? `/admin/users/${currentUserId}`
        : '/admin/users';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Error');
      location.reload();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });

  // Confirm Delete
  confirmDeleteBtn.addEventListener('click', async () => {
    try {
      const res = await fetch(`/admin/users/${currentUserId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Delete failed');
      location.reload();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
  cancelDeleteBtn.addEventListener('click', () => closeModal(deleteUserModal));
});
