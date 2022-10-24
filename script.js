window.addEventListener('DOMContentLoaded', function() {
    
    const createContainer  = () => {
        const main = document.createElement('div');
        main.classList.add('main');
        document.querySelector('body').append(main);
    
        const container = document.createElement('div'); 
        container.classList.add('container'); // блок c классом container
        container.id = "containerID"
        let con = document.querySelector('.main').append(container);

        return con
    
    
    }

    createContainer() // непостредственно создаем div с классом контейнер
    
    /// Создаём кнопки
    
    
    

    const buttons = () => {
        const container = document.querySelector('.container')

        const button = `<div id="buttonID" class="buttons">
            <button class='btn buttons__shuffle'>Shuffle and start</button>
            <button class='btn buttons__stop'>Stop</button>
            <button class='btn buttons__save'>Save</button>
            <button class='btn buttons__results'>Result</button>
        </div>`

        let buttons = container.innerHTML += button

        return buttons
    }

    buttons()
    
    
    const game = (num = 4, className = 'puzzle__default') => {
         
        const container = document.querySelector('.container')
        let sum = num

        const shuffle = (num = 4) => {
            
            let summary = num * num
            let items = [];   

            
    
            const valid = (num, summary) => {
    
                    const checkSolve = (num, summary) => {
    
                        const recursionShuffle = (num = 4, summary) => {
    
                            let count = num;
                            let sum = 0;
                            let result = 0;  
                            let summaryNumber = summary;
    
                            let shuffleArray;
    
                            const shuffleItemArray = (summaryNumber) => {
                                let sum = summaryNumber;
                                let validArray = [] 
                        
                                for (let i = 0; i < sum; i++) {
                                    validArray.push(i)   
                                } 
                                
                                let shuffleArray = [];
                                let array = [...validArray]
                
                                for (let i = array.length - 1; i > 0; i--) {
                                let randomNumber = Math.floor(Math.random() * (i + 1));
                                let currentnumber = array[i];
                                array[i] = array[randomNumber];
                                array[randomNumber] = currentnumber;
                                }
                
                                shuffleArray = array;  
                
                                return shuffleArray
                                
                            };
        
        
                            const getZeroPosition = (shuffleArray, fieldSize) => {
                                let count = fieldSize;
                                let copyArray = [...shuffleArray];
                                let row;
                                let resultArray = [];
                                for (let i = 1; i<= copyArray.length; i++) {
                                    while (copyArray.length) {
                                    resultArray.push(copyArray.splice(0, count));
                                    }
                                    resultArray.forEach((element, index) => {
                                    if(element.includes(0,0)) {
                                        row = index + 1;
                                    }
                                    });
                                    }
                                    
                                    return row;
                            }
    
    
                            let res = 0;
                            let zeroPosition
                            while (result == 0) {
                                
                                
                                shuffleArray = shuffleItemArray(summaryNumber)                                
                                  for (let i = 0; i < count; i++) {
                                    if(i != 0) {
                                      for (let j = i+1; j <=count; j++) {
                                        if(shuffleArray[i] > shuffleArray[j] && shuffleArray[j] != 0) {
                                            sum += 1;
                                        }
                                      }
                                    }
                                  }
                    
                            if(count % 2 == 0) {
        
                              zeroPosition = getZeroPosition(shuffleArray, count);
                              
                              res =  sum + zeroPosition;    
                                           
                              if(res % 2 == 0) {
        
                                result = 1;   
                                
                                return shuffleArray;
                              }
                            }
        
                            if(count % 2 != 0) {
                              if(sum % 2 == 0 && sum != 0) { 
                                
                                result = 1;
                                return shuffleArray;
                              }
                            }
                            
                          }
    
    
                        }
    
                        
                        return recursionShuffle(num, summary);
                      
                    }
                  
                  
                return checkSolve(num , summary)
    
            }
            
    
            let arrayValidationTrue = valid(num, summary)        
    
            for (let i = 0; i < summary; i++) {            
    
                arrayValidationTrue[i] === 0 ? items.push(`<div class='empty' data-number='${arrayValidationTrue[i]}'></div>`) : items.push(`<div class='puzzle__item' data-number='${arrayValidationTrue[i]}'>${arrayValidationTrue[i]}</div>`)
            } 
    
            const mixArr = (array) => {
                let item = [...array]            
                item = item.join('')
                return item
            } 

            return mixArr(items);
    
        }
         

        let destiny = '';

        let arr = [3, 4, 5, 6, 7, 8];
        

        for (let i = 0; i < arr.length; i++) {            
            destiny += `<div class='destiny__item' data-number='${i}'>${arr[i]}x${arr[i]}</div>`
        } 

        let gameBlock =  container.innerHTML += `
        <div class='destiny__choose'>Choose your destiny: ${destiny}</div>
        <div class='destiny'>Frame size: ${num}x${num}</div>
        <div class="puzzle ${className}">${shuffle(sum)}</div>`       

        return gameBlock

    }
        
    
    game(num  = 4, className = 'puzzle__default')
    
    const puzzle = document.querySelector('.puzzle');        

    puzzle.innerHTML = '';


    // const step = () => {

    //     const buttons = document.querySelector('.buttons');

    //     const countDiv = document.createElement('div');
    //     countDiv.classList.add('count')        
    //     buttons.after(countDiv)

    // }

    // step()

    
        
    const reloadCLass = () => {          
        
                
        const move = (target, zeroTarget) => {
            
            let targetCord = {
                x : Math.round(target.getBoundingClientRect().x),
                y : Math.round(target.getBoundingClientRect().y)
            }  
        
            let zeroCord = {
                x: Math.round(zeroTarget.getBoundingClientRect().x),
                y: Math.round(zeroTarget.getBoundingClientRect().y)
            }        
            
            let size = target.offsetWidth * 1.5;
            let data =  target.dataset.number; 
            
            const replace = () => { 
    
                data = target.dataset.number;  
                size = target.offsetWidth * 1.5;     
    
                targetCord.x = Math.round(target.getBoundingClientRect().x);
                targetCord.y = Math.round(target.getBoundingClientRect().y);
    
                
                 zeroCord.x = Math.round(zero.getBoundingClientRect().x); 
                 zeroCord.y = Math.round(zero.getBoundingClientRect().y);
                 
                let deltaX = Math.abs(zeroCord.x - targetCord.x);
                let deltaY = Math.abs(zeroCord.y - targetCord.y);
                
                const change = () => {  
                                     
                    target.setAttribute("data-number", "0");
                    target.classList.remove("puzzle__item");
                    target.classList.add("empty");
                    target.innerText = "";
                    zero.setAttribute("data-number" , data);
                    zero.classList.remove("empty");
                    zero.classList.add("puzzle__item");
                    zero.innerText = data; 
                                      
                }
                
                
                if(deltaY == 0 || deltaY == 1 && deltaX <= size) {
                     change();                                       
                 }
                
                if(deltaX == 0 || deltaX == 1 && deltaY <= size) {
                     change();                  
                }
            }
            
             replace();    
            
            
        }         

        let zero = document.querySelector('.empty');

        const puzzle = document.querySelector('.puzzle'); 

        const compare = () => {

            const puzzle = document.querySelector('.puzzle');

            let currentArray = [...Array(puzzle.childElementCount)].map((_, i) => i + 1).join(', ').replace(`${puzzle.childElementCount}`, '0');  
            console.log(currentArray);

            let compareArray = []

             for (let i = 0; i < puzzle.childElementCount; i++) {
                let item = puzzle.childNodes[i].dataset.number
                compareArray.push(item)
             }

             let winArray = compareArray.join(', ')
             console.log(winArray);
    
             return winArray === currentArray && winArray.length > 0 && currentArray.length > 0
        }        
        
        const puz = (e) => { 
    
            let target = e.target
            
             
            if (target.classList.contains('empty')) {
                return 0
            }
            
            zero = document.querySelector('.empty');
              
            return move(target, zero);  
            
            
        }
        
        const win = () => { // в случае победы появляется гифка и кнопка начать заново
            const container = document.querySelector('.container');
            container.innerHTML = '';
            container.style.flexDirection = 'column';
            container.style.alignItems = 'center';
            container.innerHTML += `<div><img class='victory__gif' src="styles/img/victory.gif" alt="victory gif" /></div>
            <input type='button' value="Try again" class='button__win' onClick="location.href=location.href"></input>`
        }
        
         puzzle.addEventListener('click', (e)  => { // слушатель, обрабатывает клики, кажды раз вызывает функцию compare которая сравнивает значение изначального массива и массива который получаетя при движении плиток, в случае победы вызывает функцию win, та что выше
            
            puz(e); 
            let winCompare = compare()
            console.log(winCompare);
            winCompare ? win() : 'NoN'; 
            
        })

        
        
    }    

    reloadCLass();
    
    
     

    



    const shuffle = (num) => {

        const puzzle = document.querySelector('.puzzle');        

        puzzle.innerHTML = '';
        let summary = num * num
        let items = [];   

        const valid = (num, summary) => {

                const checkSolve = (num, summary) => {

                    const recursionShuffle = (num, summary) => {

                        let count = num;
                        let sum = 0;
                        let result = 0;  
                        let summaryNumber = summary

                        let shuffleArray;

                        const shuffleItemArray = (summaryNumber) => {
                            let sum = summaryNumber;
                            let validArray = [] 
                    
                            for (let i = 0; i < sum; i++) {
                                validArray.push(i)   
                            } 
                            
                            let shuffleArray = [];
                            let array = [...validArray]
            
                            for (let i = array.length - 1; i > 0; i--) {
                            let randomNumber = Math.floor(Math.random() * (i + 1));
                            let currentnumber = array[i];
                            array[i] = array[randomNumber];
                            array[randomNumber] = currentnumber;
                            }
            
                            shuffleArray = array;   
                            
                            
            
                            return shuffleArray
                            
                        };
    
    
                        const getZeroPosition = (shuffleArray, fieldSize) => {
                            let count = fieldSize;
                            let copyArray = [...shuffleArray];
                            let row;
                            let resultArray = [];
                            for (let i = 1; i<= copyArray.length; i++) {
                                while (copyArray.length) {
                                resultArray.push(copyArray.splice(0, count));
                                }
                                resultArray.forEach((element, index) => {
                                if(element.includes(0,0)) {
                                    row = index + 1;
                                }
                                });
                                }
                                
                                return row;
                        }


                        let res = 0;
                        let zeroPosition
                        while (result == 0) {
                            
                            
                            shuffleArray = shuffleItemArray(summaryNumber)
                            
                              for (let i = 0; i < count; i++) {
                                if(i != 0) {
                                  for (let j = i+1; j <=count; j++) {
                                    if(shuffleArray[i] > shuffleArray[j] && shuffleArray[j] != 0) {
                                        sum += 1;
                                    }
                                  }
                                }
                              }
                
                        if(count % 2 == 0) {
    
                          zeroPosition = getZeroPosition(shuffleArray, count);
                                             
                          
                          res =  sum + zeroPosition;    
                                         
                          if(res % 2 == 0) {
    
                            result = 1;   
                            
                            return shuffleArray;
                          }
                        }
    
                        if(count % 2 != 0) {
                          if(sum % 2 == 0 && sum != 0) { 
                            
                            result = 1;
                            return shuffleArray;
                          }
                        }
                        
                      }


                    }

                    
                    return recursionShuffle(num, summary);
                  
                }
              
              
            return checkSolve(num, summary)

        }
        

        let arrayValidationTrue = valid(num = 4, summary)        

        for (let i = 0; i < summary; i++) {            

            arrayValidationTrue[i] === 0 ? items.push(`<div class='empty' data-number='${arrayValidationTrue[i]}'></div>`) : items.push(`<div class='puzzle__item' data-number='${arrayValidationTrue[i]}'>${arrayValidationTrue[i]}</div>`)
        } 

        const mixArr = (array) => {
            let item = [...array]            
            item = item.join('')
            return item
         }   

        

        puzzle.innerHTML += `${mixArr(items)}`;

    }

    shuffle(num)

    const shuffleItem = (number) => {

        const shuffleButton = document.querySelector('.buttons__shuffle');        

        shuffleButton.addEventListener('click', () => {
            
             
            
            shuffle(number) 
            
        })
        
    }

    const shuffleButton = document.querySelector('.buttons__shuffle');        

        shuffleButton.addEventListener('click', () => {

            
            shuffle(num)   
            
        })



    

   
    

    const returnItems = () => {
        
        let classArray = ['puzzle__small', 'puzzle__default', 'puzzle__medium', 'puzzle__large', 'puzzle__super', 'puzzle__mega'];
        let index = 0;
        
        const puzzle = document.querySelector('.puzzle');
        
        const destinyItems = document.querySelectorAll('.destiny__item');
        const destinyChoose = document.querySelector('.destiny__choose');
        const destiny = document.querySelector('.destiny');
        
        destinyItems.forEach(item => {
        
        item.addEventListener('click', (e) => {
            
            const target = +e.target.dataset.number            
            
            puzzle.remove();
            destinyChoose.remove();
            destiny.remove();
            game(target + 3, classArray[index + target])
            shuffleItem(target + 3)
            returnItems()
            console.log(reloadCLass());
            
            
        })
    })

           
    }

    returnItems()
    
    
    
    

    


        
    

    
    

    













})