import { useState } from 'react'
import style from './index.module.css'

export default function NavList({ data, itemClick }) {
  const [active, setActive] = useState(0)
  const viewBlog = (id, index) => {
    setActive(index)
    itemClick(id)
  }
  return (
    <ul className={style.ulBox}>
      {data.map((item, index) => {
        return (
          <li
            key={item._id}
            className={style.liItem + ' ' + (active === index ? style.active : '')}
            onClick={() => viewBlog(item._id, index)}
          >
            {item.name}
          </li>
        )
      })}
    </ul>
  )
}
