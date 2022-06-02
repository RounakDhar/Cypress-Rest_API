/// <reference types="Cypress" />

const dataJosn = require('../../fixtures/createuser.json')

describe('put user request', () => {

    let accessToken = 'f554a8b4ae6429a41a0a654af5f96183997f2a77bcf7d871fe1646a1d3ca3e82'
    let randomText = ""
    let testEmail = ""

    it('create user test', () => {

        var pattern = "wybeauibgfudundivnsvundimdinvubduvnddidvnvunvvsvtwnwdosxm"

        for (var i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
        testEmail = randomText + '@gmail.com'



        //1. create user (POST) : 
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',

            headers: {
                'authorization': 'Bearer' + accessToken
            },
            body: {
                "name": "Test Automation Cypress",
                "email": "testautomationcypress@gmail.com",
                "gender": "male",
                "status": "active"
            }


        }).then((res) => {
            cy.log(JSON.stringify(res))

            expect(res.status).to.eq(201)

            expect(res.body.data).has.property('email', 'testautomationcypress@gmail.com')
            expect(res.body.data).has.property('name', 'Test Automation Cypress')
            expect(res.body.data).has.property('gender', 'male')
            expect(res.body.data).has.property('status', 'active')


        }).then((res) => {

            const userID = res.body.data.id

            cy.log("user id is:" + userID)

            cy.request({
                //2. Update user (PUT):
                method: 'PUT',
                url: 'https://gorest.co.in/public/v2/users/' + userID,
                headers: {
                    'Authorization': 'Bearer' + accessToken
                },
                body: {
                    "name": "Test Automation Cypress Updated",
                    "email": "testautomationcypressupdated@gmail.com",
                    "gender": "male",
                    "status": "inactive"
                }

            }).then((res) => {
                expect(res.status).to.eq(200)

                //expect(res.body.data).has.property('id', userID)

                expect(res.body.data).has.property('email', 'testautomationcypress@gmail.com')
                expect(res.body.data).has.property('name', 'Test Automation Cypress')
                expect(res.body.data).has.property('gender', 'male')
                expect(res.body.data).has.property('status', 'active')
            })


        })




    })

})