$(document).ready ->
  
  onPhone = window.matchMedia("(max-width:401px)")

  if onPhone.matches
    $('#name').text('Alisha')
    $('#bio').text('Bio')
    $('#cs').text('CS')
    $('#orgs').text('Orgs')

  console.log('hi')