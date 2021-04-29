export class DomSearch {

    input = document.getElementById('search-request')
    searchButton = document.querySelector(".search-button")
    downButton = document.querySelector(".search-down-button")
    upButton = document.querySelector(".search-up-button")
    leftButton = document.querySelector(".search-left-button")
    rightButton = document.querySelector(".search-right-button")
    icon = document.querySelector('.search-icon')
    modal = document.querySelector('.search-modal')
    deleteButton = document.querySelector(".search-button-clear")

    initialize() {
        this.openModal()
        this.clearInput()
        this.searchHandler()
        this.dragAndDrop()
    }

    clearInput() {
        this.deleteButton.onclick = (e) => {
            e.preventDefault()
            this.input.value = ''
            if (this.result) this.result.removeAttribute('style')
            this.result = null
        }
    }

    openModal() {
        this.icon.addEventListener('click', (e) => {
            e.preventDefault()
            this.icon.style.display = 'none'
            this.modal.classList.remove('modal-hide')
        })
    }

    searchHandler() {
            this.searchButton.addEventListener('click', (e) => {
            e.preventDefault()
            let i = 0
            let classSel = '.'
            let idSel = '#'
            if (this.result) this.result.removeAttribute('style')
            this.result = document.querySelectorAll(`${this.input.value}`)[i]

            if (this.result === undefined) {
                this.result = document.querySelectorAll(`${classSel + this.input.value}`)[i]
                if(this.result === undefined) {
                    this.result = document.querySelectorAll(`${idSel + this.input.value}`)[i]
                }
            }
            while (this.result.className.includes('search')) {
                this.result = document.querySelectorAll(`${this.input.value}`)[i++]
            }
            this.onSearch()
            this.result.style.border = '1px solid red'
            this.result.scrollIntoView({behavior: 'smooth'});
        })

        this.downButton.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.result) this.result.removeAttribute('style')
            this.result = this.result.firstElementChild

            if (this.result.className.includes('search')) {
                this.result = this.result.nextElementSibling
                if (this.result.className.includes('search')) {
                    this.result = this.result.nextElementSibling
                }
            }
            else e.preventDefault()
            this.onSearch()
            this.result.style.border = '1px solid red'
            this.result.scrollIntoView({behavior: 'smooth'});
        })

        this.upButton.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.result) this.result.removeAttribute('style')
            this.result = this.result.parentElement

            if (this.result.className.includes('search')) {
                this.result = this.result.nextElementSibling
                if (this.result.className.includes('search')) {
                    this.result = this.result.nextElementSibling
                }
            }
            else e.preventDefault()
            this.onSearch()
            this.result.style.border = '1px solid red'
            this.result.scrollIntoView({behavior: 'smooth'});
        })

        this.leftButton.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.result) this.result.removeAttribute('style')
            this.result = this.result.previousElementSibling
            this.onSearch()
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
            this.result.scrollIntoView({behavior: 'smooth'});
        })

        this.rightButton.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.result) this.result.removeAttribute('style')
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
            this.result.scrollIntoView({behavior: 'smooth'});
        })
    }

    onSearch() {
        this.result.parentElement === null ? this.upButton.disabled = true : this.upButton.disabled = false
        this.result.firstElementChild === null ? this.downButton.disabled = true : this.downButton.disabled = false
        this.result.previousElementSibling === null ? this.leftButton.disabled = true : this.leftButton.disabled = false
        this.result.nextElementSibling === null ? this.rightButton.disabled = true : this.rightButton.disabled = false
    }

    dragAndDrop() {
        let modal = this.modal
        let input = this.input

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