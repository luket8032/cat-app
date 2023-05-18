import React from 'react';
import {AiFillStar} from 'react-icons/ai'

const Stats = ({ rating }) => {
    const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(<AiFillStar key={i}/>)
  }
  
  return <div style={{ display: 'flex' }}>{stars}</div>;
};

export default Stats;
