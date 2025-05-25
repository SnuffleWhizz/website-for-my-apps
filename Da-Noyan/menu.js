async function loadMenu() {
      const response = await fetch('./Editable/menu.json');
      const data = await response.json();
      const menuContainer = document.getElementById('menu');

      function displayItems(category) {
        menuContainer.innerHTML = '';
        const categories = category === 'Alle' ? Object.keys(data) : [category];

        categories.forEach(cat => {
          const section = document.createElement('div');
          section.className = 'menu-category';

          const heading = document.createElement('h2');
          heading.style.textDecoration = 'underline';
          heading.textContent = cat;
          section.appendChild(heading);

          data[cat].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';

            const title = document.createElement('h4');
            title.textContent = item.name;

            const price = document.createElement('span');
            price.textContent = (typeof parseFloat(item.price) === 'number' ? parseFloat(item.price).toFixed(2) : 'NaN') + ' €';

            title.appendChild(price);
            itemDiv.appendChild(title);

            if (item.description) {
              const desc = document.createElement('p');
              desc.textContent = item.description;
              itemDiv.appendChild(desc);
            }

            section.appendChild(itemDiv);
            section.appendChild(document.createElement('hr'));
          });

          menuContainer.appendChild(section);
        });
      }

      displayItems('Alle');

      document.querySelectorAll('.filter-buttons button').forEach(button => {
        button.addEventListener('click', () => {
          displayItems(button.dataset.category);
        });
      });
    }

loadMenu();