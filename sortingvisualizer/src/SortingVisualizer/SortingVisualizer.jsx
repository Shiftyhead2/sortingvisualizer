import React from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms';
import './SortingVisualizer.css';


const ANIMATION_SPEED_MS = 5.5;


// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 450;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'green';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';


export default class SortingVisualizer extends React.Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      array : [],
    };
  }

  componentDidMount()
  {
    this.resetArray();
  }

  resetArray()
  {
    const array = [];
    const arrayBars = document.getElementsByClassName('array-bar');
    for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++)
    {
      array.push(randomIntFromInterval(5,710));
    }
    this.setState({array});
  }

  mergeSort(){
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  

  testSortingAlgorithms(){
    for(let i = 0; i < 100; i++){
      const array = [];
      const length = randomIntFromInterval(1,1000);
      for(let i = 0; i < length; i++){
        array.push(randomIntFromInterval(-1000,1000));
      }
      const javaScriptSortedArray = array.slice().sort((a,b) => a-b);
      const sortedArray = getMergeSortAnimations(array.slice());

      console.log(arraysAreEqual(javaScriptSortedArray,sortedArray));
    }
  }

  render(){
    const{array} = this.state;

    return(
      <div classname = "array-container">
        {array.map((value,idx) => (
        <div className = "array-bar" 
        key = {idx}
        style = {{height : `${value}px` , backgroundColor : 'grey'}}>
        </div>))}
        <button onClick = {() => this.resetArray()}>Generate New Array</button>
        <button onClick = {() => this.mergeSort()}>Merge sort</button>
        <button onClick = {() => this.testSortingAlgorithms()}>Test sorting algorithms</button>
      </div>
    )
  }
}


function randomIntFromInterval(min,max)
{
  return Math.floor(Math.random() *(max - min +1) + min);
}

function arraysAreEqual(arrayOne,arrayTwo){
  if(arrayOne.length !== arrayTwo.length) return false;
  for(let i = 0; i < arrayOne.length; i++){
    if(arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
