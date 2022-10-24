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
        const shuffleButton = document.querySelector('.buttons__shuffle');   
        const container = document.querySelector('.container')

        const shuffle = (num = 4, className) => {
            
            let sum = num * num
            let items = [];   

            
    
            const valid = (num) => {
    
                    const checkSolve = () => {
    
                        const recursionShuffle = () => {
    
                            let count = 4;
                            let sum = 0;
                            let result = 0;  
    
                            let shuffleArray;
    
                            const shuffleItemArray = () => {
                                let sum = 16;
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
                                
                                console.log(shuffleArray);
                
                                return shuffleArray
                                
                            };
        
        
                            const getZeroPosition = (shuffleArray) => {
                                let count = 4;
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
                                    console.log(row);
                                    return row;
                            }
    
    
                            let res = 0;
                            let zeroPosition
                            while (result == 0) {
                                
                                
                                shuffleArray = shuffleItemArray()
                                console.log(shuffleArray);
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
        
                              zeroPosition = getZeroPosition(shuffleArray);
                              console.log(zeroPosition);                     
                              
                              res =  sum + zeroPosition;    
                              console.log(res);                  
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
    
                        
                        return recursionShuffle();
                      
                    }
                  
                  
                return checkSolve()
    
            }
            
    
            let arrayValidationTrue = valid()        
    
            for (let i = 0; i < sum; i++) {            
    
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
        <div class="puzzle ${className}">${shuffle()}</div>`       

        return gameBlock

    }
        
    
    game()
    
    const puzzle = document.querySelector('.puzzle');        

    puzzle.innerHTML = '';
        
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
                    count += 1               
                 }
                
                if(deltaX == 0 || deltaX == 1 && deltaY <= size) {
                    change();
                    count += 1
                }
    
                
                console.log(count);
        }
            replace();          
    
            
        } 

        let zero = document.querySelector('.empty');

        let count = 0;

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
    
             return compareArray.join(', ') === currentArray
        }            
                 
        
        const puz = (e) => { 
    
            let target = e.target
            
             
            if (target.classList.contains('empty')) {
                return
            }
            
            zero = document.querySelector('.empty');       
            move(target, zero);
            
            
        
        }

        const win = () => { // в случае победы появляется гифка и кнопка начать заново
            const container = document.querySelector('.container');
            container.innerHTML = '';
            container.style.flexDirection = 'column';
            container.style.alignItems = 'center';
            container.innerHTML += `<div><img class='victory__gif' src="styles/img/victory.gif" alt="victory gif" /></div>
            <input type='button' value="Try again" class='button__win' onClick="location.href=location.href"></input>`
        }
    
        puzzle.addEventListener('click', (e) => { // слушатель, обрабатывает клики, кажды раз вызывает функцию compare которая сравнивает значени изначального массива и массива который получаетя при движении плиток, в случае победы вызывает функцию win, та что выше
            puz(e)
           console.log(compare() ? win() : 'NoN' ); 
        })
    }    
    reloadCLass()



    const shuffle = (num = 4) => {

        const puzzle = document.querySelector('.puzzle');        

        puzzle.innerHTML = '';
        let sum = num * num
        let items = [];   

        const valid = () => {

                const checkSolve = () => {

                    const recursionShuffle = () => {

                        let count = 4;
                        let sum = 0;
                        let result = 0;  

                        let shuffleArray;

                        const shuffleItemArray = () => {
                            let sum = 16;
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
                            
                            console.log(shuffleArray);
            
                            return shuffleArray
                            
                        };
    
    
                        const getZeroPosition = (shuffleArray) => {
                            let count = 4;
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
                                console.log(row);
                                return row;
                        }


                        let res = 0;
                        let zeroPosition
                        while (result == 0) {
                            
                            
                            shuffleArray = shuffleItemArray()
                            console.log(shuffleArray);
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
    
                          zeroPosition = getZeroPosition(shuffleArray);
                          console.log(zeroPosition);                     
                          
                          res =  sum + zeroPosition;    
                          console.log(res);                  
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

                    
                    return recursionShuffle();
                  
                }
              
              
            return checkSolve()

        }
        

        let arrayValidationTrue = valid()        

        for (let i = 0; i < sum; i++) {            

            arrayValidationTrue[i] === 0 ? items.push(`<div class='empty' data-number='${arrayValidationTrue[i]}'></div>`) : items.push(`<div class='puzzle__item' data-number='${arrayValidationTrue[i]}'>${arrayValidationTrue[i]}</div>`)
        } 

        const mixArr = (array) => {
            let item = [...array]            
            item = item.join('')
            return item
         }   

        //return gameBlock

        puzzle.innerHTML += `${mixArr(items)}`;

    }

    shuffle()

    const shuffleItem = (number) => {

        const shuffleButton = document.querySelector('.buttons__shuffle');        

        shuffleButton.addEventListener('click', () => {
            
            shuffle(number)    
                    
        })
        
    }

    const shuffleButton = document.querySelector('.buttons__shuffle');        

        shuffleButton.addEventListener('click', () => {
            
            shuffle()    
                    
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
            returnItems()
            reloadCLass()
            shuffleItem(target + 3)
        })
    })

           
    }

    returnItems()
    
    
    
    

    


        
    

    
    

    













})