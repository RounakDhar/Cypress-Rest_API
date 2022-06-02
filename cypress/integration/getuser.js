/// <reference types="Cypress" />

describe('get api user tests',()=>{

    let accessToken = 'b04287d76af139a921c8b52281f479aa6593ccc56a2bacb5b1e8fd082d85674d'

    it('get users test',()=>{
    //it.only('get users test',()=>{
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public-api/users/2',
            headers: {
                //'authorization': "Bearer b04287d76af139a921c8b52281f479aa6593ccc56a2bacb5b1e8fd082d85674d"
                'authorization': "Bearer" + accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            //expect(res.body.meta.pagination.limit).to.eq(20)
            expect(res.body.id).to.eq(2)
        })
        
    })

    it('get users by ID test',()=>{
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public-api/users/2',
            headers: {
                //'authorization': "Bearer b04287d76af139a921c8b52281f479aa6593ccc56a2bacb5b1e8fd082d85674d"
                'authorization': "Bearer" + accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            //expect(res.body.meta.pagination.limit).to.eq(20)
            expect(res.body.name).to.eq('Bharat Chattopadhyay')
        })
        
    })
    
})
    
    