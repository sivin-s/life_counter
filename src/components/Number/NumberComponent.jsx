import PropTypes from 'prop-types'
import { StyledNumber } from './Number.styles'
function NumberComponent(props) {
  const {value,color,font_size,text} = props

  return (
    <StyledNumber size={font_size} color={color} text={text}> 
        {value}
    </StyledNumber>
  )
}
NumberComponent.propTypes={
   value: PropTypes.number,
   color: PropTypes.string,
   font_size: PropTypes.number,
   text : PropTypes.string
}
export default NumberComponent