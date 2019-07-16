import AutoMoveMode from './AutoMoveMode'
import Direction from './Direction'
import Hermes from '@ciebit/hermes'
import ListenerOptions from './ListenerOptions'

export default class Carousel
{
    private autoMoveMode: AutoMoveMode
    private behavior: ScrollBehavior
    private container: Element
    private direction: Direction
    private elements: Array<HTMLElement>
    private focusItemClass: string
    private focusItemElement: HTMLElement
    private hermes: Hermes
    private interval: number
    private intervalId: number
    private sizeSkip: number

    public constructor(container: Element)
    {
        this.autoMoveMode = AutoMoveMode.Item
        this.behavior = 'smooth'
        this.container = container
        this.direction = Direction.x
        this.elements = []
        this.focusItemClass = 'carousel__focus'
        this.hermes = new Hermes
        this.intervalId = 0
        this.interval = 2000
        this.sizeSkip = 300
    }

    public addElement(...element:Array<HTMLElement>): this
    {
        this.elements.push(...element)
        return this
    }

    public addListener(option: ListenerOptions, callback: Function, singleCall: boolean = false): this
    {
        this.hermes.addListener(option, callback, singleCall)
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
        this.hermes.dispatch(ListenerOptions.AutoMoveStart, this)
        return this
    }

    public autoMoveStop(): this
    {
        window.clearInterval(this.intervalId)
        this.intervalId = 0
        this.hermes.dispatch(ListenerOptions.AutoMoveStop, this)
        return this
    }

    public autoMoveToggle(): this
    {
        this.autoMove(! this.isAutoMove());
        this.hermes.dispatch(ListenerOptions.AutoMoveToggle, this)
        return this
    }

    public getItemFocus(): HTMLElement
    {
        return this.focusItemElement
    }

    public getItems(): HTMLElement[]
    {
        return this.elements
    }

    public isAutoMove(): boolean
    {
        return this.intervalId > 0
    }

    public moveToNextItem(): this
    {
        let index = this.elements.indexOf(this.focusItemElement) + 1

        if (
            this.elements.length == 0
            || index >= this.elements.length
        ) {
            return this
        }

        this.moveToItem(this.elements[index])
        this.hermes.dispatch(ListenerOptions.MovedToNext, this)

        if ((index +1) == this.elements.length) {
            this.hermes.dispatch(ListenerOptions.MovedToLastItem, this)
        }

        return this
    }

    public moveToPreviousItem(): this
    {
        let index = this.elements.indexOf(this.focusItemElement) - 1

        if (
            this.elements.length == 0
            || index < 0
        ) {
            return this
        }

        this.moveToItem(this.elements[index])
        this.hermes.dispatch(ListenerOptions.MovedToPrevious, this)

        if (index == 0) {
            this.hermes.dispatch(ListenerOptions.MovedToFirstItem, this)
        }

        return this
    }

    public moveToItem(element:HTMLElement): this
    {
        const index: number = this.elements.indexOf(element)
        if (index < 0 || this.focusItemElement == element) {
            return this
        }

        if (this.focusItemElement && this.focusItemClass) {
            this.focusItemElement.classList.remove(this.focusItemClass)
        }

        this.focusItemElement = element

        const elementStyles: CSSStyleDeclaration = window.getComputedStyle(element)
        let x: number
        x = this.container.clientWidth
        x -= element.offsetWidth
        x -= parseFloat(elementStyles.marginLeft) + parseFloat(elementStyles.marginRight)
        x = x / 2
        x = element.offsetLeft - x

        let y: number
        y = this.container.clientHeight
        y -= element.offsetHeight
        y -= parseFloat(elementStyles.marginTop) + parseFloat(elementStyles.marginBottom)
        y = y / 2
        y = element.offsetLeft - y

        if (this.direction != Direction.x) {
            x = undefined
        }

        if (this.direction != Direction.y) {
            y = undefined
        }
    
        this.scrollTo(x, y, this.behavior)

        if (this.focusItemClass.length > 0) {
            element.classList.add(this.focusItemClass)
        }

        this.hermes.dispatch(ListenerOptions.MovedToItem, this)

        return this
    }

    public removeListener(option: ListenerOptions, callback: Function): this
    {
        this.hermes.remove(option, callback)
        return this
    }

    private scroll(): this
    {
        let actualPosition: number
        let contentSize: number
        let sizeScroll: number
        let skipX: number
        let skipY: number

        if (this.direction == Direction.x) {
            actualPosition = this.container.scrollLeft
            sizeScroll = this.container.scrollWidth
            contentSize = this.container.clientWidth
            skipX = actualPosition + this.sizeSkip
        } else {
            actualPosition = this.container.scrollTop
            sizeScroll = this.container.scrollHeight
            contentSize = this.container.clientHeight
            skipY = actualPosition + this.sizeSkip
        }

        if (sizeScroll - actualPosition === contentSize) {
            skipX = skipX > 0 ? 0 : undefined
            skipY = skipY > 0 ? 0 : undefined
        }

        this.scrollTo(skipX, skipY, this.behavior)

        return this
    }

    public scrollTo(x: number, y: number, behavior: ScrollBehavior): this
    {
        let options: ScrollToOptions = {
            'left': x,
            'top': y,
            'behavior': behavior
        }

        this.container.scroll(options)

        return this
    }

    public setAutoMoveMode(mode: AutoMoveMode): this
    {
        this.autoMoveMode = mode
        return this
    }

    public setClassItemInFocus(className: string): this 
    {
        this.focusItemClass = className
        return this
    }

    public setElements(elements:Array<HTMLElement>): this
    {
        this.elements = elements
        return this
    }

    public setInterval(interval:number): this
    {
        this.interval = interval
        return this
    }

    public setSizeSkip(skip:number): this
    {
        this.sizeSkip = skip
        return this
    }
}
