const cakeBtn = document.getElementById("openCakeDialog");
const cakeDialog = document.getElementById("cakeDialog");
const candleBtn = document.getElementById("openCandleDialog");
const candleDialog = document.getElementById("candleDialog");
cakeBtn.onclick = () => cakeDialog.showModal();
candleBtn.onclick = () => candleDialog.showModal();
const closeButtons = document.querySelectorAll(".closeDialog");

closeButtons.forEach (btn => {
    btn.onclick = () => {
        const dialog = btn.closest("dialog");
        if (dialog) dialog.close();
    };
});

// Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        cakeDialog.close();
        candleDialog.close();
    }
});

//Клик вне окна
cakeDialog.addEventListener("click", (e) => {
    if (e.target === cakeDialog) cakeDialog.close();
});
candleDialog.addEventListener("click", (e) => {
    if (e.target === candleDialog) candleDialog.close();
});

//Order function

function orderCandles() {
 toggleForm('candleOrderForm', 'order-btn');
}; 

document.addEventListener('click', (e) => {

    if (e.target.closest("dialog")) return;
    const form = document.getElementById('candleOrderForm');
    const button = document.getElementById('order-btn');
    if (
        form.style.display === 'block' &&
        !form.contains(e.target) &&
        e.target !== button 
    ) {
        form.style.display = 'none';
    }
});

function orderCakes() {
  toggleForm('cakeOrderForm', 'order-btn2');
};

document.addEventListener('click', (e) => {

    if (e.target.closest("dialog")) return;
    const form = document.getElementById('cakeOrderForm');
    const button = document.getElementById('order-btn2');
    if (
        form.style.display === 'block' &&
        !form.contains(e.target) &&
        e.target !== button 
    ) {
        form.style.display = 'none';
    }
});



/*logotype_texts*/

fetch('logo_ru.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('logo-title').textContent = data.title;
        document.getElementById('logo-text').textContent = data.text;
    });

/*JSON "About information"*/

fetch('candles_information.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('candles-title').textContent = data.title;
        document.getElementById('candles-description').textContent = data.description;
        document.getElementById('candles-subtitle1').textContent = data.subtitle1;

        const textContainer = document.getElementById('candles-texts');
        data.texts.forEach(p => {
            const paragraph = document.createElement('p');
            paragraph.textContent = p;
            textContainer.appendChild(paragraph);   
        });
        document.getElementById('candles-subtitle2').textContent = data.subtitle2;
        document.getElementById('candles-list-title').textContent = data.list.title;

        const listContainer = document.getElementById('candles-list');
        data.list.content.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listContainer.appendChild(li);
        });
        document.getElementById('candles-resume').textContent = data.list.resume;
    });

/*JSON About information*/

fetch('cakes_information.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('cakes-title').textContent = data.title;
        document.getElementById('cakes-description').textContent = data.description;
        document.getElementById('cakes-subtitle1').textContent = data.subtitle1;

        const textContainer = document.getElementById('cakes-texts');
        data.texts.forEach(p => {
            const paragraph = document.createElement('p');
            paragraph.textContent = p;
            textContainer.appendChild(paragraph);   
        });
        document.getElementById('cakes-subtitle2').textContent = data.subtitle2;
        document.getElementById('cakes-list-title').textContent = data.list.title;

        const listContainer = document.getElementById('cakes-list');
        data.list.content.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listContainer.appendChild(li);
        });
        document.getElementById('cakes-resume').textContent = data.list.resume;
    });

    /*JSON about_us*/

/* JSON about_us */
fetch("about_us.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById('about-title').textContent = data.title;

    const textContainer = document.getElementById('about-texts');
    data.texts.forEach(p => {
      const paragraph = document.createElement('p');
      paragraph.textContent = p;
      textContainer.appendChild(paragraph);
    });
  });

/* JSON contact_information */
fetch("contact_information.json")
  .then(res => res.json())
  .then(data => {
    const footer = data.footer;

    document.getElementById("contact-title").textContent = footer.title;

    document.getElementById("email").textContent = `Email: ${footer.contacts.email}`;
    document.getElementById("phone1").textContent = `Телефон : ${footer.contacts.phone1}`;
    document.getElementById("phone2").textContent = `Телефон : ${footer.contacts.phone2}`;

    const socialsContainer = document.getElementById("social-links");
    socialsContainer.innerHTML = "";

    footer.social_links.forEach(link => {
      if (!link.is_active) return;

      const block = document.createElement("div");
      block.classList.add("social-item");

      block.innerHTML = `
        <p>${link.platform}</p>
         <img src="${link.icon}" alt="${link.platform}" class="social-icon">

        <a href="${link.url}" target="_blank">${link.url}</a>
      `;

      socialsContainer.appendChild(block);
    });
  });

/*JSON on-stock sheet*/
fetch('candles.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('candlesContainer');
        const select = document.getElementById('order-items');

        data.forEach(candle => {
            if (candle.available) {
                const option = document.createElement('option');
        option.value = candle.name;
        option.textContent = candle.name;
        select.appendChild(option);

                const figure = document.createElement('figure');
                figure.classList.add('candles-slides-item');

                const img = document.createElement('img');
                img.src = candle.image;
                img.alt = candle.name;

                const caption = document.createElement('figcaption');
                caption.innerHTML = `<strong>${candle.name}</strong><br>${candle.description}`;

                figure.appendChild(img);
                figure.appendChild(caption);
                container.appendChild(figure);
            }
        });
    })
    .catch(error => console.error('Ошибка загрузки JSON:', error));

/*JSON cakes-sheet*/
   fetch('cakes.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('cakesContainer');

        data.forEach(cake => {
                const figure = document.createElement('figure');
                figure.classList.add('cakes-slides-item');

                const img = document.createElement('img');
                img.src = cake.image;
                img.alt = cake.name;

                const caption = document.createElement('figcaption');
                caption.innerHTML = `<strong>${cake.name}</strong>`;

                figure.appendChild(img);
                figure.appendChild(caption);
                container.appendChild(figure);
        });
    })
    .catch(error => console.error('Ошибка загрузки JSON:', error));

function moreForCakes() {
    document.getElementById('cakeDialog').close();
        document.getElementById('cakesInfo')
                .scrollIntoView({behavior: "smooth"});
    };

function moreForCandles(){
    document.getElementById('candleDialog').close();
        document.getElementById('candlesInfo')
                .scrollIntoView({behavior: "smooth"});
    };

function doCakeOrder() {
    const dialog = document.getElementById('cakeDialog');
    const form = document.getElementById('cakeOrderForm'); 
        dialog.close();
        document.getElementById('order-btn2')
                .scrollIntoView({behavior: "smooth"});
            form.style.display = 'block';
};

function doCandleOrder() {
    const dialog = document.getElementById('candleDialog');
    const form = document.getElementById('candleOrderForm'); 
        dialog.close();
        document.getElementById('order-btn')
                .scrollIntoView({behavior: "smooth"});
            form.style.display = 'block';
};

function toggleForm(formId, buttonId) {
    const form = document.getElementById(formId);
    const button = document.getElementById(buttonId);

    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}

//debug: //
window.addEventListener('load', () => {
    const vw = document.documentElement.clientWidth;
    const all = document.querySelectorAll('body *');
    all.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width > vw+1) {
            el-style.outline ;'3px solid magenta';
            console.log('overflow:', el, r.width, 'vw:', vw);
        }
    });
});



    const productSelect = document.getElementById('order-items');
    const orderCart = document.getElementById('cartPreview');
    const orderSummary = document.getElementById('order_summary');
    const form = document.getElementById('candleOrderForm');

    form.addEventListener('click', (e) => e.stopPropagation());

    productSelect.addEventListener('change', function() {
            
            const selectedValue = this.value;
            const selectedName = this.options[this.selectedIndex].text;

            if (!selectedValue) return;

            const existingRow = orderCart.querySelector(`[data-id="${CSS.escape(selectedValue)}"]`);
            if (existingRow) {
                const qtyInput = existingRow.querySelector('.qty');
                qtyInput.value = Number(qtyInput.value) + 1;
                updateSummary();
                this.value = "";
                return;
            }

            const itemRow = document.createElement('div');
            itemRow.className = 'cart-row';
            itemRow.dataset.id = selectedValue;

            itemRow.innerHTML = `
            <span>${selectedName}</span>
            <input class="qty" type="number" name=qty_${selectedValue}" value="1" min="1">
            <button type="button" class="trash" aria-label="Удалить">🗑️</button>`;

            orderCart.appendChild(itemRow);

            updateSummary();
            this.value = "";
    });

    orderCart.addEventListener('click', (e) => {
        e.stopPropagation();

        const trashBtn = e.target.closest('.trash');
        if (trashBtn) {
            trashBtn.closest('.cart-row')?.remove();
            updateSummary();
        }
    });

    orderCart.addEventListener('input', (e) => {
        if (e.target.classList.contains('qty')) {
            updateSummary();
        }
    });

    function updateSummary () {
        const rows = orderCart.querySelectorAll('.cart-row');

        const parts =[];
        rows.forEach(row => {
            const name = row.querySelector('.title')?.textContent?.trim() || '';
            const qty =row.querySelector('.qty')?.value || '1';
            if (name) parts.push(`${name} × ${qty}`);
        });

        orderSummary.value = parts.join(', ');
    }
