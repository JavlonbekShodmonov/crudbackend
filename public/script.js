// Display all posts
async function fetchPosts() {
    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json();
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach(post => {
        postsDiv.innerHTML += `<h3>${post.title}</h3><p>${post.content}</p><hr>`;
    });
}

document.getElementById('postForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });

    const newPost = await response.json();
    alert(`Post Created: ${newPost.title}`);
    fetchPosts(); // Refresh the list of posts
});

document.getElementById('updateForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const id = document.getElementById('updateId').value;
    const title = document.getElementById('updateTitle').value;
    const content = document.getElementById('updateContent').value;

    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });

    const updatedPost = await response.json();
    alert(`Post Updated: ${updatedPost.title}`);
    fetchPosts(); // Refresh the list of posts
});

document.getElementById('deleteForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const id = document.getElementById('deleteId').value;

    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert(`Post Deleted`);
        fetchPosts(); // Refresh the list of posts
    } else {
        alert(`Post not found`);
    }
});

// Fetch posts when the page loads
fetchPosts();
