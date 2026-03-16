document.addEventListener("DOMContentLoaded", () => {
    const candleForm = document.getElementById('candleOrderForm');
    

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

            itemRow.innerHTML ="";
            itemRow.innerHTML = `
            <span class="item-name">${selectedName}</span>
            <input class="qty" type="number" name="qty_${selectedValue}" value="1" min="1">
            <button type="button" class="trash" aria-label="Удалить">🗑️</button>`;

            orderCart.appendChild(itemRow);

            updateSummary();
            console.log("update summary:", orderSummary);
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
            const name = row.querySelector('.item-name')?.textContent?.trim() || '';
            const qty =row.querySelector('.qty')?.value || '1';
            if (name) parts.push(`${name} × ${qty}`);
        });

        orderSummary.value = parts.join(', ');
    };



    candleForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        updateSummary();
        const btn_submit1 = document.getElementById('submit');
            btn_submit1.value = currentTranslation.btn_prosess;
            const subj = document.getElementById('theme');
            const hello = document.getElementById('hi');
            const recipient_name = document.getElementById('user_name');
            const thanks_replay = document.getElementById('thanks_message_candles');
            const thanks_order = document.getElementById('thanks_text');
            const order_preview = document.getElementById('order_title');

            const bye = document.getElementById('regards');
            const from_us = document.getElementById('HandMada');
            const br_autoreplay = document.getElementById('best_regards');

            const subjEL = document.getElementById('email_subject');
            const ordElBoby = document.getElementById('order_email_body');
            const thElBoby = document.getElementById('thaks_email_body');

            subj.value = currentTranslation.email_candleOrder_message.theme;
            hello.value = currentTranslation.email_candleOrder_message.hi;
            thanks_replay.value = currentTranslation.email_thank_message.thanks_message_candles;
            thanks_order.value = currentTranslation.email_candleOrder_message.thanks_text;
            order_preview.value = currentTranslation.email_candleOrder_message.order_title;
            bye.value = currentTranslation.email_candleOrder_message.regards;
            from_us.value = currentTranslation.email_candleOrder_message.HandMada;
            br_autoreplay.value = currentTranslation.email_thank_message.best_regards;
console.log("order summary:", orderSummary.value);

        try {
            await emailjs.sendForm(
                "service_vb9bi0e",
                "template_s0o1px1",
                candleForm
            );

            alert(currentTranslation.alert);
            candleForm.reset();
            candleForm.style.display = 'none';
            btn_submit1.value = currentTranslation.btn_done;
            document.getElementById('cartPreview').innerHTML = '';
        }   catch (err) {
            console.error("EmailJS error:", err);
            alert("Упс! Ошибка отправки. Смотри console.");
        }
    });
});
    
   


let currentTranslation = {};

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
};

/*
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
*/


function changeLanguage(lang) {
    console.log ('выбран язык', lang);
    document.documentElement.lang = lang;
     
    fetch(`${lang}.json`)
        .then(response => response.json())
        .then(data => {
            /*We take data from a file with the selected language*/
                currentTranslation = data;
            /*logotype_texts*/
            document.getElementById('logo-title').textContent = data.logo['logo-title'];
            document.getElementById('logo-text').textContent = data.logo['logo-text'];

            /*hero.dialog*/
            document.getElementById('openCakeDialog').textContent = data.openCakeDialog;
                document.getElementById('cake-Order').textContent = data['cake-Order'];
                document.getElementById('cake-Information').textContent = data['cake-Information'];

            document.getElementById('openCandleDialog').textContent = data.openCandleDialog;
                document.getElementById('candle-Order').textContent = data['candle-Order'];
                document.getElementById('candle-Information').textContent = data['candle-Information'];

            /*candle-informetion*/
            document.getElementById('candles-title').textContent = data.candlesInfo.title;
            document.getElementById('candles-description').textContent = data.candlesInfo.description;
            document.getElementById('candles-subtitle1').textContent = data.candlesInfo.subtitle1;

            
            const candleTextContainer = document.getElementById('candles-texts');
            candleTextContainer.innerHTML = '';
            data.candlesInfo.texts.forEach(p => {
                const paragraph = document.createElement('p');
                paragraph.textContent = p;
                candleTextContainer.appendChild(paragraph);   
                                    });

            document.getElementById('candles-subtitle2').textContent = data.candlesInfo.subtitle2;
            document.getElementById('candles-list-title').textContent = data.candlesInfo.list.title;

            const candleListContainer = document.getElementById('candles-list');
            candleListContainer.innerHTML = '';
            data.candlesInfo.list.content.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                candleListContainer.appendChild(li);
                                    });
            document.getElementById('candles-resume').textContent = data.candlesInfo.list.resume;

            /*candles-galleria*/
            const candleContainer = document.getElementById('candlesContainer');
            const select = document.getElementById('order-items');

            select.innerHTML = '<option value=""></option>';
            /*container is empty before selected lang data loading*/
            candleContainer.innerHTML = '';
            data.candlesContainer.forEach(candle => {
                if (candle.available) {
                    const option = document.createElement('option');
                        option.value = candle.id;
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
                    candleContainer.appendChild(figure);
                                    }
                        });

            /*candles order-form*/
            document.getElementById('order-btn').textContent = data['candle-order']['order-btn'];
            document.getElementById('label-name').textContent = data['candle-order'].candleOrderForm['label-name'];
            document.getElementById('label-email').textContent = data['candle-order'].candleOrderForm['label-email'];
            document.getElementById('label-order-items').textContent = data['candle-order'].candleOrderForm['label-order-items'];
            document.getElementById('order').textContent = data['candle-order'].candleOrderForm['order'];
            document.getElementById('submit').value = data['candle-order'].candleOrderForm['submit'];

            // 1. Сначала находим ВСЕ строки корзины

        const cartRows = document.querySelectorAll('.cart-row');

        // 2. Запускаем цикл, только если строки нашлись
        cartRows.forEach(row => {
        const productId = row.dataset.id; 
        const nameSpan = row.querySelector('.item-name'); // Проверь, что класс именно .item-name (через дефис!)

        // Добавляем проверку: если в строке есть и ID, и место под имя
        if (productId && nameSpan) {
             const candle = data.candlesContainer.find(item => item.id === productId);
        if (candle) {
            nameSpan.textContent = candle.name;
        }
            }
        });


        cartRows.forEach(row => {
            const productId = row.dataset.id;
            const nameSpan = row.querySelector('.item-name');

                if (productId && nameSpan) {
                    const itemData = data.candlesContainer.find(item => item.id === productId);

                    if (itemData) {
                        nameSpan.textContent = itemData.name;
                    }
                }
        });

                
            
             
            /*cakes-information*/
            document.getElementById('cakes-title').textContent = data.cakesInfo.title;
            document.getElementById('cakes-description').textContent = data.cakesInfo.description;
            document.getElementById('cakes-subtitle1').textContent = data.cakesInfo.subtitle1;

                const cakeTextContainer = document.getElementById('cakes-texts');
                cakeTextContainer.innerHTML = '';
                data.cakesInfo.texts.forEach(p => {
                const paragraph = document.createElement('p');
                paragraph.textContent = p;
                cakeTextContainer.appendChild(paragraph);   
                                        });
            document.getElementById('cakes-subtitle2').textContent = data.cakesInfo.subtitle2;
            document.getElementById('cakes-list-title').textContent = data.cakesInfo.list.title;

                const cakeListContainer = document.getElementById('cakes-list');
                cakeListContainer.innerHTML = '';
                data.cakesInfo.list.content.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                cakeListContainer.appendChild(li);
                                                    });
            document.getElementById('cakes-resume').textContent = data.cakesInfo.list.resume;

            /*cakes-galleria*/
            const cakeContainer = document.getElementById('cakesContainer');
            
            /* container is empty before selected lang loading*/
            cakeContainer.innerHTML = '';
            data.cakesContainer.forEach(cake => {
                const figure = document.createElement('figure');
                figure.classList.add('cakes-slides-item');

                const img = document.createElement('img');
                img.src = cake.image;
                img.alt = cake.name;

                const caption = document.createElement('figcaption');
                caption.innerHTML = `<strong>${cake.name}</strong>`;

                figure.appendChild(img);
                figure.appendChild(caption);
                cakeContainer.appendChild(figure);
        });   

            /*cakes order-form*/
            document.getElementById('order-btn2').textContent = data['cake-order']['order-btn2']; 
                const formPath = data['cake-order']['cakeOrderForm'];          
            document.getElementById('cakeLabel-name').textContent = formPath['cakeLabel-name'];
            document.getElementById('cakeLabel-email').textContent = formPath['cakeLabel-email'];
            document.getElementById('cakeLabel-order-item').textContent = formPath['cakeLabel-order-item'];
            document.getElementById('cakeLabel-description').textContent = formPath['cakeLabel-description'];
            document.getElementById('cakeSubmit').value = formPath['cakeSubmit'];

            /*about HandMada*/
            document.getElementById('about-title').textContent = data.title;

                const textContainer = document.getElementById('about-texts');
                textContainer.innerHTML = '';
                data.texts.forEach(p => {
                    const paragraph = document.createElement('p');
                    paragraph.textContent = p;
                    textContainer.appendChild(paragraph);
                                        });

            /*contact to HandMada*/
            const footer = data.footer;

            document.getElementById("contact-title").textContent = footer.title;

            document.getElementById("email").textContent = `${footer.labels.email}: ${footer.contacts.email}`;
            document.getElementById("phone1").textContent = `${footer.labels.phone1}: ${footer.contacts.phone1}`;
            document.getElementById("phone2").textContent = `${footer.labels.phone2}: ${footer.contacts.phone2}`;
            document.getElementById('social_title').textContent = data.footer['social_title'];
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
        localStorage.setItem('selectedLang', lang);
        
        
        currentTranslation = data;
        });
        
};

    changeLanguage('ru');

   