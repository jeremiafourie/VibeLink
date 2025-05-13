// public/js/events.js
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

  const filterBtns = document.querySelectorAll('.filter-btn');
    const eventItems = document.querySelectorAll('.event-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.dataset.filter; 

        eventItems.forEach(item => {
          // Get the category
          const category = item.dataset.category; 
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

  // — shared open/close logic —
  function openModal(m) { m.classList.remove('hidden'); }
  function closeModal(m) { m.classList.add('hidden'); }
  closeButtons.forEach(b => b.addEventListener('click', () => {
    closeModal(eventModal); closeModal(deleteModal);
  }));
  overlays.forEach(o => o.addEventListener('click', () => {
    closeModal(eventModal); closeModal(deleteModal);
  }));

  // — Create button —
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
    const id = card.dataset.id;
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
        // date comes in DD/MM/YYYY
        const [d, m, y] = card
          .querySelector('.event-meta p')
          .textContent.split('/');
        dateIn.value = `${y}-${m}-${d}`;

        locIn.value = card.querySelector('.event-meta p:nth-child(2)').textContent;
        catIn.value = card.dataset.category;
        imgIn.value = card.querySelector('img').src;

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
      const res = await fetch(`/admin/events/${currentEventId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(res.statusText);
      location.reload();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  });
  cancelDelBtn.addEventListener('click', () => closeModal(deleteModal));
});
