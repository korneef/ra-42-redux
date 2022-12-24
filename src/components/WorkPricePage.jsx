import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { SET_USER_VALUE_PRICE, SET_USER_VALUE_WORK, SET_NEW_WORK, EDIT_OLD_WORK } from "../redux/actions";
import WorkFilter from "./WokrFilter";
import WorkPriceElements from "./WorkPriceElements";

export default function WorkPriceTable() {
  const { userWork, userPrice } = useSelector((state) => state.workPrice);
  const dispatch = useDispatch();
  const [EditWork, setEditWork] = useState({isEdit: false, id: 0});
  const workInput = useRef();
  const priceInput = useRef();
  useEffect(() => {
    workInput.current.value = userWork;
    priceInput.current.value = userPrice;
  }, [userWork, userPrice])

  const cleanInput = () => {
    dispatch({ type: SET_USER_VALUE_WORK, payload: '' });
    dispatch({ type: SET_USER_VALUE_PRICE, payload: '' });
  }

  const handleChange = (evt, type) => dispatch({ type: type, payload: evt.target.value });

  const handleSubmit = (evt, id) => {
    evt.preventDefault();
    switch(id) {
      case 0:
        dispatch({
          type: SET_NEW_WORK
        });
        break;
      default:
        dispatch({
          type: EDIT_OLD_WORK,
          id: id
        })
    }
    cleanInput();
    setEditWork({isEdit: false, id: 0});
  };

  const handleAbort = (evt) => {
    evt.preventDefault();
    setEditWork({isEdit: false, id: 0});
    cleanInput();
  }

  return (
    <>
      <WorkFilter handleChange={handleChange}/>
      <form className="work-information" onSubmit={(evt) => handleSubmit(evt, EditWork.id)}>
        <input ref={workInput} name="work" className="work-information__work-name" type="text" required onChange={(evt) => handleChange(evt, SET_USER_VALUE_WORK)} />
        <input ref={priceInput} name="price" className="work-information__work-price" type="text" required onChange={(evt) => handleChange(evt, SET_USER_VALUE_PRICE)} />
        <button className="work-information__send-information">{EditWork.isEdit ? 'Сохранить' : 'Отправить'}</button>
        { EditWork.isEdit ? <button className="work-information__cancel" onClick={handleAbort}>Отменить</button> : null}
      </form>
      <WorkPriceElements setEditWork={setEditWork}/>
    </>
  )
}