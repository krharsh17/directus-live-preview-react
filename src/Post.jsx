import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import client from './lib/directus';
import { readItem, withToken } from '@directus/sdk';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Post = () => {
  const { id } = useParams();
  const query = useQuery();
  const [article, setArticle] = useState(null);


  // Fetch the article using its id
  const fetchArticle = async () => {
    const token = query.get("token");
    const isPreview = query.get("preview");
    let result

    const version = query.get("version")
    const getPost = (id) => readItem('Posts', id, {version})

    try {
      if (isPreview && token)
        result = await client.request(withToken(token, getPost(id)));
      else
        result = await client.request(getPost(id));
    } catch (error) {
      console.log('Error fetching article:', error);
      result = {
        title: "Post not found",
        content: "We couldn't find this post"
      }
    }
    setArticle(result);
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {(query.get("preview") ? <p>This a preview of the post</p> : <p/>)}
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default Post;
