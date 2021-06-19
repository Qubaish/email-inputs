(function () {
    this.tagsInput = function () {
        // Default state
        var defaults = {
            selector: '',
            max: null,
            duplicate: false,
            wrapperClass: 'tags-input-wrapper',
            tagClass: 'tag'
        }

        // Initialize elements
        this.arr = [];
        this.input = document.createElement('input');
        this.input.setAttribute('placeholder', 'Add more people');
        this.wrapper = document.createElement('div');
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = Object.assign(defaults, arguments[0]);
        }
        this.original_input = document.getElementById(this.options.selector);

        buildUI.call(this);
        addEvents.call(this);


        // Building UI Elements
        function buildUI() {
            this.wrapper.append(this.input);
            this.wrapper.classList.add(this.options.wrapperClass);
            this.original_input.setAttribute('hidden', 'true');
            this.original_input.parentNode.insertBefore(this.wrapper, this.original_input);
        }

        // Initialize Events
        function addEvents() {
            var _ = this;
            this.wrapper.addEventListener('click', function () {
                _.input.focus();
            });

            this.input.addEventListener('keyup', function (event) {
                var str = _.input.value.trim();
                if (!!(~[9, 13, 188].indexOf(event.keyCode))) {
                    if (str != "") {
                        _.addTag(str);
                        _.input.value = "";
                    }
                }
            });
        }

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        

        // Add Tag
        tagsInput.prototype.addTag = function (string) {
            if (this.anyErrors(string)) return;
            const isStringWithComma = string.split(',');
            const newFilterArr = isStringWithComma.filter((email => email && email.replace(',', '').trim()));
            const newArr = [...this.arr, ...isStringWithComma];
            this.arr = newArr;
            console.log(this.arr);
            var tagInput = this;

                newFilterArr.forEach(email => {
                    const tag = document.createElement('span');
                    if(validateEmail(email)){
                       tag.className = this.options.tagClass;
                    } else {
                        tag.className = 'invalid-tag';
                    }
                    tag.textContent = email;
        
                    var closeIcon = document.createElement('a');
                    closeIcon.innerHTML = '&times;';
                    closeIcon.addEventListener('click', function (event) {
                        event.preventDefault();
                        var tag = this.parentNode;
        
                        for (var i = 0; i < tagInput.wrapper.childNodes.length; i++) {
                            if (tagInput.wrapper.childNodes[i] == tag)
                                tagInput.deleteTag(tag, i);
                        }
                    });
        
                    tag.appendChild(closeIcon);
                    this.wrapper.insertBefore(tag, this.input);
                })
          

            this.original_input.value = this.arr.join(',');
            this.input.value = "";
            return this;
        }

        // Delete Tag
        tagsInput.prototype.deleteTag = function (tag, i) {
            tag.remove();
            this.arr.splice(i, 1);
            this.original_input.value = this.arr.join(',');
            return this;
        }

        // Errors
        tagsInput.prototype.anyErrors = function (string) {
            if (this.options.max != null && this.arr.length >= this.options.max) {
                alert('Max limit reached');
                return true;
            }

            if (!this.options.duplicate && this.arr.indexOf(string) != -1) {
                alert('Duplicate found');
                return true;
            }

            return false;
        }


        tagsInput.prototype.addData = function (array) {
            var plugin = this;

            array.forEach(function (string) {
                plugin.addTag(string);
            })
            return this;
        }

        tagsInput.prototype.getAllPeople = function () {
            return this.arr;
        }

        tagsInput.prototype.getCount = () => {
            return this.arr.length;
        }

        tagsInput.prototype.replaceEmails = function(arr) {
            let element = document.querySelectorAll(".tag");
            let inValidElement = document.querySelectorAll(".invalid-tag");
            Array.prototype.forEach.call( element, function( node ) {
                node.parentNode.removeChild( node );
            });
            Array.prototype.forEach.call( inValidElement, function( node ) {
                node.parentNode.removeChild( node );
            });
            var plugin = this;
            plugin.arr = [];
            plugin.original_input.value = [];
            plugin.addData(arr);
            return this;
        }
    }
}())


var emailInputs = new tagsInput({
    selector: 'tag-input1',
    duplicate: false,
    max: 20
});


emailInputs.addData(['qbhatti143@gmail.com']);


const addEmail = () => {
    const random = Math.random().toString(36).substring(5);
    emailInputs.addTag(`${random}@email.com`);
}

const getCount = () => {
    alert(emailInputs.getCount());
}

document.getElementById("addEmail").addEventListener("click", addEmail);
document.getElementById("getCount").addEventListener("click", getCount);


/// API Instances
