// import React ,{useState}from 'react'
// import { FaStar } from 'react-icons/fa'

// function Rating() {
//     const [rating,setRating]=useState(null)
//     const [hover,setHover]=useState(null)
//     const stars=[];
//     for(let i=1;i<=5;i++){
//         stars.push(
//             <label key={i}>
//             <input
//             type='radio'
//             value={i}
//             onChange={()=>setRating(i)}
//             style={{display:'none'}}
//             />
//             <FaStar size={30}
//             color={i<=(hover||rating)? 'yellow':'gray'}
//             onMouseEnter={() => setHover(i)} 
//             onMouseLeave={() => setHover(null)} 
//             style={{ cursor: 'pointer' }}
//             />
//         </label>
//         )
//     }

//   return (
//    <div style={{display:'flex'}}>
//     {stars}
//    </div>
//   )
// }

// export default Rating


