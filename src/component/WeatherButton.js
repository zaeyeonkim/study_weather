import React, { useState } from 'react'
import { Button } from 'react-bootstrap';


const WeatherButton = ({cities, setCity}) => {
  return (
    <div>
      <Button variant="primary">현재위치</Button>
        {cities.map((item, index)=> (
            <Button variant="primary" key={index} className='btn' onClick={()=>setCity(item)}>{item}</Button>
        ))} 
    </div>
  )
}

export default WeatherButton
