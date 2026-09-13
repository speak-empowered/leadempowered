exports.handler = async function () {
  try {
    const cacheBuster = Date.now();
    const response = await fetch(`https://www.leadempowered.com/wp-json/wp/v2/posts?per_page=12&orderby=date&order=desc&_embed=1&_=${cacheBuster}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-store, max-age=0'
        },
        body: JSON.stringify({ error: 'WordPress API request failed' })
      };
    }

    const posts = await response.json();

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store, max-age=0, must-revalidate'
      },
      body: JSON.stringify(posts)
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store, max-age=0'
      },
      body: JSON.stringify({ error: 'Unable to load posts' })
    };
  }
};
