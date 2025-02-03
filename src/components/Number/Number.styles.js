import  styled from '@emotion/styled'

export const StyledNumber = styled.div`
   text-align: center;
   font-size: ${({size})=>  size || 1}rem;
   color: ${({color})=> color||  '#FF6500'};
   display: inline-block;
   width: 100%;
   hight: 100%;
   &::after{
    content: "${({text})=> text||'i'}";
    text-transform: uppercase;
    font-size: 2rem;
   }

`