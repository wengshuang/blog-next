import request from '../../utils/http'

export async function getServerSideProps(ctx) {
  const {
    data: { data = {} }
  } = await request({
    url: '/blogs/getBlogById',
    method: 'get',
    data: {
      id: ctx.params.id
    }
  })
  return {
    props: {
      data
    }
  }
}

export default function Details({ data }) {
  function createMarkup(content) {
    return { __html: content }
  }
  return (
    <div>
      <h2 className="m-b-20">{data.title}</h2>
      <div dangerouslySetInnerHTML={createMarkup(data.content)}></div>
    </div>
  )
}
