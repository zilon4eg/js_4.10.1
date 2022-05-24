function addHtmlElem(paramHasTooltip) {
    const hasTooltip = paramHasTooltip;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip tooltip_active';
    tooltip.textContent = hasTooltip.title;
    tooltip.style.position = "absolute";
    hasTooltip.appendChild(tooltip);
    // создаем константы для определения положения и размеров элементов
    const hasTooltipPosition = hasTooltip.getBoundingClientRect();
    // рассчитываем положение элемента по вертикали
    tooltip.style.top = `${hasTooltipPosition.top + window.pageYOffset + 20}px`;
    // рассчитываем положение элемента по горизонтали
    tooltip.style.left = `${hasTooltipPosition.left}px`;
}


const hasTooltips = document.querySelectorAll('.has-tooltip');

for (const hasTooltip of hasTooltips) {
    
    hasTooltip.addEventListener('click', (event) => {

        let tooltip = document.querySelector('.tooltip_active');
        
        if (tooltip === null) {
            addHtmlElem(hasTooltip);
        }
        else if (tooltip.textContent != hasTooltip.title) {
            tooltip.remove();
            addHtmlElem(hasTooltip);
        }

        // отключаем переход по ссылке
        event.preventDefault();
    });
}
