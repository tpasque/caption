

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('brands').del(),

    // Inserts seed entries
    knex('brands').insert({
      facebook_id:"10103893635535073",
      brand_name:"Smashburger",
      brand_image_url: "http://ww1.prweb.com/prfiles/2010/01/26/2786634/smashlogoNoTagFA.jpg"
  }),
    knex('brands').insert({
      facebook_id:"10103893635535073",
      brand_name:"Chinook Seedery",
      brand_image_url: "https://chinookseedery.com/wp-content/uploads/2013/03/Chinook-Seedery-Logo.png"
  })

 );
 }
