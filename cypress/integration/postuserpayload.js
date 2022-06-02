/// <reference types="Cypress" />

const dataJosn = require('../../fixtures/createuser.json')

describe('post user request', () => {

    let accessToken = 'f554a8b4ae6429a41a0a654af5f96183997f2a77bcf7d871fe1646a1d3ca3e82'
    let randomText = ""
    let testEmail = ""

    it('create user test', () => {

        var pattern = "wybeauibgfudundivnsvundimdinvubduvnddidvnvunvvsvtwnwdosxm"

        for (var i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
        testEmail = randomText + '@gmail.com'

        cy.fixture('createuser').then((payload) => {
            
            //1. create user (POST) : 
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/users',

                headers: {
                    'authorization': 'Bearer' + accessToken
                },
                body: {
                    "name": payload.name,
                    "email": testEmail,
                    "gender": payload.gender,
                    "status": payload.status
                }


            }).then((res) => {
                cy.log(JSON.stringify(res))

                expect(res.status).to.eq(201)

                expect(res.body.data).has.property('email', testEmail)
                expect(res.body.data).has.property('name', payload.name)
                expect(res.body.data).has.property('gender', payload.gender)
                expect(res.body.data).has.property('status', payload.status)


            }).then((res) => {

                const userID = res.body.data.id

                cy.log("user id is:" + userID)

                cy.request({
                    //2. get user (GET):
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v2/users/' + userID,
                    headers: {
                        'Authorization': 'Bearer' + accessToken
                    }

                }).then((res) => {
                    expect(res.status).to.eq(200)
                    expect(res.body.data).has.property('id', userID)
                    expect(res.body.data).has.property('email', testEmail)
                    expect(res.body.data).has.property('name', payload.name)
                    expect(res.body.data).has.property('gender', payload.gender)
                    expect(res.body.data).has.property('status', payload.status)
                })


            })


        })

    })

})