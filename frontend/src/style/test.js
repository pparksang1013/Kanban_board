import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// -   Main color: #3cb371;
// -   Main color rgba : (60, 179, 113);
// -   darker main color : #0D8541;
// -   daraker main color rgba : (13, 133, 65, 1);
// -   brighter main color : #90E0B3;
// -   brighter main color rgba : (144, 224, 179, 1);
// -   neon green : #10E56D (16, 229, 109, 1);
// -   red : #FB7754 (251, 119, 84, 1);
// -   orange : #FBAD54 (251, 173, 84, 1);
// -   blue : #3a7e9f (58, 126, 159, 1);
// -   black: 404040;


export const Button = styled.button`
  background-color: #3cb371;
  color: white;
  border: none;
  border-radius: 4px;
  &.btn_close {
    color: #3cb371;
    float: right;
    background-color: white;
  }
  &.plus{
    color: #3cb371;
    background-color: white;
  }
`;

export const Modal_Title = styled.h1`
    color :  #3cb371;
`;

export const Input = styled.input`
    &[type="button"]{
        background-color: white;
        color: #3cb371;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        width: 100%;
        &:hover {
            background-color: #3cb371;
            color: white;
            cursor: pointer;
        }
    }
    &[type="date"]{
        float: right;
        border: none;
        // border-bottom:  1px  solid  #3cb371;
        text-align: center;
        color: #3cb371;
        &:focus {
            outline: none;    
            border-bottom:  1px  solid  #3cb371;
        }
       
    }
    &[type="text"]{
        width: 99%;
        border: none;
        border-bottom: 1px  solid  #3cb371;
        &:focus {
            outline: none;    
        }
        &:default {
          color: red;
        }
    }
    &[type="file"]{
        width: 99%;
        border: none;
        border-bottom: 1px  solid  #3cb371;
        &:focus {
            outline: none;    
        }
        &:default {
          color: red;
        }
    }
`;

export const Div = styled.div`
    &.modal_box {
        flex-direction: column;
        height: auto;
        width: 100%;
        position: relative;
        flex-direction: column;
    }
    &.modal_top {
        flex-direction: column;
    }
    &top1 {
        display: flex;
    }
    &top2 {
        flex-direction: column;
        border: 10px;
    }
    &.top2-middle {
        display: flex;
    }
    &.modal_middle {
        flex-direction: column;
        width: 100%;
        height: auto;
        position: relative;
        /* overflow-y: scroll;  */
        /* overflow-x: scroll;  */

        /*  스크롤 바 설정 */
        &::-webkit-scrollbar {
        width: 10px;  
        height: 20px; 
        border: 1px solid black;
    }

    } 
    &.middle_top {
      height: auto;
      /* border: 1px solid #3cb371; */
      overflow-y: scroll; 
      

        /*  스크롤 바 설정 */
        /* &::-webkit-scrollbar {
        width: 10px;  
        height: 20px; 
        border: 1px solid black;
    } */
    }
    &.middle_middle {
      /* height: 10%; */
      /* border: 1px solid #3cb371; */
    }
    &.search{
      font-size: 0.85em;
      padding-top: 5px;
    }
   
    &.middle_bottom {
      /* position: absolute; */
      /* bottom:1%; */
      min-height: 20px;
      bottom:0%;
      width: 100%;
    }
    &.modal_bottom {
        position: relative;
        width: 98%;
    }
    &.date {
        padding-top: 1%;
    }
    &.commentWindow{
      z-index: 9999;
      width: 100px;
      height: 100px;
      background-color: black;
    }
    &.labelList{

      width: 100%;
      height: 10px;
      background-color: black;
    }
`;

export const StyledCalendar = styled(Calendar)`

    width: 350px;
    max-width: 100%;
    background: white;
    border: none !important;
    line-height: 1.125em;
    color: #3cb371;

    // 주말 색상
    .react-calendar__month-view__days__day--weekend {
      color: black;
    }
    // 이웃달 날 색상
    .react-calendar__month-view__days__day--neighboringMonth {
      color: #CFCFCF;
    }
    // 오늘 색상
    .react-calendar__tile--now {
      background: #3cb371;
      color: white;
    }
    // 선택한 날 색상
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      background-color: #3cb371;
      color: white;
    }
    .react-calendar__navigation {
      display: flex;
      height: 44px;
      margin-bottom: 1em;
    }
    // 달력 tile
    .react-calendar__navigation button {
      min-width: 44px;
      background: none;
    }
`;

export const Table = styled.table`

`;
export const Td = styled.td`
  width: 100%;
  &.num {
    /* border-right: 1px solid #3cb371; */
    width: 20px;
    text-align: right;
    color: #3cb371;
    padding-right: 5px;
    background-color: white;
  }
`;

export const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: #f5f5f5;
    
  }
`;

export const Label = styled.label`
&.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  font-size: 16px;
  color: #555;
  &:custom-file-upload:hover {
  background-color: #f7f7f7;
}
}


`;

export const Textarea = styled.textarea`
  border: 1px solid #3cb371;
  border-radius: 2px;
  width: 99%;
  max-width: 99%;
  min-width: 99%;
  min-height: 50px;
  &:hover{
    border: 2px solid #3cb371;
  }
  &:focus {
    border: 2px solid blue;
  }
`;
export const Span = styled.span`
  width: auto;
  max-width: 99%;
  min-width: 99%;

 
`;


