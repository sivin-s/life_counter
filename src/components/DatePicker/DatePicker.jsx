/** @jsxImportSource @emotion/react */  // recognizes 'css' prop in emotion
import PropTypes from 'prop-types'
import {css} from '@emotion/react'

function DatePicker({handleDateChange}) {
  // const objDateToStringDate = targetDate? new Date(targetDate).toISOString() : null
  
  return (
     <>
       <input
        // defaultValue={objDateToStringDate}
        // value={objDateToStringDate}
       className='font-semibold focus:outline-0'
        type="datetime-local"  
        onChange={handleDateChange}
        // eslint-disable-next-line react/no-unknown-property
        css={
            css`
            color: #0B192C;
            height: 50px;
            font-size: 1.5rem;
            `
        }
        />
     </>
  )
}

DatePicker.propTypes = {
  handleDateChange :PropTypes.func,
  targetDate: PropTypes.object
}

export default DatePicker
