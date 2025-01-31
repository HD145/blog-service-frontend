import React from 'react'
import BlogView from '../../components/Blog/blog-view'
import { axiosPoint } from '../../common/config/axios'

const ExplorePage = () => {
  return (
    <BlogView link = {axiosPoint.getExplorePosts}/>
  )
}

export default ExplorePage
