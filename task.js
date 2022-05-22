const hasTooltips = document.querySelectorAll('.has-tooltip');

for (const hasTooltip of hasTooltips) {
    
    hasTooltip.addEventListener('click', (event) => {

        // удаляем все элементы подсказок
        (function hideAllTooltip() {
            const allTooltip = document.querySelectorAll('.tooltip');
            if (allTooltip.length > 0) {
                for (const tooltip of allTooltip) {
                    tooltip.remove();
                }
            }
        }());
        
        // создаем html элемент подсказки
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip tooltip_active';
        tooltip.textContent = hasTooltip.title;
        hasTooltip.appendChild(tooltip);

        // создаем константы для определения положения и размеров элементов
        const viewPortHeight = window.innerHeight;
        const viewPortWidth = window.innerWidth;
        const tooltipPosition = tooltip.getBoundingClientRect();
        const hasTooltipPosition = hasTooltip.getBoundingClientRect();

        // рассчитываем положение элемента по вертикали
        if (viewPortHeight - hasTooltipPosition.top - hasTooltipPosition.height - 3 < tooltipPosition.height) {
            tooltip.style.top = `${hasTooltipPosition.top - tooltipPosition.height - 3}px`;
        } else {
            tooltip.style.top = `${hasTooltipPosition.bottom + 3}px`;
        }
        
        // рассчитываем положение элемента по горизонтали
        if (viewPortWidth - hasTooltipPosition.left < tooltipPosition.width) {
            tooltip.style.left = `${hasTooltipPosition.left + hasTooltipPosition.width - tooltipPosition.width}px`;
        } else {
            tooltip.style.left = `${hasTooltipPosition.left}px`;
        }

        // отключаем переход по ссылке
        event.preventDefault();
        
        // фиксация положения подсказки при вертикальном скролле страницы
        // некорректно работает, если подсказка была размещена НАД гиперссылкой
        // подсказка "сползает" под строку при скролле и там фиксируется
        document.addEventListener('scroll', () => {
            tooltip.style.top = `${tooltipPosition.top - window.pageYOffset + 2}px`;
        });
    });
}
