/// <reference types="Cypress" />

describe('post user request',()=>{

    let accessToken = 'f554a8b4ae6429a41a0a654af5f96183997f2a77bcf7d871fe1646a1d3ca3e82'


it('create user test',()=>{

    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public/v2/users',

        headers: {
            'authorization': 'Bearer' + accessToken
        },
        body:{
            "name": "Test Automation Demo",
            "email": "testautomationdemo@gmail.com",
            "gender": "male",
            "status": "active"
    
    }

    }).then((res)=>{
        
        //cy.log(res)
        cy.log(JSON.stringify(res))

        expect(res.status).to.eq(201)

        expect(res.body.data).has.property('email','testautomationdemo@gmail.com')
        expect(res.body.data).has.property('name','Test Automation Demo')
        expect(res.body.data).has.property('gender','male')
        expect(res.body.data).has.property('status','active')
        

    })
})

})