import { useDispatch, useSelector } from "react-redux";
import { SET_USER_VALUE_WORK, SET_USER_VALUE_PRICE, DELETE_WORK } from "../redux/actions";


export default function WorkPriceElements({setEditWork}) {
  const {works, userFilter} = useSelector(state => state.workPrice);
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    const work = works.find(item => item.id === id);
    dispatch({ type: SET_USER_VALUE_WORK, payload: work.work});
    dispatch({ type: SET_USER_VALUE_PRICE, payload: work.price});
    setEditWork({isEdit: true, id: id});
  }

  const handleDelete = (id) => dispatch({ type: DELETE_WORK, payload: id });

  return (
    <ul className="works">
    {works.filter(item => item.work.toLowerCase().includes(userFilter.toLowerCase())).map(item => <li key={item.id} className="work-element">
      <span>{item.work} </span>
      <span>{item.price}</span>
      <button className="work-element__edit-button" onClick={() => handleEdit(item.id)}>Редактировать</button>
      <button className="work-element__delete-button" onClick={() => handleDelete(item.id)}>Удалить</button>
    </li>)}
  </ul>
  )
}