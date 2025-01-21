export function renderNavBar (){
  $('nav').on('click', '.fa-bars', ()=>{
    sideBar();
  $('.menu-icon').html('<i class="fa-solid fa-xmark"></i>');
  $('.disp').slideDown(2000, 'linear');
  });
  $('nav').on( 'click', '.fa-xmark', ()=>{
    hideBar();
    $('.menu-icon').html('<i class="fa-solid fa-bars"></i>');
    $('.disp').slideUp(2000, 'linear');
  });
  function sideBar(){
    $('.side-bar').addClass('disp');
  
  }
  function hideBar(){
    $('.side-bar').removeClass('disp');
  
  }
}