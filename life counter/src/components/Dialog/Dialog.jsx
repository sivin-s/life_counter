import PropTypes from 'prop-types';
import {DatePicker} from '../index';

function Dialog({handleDateChange,setIsOpen,setStartTimer,startTimer,targetDate}) {

const handleDialogClose = (e)=>{
    e.preventDefault()
    setIsOpen((prev)=>!prev)
}

const handleSubmit =(e)=>{
  e.preventDefault()
   setStartTimer((prev)=>!prev)
   setIsOpen((prev)=> !prev)
}

  return (
    <div className='
       
        fixed
        inset-0
        bg-black/80

        z-30
        flex
        justify-center
        items-center
        
       ' 
        >
      
      {
       
          <dialog open className='
          relative
          drop-shadow-[16px_17px_2px_#1E3E62]
          bg-[#FF6500]
          w-[28rem]
          h-[17rem]
          m-auto
          flex
          flex-col 
          items-center
          gap-y-8
          justify-center
          rounded-xl
          '>
      <div className='w-full text-center'>
      <DatePicker handleDateChange={handleDateChange}/>
      </div>
      <div className='w-full flex gap-9 ' style={{padding:'10px'}}>
      <button className=' bg-[#0B192C]    drop-shadow-[11px_8px_5px_#1E3E62] text-[#FF6500]  rounded-full h-[3.3rem] font-semibold w-full'
       onClick={handleDialogClose}
      >Close</button> 
     {targetDate && <button onClick={handleSubmit} className='bg-[#0B192C] drop-shadow-[9px_8px_5px_#1E3E62] text-[#FF6500]  rounded-full h-[3.3rem] font-semibold  w-full'>
       {startTimer && targetDate ?"stop":"start"}
        </button>}
      </div>
  </dialog>
        
      }
     
    </div>
  )
}

Dialog.propTypes = {
  handleDateChange: PropTypes.func,
  setIsOpen: PropTypes.func,
  setStartTimer: PropTypes.func,
  startTimer: PropTypes.bool,
  targetDate: PropTypes.object
}

export default Dialog
