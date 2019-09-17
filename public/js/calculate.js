// Инициализация календаря
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
        "format": "yyyy-mm-dd"
    });
});

function calcTotal() {
    let priceNetto = document.querySelector('#price_netto');
    let priceDelivery = document.querySelector('#price_delivery');
    let priceTotal = document.querySelector('#price_total');
    let calculate = document.querySelector('#calc');
    //  Расчет итоговой стоимости  товара
    calculate.addEventListener('click', () => {
        let priceBrutto = +priceNetto.value + +(priceDelivery.value);
        if (priceBrutto >= 250) {
            priceTotal.value = Math.round((priceBrutto / 1.18 / 3.8 + 35) * 2.1) + ' рублей';
            M.toast({ html: 'Стоимость рассчитана' });
        } else if (priceBrutto == 0) {
            M.toast({ html: 'Введите стоимость!' });
        } else {
            priceTotal.value = Math.round(((priceBrutto + 20) / 1.23 / 3.8 + 35) * 2.1) + ' рублей';
            M.toast({ html: 'Стоимость рассчитана' });
        }
    });
}

calcTotal();



