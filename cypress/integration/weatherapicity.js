describe('check weather information',()=>{

it('get weather information for cities',()=>{

    //1st request: GET locations
    cy.request({

        method: 'GET',
        url: 'https://www.metaweather.com/api/location/search/?query=san'


    }).then((resp)=>{
        const city = resp.body[0].title
        return city



    }).then((city)=>{

        //2nd Request for the 1st location/city 
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query='+city


        }).then((resp)=>{

            expect(resp.status).to.eq(200)
            expect(resp.body[0]).to.have.property('title',city)

        })

    })



})





})