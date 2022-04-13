import Link from 'next/link'
import style from './index.module.css'

export default function Header() {
  return (
    <div className={style.header}>
      <div className="container flex flex-start items-center h60 space-between">
        <Link href="/" passHref>
          <span className={style.logo}>weng的博客</span>
        </Link>
        <a href="https://github.com/wengshuang?tab=repositories" target="__blank">
          <span className={style.github + ' iconfont icon-github'}></span>
        </a>
      </div>
    </div>
  )
}
