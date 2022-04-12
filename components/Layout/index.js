import Head from 'next/head'

const layout = (porps) => {
  return (
    <>
      <Head>
        <meta name="keywords" content="git,node,javascript,vue,react,教程,编程,软件" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="//at.alicdn.com/t/font_3321387_1541iqd1w8c.css" />
      </Head>
      <div className="container">{porps.children}</div>
    </>
  )
}
export default layout
