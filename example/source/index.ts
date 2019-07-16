import {Carousel, ListenerOptions } from './../../index'

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
    carousel.addListener(ListenerOptions.AutoMoveStart, () => console.log('Auto Move Start'))
    carousel.addListener(ListenerOptions.AutoMoveStop, () => console.log('Auto Move Stop'))
    carousel.addListener(ListenerOptions.AutoMoveToggle, () => console.log('Auto Move Toggle'))
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
    carousel.addListener(ListenerOptions.MovedToItem, () => console.log('Manual Moved'))
    carousel.addListener(ListenerOptions.MovedToNext, () => console.log('Manual Moved Next'))
    carousel.addListener(ListenerOptions.MovedToPrevious, () => console.log('Manual Moved Previous'))
    carousel.addListener(ListenerOptions.MovedToFirstItem, () => console.log('Manual Moved First Item'))
    carousel.addListener(ListenerOptions.MovedToLastItem, () => console.log('Manual Moved Last Item'))

    buttonNext.addEventListener('click', carousel.moveToNextItem.bind(carousel))
    buttonPrevious.addEventListener('click', carousel.moveToPreviousItem.bind(carousel))
}