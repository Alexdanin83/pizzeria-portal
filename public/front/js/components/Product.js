import {select, classNames,templates} from '../settings.js';
import utils from '../utils.js';
import amountWidget from './AmountWidget.js';
class Product {
  constructor(id, data) {
    //console.log('id'+id+'data '+data);
    const thisProduct = this;
    thisProduct.id = id;
    thisProduct.data = data;
    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();
    //console.log('new Product:', thisProduct);
  }
  renderInMenu() {
    const thisProduct = this;
    /*Generated HTML based on template*/
    const generateHTML = templates.menuProduct(thisProduct.data);
    /*create element usi ng utils.createElementFromHTML*/
    /*thisProduct.element - bieżący element*/
    thisProduct.element = utils.createDOMFromHTML(generateHTML);
    //console.log('thisProduct.element '+JSON.stringify(thisProduct.element));
    /*find menu container*//*Wstawiamy w product list szablon*/
    const menuContainer = document.querySelector(select.containerOf.menu);
    //add element to menu *//
    menuContainer.appendChild(thisProduct.element);
  }
  getElements(){
    const thisProduct = this;
    thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
    thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
    thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
    thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
    thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
  }
  initAccordion() {
    const thisProduct = this;
    /* find the clickable trigger (the element that should react to clicking) */
    const buttonTest = thisProduct.element.querySelector(select.menuProduct.clickable);
    //const buttonTest = thisProduct.element.querySelector(thisProduct.getElements().accordionTrigger);
    /* START: click event listener to trigger */
    buttonTest.addEventListener('click', function(){
      /* prevent default action for event */
      event.preventDefault();
      /* toggle active class on element of thisProduct */
      buttonTest.parentElement.classList.add('active');
      /* find all active products */
      const activeLinks = document.querySelectorAll('article.active');
      /* START LOOP: for each active product */
      for(let activeLink of activeLinks) {
        //console.log(activeLink+'activeLink');
        /* START: if the active product isn't the element of thisProduct */
        //console.log('thisProduct.element '+JSON.stringify(thisProduct.element));
        if (activeLink!=thisProduct.element) {
          /* remove class active for the active product */
          activeLink.classList.remove('active');
          /* END: if the active product isn't the element of thisProduct */
        }
        /* END LOOP: for each active product */
      }
      /* END: click event listener to trigger */
    });

  }
  //Dodanie listenerów do wszystkich kontolek produktu
  initOrderForm() {
    const thisProduct = this;
    thisProduct.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisProduct.processOrder();
    });
    for(let input of thisProduct.formInputs){
      input.addEventListener('change', function(){
        thisProduct.processOrder();
      });
    }

    thisProduct.cartButton.addEventListener('click', function(event){
      event.preventDefault();
      thisProduct.processOrder();
      thisProduct.addToCart();
    });
    //console.log('initOrderForm');
  }

  processOrder() {
    const thisProduct = this;
    /* read all data from the form (using utils.serializeFormToObject) and save it to const formData */
    const formData = utils.serializeFormToObject(thisProduct.form);
    //console.log('formData'+formData);
    thisProduct.params = {};
    /* set variable price to equal thisProduct.data.price */
    let price = thisProduct.data.price;
    /* START LOOP: for each paramId in thisProduct.data.params */
    for(let paramId in thisProduct.data.params){
      /* save the element in thisProduct.data.params with key paramId as const param */
      var param = thisProduct.data.params[paramId];
      /* START LOOP: for each optionId in param.options */
      for(let optionId in param.options){
        /* save the element in param.options with key optionId as const option */
        var option = param.options[optionId];
        const optionSelected = formData.hasOwnProperty(paramId) && formData[paramId].indexOf(optionId) > -1;
        /* START IF: if option is selected and option is not default */
        if(optionSelected && !option.default){
          //console.log('optionId'+optionId + 'true Cena'+option.price);
          /* add price of option to variable price */
          price+=option.price;
          /* END IF: if option is selected and option is not default */
          //console.log('param: '+paramId + 'options: '+ optionId +'selected: ' +optionSelected );
        }
        /* START ELSE IF: if option is not selected and option is default */
        else if (!optionSelected && option.default) {
          /* deduct price of option from price */
          price-=option.price;
        }
        if(optionSelected) {
          if (!thisProduct.params[paramId]) {
            thisProduct.params[paramId] = {
              label: param.label,
              options: {},
            };
          }
          thisProduct.params[paramId].options[optionId] = option.label;
          const addImages =thisProduct.imageWrapper.querySelectorAll('img.'+paramId+'-'+optionId);
          for(let addImage of addImages)
            addImage.classList.add(classNames.menuProduct.imageVisible);
          //  console.log('consolelog'+addImage)
        }
        else if(!optionSelected) {
          const addImages =thisProduct.imageWrapper.querySelectorAll('img.'+paramId+'-'+optionId);
          for(let addImage of addImages) {
            addImage.classList.remove(classNames.menuProduct.imageVisible);
          }
          // thisProduct.querySelector(paramId+'-'+optionId);
        }
        /* END LOOP: for each optionId in param.options */
      }
      /* END LOOP: for each paramId in thisProduct.data.params */
    }
    /*multiply price by amount*/
    //price*= thisProduct.amountWidget.value;
    thisProduct.priceSingle = price;
    thisProduct.price = thisProduct.priceSingle * thisProduct.amountWidget.value;

    /* set the contents of thisProduct.priceElem to be the value of variable price */
    //hisProduct.priceElem.innerHTML = price;
    thisProduct.priceElem.innerHTML = thisProduct.price;
    //console.log(thisProduct.params);

  }
  initAmountWidget() {
    const thisProduct = this;
    thisProduct.amountWidget = new amountWidget(thisProduct.amountWidgetElem);
    thisProduct.amountWidgetElem.addEventListener('updated', function(){
      thisProduct.processOrder();
    });
  }
  addToCart(){
    const thisProduct = this;

    thisProduct.name = thisProduct.data.name;
    thisProduct.amount = thisProduct.amountWidget.value;
    //app.cart.add(thisProduct);
    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct,
      },
    });
    thisProduct.element.dispatchEvent(event);

  }
}
export default Product;