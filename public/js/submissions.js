document.addEventListener('DOMContentLoaded', () => {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('submission-search');
  const container   = document.getElementById('submissions-container');

  let currentFilter = 'all';
  let currentSearch = '';

  function renderList() {
    container.querySelectorAll('.submission-record').forEach(rec => {
      const isContacted = rec.dataset.contacted === 'true';

      // 1) Tab filter
      let show = (
        currentFilter === 'all' ||
        (currentFilter === 'not'       && !isContacted) ||
        (currentFilter === 'contacted' &&  isContacted)
      );

      // 2) Search filter
      if (show && currentSearch) {
        show = rec.innerText.toLowerCase().includes(currentSearch);
      }

      rec.classList.toggle('hidden', !show);
    });
  }

  // Tab navigation
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1) Update active state on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 2) Change filter and re-render
      currentFilter = btn.dataset.filter;
      renderList();
    });
  });

  // Search box
  searchInput.addEventListener('input', e => {
    currentSearch = e.target.value.trim().toLowerCase();
    renderList();
  });

  // Toggle contacted / not-contacted
  container.addEventListener('click', async e => {
    if (!e.target.matches('.action-btn')) return;
    const rec  = e.target.closest('.submission-record');
    const id   = rec.dataset.id;
    const curr = rec.dataset.contacted === 'true';
    const next = !curr;

    try {
      const res  = await fetch(`/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ contacted: next })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Update failed');

      // update DOM state
      rec.dataset.contacted = data.contacted;
      e.target.textContent  = data.contacted
        ? 'Mark Not Contacted'
        : 'Mark Contacted';

      renderList();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });

  // initial render
  renderList();
});
