
const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let blogWithMostLikes = null
  blogs.forEach(blog => {
    if (blogWithMostLikes === null || blog.likes > blogWithMostLikes.likes) {
      blogWithMostLikes = blog
    }
  });
  return !blogWithMostLikes ? null : {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  }
}

const mostBlogs = (blogs) => {
  const groupedData = _.groupBy(blogs, 'author')
  let author = null;
  let blogCount = 0
  _.each( groupedData, ( val, key ) => { 
    if (val.length > blogCount) {
      author = key
      blogCount = val.length
    }
} );
  return {author: author, blogs: blogCount}
}

const mostLikes = (blogs) => {
  const groupedData = _.groupBy(blogs, 'author')
  let author = null;
  let likeCount = 0
  _.each( groupedData, ( val, key ) => { 
    const likes = totalLikes(val)
    if (likes > likeCount) {
      author = key
      likeCount = likes
    }
} );
  return {author: author, likes: likeCount}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

