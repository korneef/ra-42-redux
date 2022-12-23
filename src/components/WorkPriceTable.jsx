import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { SET_USER_VALUE_PRICE, SET_USER_VALUE_WORK, SET_NEW_WORK, DELETE_WORK, EDIT_OLD_WORK } from "../redux/actions";

export default function WorkPriceTable(props) {
  const { works } = useSelector((state) => state.workPrice);
  const dispatch = useDispatch();
  const [EditWork, setEditWork] = useState({isEdit: false, id: 0})
  const workInput = useRef()
  const priceInput = useRef()

  const cleanInput = () => {
    dispatch({ type: SET_USER_VALUE_WORK, payload: '' });
    dispatch({ type: SET_USER_VALUE_PRICE, payload: '' });
    workInput.current.value = '';
    priceInput.current.value = '';
  }

  const handleChange = (evt, type) => dispatch({ type: type, payload: evt.target.value });

  const handleSubmit = (evt, id) => {
    evt.preventDefault();
    switch(id) {
      case 0:
        dispatch({
          type: SET_NEW_WORK
        });
        break
      default:
        dispatch({
          type: EDIT_OLD_WORK,
          id: id
        })
    }
    cleanInput()
  };

  const handleEdit = (id) => {
    const work = works.find(item => item.id === id);
    workInput.current.value = work.work;
    priceInput.current.value = work.price;
    setEditWork({isEdit: true, id: id})
  }

  const handleDelete = (id) => dispatch({ type: DELETE_WORK, payload: id });

  const handleAbort = (evt) => {
    evt.preventDefault();
    setEditWork({isEdit: false, id: 0});
    cleanInput();
  }

  return (
    <>
      <form className="work-information" onSubmit={(evt) => handleSubmit(evt, EditWork.id)}>
        <input ref={workInput} name="work" className="work-information__work-name" type="text" required onChange={(evt) => handleChange(evt, SET_USER_VALUE_WORK)} />
        <input ref={priceInput} name="price" className="work-information__work-price" type="text" required onChange={(evt) => handleChange(evt, SET_USER_VALUE_PRICE)} />
        <button className="work-information__send-information">{EditWork.isEdit ? 'Сохранить' : 'Отправить'}</button>
        { EditWork.isEdit ? <button className="work-information__cancel" onClick={handleAbort}>Отменить</button> : null}

      </form>
      <ul className="works">
        {works.map(item => <li key={item.id} className="work-element">
          <span>{item.work} </span>
          <span>{item.price}</span>
          <button className="work-element__edit-button" onClick={() => handleEdit(item.id)}>Редактировать</button>
          <button className="work-element__delete-button" onClick={() => handleDelete(item.id)}>Удалить</button>
        </li>)}
      </ul>
    </>
  )
}