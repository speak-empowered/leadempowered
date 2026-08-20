exports.handler = async function () {
  try {
    const response = await fetch('https://www.leadempowered.com/wp-json/wp/v2/posts?per_page=12&orderby=date&order=desc&_embed=1');
    if (!response.ok) {
      return { statusCode: response.status, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'WordPress API request failed' }) };
    }
    const posts = await response.json();
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=300'
      },
      body: JSON.stringify(posts)
    };
  } catch (error) {
    return { statusCode: 502, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'Unable to load posts' }) };
  }
};
