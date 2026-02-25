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

        const textContainer = document.getElementById('candles-texts');
        data.texts.forEach(p => {
            const paragraph = document.createElement('p');
            paragraph.textContent = p;
            textContainer.appendChild(paragraph);   
        });
        document.getElementById('candles-subtitle').textContent = data.subtitle;
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

        const textContainer = document.getElementById('cakes-texts');
        data.texts.forEach(p => {
            const paragraph = document.createElement('p');
            paragraph.textContent = p;
            textContainer.appendChild(paragraph);   
        });
        document.getElementById('cakes-subtitle').textContent = data.subtitle;
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