// public/js/events.js (updated) :contentReference[oaicite:3]{index=3}:contentReference[oaicite:4]{index=4}
document.addEventListener('DOMContentLoaded', () => {
  // — grab elements —
  const createBtn      = document.getElementById('create-event-btn');
  const eventModal     = document.getElementById('event-modal');
  const deleteModal    = document.getElementById('delete-modal');
  const closeButtons   = document.querySelectorAll('.modal-close');
  const overlays       = document.querySelectorAll('.modal-overlay');
  const form           = document.getElementById('event-form');
  const titleIn        = document.getElementById('event-title');
  const descIn         = document.getElementById('event-description');
  const dateIn         = document.getElementById('event-date');
  const locIn          = document.getElementById('event-location');
  const catIn          = document.getElementById('event-category');
  const imgIn          = document.getElementById('event-image');
  const idIn           = document.getElementById('event-id');
  const submitBtn      = document.getElementById('event-submit-btn');
  const confirmDelBtn  = document.getElementById('confirm-delete-btn');
  const cancelDelBtn   = document.getElementById('cancel-delete-btn');

  let currentEventId = null;
  let isUpdate       = false;

  // — search + filter setup —
  const searchInput   = document.getElementById('search-input');
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const eventItems    = document.querySelectorAll('.event-card');

  let searchTerm     = '';
  let categoryFilter = 'all';

  // unified filter function
  function applyFilters() {
    eventItems.forEach(card => {
      const title    = card.querySelector('h3').textContent.toLowerCase();
      const category = card.dataset.category;
      const matchesCategory = (categoryFilter === 'all' || category === categoryFilter);
      const matchesSearch   = title.includes(searchTerm);
      card.style.display = (matchesCategory && matchesSearch) ? 'block' : 'none';
    });
  }

  // category buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      categoryFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  // live search
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // — shared open/close modal logic —
  function openModal(m)  { m.classList.remove('hidden'); }
  function closeModal(m) { m.classList.add('hidden'); }
  closeButtons.forEach(b => b.addEventListener('click', () => {
    closeModal(eventModal); closeModal(deleteModal);
  }));
  overlays.forEach(o => o.addEventListener('click', () => {
    closeModal(eventModal); closeModal(deleteModal);
  }));

  // — Create Event button —
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      isUpdate = false;
      idIn.value = '';
      form.reset();
      document.getElementById('event-modal-title').textContent = 'Create Event';
      submitBtn.textContent = 'Create';
      openModal(eventModal);
    });
  }

  // — per-card Update/Delete wiring —
  document.querySelectorAll('.event-card').forEach(card => {
    const id     = card.dataset.id;
    const delBtn = card.querySelector('.delete-event-btn');
    const updBtn = card.querySelector('.update-event-btn');

    if (updBtn) {
      updBtn.addEventListener('click', () => {
        isUpdate = true;
        currentEventId = id;
        idIn.value = id;
        document.getElementById('event-modal-title').textContent = 'Update Event';
        submitBtn.textContent = 'Update';

        // populate fields
        titleIn.value = card.querySelector('h3').textContent;
        descIn.value  = card.querySelector('.event-description').textContent;
        const [d, m, y] = card.querySelector('.event-meta p').textContent.split('/');
        dateIn.value   = `${y}-${m}-${d}`;
        locIn.value    = card.querySelector('.event-meta p:nth-child(2)').textContent;
        catIn.value    = card.dataset.category;
        imgIn.value    = card.querySelector('img').src;

        openModal(eventModal);
      });
    }

    if (delBtn) {
      delBtn.addEventListener('click', () => {
        currentEventId = id;
        openModal(deleteModal);
      });
    }
  });

  // — form submit for Create/Update —
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      title:         titleIn.value,
      description:   descIn.value,
      date:          dateIn.value,
      location:      locIn.value,
      eventCategory: catIn.value,
      image:         imgIn.value
    };

    try {
      const url    = isUpdate
        ? `/admin/events/${currentEventId}`
        : '/admin/events';
      const method = isUpdate ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(res.statusText);
      location.reload();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });

  // — delete confirmation —
  confirmDelBtn.addEventListener('click', async () => {
    try {
      const res = await fetch(`/admin/events/${currentEventId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(res.statusText);
      location.reload();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  });
  cancelDelBtn.addEventListener('click', () => closeModal(deleteModal));
});
