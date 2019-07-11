import Direction from './Direction'

export default class Carousel
{
    private container: Element
    private direction: Direction
    private elements: Array<Element>
    private focusItemClass: string
    private focusItemElement: Element
    private interval: number
    private intervalId: number
    private sizeSkip: number

    public constructor(container: Element)
    {
        this.container = container
        this.direction = Direction.x
        this.elements = []
        this.focusItemClass = 'carousel__focus'
        this.intervalId = 0
        this.interval = 2000
        this.sizeSkip = 300
    }

    public addElement(...element:Array<Element>): this
    {
        this.elements.push(...element)
        return this
    }

    public autoMove(active:boolean): this
    {
        if (active) {
            this.autoMoveStart()
            return this
        }

        this.autoMoveStop()
        return this
    }

    private autoMoveStart(): this
    {
        this.intervalId = window.setInterval(() => this.scroll(), this.interval)
        return this
    }

    public autoMoveStop(): this
    {
        window.clearInterval(this.intervalId)
        this.intervalId = 0
        return this
    }

    public autoMoveToggle(): this
    {
        this.autoMove(! this.isAutoMove());
        return this
    }

    public isAutoMove(): boolean
    {
        return this.intervalId > 0
    }

    public moveNext(): this
    {
        let index = this.elements.indexOf(this.focusItemElement) + 1

        if (
            this.elements.length == 0
            || index >= this.elements.length
        ) {
            return this
        }

        this.moveTo(this.elements[index])

        return this
    }

    public movePrevious(): this
    {
        let index = this.elements.indexOf(this.focusItemElement) - 1

        if (
            this.elements.length == 0
            || index < 0
        ) {
            return this
        }

        this.moveTo(this.elements[index])

        return this
    }

    public moveTo(element:Element): this
    {
        const index: number = this.elements.indexOf(element)
        if (index < 0) {
            return this
        }

        if (this.focusItemElement && this.focusItemClass) {
            this.focusItemElement.classList.remove(this.focusItemClass)
        }

        this.focusItemElement = element

        let options:ScrollIntoViewOptions = {
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        }

        if (this.direction == Direction.y) {
            options.block = "center"
            options.inline = "nearest"
        }

        element.scrollIntoView(options)

        if (this.focusItemClass.length > 0) {
            element.classList.add(this.focusItemClass)
        }

        return this
    }

    private scroll(): this
    {
        let direction: string = 'top'
        let actualPosition: number = this.container.scrollTop
        let sizeScroll: number = this.container.scrollHeight
        let contentSize: number = this.container.clientHeight
        
        if (this.direction == Direction.x) {
            direction = 'left'
            actualPosition = this.container.scrollLeft
            sizeScroll = this.container.scrollWidth
            contentSize = this.container.clientWidth
        }

        let skip: number = actualPosition + this.sizeSkip

        if (sizeScroll - actualPosition === contentSize) {
            skip = 0
        }

        let options: ScrollOptions = {
            'behavior': 'smooth'
        }
        options[direction] = skip

        this.container.scroll(options)

        return this
    }

    public setClassItemInFocus(className: string): this 
    {
        this.focusItemClass = className
        return this
    }

    public setElements(elements:Array<Element>): this
    {
        this.elements = elements
        return this
    }
}
