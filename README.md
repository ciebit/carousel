# Carousel

A simple Typescript carousel


## Example

```typescript
import { Carousel } from '@ciebit/carousel'


document.addEventListener('DOMContentLoaded', () => 
{
    const container: HTMLElement = document.querySelector('.container')
    const items: NodeListOf<HTMLElement> = document.querySelectorAll('.item')

    const carousel = new Carousel(container)
    carousel.addElement(...Array.prototype.slice.call(items))


    // Navigation buttons (optional)
    const buttonNext: HTMLButtonElement = document.querySelector('.buttonNext')
    buttonNext.addEventListener('click', carousel.moveNext.bind(carousel))

    const buttonPrevious: HTMLButtonElement = document.querySelector('.buttonPrevious')
    buttonPrevious.addEventListener('click', carousel.movePrevious.bind(carousel))


    // Automatic scrolling
    carousel.setInterval(2000).setSizeSkip(200).autoMove(true)
})
```