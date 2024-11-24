import React  from 'react'
const Card = (props) => {

  const handleClick = async(e) => {
    e.stopPropagation();
    const audioSource = e.currentTarget.dataset.audioSource;
      let cries = new Audio(audioSource);
      // cries.preload = 'auto'; 
      try{
        cries.play()
      }
      catch(error) {
          console.error('Error while playing audio:', error);
        };
        

}

  return (
    <div data-audio-source={props.cry} onClick={handleClick}  className="card flex flex-col items-center h-[330px] w-[280px] m-3 bg-white rounded-md">
      <div className='h-[150px] w-full content-center relative'>
        <div className='img-background w-full h-full bg-green-200 absolute top-0 flex justify-center items-center'>
        <img className='m-auto w-1/3 h-[85%]' src={props.img} alt="" />
        </div>
      </div>
      <div className="details w-full flex flex-col items-center h-[170px] justify-around">
        <h2>{props.name.charAt(0).toUpperCase()+props.name.slice(1,props.name.length)}</h2>
        <span className='bg-green-500 p-1 px-4 rounded-full text-white'>{props.type.map((e)=>e.type.name).join(", ")}</span>
        <div className='w-full flex flex-col p-4 justify-around'>
          <div className='flex justify-between'>
            <span>Height: {props.height}</span>
            <span>Weight: {props.weight}</span>
            <span>Speed: {props.speed}</span>
          </div>
          <div className='flex justify-between'>
            <span className='flex flex-col items-center'><span>{props.exp}</span><span>Exprience</span></span>
            <span className='flex flex-col items-center'><span>{props.attack}</span><span>Attack</span></span>
            <span className='flex flex-col items-center'><span>{props.aby==undefined?props.ability:props.aby}</span><span>Abilities</span></span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Card
