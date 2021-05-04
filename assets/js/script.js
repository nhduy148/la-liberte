var mouseIsInside = false;
var dropdownList = $('.dropdown__list');
var selectList = $('.select__list');
var faqItemAnswer = $('.faq__item-a');
var header = $('#header');
var bookTourButton = $('#book-tour-button');
var bookTourButtonCancel = $('#book-tour-button-cancel');
var bookTourForm = $('#book-tour-form');
var isLgDown = window.matchMedia('(max-width: 1280px)').matches;
var isResponsive = window.matchMedia('(max-width: 960px)').matches;
var pageHome = $('#page-home');
var pageTour = $('#page-tour');
var pageAbout = $('#page-about');
var pageTourDetail = $('#page-tour-detail');
var pageContact = $('#page-contact');

function renderDropdownActions() {
  var dropdown = $('.dropdown');
  var dropdownItem = $('.dropdown__item');

  dropdownList.hide();

  dropdown.click(function () {
    const isOpen = $(this).hasClass('dropdown--focused');
    console.log(isOpen);
    $(this)
      .toggleClass('dropdown--focused')
      .find('.dropdown__list')
      .stop()
      .slideToggle(200);

    mouseIsInside = !isOpen;
  });

  dropdownItem.click(function (e) {
    e.stopPropagation();
    var currentDropdown = $(this).closest('.dropdown');
    var currentInput = currentDropdown.find('input[type=hidden]');
    var value = $(this).find('.dropdown__item-text').text();
    currentDropdown
      .find('.dropdown__item')
      .removeClass('dropdown__item--selected');
    $(this).addClass('dropdown__item--selected');

    if (currentInput) {
      currentDropdown.addClass('dropdown--hasvalue');
      currentDropdown.find('.dropdown__sublabel').text(value);
      currentInput.val(value);
    }
  });
}

function renderFAQActions() {
  var faqItem = $('.faq__item');
  faqItem.click(function () {
    var answer = $(this).find('.faq__item-a');
    if (answer) {
      answer.slideToggle(300);
    }
  });
}

function renderSelectActions() {
  var select = $('.select');
  var selectItem = $('.select__item');

  selectList.hide();

  select.click(function () {
    const isOpen = $(this).hasClass('select--focused');
    console.log(isOpen);
    $(this)
      .toggleClass('select--focused')
      .find('.select__list')
      .stop()
      .slideToggle(200);

    mouseIsInside = !isOpen;
  });

  selectItem.click(function (e) {
    e.stopPropagation();
    var currentSelect = $(this).closest('.select');
    var currentInput = currentSelect.find('input[type=hidden]');
    var value = $(this).text();
    currentSelect.find('.select__item').removeClass('select__item--selected');
    $(this).addClass('select__item--selected');

    if (currentInput) {
      currentSelect.addClass('select--hasvalue');
      currentSelect.find('.select__value').text(value);
      currentInput.val(value);
    }
  });
}

function bookTour() {
  bookTourButton.click(function () {
    bookTourForm.fadeIn();
  });
  bookTourButtonCancel.click(function () {
    bookTourForm.fadeOut();
  });
}

$(document).ready(function () {
  var banner = $('.banner');
  var breadcrumb = $('.breadcrumb');
  var mainVisual = $('#main-visual');
  var toggle = $('#toggle');
  var navbar = $('#navbar');
  var headerHeight = 0;
  if (header.length) {
    headerHeight = header.height();
  }

  toggle.click(function () {
    $(this).toggleClass('on');
    navbar.toggleClass('active');
  });

  //Dropdown
  renderDropdownActions();
  renderSelectActions();
  renderFAQActions();
  heaaderSticky();
  bookTour();

  $('body').mouseup(function () {
    if (mouseIsInside) {
      dropdownList.stop().slideUp(200);
      selectList.stop().slideUp(200);
      // faqItemAnswer.stop().slideUp(200);
      dropdownList.closest('.dropdown').removeClass('dropdown--focused');
      selectList.closest('.select').removeClass('select--focused');
      mouseIsInside = !mouseIsInside;
    }
  });

  if (pageHome.length && mainVisual && !isLgDown) {
    mainVisual.css('padding-top', headerHeight);
  }
  if (pageTour.length || pageAbout.length) {
    banner.css('padding-top', headerHeight);
  }
  if (pageTourDetail.length || pageContact.length) {
    breadcrumb.css('margin-top', headerHeight);
  }
});

$(window).scroll(heaaderSticky);

function heaaderSticky() {
  if ($(window).scrollTop() > header.height()) {
    $(header).addClass('header--sticky');
  } else {
    $(header).removeClass('header--sticky');
  }
}
