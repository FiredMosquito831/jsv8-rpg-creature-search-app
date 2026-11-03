const API = 'https://rpg-creature-api.freecodecamp.rocks/api/creature/';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const els = {
  name: document.getElementById('creature-name'),
  id: document.getElementById('creature-id'),
  weight: document.getElementById('weight'),
  height: document.getElementById('height'),
  types: document.getElementById('types'),
  hp: document.getElementById('hp'),
  attack: document.getElementById('attack'),
  defense: document.getElementById('defense'),
  specialAttack: document.getElementById('special-attack'),
  specialDefense: document.getElementById('special-defense'),
  speed: document.getElementById('speed')
};

function clear() {
  els.name.textContent = '';
  els.id.textContent = '';
  els.weight.textContent = '';
  els.height.textContent = '';
  els.types.innerHTML = '';
  ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'].forEach(function (k) {
    els[k].textContent = '';
  });
}

function statValue(data, name) {
  for (let i = 0; i < data.stats.length; i++) {
    if (data.stats[i].name === name) return data.stats[i].base_stat;
  }
  return '';
}

async function search() {
  const q = searchInput.value.trim();
  if (q === '') return;
  clear();
  try {
    const res = await fetch(API + encodeURIComponent(q));
    if (!res.ok) {
      alert('Creature not found');
      return;
    }
    const data = await res.json();

    els.name.textContent = data.name.toUpperCase();
    els.id.textContent = '#' + data.id;
    els.weight.textContent = 'Weight: ' + data.weight;
    els.height.textContent = 'Height: ' + data.height;
    ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'].forEach(function (n) {
      const key = n.replace(/-([a-z])/g, function (m, c) { return c.toUpperCase(); });
      els[key].textContent = String(statValue(data, n));
    });

    (data.types || []).forEach(function (t) {
      const el = document.createElement('div');
      el.textContent = t.name.toUpperCase();
      els.types.appendChild(el);
    });
  } catch (e) {
    alert('Creature not found');
  }
}

searchButton.addEventListener('click', function () {
  search();
});
