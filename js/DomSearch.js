export class DomSearch{
    initialize() {
        this.clearInput()
        this.searchHandler()
    }


    clearInput() {
        let input = document.getElementById('search-request')
        let button = document.querySelector(".search-button-clear")
        button.onclick = (e) => {
            e.preventDefault()
            input.value = ''
        }
    }
    searchHandler() {
        let input = document.getElementById('search-request')
        let searchButton = document.querySelector(".search-button")
        let downButton = document.querySelector(".down-button")
        let upButton = document.querySelector(".up-button")
        let leftButton = document.querySelector(".left-button")
        let rightButton = document.querySelector(".right-button")
       
        searchButton.onclick = (e) => {
            e.preventDefault()
            this.removeStyle()
            this.result = document.querySelector(`${input.value}`)
            this.result.style.border = '1px solid red'

            console.log(this.result)
        }

        downButton.onclick = (e) => {
            e.preventDefault()
            this.removeStyle()
            this.downButtonStatus(upButton, downButton)
            this.result = this.result.firstElementChild
            this.result.style.border = '1px solid red'

            console.log(this.result)
        }

        upButton.onclick = (e) => {
            e.preventDefault()
            this.removeStyle()
            this.upButtonStatus(upButton, downButton)
            this.result = this.result.parentElement
            this.result.style.border = '1px solid red'

            console.log(this.result)
        }

        leftButton.onclick = (e) => {
            e.preventDefault()
            this.result = this.result.previousElementSibling
            this.removeStyle()
            this.result.style.border = '1px solid red'

            console.log(this.result)
        }

        rightButton.onclick = (e) => {
            e.preventDefault()
            this.result = this.result.nextElementSibling
            this.removeStyle()
            this.result.style.border = '1px solid red'

            console.log(this.result)
        }
    }
    downButtonStatus(upButton, downButton) {
        this.result.firstElementChild.firstElementChild === null || this.result.firstElementChild.firstElementChild === undefined ? downButton.disabled = true : downButton.disabled = false
        upButton.disabled = false
    }
    upButtonStatus(upButton, downButton) {
        this.result.parentElement.parentElement === null || this.result.parentElement.parentElement === undefined ? upButton.disabled = true : upButton.disabled = false
        downButton.disabled = false
    }
    leftButtonStatus() {

    }


    removeStyle() {
        let elements = document.getElementsByTagName('*');
        for(let element of elements) {
            element.removeAttribute('style')
        }
    }

}