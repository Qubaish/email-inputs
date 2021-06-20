# Email Input Tags

# Demo
<a href="https://qubaish.github.io/email-inputs/">https://qubaish.github.io/email-inputs/</a>

## Usage

```bash
    <input type="text" class="email-input" id="tag-input1">
    const emailInputs = new emailTagsInput(options);
    emailInputs.addData(['qbhatti143@gmail.com']);
```
## Options for this component
* Object that you can pass to this component

```bash
    selector: '',
    max: null,
    duplicate: false,
    wrapperClass: 'tags-input-wrapper',
    tagClass: 'tag'
```

## API
* A method to get all entered emails. Both valid and invalid.
```bash
    emailInputs.getAllPeople();
```
* method to replace all entered emails with new ones.
```bash
    emailInputs.replaceEmails(['passNewEmails@test.com']);
```

* Ability to subscribe for emails list changes..
```bash
    emailInputs.subscriberPeople('subscriber@subscribe.com');
```

