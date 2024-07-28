export class TagBuilder {
    constructor(tagName, tagParent) {
        this.tagName = tagName;
        this.tagParent = tagParent;
    }
    setParent(tagParent) {
        this.tagParent = tagParent;
        return this;
    }
    setClass(className) {
        this.className = className;
        return this;
    }
    setTextContent(textContent) {
        this.textContent = textContent;
        return this;
    }
    build(tagParent) {
        const tag = document.createElement(this.tagName);
        if (tagParent) {
            tagParent.appendChild(tag);
        } else if (this.tagParent) {
            this.tagParent.appendChild(tag);
        }
        if (this.className) {
            tag.className = this.className;
        }
        if (this.textContent != null) {
            tag.textContent = this.textContent;
        }
        return tag;
    }
}
