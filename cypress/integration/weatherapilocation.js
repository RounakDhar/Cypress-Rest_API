describe('check weather information',()=>{

    it.only('get weather information for cities',()=>{
    
        //1st request: GET locations
        cy.request({
    
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=Am'
    
    
        }).then((resp)=>{
            const location = resp.body
            return location
    
    
    
        }).then((location)=>{

            for(let i=0; i<location.length;i++){
    
            //2nd Request for the 1st location/city 
            cy.request({
                method: 'GET',
                url: 'https://www.metaweather.com/api/location/search/?query='+location[i].title
    
    
            }).then((resp)=>{
    
                expect(resp.status).to.eq(200)
                expect(resp.body[0]).to.have.property('title',location[i].title)
    
            })
        }
        })
    
    
    
    })
    
    
    
    
    
    })