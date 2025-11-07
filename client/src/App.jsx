import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import GenImg from './pages/GenImg'
import RemoveBG from './pages/RemoveBG'
import RemoveOBJ from './pages/RemoveOBJ'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'
import {Toaster} from 'react-hot-toast'
const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenImg />} />
          <Route path="remove-background" element={<RemoveBG />} />
          <Route path="remove-object" element={<RemoveOBJ />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App