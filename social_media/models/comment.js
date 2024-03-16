const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tejas@555',
  database: 'social_media'
});

class Comment {
  static async create(postId, content) {
    await pool.query('INSERT INTO comments (post_id, content) VALUES (?, ?)', [postId, content]);
  }
}

module.exports = Comment;
