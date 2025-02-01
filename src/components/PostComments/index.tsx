import { FormEvent, useState } from 'react';
import styles from './PostComments.module.css';
import Comment from '../../models/Comment';

type Props = {
  comments?: Comment[];
  setComments: (comments: Comment[]) => void;
};

const PostComments = ({ comments = [], setComments }: Props) => {
  const [tempComment, setTempComment] = useState('');

  const handleAddComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!tempComment.trim()) {
      alert('O comentário não pode estar vazio.');
      return;
    }

    const newComment = new Comment(Date.now(), tempComment.trim());
    setTempComment('');
    setComments([...comments, newComment]);
  };

  return (
    <div>
      <ul className={styles['post-comments']}>
        {comments.map(({ comment, id }) => (
          <li className={styles['post-comment']} key={id}>
            <p className={styles['post-comment-content']}>{comment}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddComment} className={styles['post-comments-form']}>
        <textarea
          data-testid="comment-input"
          value={tempComment}
          onChange={(e) => setTempComment(e.target.value)}
          required
          className={styles['post-comments-form-textarea']}
          placeholder="Digite seu comentário"
        />
        <button
          data-testid="submit-button"
          type="submit"
          className={styles['post-comments-form-button']}
        >
          Comentar
        </button>
      </form>
    </div>
  );
};

export default PostComments;