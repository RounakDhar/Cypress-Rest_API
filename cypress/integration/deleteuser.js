/// <reference types="Cypress" />

const dataJosn = require('../../fixtures/createuser.json')

describe('delete user request', () => {

    let accessToken = 'f554a8b4ae6429a41a0a654af5f96183997f2a77bcf7d871fe1646a1d3ca3e82'
    let randomText = ""
    let testEmail = ""

    it('create user test', () => {

        // var pattern = "wybeauibgfudundivnsvundimdinvubduvnddidvnvunvvsvtwnwdosxm"

        // for (var i = 0; i < 10; i++)
        //     randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
        // testEmail = randomText + '@gmail.com'



        //1. create user (POST) : 
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',

            headers: {
                'authorization': 'Bearer' + accessToken
            },
            body: {
                "name": "Test Automation Cypress User",
                "email": "testautomationcypressuser@gmail.com",
                "gender": "male",
                "status": "active"
            }


        }).then((res) => {
            cy.log(JSON.stringify(res))

            expect(res.status).to.eq(201)

            expect(res.body.data).has.property('email', 'testautomationcypressuser@gmail.com')
            expect(res.body.data).has.property('name', 'Test Automation Cypress User')
            expect(res.body.data).has.property('gender', 'male')
            expect(res.body.data).has.property('status', 'active')


        }).then((res) => {

            const userID = res.body.data.id

            cy.log("user id is:" + userID)

            cy.request({
                //2. delete user (DELETE):
                method: 'DELETE',
                url: 'https://gorest.co.in/public/v2/users/' + userID,
                headers: {
                    'Authorization': 'Bearer' + accessToken
                }

            }).then((res) => {
                expect(res.status).to.eq(204)

                // expect(res.body.data).has.property('id', userID)
                // expect(res.body.data).has.property('email', testEmail)
                // expect(res.body.data).has.property('name', payload.name)
                // expect(res.body.data).has.property('gender', payload.gender)
                // expect(res.body.data).has.property('status', payload.status)
            })


        })




    })

})