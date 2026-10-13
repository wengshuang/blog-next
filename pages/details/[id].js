import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import request from '../../utils/http'

const Details = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const {
          data: { data: blogData = {} }
        } = await request({
          url: '/blogs/getBlogById',
          method: 'get',
          data: { id }
        })
        setData(blogData)
        
        request({
          url: '/blogs/updateViews',
          method: 'get',
          data: { id: blogData._id }
        })
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  function createMarkup(content) {
    return { __html: content }
  }

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div className="details">
      <Head>
        <title>{data.title || '详情'}</title>
        <meta name="description" content={data.title} />
      </Head>
      <h1 className="m-b-20">{data.title}</h1>
      <div dangerouslySetInnerHTML={createMarkup(data.content)}></div>
    </div>
  )
}

export default Details
