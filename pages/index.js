import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import NavList from '../components/NavList'
import request from '../utils/http'
import NoData from '../components/NoData'

async function getData(id = '') {
  console.log(id)
  try {
    const {
      data: {
        data: { data }
      }
    } = await request({
      url: '/blogs/getBlogs',
      method: 'get',
      data: {
        tagId: id,
        currentPage: 1,
        pageSize: 20
      }
    })
    return data || []
  } catch (e) {
    console.log(e)
    return []
  }
}

async function getTags() {
  try {
    const {
      data: { data }
    } = await request({
      url: '/tags/getTags',
      method: 'get'
    })
    return data || []
  } catch (e) {
    console.log(e)
    return []
  }
}

export default function Home() {
  const [list, setList] = useState([])
  const [navList, setNavList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const tags = await getTags()
      setNavList(tags)
      if (tags && tags.length) {
        const blogs = await getData()
        setList(blogs)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const itemClick = async (id) => {
    const res = await getData(id)
    setList(res)
  }

  function createMarkup(content) {
    return { __html: content }
  }

  return (
    <>
      <Head>
        <title>首页-weng的博客</title>
      </Head>
      <main className={styles.main}>
        <NavList data={navList} itemClick={itemClick}></NavList>
        <div className={styles.content}>
          <ul>
            {loading ? (
              <div>加载中...</div>
            ) : list.length ? (
              list.map((item) => {
                return (
                  <Link href={'/details/' + item._id} key={item._id} passHref>
                    <li className={styles.liItem}>
                      <h2 className={styles.blogTitle}>{item.title}</h2>
                      <div className="es" dangerouslySetInnerHTML={createMarkup(item.content)}></div>
                    </li>
                  </Link>
                )
              })
            ) : (
              <NoData />
            )}
          </ul>
        </div>
      </main>
    </>
  )
}
