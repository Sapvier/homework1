export class DomSearch{
    initialize() {
        this.openModal()
        this.clearInput()
        this.searchHandler()
        this.dragAndDrop()
    }

    clearInput() {
        let input = document.getElementById('search-request')
        let deleteButton = document.querySelector(".search-button-clear")
        deleteButton.onclick = (e) => {
            e.preventDefault()
            input.value = ''
        }
    }
    openModal() {
        let icon = document.querySelector('.search-icon')
        let modal = document.querySelector('.search-modal')
        icon.addEventListener('click', (e) => {
            e.preventDefault()
            icon.style.display = 'none'
            modal.classList.remove('modal-hide')
        })

    }

    searchHandler() {
        let input = document.getElementById('search-request')
        this.searchButton = document.querySelector(".search-button")
        this.downButton = document.querySelector(".search-down-button")
        this.upButton = document.querySelector(".search-up-button")
        this.leftButton = document.querySelector(".search-left-button")
        this.rightButton = document.querySelector(".search-right-button")

        this.searchButton.addEventListener('click', (e) => {
            e.preventDefault()
            let i = 0
            let classSel = '.'
            let idSel = '#'
            this.result = document.querySelectorAll(`${input.value}`)[i]

            if (this.result === undefined) {
                this.result = document.querySelectorAll(`${classSel + input.value}`)[i]
                if(this.result === undefined) {
                    this.result = document.querySelectorAll(`${idSel + input.value}`)[i]
                }
            }
            while (this.result.className.includes('search')) {
                this.result = document.querySelectorAll(`${input.value}`)[i++]
            }
            this.onSearch()
            // this.onSearchModalAndScripts()
            this.result.style.border = '1px solid red'
            console.log(this.result, this.result.parentElement)

        })

        this.downButton.addEventListener('click', (e) => {
            e.preventDefault()
            this.result.removeAttribute('style')
            this.result = this.result.firstElementChild

            if (this.result.className.includes('search')) {
                this.result = this.result.nextElementSibling
                if (this.result.className.includes('search')) {
                    this.result = this.result.nextElementSibling
                }

            }
            else e.preventDefault()
            this.onSearch()
            // this.onSearchModalAndScripts()
            this.result.style.border = '1px solid red'
            console.log(this.result, this.result.parentElement)
        })

        this.upButton.addEventListener('click', (e) => {
            e.preventDefault()
            this.result.removeAttribute('style')
            this.result = this.result.parentElement

            if (this.result.className.includes('search')) {
                this.result = this.result.nextElementSibling
                if (this.result.className.includes('search')) {
                    this.result = this.result.nextElementSibling
                }

            }
            else e.preventDefault()

            this.onSearch()
            // this.onSearchModalAndScripts()
            this.result.style.border = '1px solid red'
            console.log(this.result, this.result.parentElement)
        })

        this.leftButton.addEventListener('click', (e) => {
            e.preventDefault()
            this.result.removeAttribute('style')
            this.result = this.result.previousElementSibling
            this.onSearch()
            // this.onSearchModalAndScripts()
            if (this.result.parentElement === document.body && this.result.previousElementSibling.tagName === 'SCRIPT') {
                this.leftButton.disabled = true
            }
            else if (this.result.className.includes('search')) {
                this.result = this.result.nextElementSibling
                if (this.result.className.includes('search')) {
                    this.result = this.result.nextElementSibling
                }
            }
            else e.preventDefault()
            this.result.style.border = '1px solid red'
            console.log(this.result, this.result.parentElement)
        })

        this.rightButton.addEventListener('click', (e) => {
            e.preventDefault()
            this.result.removeAttribute('style')
            this.result = this.result.nextElementSibling
            this.onSearch()
            if (this.result.parentElement === document.body && this.result.nextElementSibling.tagName === 'SCRIPT') {
                this.rightButton.disabled = true
            }
            else if (this.result.className.includes('search')) {
                this.result = this.result.nextElementSibling
                if (this.result.className.includes('search')) {
                    this.result = this.result.nextElementSibling
                }

            }
            else e.preventDefault()
            this.result.style.border = '1px solid red'
            console.log(this.result, this.result.parentElement)
        })
    }

    onSearch() {
        this.result.parentElement === null ? this.upButton.disabled = true : this.upButton.disabled = false
        this.result.firstElementChild === null ? this.downButton.disabled = true : this.downButton.disabled = false
        this.result.previousElementSibling === null ? this.leftButton.disabled = true : this.leftButton.disabled = false
        this.result.nextElementSibling === null ? this.rightButton.disabled = true : this.rightButton.disabled = false
    }

    onSearchModalAndScripts() {
        this.result.previousElementSibling === document.getElementById('search-modal')
            ? this.leftButton.disabled = true
            : this.leftButton.disabled = false
    }

    dragAndDrop() {
        let modal = document.getElementById("search-modal");
        let input = document.querySelector(".search-input");

        function mouseDownHandler (e) {
            this.x = e.clientX;
            this.y = e.clientY;

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        }

        function mouseMoveHandler(e) {
            modal.style.zIndex = '100';
            const dx = e.clientX - this.x;
            const dy = e.clientY - this.y;

            modal.style.top = modal.offsetTop + dy + `px`;
            modal.style.left = modal.offsetLeft + dx + `px`;

            this.x = e.clientX;
            this.y = e.clientY;
        }

       function mouseUpHandler() {
            input.focus()
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        modal.addEventListener('mousedown', mouseDownHandler);

        modal.ondragstart = () => false
    }
}