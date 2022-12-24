import { SET_USER_FILTER } from "../redux/actions";

export default function WokrFilter({handleChange}) {
  return (
    <>
      <span>Поиск: </span><input type="text" className="works-filter" onChange={(evt) => handleChange(evt, SET_USER_FILTER)} />
    </>
  )
}