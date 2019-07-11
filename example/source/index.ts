import {Carousel, Direction } from './../../index'

document.addEventListener('DOMContentLoaded', () => 
{
    carouselAuto(document)
    carouselManualHorizontal(document)
})

function carouselAuto(document: Document)
 {
    const container: HTMLElement = document.querySelector('.carouselAuto')
    const items: NodeListOf<HTMLElement> = document.querySelectorAll('.carouselAuto__item')
    const buttonStartStop: HTMLButtonElement = document.querySelector('.carouselAuto__buttonStartOrStop')

    const carousel = new Carousel(container)
    carousel.addElement(...Array.prototype.slice.call(items))
    carousel.autoMove(true)

    buttonStartStop.addEventListener('click', carousel.autoMoveToggle.bind(carousel))
}

function carouselManualHorizontal(document:Document)
{
    const container: HTMLElement = document.querySelector('.carouselManualHorizontal')
    const items: NodeListOf<HTMLElement> = document.querySelectorAll('.carouselManualHorizontal__item')
    const buttonNext: HTMLButtonElement = document.querySelector('.carouselManualHorizontal__buttonNext')
    const buttonPrevious: HTMLButtonElement = document.querySelector('.carouselManualHorizontal__buttonPrevious')

    const carousel = new Carousel(container)
    carousel.addElement(...Array.prototype.slice.call(items))

    buttonNext.addEventListener('click', carousel.moveNext.bind(carousel))
    buttonPrevious.addEventListener('click', carousel.movePrevious.bind(carousel))
}