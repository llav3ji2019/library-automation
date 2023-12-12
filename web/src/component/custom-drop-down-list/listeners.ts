function selectToggle(this: Element): void {
  this.parentElement?.classList.add('is-active');
 }

function selectChoose(this: HTMLDivElement): void {
  let select = this.closest('.select') as HTMLDivElement;
  select.classList.remove('is-active');
}

export function addListenersToDropDownList(document: Document) {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(item => {
      item.addEventListener('click', selectToggle)
  });

  selectItem.forEach(item => {
      item.addEventListener('click', selectChoose)
  });
}